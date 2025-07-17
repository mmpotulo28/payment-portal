import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, CreditCardIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Home() {
	return (
		<div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Header */}
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Image
								className="dark:invert"
								src="/next.svg"
								alt="Payment Portal"
								width={120}
								height={25}
								priority
							/>
						</div>
						<nav className="hidden md:flex items-center space-x-8">
							<a href="#features" className="text-gray-600 hover:text-gray-900">
								Features
							</a>
							<a href="#security" className="text-gray-600 hover:text-gray-900">
								Security
							</a>
							<a href="#pricing" className="text-gray-600 hover:text-gray-900">
								Pricing
							</a>
							<Link
								href="/payment"
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
								<ShoppingCartIcon className="h-4 w-4 mr-2" />
								View Cart
							</Link>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
						Modern Payment Portal
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Experience seamless, secure, and intuitive payment processing with our
						modern checkout system.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							href="/payment"
							className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
							<ShoppingCartIcon className="h-5 w-5 mr-2" />
							Try Demo Checkout
						</Link>
						<a
							href="#features"
							className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
							Learn More
						</a>
					</div>

					{/* Preview Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
								<CreditCardIcon className="h-6 w-6 text-blue-600" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Multiple Payment Methods
							</h3>
							<p className="text-gray-600 text-sm">
								Support for PayFast, credit cards, bank transfers, and more payment
								options.
							</p>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
								<ShieldCheckIcon className="h-6 w-6 text-green-600" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Bank-Level Security
							</h3>
							<p className="text-gray-600 text-sm">
								256-bit SSL encryption and PCI DSS compliance ensure your data is
								always protected.
							</p>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
								<span className="text-purple-600 text-xl">⚡</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Lightning Fast
							</h3>
							<p className="text-gray-600 text-sm">
								Optimized checkout flow that reduces cart abandonment and increases
								conversions.
							</p>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<section id="features" className="mt-24">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Why Choose Our Payment Portal?
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Built with modern web technologies and best practices for optimal user
							experience.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
									<span className="text-blue-600 font-bold">1</span>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										Smart Cart Management
									</h3>
									<p className="text-gray-600">
										Intelligent cart system that saves user preferences and
										maintains session state.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
									<span className="text-blue-600 font-bold">2</span>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										PayFast Integration
									</h3>
									<p className="text-gray-600">
										Seamless integration with PayFast for secure South African
										payment processing.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
									<span className="text-blue-600 font-bold">3</span>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										Real-time Updates
									</h3>
									<p className="text-gray-600">
										Instant payment confirmations and order status updates via
										webhooks.
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-lg p-8">
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								Sample Cart Items
							</h3>
							<div className="space-y-4">
								<div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
									<div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
									<div className="flex-1">
										<p className="font-medium text-gray-900">Vintage Watch</p>
										<p className="text-sm text-gray-600">R120.00</p>
									</div>
									<span className="text-sm text-gray-500">×1</span>
								</div>

								<div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
									<div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
									<div className="flex-1">
										<p className="font-medium text-gray-900">Antique Vase</p>
										<p className="text-sm text-gray-600">R80.00</p>
									</div>
									<span className="text-sm text-gray-500">×2</span>
								</div>
							</div>

							<div className="border-t border-gray-200 mt-4 pt-4">
								<div className="flex justify-between items-center">
									<span className="font-semibold text-gray-900">
										Total: R280.00
									</span>
									<Link
										href="/payment"
										className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
										Checkout
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 mt-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center text-gray-600">
						<p>&copy; 2025 Payment Portal. Built with Next.js and Tailwind CSS.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
