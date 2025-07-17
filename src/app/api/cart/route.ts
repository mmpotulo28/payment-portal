import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import supabase from "@/lib/db";

// GET: Retrieve cart
export async function GET(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Get highest bids for user
	const { data: bids, error: bidsError } = await supabase
		.from("bids")
		.select("*")
		.eq("userId", userId);

	if (bidsError) {
		return NextResponse.json({ error: "Failed to fetch bids" }, { status: 500 });
	}

	// For each bid, get the item details
	const itemIds = bids.map((bid: any) => bid.itemId);
	const { data: items, error: itemsError } = await supabase
		.from("items")
		.select("*")
		.in("id", itemIds);

	if (itemsError) {
		return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
	}

	// Build cart items
	const cartItems = bids.map((bid: any) => {
		const item = items.find((itm: any) => itm.id === bid.itemId);
		return {
			id: bid.id,
			item_id: bid.itemId,
			item_name: item?.title,
			item_description: item?.description,
			price: bid.amount,
			quantity: 1,
			image: item?.image,
			user_id: userId,
			created_at: bid.timestamp,
			updated_at: bid.timestamp,
		};
	});

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

	return NextResponse.json({ cart });
}

// POST: Create cart
export async function POST(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const body = await req.json();
	const { items } = body;

	const total_amount = items.reduce((sum: number, item: any) => sum + item.price, 0);

	const cart = {
		id: `cart_${userId}`,
		user_id: userId,
		items,
		total_amount,
		items_count: items.length,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	const { error } = await supabase.from("carts").upsert([cart]);
	if (error) {
		return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
	}
	return NextResponse.json({ cart });
}

// PUT: Update cart
export async function PUT(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const body = await req.json();
	const { items } = body;

	const total_amount = items.reduce((sum: number, item: any) => sum + item.price, 0);

	const updatedCart = {
		id: `cart_${userId}`,
		user_id: userId,
		items,
		total_amount,
		items_count: items.length,
		updated_at: new Date().toISOString(),
	};

	const { error } = await supabase.from("carts").update(updatedCart).eq("user_id", userId);

	if (error) {
		return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
	}
	return NextResponse.json({ cart: updatedCart });
}
