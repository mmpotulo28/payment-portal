import Image from "next/image";
import Link from "next/link";
import {
	ShoppingCartIcon,
	CreditCardIcon,
	ShieldCheckIcon,
	ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

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
								alt="Auction Market SA Payment Portal"
								width={120}
								height={25}
								priority
							/>
							<span className="ml-4 font-bold text-blue-700 text-lg hidden sm:inline">
								Auction Market SA
							</span>
						</div>
						<nav className="hidden md:flex items-center space-x-8">
							<Link
								href="https://auctionmarket.tech"
								target="_blank"
								className="text-gray-600 hover:text-blue-700 flex items-center">
								Main Site <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
							</Link>
							<a href="#features" className="text-gray-600 hover:text-gray-900">
								Features
							</a>
							<a href="#security" className="text-gray-600 hover:text-gray-900">
								Security
							</a>
							<a href="#support" className="text-gray-600 hover:text-gray-900">
								Support
							</a>
							<Link
								href="/payment"
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
								<ShoppingCartIcon className="h-4 w-4 mr-2" />
								Checkout
							</Link>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center">
					<h1 className="text-4xl sm:text-6xl font-bold text-blue-900 mb-6">
						Auction Market SA Payment Portal
					</h1>
					<p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
						Secure, fast, and intuitive checkout for South Africa's public online
						auction marketplace.
						<br />
						All payments for{" "}
						<Link
							href="https://auctionmarket.tech"
							target="_blank"
							className="text-blue-700 underline">
							auctionmarket.tech
						</Link>{" "}
						are processed here.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							href="/payment"
							className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
							<ShoppingCartIcon className="h-5 w-5 mr-2" />
							Proceed to Checkout
						</Link>
						<Link
							href="https://auctionmarket.tech"
							target="_blank"
							className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 transition-colors">
							Visit Auction Market SA{" "}
							<ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
						</Link>
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
								PayFast, credit cards, bank transfers, and more. All payments are
								processed securely for Auction Market SA.
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
								Lightning Fast Checkout
							</h3>
							<p className="text-gray-600 text-sm">
								Optimized payment flow for Auction Market SA to reduce cart
								abandonment and increase conversions.
							</p>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<section id="features" className="mt-24">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-blue-900 mb-4">
							Why Choose Auction Market SA Payment Portal?
						</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Built for South African online auctions. Secure, reliable, and easy to
							use.
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
										Your winning bids and items are automatically added to your
										cart for easy checkout.
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
										South Africa's trusted payment gateway for secure
										transactions.
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
								Sample Auction Cart
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

				{/* Security Section */}
				<section id="security" className="mt-24">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-blue-900 mb-4">Security & Trust</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Your payments are protected by industry-leading security standards.
						</p>
					</div>
					<div className="flex flex-col md:flex-row justify-center items-center gap-8">
						<div className="flex items-center gap-3 bg-white rounded-lg shadow p-4">
							<ShieldCheckIcon className="h-6 w-6 text-green-600" />
							<span className="font-semibold text-gray-900">
								256-bit SSL Encryption
							</span>
						</div>
						<div className="flex items-center gap-3 bg-white rounded-lg shadow p-4">
							<span className="text-green-600 text-xl">🔒</span>
							<span className="font-semibold text-gray-900">PCI DSS Compliant</span>
						</div>
						<div className="flex items-center gap-3 bg-white rounded-lg shadow p-4">
							<span className="text-green-600 text-xl">✓</span>
							<span className="font-semibold text-gray-900">
								Money-back Guarantee
							</span>
						</div>
						<div className="flex items-center gap-3 bg-white rounded-lg shadow p-4">
							<span className="text-green-600 text-xl">📞</span>
							<span className="font-semibold text-gray-900">24/7 Support</span>
						</div>
					</div>
				</section>

				{/* Support Section */}
				<section id="support" className="mt-24">
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold text-blue-900 mb-4">Need Help?</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Our support team is here for you. Reach out anytime!
						</p>
					</div>
					<div className="flex flex-col md:flex-row justify-center items-center gap-8">
						<div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
							<span className="font-semibold text-gray-900 mb-2">Email</span>
							<a
								href="mailto:support@auctionmarket.tech"
								className="text-blue-700 underline">
								support@auctionmarket.tech
							</a>
						</div>
						<div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
							<span className="font-semibold text-gray-900 mb-2">Phone</span>
							<a href="tel:+27796530453" className="text-blue-700 underline">
								+27 79 653 0453
							</a>
						</div>
						<div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
							<span className="font-semibold text-gray-900 mb-2">Main Site</span>
							<Link
								href="https://auctionmarket.tech"
								target="_blank"
								className="text-blue-700 underline">
								auctionmarket.tech
							</Link>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 mt-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center text-gray-600">
						<p>
							&copy; {new Date().getFullYear()} Auction Market SA Payment Portal.
							Powered by Next.js & Tailwind CSS.
							<br />
							For auctions, visit{" "}
							<Link
								href="https://auctionmarket.tech"
								target="_blank"
								className="text-blue-700 underline">
								auctionmarket.tech
							</Link>
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
