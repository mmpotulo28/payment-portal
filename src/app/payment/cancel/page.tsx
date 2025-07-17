"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
	XCircleIcon,
	ExclamationTriangleIcon,
	ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { HomeIcon, CreditCardIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function PaymentCancel() {
	const [paymentId, setPaymentId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const searchParams = useSearchParams();

	useEffect(() => {
		const id = searchParams.get("payment_id") || searchParams.get("m_payment_id");
		setPaymentId(id);
		setIsLoading(false);
	}, [searchParams]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 flex items-center justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Cancel Animation */}
				<div className="text-center mb-8">
					<div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
						<XCircleIcon className="h-16 w-16 text-red-600" />
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Payment Cancelled
					</h1>
					<p className="text-xl text-gray-600 mb-2">Your payment was not processed</p>
					{paymentId && (
						<p className="text-sm text-gray-500">
							Reference:{" "}
							<span className="font-mono bg-gray-100 px-2 py-1 rounded">
								{paymentId}
							</span>
						</p>
					)}
				</div>

				{/* Information Card */}
				<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
					<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-red-50">
						<h2 className="text-lg font-semibold text-gray-900">What Happened?</h2>
						<p className="text-sm text-gray-600">
							Your payment was cancelled and no charges were made
						</p>
					</div>

					<div className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Reassurance */}
							<div>
								<h3 className="text-base font-medium text-gray-900 mb-3">
									Don&apos;t Worry!
								</h3>
								<div className="space-y-3 text-sm">
									<div className="flex items-start space-x-2">
										<ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-600">
											No charges were made to your account
										</span>
									</div>
									<div className="flex items-start space-x-2">
										<ShoppingCartIcon className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-600">
											Your cart items are still saved
										</span>
									</div>
									<div className="flex items-start space-x-2">
										<CreditCardIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-600">
											You can try payment again anytime
										</span>
									</div>
								</div>
							</div>

							{/* Common Reasons */}
							<div>
								<h3 className="text-base font-medium text-gray-900 mb-3">
									Common Reasons
								</h3>
								<div className="space-y-2 text-sm text-gray-600">
									<p>• Changed your mind during checkout</p>
									<p>• Browser back button was pressed</p>
									<p>• Payment window was closed</p>
									<p>• Network connection issues</p>
									<p>• Decided to use a different payment method</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="mt-8 pt-6 border-t border-gray-200">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<Link
									href="/payment"
									className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
									<CreditCardIcon className="h-5 w-5 mr-2" />
									Try Payment Again
								</Link>
								<Link
									href="/"
									className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
									<HomeIcon className="h-5 w-5 mr-2" />
									Continue Shopping
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Help Section */}
				<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
					<div className="text-center">
						<div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
							<ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
						</div>
						<h2 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h2>
						<p className="text-gray-600 mb-4">
							If you&apos;re experiencing payment issues or have questions, our
							support team is here to assist you.
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
							<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
								<div className="text-2xl mb-2">📧</div>
								<p className="font-medium text-gray-900">Email Support</p>
								<p className="text-gray-600">support@paymentportal.com</p>
							</div>
							<div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
								<div className="text-2xl mb-2">📞</div>
								<p className="font-medium text-gray-900">Phone Support</p>
								<p className="text-gray-600">+27 (0) 11 123 4567</p>
							</div>
							<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
								<div className="text-2xl mb-2">💬</div>
								<p className="font-medium text-gray-900">Live Chat</p>
								<p className="text-gray-600">Available 24/7</p>
							</div>
						</div>
					</div>
				</div>

				{/* Alternative Payment Methods */}
				<div className="mt-8 text-center">
					<div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
						<h3 className="text-lg font-semibold text-gray-900 mb-3">
							Try a Different Payment Method
						</h3>
						<p className="text-gray-600 mb-4">
							We support multiple payment options to make your checkout experience as
							smooth as possible.
						</p>
						<div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
							<div className="flex items-center space-x-1">
								<span className="text-xl">💳</span>
								<span>Credit Cards</span>
							</div>
							<div className="flex items-center space-x-1">
								<span className="text-xl">🏦</span>
								<span>EFT</span>
							</div>
							<div className="flex items-center space-x-1">
								<span className="text-xl">📱</span>
								<span>Mobile Money</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
