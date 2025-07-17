import { iCart } from "@/lib/types";
import { CreditCardIcon, ShieldCheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface OrderSummaryProps {
	cart: iCart;
	selectedPaymentMethod: string;
	onProceedToPayment: () => void;
	isProcessing: boolean;
}

export default function OrderSummary({ 
	cart, 
	selectedPaymentMethod, 
	onProceedToPayment, 
	isProcessing 
}: OrderSummaryProps) {
	const subtotal = cart.total_amount;
	const taxRate = 0.15; // 15% VAT
	const tax = subtotal * taxRate;
	const shipping = 0; // Free shipping
	const discount = 0; // No discount for now
	const total = subtotal + tax + shipping - discount;

	const canProceed = selectedPaymentMethod && !isProcessing;

	return (
		<div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-4 overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
				<h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
				<p className="text-sm text-gray-600">Review your purchase</p>
			</div>

			<div className="p-6">
				{/* Order Details */}
				<div className="space-y-3 mb-6">
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Subtotal ({cart.items_count} items)</span>
						<span className="text-gray-900 font-medium">R{subtotal.toFixed(2)}</span>
					</div>
					
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">VAT (15%)</span>
						<span className="text-gray-900 font-medium">R{tax.toFixed(2)}</span>
					</div>
					
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Shipping</span>
						<span className="text-green-600 font-medium">Free</span>
					</div>

					{discount > 0 && (
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Discount</span>
							<span className="text-green-600 font-medium">-R{discount.toFixed(2)}</span>
						</div>
					)}
					
					<div className="border-t border-gray-200 pt-3">
						<div className="flex justify-between text-lg font-semibold">
							<span className="text-gray-900">Total</span>
							<span className="text-gray-900">R{total.toFixed(2)}</span>
						</div>
						<p className="text-xs text-gray-500 mt-1">VAT included in final price</p>
					</div>
				</div>

				{/* Payment Button */}
				<div className="mb-6">
					<button
						onClick={onProceedToPayment}
						disabled={!canProceed}
						className={clsx(
							"w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl transition-all duration-200 transform",
							canProceed
								? "text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
								: "text-gray-400 bg-gray-200 cursor-not-allowed"
						)}
					>
						{isProcessing ? (
							<>
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
								Redirecting to PayFast...
							</>
						) : (
							<>
								<CreditCardIcon className="h-5 w-5 mr-2" />
								Complete Payment - R{total.toFixed(2)}
							</>
						)}
					</button>

					{!selectedPaymentMethod && (
						<p className="text-xs text-red-600 mt-2 text-center">
							Please select a payment method to continue
						</p>
					)}
				</div>

				{/* Security Badges */}
				<div className="mb-6 pt-6 border-t border-gray-200">
					<div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
						<div className="flex items-center space-x-2">
							<ShieldCheckIcon className="h-4 w-4 text-green-500" />
							<span>SSL Secured</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-green-500">🔒</span>
							<span>256-bit Encryption</span>
						</div>
						<div className="flex items-center space-x-2">
							<CheckCircleIcon className="h-4 w-4 text-green-500" />
							<span>PCI Compliant</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-green-500">�️</span>
							<span>Fraud Protection</span>
						</div>
					</div>
				</div>

				{/* Items Preview */}
				<div className="mb-6 pt-6 border-t border-gray-200">
					<h3 className="text-sm font-medium text-gray-900 mb-3">Items in this order</h3>
					<div className="space-y-3 max-h-32 overflow-y-auto">
						{cart.items.map((item) => (
							<div key={item.id} className="flex justify-between items-start text-xs">
								<div className="flex-1 min-w-0 pr-3">
									<p className="text-gray-900 truncate font-medium">{item.item_name}</p>
									<p className="text-gray-500">Qty: {item.quantity} × R{item.price.toFixed(2)}</p>
								</div>
								<p className="text-gray-900 font-medium">
									R{(item.price * item.quantity).toFixed(2)}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Delivery Info */}
				<div className="mb-6 pt-6 border-t border-gray-200">
					<h3 className="text-sm font-medium text-gray-900 mb-3">Delivery Information</h3>
					<div className="space-y-2 text-xs text-gray-600">
						<div className="flex items-center space-x-2">
							<ClockIcon className="h-4 w-4 text-blue-500" />
							<span>Orders processed within 1-2 business days</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-green-500">📧</span>
							<span>Email confirmation sent immediately</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-blue-500">🚚</span>
							<span>Free shipping on all orders</span>
						</div>
					</div>
				</div>

				{/* Support */}
				<div className="pt-6 border-t border-gray-200">
					<div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3">
						<div className="text-xs text-gray-600 text-center">
							<p className="font-medium text-gray-900 mb-1">Need help?</p>
							<p>Contact our support team at</p>
							<p className="text-blue-600 font-medium">support@paymentportal.com</p>
							<p className="mt-1">📞 Available 24/7</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
