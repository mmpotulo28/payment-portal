import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import supabase from "@/lib/db";
import { iAuctionItem, iBid, iCart } from "@/lib/types";
import logger from "@/lib/logger";

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

	const highestBids = (bids as iBid[]).reduce<Record<string, iBid>>((acc, bid) => {
		if (!acc[bid.itemId] || bid.amount > acc[bid.itemId].amount) {
			acc[bid.itemId] = bid;
		}
		return acc;
	}, {});

	// get only the user's highest bids
	const userHighestBids = Object.values(highestBids).filter((bid) => bid.userId === userId);

	// console.log("User's highest bids:", userHighestBids);

	// For each bid, get the item details
	const itemIds = userHighestBids.map((bid) => parseInt(bid.itemId, 10));

	// console.log("Item IDs:", itemIds);

	const { data: items, error: itemsError } = await supabase
		.from("items")
		.select("*")
		.in("id", itemIds);

	if (itemsError) {
		logger.error("Failed to fetch items:", itemsError);
		return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
	}

	// console.log("Items fetched:", items);

	// Build cart items
	const cartItems: iAuctionItem[] = userHighestBids.map((bid: any) => {
		const item: iAuctionItem = items.find((itm: iAuctionItem) => itm.id == bid.itemId);
		// console.log("Item found:", item);
		return {
			...item,
			price: bid.amount,
			quantity: 1,
			user_id: userId,
			created_at: bid.timestamp,
			updated_at: bid.timestamp,
		};
	});

	const total_amount = cartItems.reduce((sum, item) => sum + item.price, 0);

	const cart: iCart = {
		id: `cart_${userId}`,
		user_id: userId,
		items: cartItems,
		total_amount,
		status: "OPEN",
		items_count: cartItems.length,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	// check if the user already has a cart
	const { data: existingCart, error: cartError } = await supabase
		.from("carts")
		.select("*")
		.eq("user_id", userId);

	if (cartError) {
		logger.error("Failed to fetch cart:", cartError);
		return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
	}

	if (existingCart && existingCart.length > 0) {
		logger.info(`Cart already exists for user ${userId}`, { cart: existingCart[0] });
		// update existing cart
		const { error: updateError } = await supabase
			.from("carts")
			.update(cart)
			.eq("user_id", userId);
		if (updateError) {
			logger.error("Failed to update cart:", updateError);
			return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
		}
		logger.info(`Cart updated for user ${userId}`, { cart: existingCart[0] });

		return NextResponse.json({ cart: existingCart[0] });
	} else {
		// create new cart
		const { error: createError } = await supabase.from("carts").insert([cart]);

		if (createError) {
			logger.error("Failed to create cart:", createError);
			return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
		}
		logger.info(`Cart created for user ${userId}`, { cart });

		return NextResponse.json({ cart });
	}
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
