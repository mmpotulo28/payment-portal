import { NextRequest, NextResponse } from "next/server";
import { validatePayfastIPN, storeTransaction } from "@/lib/payfast";
import { iTransaction } from "@/lib/types";
import logger from "@/lib/logger";

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

		// TODO: Update order status, send confirmation emails, etc.
		if (transaction.payment_status === "COMPLETE") {
			logger.info(`Payment completed for transaction: ${transaction.pf_payment_id}`);
			// Here you would typically:
			// 1. Update order status to completed
			// 2. Send confirmation email to customer
			// 3. Update inventory
			// 4. Trigger fulfillment process
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
