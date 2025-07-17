import { iPaymentMethod } from "@/lib/types";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface PaymentMethodsProps {
	paymentMethods: iPaymentMethod[];
	selectedMethod: string;
	onSelectMethod: (methodId: string) => void;
}

export default function PaymentMethods({ 
	paymentMethods, 
	selectedMethod, 
	onSelectMethod 
}: PaymentMethodsProps) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200">
			<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
				<h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
				<p className="text-sm text-gray-600">Choose how you&apos;d like to pay for your order</p>
			</div>

			<div className="p-6">
				<div className="space-y-4">
					{paymentMethods.map((method) => (
						<div
							key={method.id}
							className={clsx(
								"relative rounded-xl border p-4 cursor-pointer transition-all duration-300 transform",
								method.enabled 
									? "hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5" 
									: "opacity-50 cursor-not-allowed",
								selectedMethod === method.id && method.enabled
									? "border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-md"
									: "border-gray-200"
							)}
							onClick={() => method.enabled && onSelectMethod(method.id)}
						>
							<div className="flex items-start space-x-4">
								{/* Payment Method Icon */}
								<div className="flex-shrink-0">
									<div className={clsx(
										"w-12 h-12 rounded-xl border flex items-center justify-center text-2xl transition-all duration-200",
										selectedMethod === method.id && method.enabled
											? "border-blue-300 bg-blue-100"
											: "border-gray-200 bg-white"
									)}>
										{method.icon}
									</div>
								</div>

								{/* Payment Method Details */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center space-x-2">
										<h3 className="text-base font-medium text-gray-900">
											{method.name}
										</h3>
										{!method.enabled && (
											<span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
												Coming Soon
											</span>
										)}
										{method.enabled && method.id === "payfast" && (
											<span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
												Recommended
											</span>
										)}
									</div>
									<p className="text-sm text-gray-600 mt-1">
										{method.description}
									</p>

									{/* Method-specific features */}
									{method.id === "payfast" && method.enabled && (
										<div className="mt-2 space-y-1">
											<div className="flex items-center space-x-1 text-xs text-green-600">
												<CheckCircleIcon className="h-3 w-3" />
												<span>Instant payment confirmation</span>
											</div>
											<div className="flex items-center space-x-1 text-xs text-green-600">
												<CheckCircleIcon className="h-3 w-3" />
												<span>South Africa&apos;s most trusted payment gateway</span>
											</div>
										</div>
									)}

									{method.id === "bank-transfer" && (
										<div className="mt-2 flex items-center space-x-1 text-xs text-amber-600">
											<ExclamationTriangleIcon className="h-3 w-3" />
											<span>Processing may take 1-3 business days</span>
										</div>
									)}

									{method.id === "crypto" && (
										<div className="mt-2 flex items-center space-x-1 text-xs text-blue-600">
											<InformationCircleIcon className="h-3 w-3" />
											<span>Bitcoin, Ethereum, and 50+ cryptocurrencies supported</span>
										</div>
									)}
								</div>

								{/* Selection Indicator */}
								{selectedMethod === method.id && method.enabled && (
									<div className="flex-shrink-0">
										<CheckCircleIcon className="h-6 w-6 text-blue-600" />
									</div>
								)}
							</div>

							{/* PayFast Additional Info */}
							{method.id === "payfast" && selectedMethod === method.id && method.enabled && (
								<div className="mt-4 pt-4 border-t border-blue-200">
									<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
										<div className="flex items-start space-x-3">
											<div className="flex-shrink-0">
												<CreditCardIcon className="h-5 w-5 text-blue-600" />
											</div>
											<div className="text-sm text-blue-800">
												<p className="font-medium mb-2">You&apos;ll be redirected to PayFast to complete your payment</p>
												<div className="grid grid-cols-2 gap-2 text-xs">
													<div className="flex items-center space-x-1">
														<span>💳</span>
														<span>Credit & Debit Cards</span>
													</div>
													<div className="flex items-center space-x-1">
														<span>🏦</span>
														<span>EFT & Bank Transfer</span>
													</div>
													<div className="flex items-center space-x-1">
														<span>📱</span>
														<span>Mobile Money</span>
													</div>
													<div className="flex items-center space-x-1">
														<span>🔐</span>
														<span>Secure & Encrypted</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Security Notice */}
				<div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
					<div className="flex items-start space-x-3">
						<div className="flex-shrink-0">
							<CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5" />
						</div>
						<div className="text-sm text-gray-700">
							<p className="font-medium text-gray-900 mb-1">Your payment is secure</p>
							<p className="mb-2">
								We use industry-standard encryption to protect your payment information. 
								Your card details are never stored on our servers.
							</p>
							<div className="flex items-center space-x-4 text-xs text-gray-600">
								<span className="flex items-center space-x-1">
									<span>🔒</span>
									<span>256-bit SSL</span>
								</span>
								<span className="flex items-center space-x-1">
									<span>🛡️</span>
									<span>PCI DSS Compliant</span>
								</span>
								<span className="flex items-center space-x-1">
									<span>✅</span>
									<span>3D Secure</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
