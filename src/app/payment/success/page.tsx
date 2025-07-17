"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon, PrinterIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function PaymentSuccess() {
	const [paymentDetails, setPaymentDetails] = useState<{
		paymentId: string | null;
		amount: string | null;
		itemName: string | null;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSearchParams();

	useEffect(() => {
		// Extract payment details from URL parameters
		const details = {
			paymentId: searchParams.get("pf_payment_id") || searchParams.get("payment_id") || searchParams.get("m_payment_id"),
			amount: searchParams.get("amount_gross"),
			itemName: searchParams.get("item_name"),
		};
		setPaymentDetails(details);
		setIsLoading(false);
	}, [searchParams]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Success Animation */}
				<div className="text-center mb-8">
					<div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
						<CheckCircleIcon className="h-16 w-16 text-green-600" />
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Payment Successful!
					</h1>
					<p className="text-xl text-gray-600 mb-2">
						Thank you for your purchase
					</p>
					{paymentDetails?.paymentId && (
						<p className="text-sm text-gray-500">
							Payment ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{paymentDetails.paymentId}</span>
						</p>
					)}
				</div>

				{/* Order Details Card */}
				<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
					<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
						<h2 className="text-lg font-semibold text-gray-900">Order Confirmation</h2>
						<p className="text-sm text-gray-600">Your order has been processed successfully</p>
					</div>

					<div className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Order Summary */}
							<div>
								<h3 className="text-base font-medium text-gray-900 mb-3">Order Summary</h3>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600">Order Date:</span>
										<span className="text-gray-900">{new Date().toLocaleDateString()}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Payment Method:</span>
										<span className="text-gray-900">PayFast</span>
									</div>
									{paymentDetails?.amount && (
										<div className="flex justify-between">
											<span className="text-gray-600">Amount Paid:</span>
											<span className="text-gray-900 font-medium">R{paymentDetails.amount}</span>
										</div>
									)}
									{paymentDetails?.itemName && (
										<div className="flex justify-between">
											<span className="text-gray-600">Items:</span>
											<span className="text-gray-900">{paymentDetails.itemName}</span>
										</div>
									)}
									<div className="flex justify-between">
										<span className="text-gray-600">Status:</span>
										<span className="text-green-600 font-medium">Completed</span>
									</div>
								</div>
							</div>

							{/* Next Steps */}
							<div>
								<h3 className="text-base font-medium text-gray-900 mb-3">What&apos;s Next?</h3>
								<div className="space-y-3 text-sm">
									<div className="flex items-start space-x-2">
										<CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-600">Payment confirmation email sent</span>
									</div>
									<div className="flex items-start space-x-2">
										<CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-600">Order processing within 1-2 business days</span>
									</div>
									<div className="flex items-start space-x-2">
										<CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-600">Shipping notification will follow</span>
									</div>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="mt-8 pt-6 border-t border-gray-200">
							<div className="flex flex-col sm:flex-row gap-3">
								<button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
									<PrinterIcon className="h-4 w-4 mr-2" />
									Print Receipt
								</button>
								<button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
									<EnvelopeIcon className="h-4 w-4 mr-2" />
									Email Receipt
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Options */}
				<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Continue Shopping</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<Link
							href="/"
							className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							<HomeIcon className="h-5 w-5 mr-2" />
							Back to Home
						</Link>
						<Link
							href="/payment"
							className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
						>
							<ShoppingCartIcon className="h-5 w-5 mr-2" />
							Shop More Items
						</Link>
					</div>
				</div>

				{/* Support Information */}
				<div className="mt-8 text-center">
					<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
						<p className="text-gray-600 mb-3">
							If you have any questions about your order, our support team is here to help.
						</p>
						<div className="text-sm text-gray-600">
							<p>📧 support@paymentportal.com</p>
							<p>📞 +27 (0) 11 123 4567</p>
							<p>🕒 Available 24/7</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
