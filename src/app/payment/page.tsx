"use client";

import { useState, useEffect } from "react";
import { DUMMY_CART, DUMMY_PAYMENT_METHODS } from "@/lib/dummy-data";
import { iCart, iPaymentMethod } from "@/lib/types";
import CartSummary from "@/components/CartSummary";
import PaymentMethods from "@/components/PaymentMethods";
import OrderSummary from "@/components/OrderSummary";
import { ChevronLeftIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PaymentPage() {
	const [cart, setCart] = useState<iCart | null>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [paymentMethods] = useState<iPaymentMethod[]>(DUMMY_PAYMENT_METHODS);
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		// Simulate loading cart data with a more realistic delay
		setTimeout(() => {
			setCart(DUMMY_CART);
			setIsLoading(false);
		}, 800);
	}, []);

	const handlePaymentMethodSelect = (methodId: string) => {
		setSelectedPaymentMethod(methodId);
	};

	const handleProceedToPayment = async () => {
		if (!selectedPaymentMethod || !cart) return;

		setIsProcessing(true);

		try {
			if (selectedPaymentMethod === "payfast") {
				// Generate unique payment ID
				const paymentId = `PF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

				// Redirect to PayFast
				const paymentData = {
					merchant_id: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || "10000100",
					merchant_key: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || "46f0cd694581a",
					amount: cart.total_amount.toFixed(2),
					item_name: `Order for ${cart.items_count} items`,
					item_description: cart.items
						.map((item) => `${item.item_name} (x${item.quantity})`)
						.join(", "),
					return_url: `${window.location.origin}/payment/success?payment_id=${paymentId}`,
					cancel_url: `${window.location.origin}/payment/cancel?payment_id=${paymentId}`,
					notify_url: `${window.location.origin}/api/payfast/notify`,
					name_first: "John", // In a real app, get from user profile
					name_last: "Doe",
					email_address: "user@example.com",
					m_payment_id: paymentId,
					custom_str1: cart.id,
					custom_str2: cart.user_id,
				};

				// Create form and submit to PayFast
				const form = document.createElement("form");
				form.method = "POST";
				form.action = "https://sandbox.payfast.co.za/eng/process";
				form.style.display = "none";

				Object.entries(paymentData).forEach(([key, value]) => {
					const input = document.createElement("input");
					input.type = "hidden";
					input.name = key;
					input.value = value;
					form.appendChild(input);
				});

				document.body.appendChild(form);

				// Add a small delay to show processing state
				setTimeout(() => {
					form.submit();
				}, 1500);
			}
		} catch (error) {
			console.error("Payment error:", error);
			setIsProcessing(false);
			alert("An error occurred while processing your payment. Please try again.");
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						Loading your cart...
					</h2>
					<p className="text-gray-500">
						Please wait while we prepare your checkout experience
					</p>
				</div>
			</div>
		);
	}

	if (!cart || cart.items.length === 0) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
				<div className="text-center max-w-md mx-auto p-8">
					<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<span className="text-4xl">🛒</span>
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
					<p className="text-gray-600 mb-6">
						Looks like you haven&apos;t added any items to your cart yet. Start shopping
						to see your items here!
					</p>
					<Link
						href="/"
						className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
						Start Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Enhanced Header */}
			<header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Link
								href="/"
								className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
								<ChevronLeftIcon className="h-4 w-4 mr-1" />
								Back to shopping
							</Link>
							<div className="hidden sm:block w-px h-6 bg-gray-300"></div>
							<h1 className="text-xl font-bold text-gray-900">Secure Checkout</h1>
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<ShieldCheckIcon className="h-4 w-4" />
							<span className="hidden sm:inline">SSL Secured</span>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Progress Indicator */}
				<div className="mb-8">
					<div className="flex items-center justify-center space-x-4 mb-6">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
								1
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">
								Review Items
							</span>
						</div>
						<div className="w-16 h-0.5 bg-blue-600"></div>
						<div className="flex items-center">
							<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
								2
							</div>
							<span className="ml-2 text-sm font-medium text-blue-600">Payment</span>
						</div>
						<div className="w-16 h-0.5 bg-gray-300"></div>
						<div className="flex items-center">
							<div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
								3
							</div>
							<span className="ml-2 text-sm font-medium text-gray-500">Complete</span>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						{/* Cart Summary */}
						<div className="animate-fadeIn">
							<CartSummary cart={cart} />
						</div>

						{/* Payment Methods */}
						<div className="animate-fadeIn animation-delay-200">
							<PaymentMethods
								paymentMethods={paymentMethods}
								selectedMethod={selectedPaymentMethod}
								onSelectMethod={handlePaymentMethodSelect}
							/>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="animate-fadeIn animation-delay-400">
							<OrderSummary
								cart={cart}
								selectedPaymentMethod={selectedPaymentMethod}
								onProceedToPayment={handleProceedToPayment}
								isProcessing={isProcessing}
							/>
						</div>
					</div>
				</div>

				{/* Trust Signals */}
				<div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
					<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<ShieldCheckIcon className="h-5 w-5 text-green-500" />
							<span>256-bit SSL Encryption</span>
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<span className="text-green-500">🔒</span>
							<span>PCI DSS Compliant</span>
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<span className="text-green-500">✓</span>
							<span>Money-back Guarantee</span>
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<span className="text-green-500">📞</span>
							<span>24/7 Support</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
