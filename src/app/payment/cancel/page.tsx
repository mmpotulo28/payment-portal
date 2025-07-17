"use client";

import { XCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function PaymentCancel() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="bg-white rounded-lg shadow-lg p-8 text-center">
					{/* Cancel Icon */}
					<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
						<XCircleIcon className="h-10 w-10 text-red-600" />
					</div>

					{/* Cancel Message */}
					<h1 className="text-2xl font-bold text-gray-900 mb-4">
						Payment Cancelled
					</h1>
					<p className="text-gray-600 mb-6">
						Your payment was cancelled. No charges were made to your account.
					</p>

					{/* Information */}
					<div className="bg-yellow-50 rounded-lg p-4 mb-6 text-left">
						<h3 className="text-sm font-medium text-yellow-900 mb-2">Your cart is still saved</h3>
						<p className="text-xs text-yellow-800">
							Don&apos;t worry! The items in your cart are still there. 
							You can complete your purchase whenever you&apos;re ready.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="space-y-3">
						<Link
							href="/payment"
							className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Try Payment Again
						</Link>
						<Link
							href="/"
							className="w-full inline-flex justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Continue Shopping
						</Link>
					</div>

					{/* Help */}
					<div className="mt-6 pt-6 border-t border-gray-200">
						<p className="text-xs text-gray-500">
							Need help with your payment? 
							<Link href="/contact" className="text-blue-600 hover:text-blue-500 ml-1">
								Contact our support team
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
