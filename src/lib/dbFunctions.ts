import supabase, { supabaseAdmin } from "@/lib/db";
import logger from "./logger";
import { iAuctionItem } from "./types";

export interface AddItemData {
	id?: string;
	title: string;
	description: string;
	price: string;
	imageFile: File | null;
	category: string;
	condition: string;
	auctionId: string;
}

export async function addItemToDatabase(
	formData: AddItemData,
): Promise<{ success: boolean; error?: string }> {
	try {
		let imageUrl = "";

		// Upload image to Supabase storage
		if (formData.imageFile) {
			const { data, error: uploadError } = await supabaseAdmin.storage
				.from("amsa-public")
				.upload(`images/${Date.now()}-${formData.imageFile.name}`, formData.imageFile);

			if (uploadError) {
				throw new Error(
					`Failed to upload image to storage: ${uploadError.message}\n Caused by: ${uploadError.cause}`,
				);
			}

			imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/amsa-public/${data.path}`;
		}

		// Insert item into the database
		const { error: insertError } = await supabase.from("items").insert([
			{
				title: formData.title, // Matches character varying(255)
				description: formData.description, // Matches text
				price: parseFloat(formData.price).toFixed(2), // Matches numeric(10, 2)
				image: imageUrl, // Matches character varying(255)
				category: formData.category, // Matches character varying(255)
				condition: formData.condition, // Matches character varying(50)
				auction_id: parseInt(formData.auctionId, 10), // Matches integer
			},
		]);

		if (insertError) {
			// Delete image from storage if insertion fails
			if (imageUrl) {
				const { error: deleteError } = await supabase.storage
					.from("amsa-public")
					.remove([`images/${Date.now()}-${formData.imageFile?.name}`]);

				if (deleteError) {
					logger.error(
						`Failed to delete image from storage after insert error: ${deleteError.message}`,
					);
				}
			}

			throw new Error(
				`Failed to insert item to db: ${insertError.message}\n Details: ${insertError.details}`,
			);
		}

		return { success: true, error: undefined };
	} catch (err) {
		logger.error("(addItemsToDatabase):\n", err);
		return {
			success: false,
			error: err instanceof Error ? err.message : "Unexpected error occurred.",
		};
	}
}

export async function createOrUpdateCart(userId: string, cartItems: iAuctionItem[]) {
	const total_amount = cartItems.reduce((sum, item) => sum + item.price, 0);
	const cart = {
		id: `cart_${userId}`,
		user_id: userId,
		items: cartItems,
		total_amount,
		items_count: cartItems.length,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
	const { error } = await supabase.from("cart").upsert([cart], { onConflict: "id" });
	return { error };
}

export async function updateOrderStatus(order_id: string, status: string, userId: string) {
	const { error } = await supabase
		.from("orders")
		.update({ order_status: status })
		.eq("order_id", order_id)
		.eq("user_id", userId);
	return { error };
}
