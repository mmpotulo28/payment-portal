import { NextRequest, NextResponse } from "next/server";
import { validatePayfastIPN, storeTransaction } from "@/lib/payfast";
import { iOrder, iOrderStatus, iTransaction } from "@/lib/types";
import logger from "@/lib/logger";
import supabase from "@/lib/db";

export async function POST(request: NextRequest) {
	try {
		// Parse the form data from PayFast
		const formData = await request.formData();
		const params: Record<string, string> = {};

		formData.forEach((value, key) => {
			params[key] = value.toString();
		});

		logger.info("PayFast IPN received:", params);

		// Validate the IPN
		const isValid = await validatePayfastIPN(params);

		if (!isValid) {
			logger.error("Invalid PayFast IPN received");
			return NextResponse.json({ error: "Invalid IPN" }, { status: 400 });
		}

		// Create transaction record
		const transaction: iTransaction = {
			m_payment_id: params.m_payment_id,
			pf_payment_id: params.pf_payment_id,
			payment_status: params.payment_status as "COMPLETE" | "CANCELLED",
			item_name: params.item_name,
			item_description: params.item_description,
			amount_gross: parseFloat(params.amount_gross || "0"),
			amount_fee: parseFloat(params.amount_fee || "0"),
			amount_net: parseFloat(params.amount_net || "0"),
			custom_str1: params.custom_str1,
			custom_str2: params.custom_str2,
			custom_str3: params.custom_str3,
			custom_str4: params.custom_str4,
			custom_str5: params.custom_str5,
			custom_int1: parseInt(params.custom_int1 || "0"),
			custom_int2: parseInt(params.custom_int2 || "0"),
			custom_int3: parseInt(params.custom_int3 || "0"),
			custom_int4: parseInt(params.custom_int4 || "0"),
			custom_int5: parseInt(params.custom_int5 || "0"),
			name_first: params.name_first,
			name_last: params.name_last,
			email_address: params.email_address,
			merchant_id: params.merchant_id,
			signature: params.signature,
			created_at: new Date().toISOString(),
		};

		// Store the transaction
		await storeTransaction(transaction);

		// get item ids from custom_str3 (comma separated)
		const itemIds = transaction.custom_str3 ? transaction.custom_str3.split(",") : [];
		const { data: items, error: itemsError } = await supabase
			.from("items")
			.select("*")
			.in("id", itemIds);

		if (itemsError) {
			logger.error("Failed to fetch items for transaction:", itemsError);
			return NextResponse.json({ error: "Failed to fetch items on notify" }, { status: 500 });
		}

		// Create order with status Pending after payment is received
		if (transaction.payment_status === "COMPLETE") {
			logger.info(`Payment completed for transaction: ${transaction.pf_payment_id}`);
			// Create order in DB
			const orders: iOrder[] = itemIds?.map((itemId) => {
				const item = items?.find((itm) => itm.id == itemId);
				if (!item) {
					logger.warn(`Item not found for ID: ${itemId}`);
				}

				return {
					order_id:
						transaction.pf_payment_id ||
						transaction.m_payment_id ||
						`order_${transaction.custom_str1}_${itemId}`,
					user_id: transaction.custom_str1 || "<USER_ID>",
					item_id: itemId,
					item_name: item?.title || transaction.item_name,
					payment_id: transaction.m_payment_id || transaction.pf_payment_id,
					order_status: iOrderStatus.Pending,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
					price: transaction.amount_gross || item?.price || 0,
					user_email: transaction.email_address,
					user_first_name: transaction.name_first,
					user_last_name: transaction.name_last,
					meta: {
						...transaction,
						...item,
					},
				};
			});

			const { error } = await supabase.from("orders").insert(orders);
			if (error) {
				logger.error("Failed to create order after payment:", error);
			} else {
				logger.info("Orders created successfully after payment", { orders });
			}

			// 3. Update inventory
			const { error: updateError, data: updatedItems } = await supabase
				.from("items")
				.update({ status: "SOLD" })
				.in("id", itemIds)
				.select("*");

			if (updateError) {
				logger.error("Failed to update inventory after payment:", updateError);
			} else {
				logger.info("Items updated after payment to SOLD", { itemIds, updatedItems });
			}

			// update cart status to paid
			const { error: cartError, data: cart } = await supabase
				.from("carts")
				.update({ status: "PAID" })
				.eq("user_id", orders[0].user_id)
				.select("*");

			if (cartError) {
				logger.error("Failed to update cart status after payment:", cartError);
			} else {
				logger.info(`Cart updated for user ${orders[0].user_id} to PAID`, { cart });
			}
		} else {
			logger.warn(`Payment cancelled for transaction: ${transaction.pf_payment_id}`);
			// Handle cancelled payment
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		logger.error("Error processing PayFast IPN:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
