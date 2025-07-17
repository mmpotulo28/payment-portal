import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import supabase from "@/lib/db";
import { iOrderStatus } from "@/lib/types";

// GET: Retrieve orders for user
export async function GET(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const { data: orders, error } = await supabase.from("orders").select("*").eq("user_id", userId);

	if (error) {
		return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
	}
	return NextResponse.json({ orders });
}

// POST: Create order
export async function POST(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const body = await req.json();
	const order = {
		...body,
		user_id: userId,
		order_status: body.order_status || iOrderStatus.Pending,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
	const { error } = await supabase.from("orders").insert([order]);
	if (error) {
		return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
	}
	return NextResponse.json({ order });
}

// PUT: Update order
export async function PUT(req: NextRequest) {
	const { userId } = getAuth(req);
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const body = await req.json();
	const { order_id, ...updateFields } = body;
	updateFields.updated_at = new Date().toISOString();

	const { error } = await supabase
		.from("orders")
		.update(updateFields)
		.eq("order_id", order_id)
		.eq("user_id", userId);

	if (error) {
		return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
	}
	return NextResponse.json({ success: true });
}
