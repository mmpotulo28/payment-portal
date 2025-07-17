"use client";

import { useState, useEffect } from "react";
import { useUser, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import styles from "./PaymentPage.module.css";
import { DUMMY_PAYMENT_METHODS } from "@/lib/dummy-data";
import { iCart, iPaymentMethod } from "@/lib/types";
import CartSummary from "@/components/CartSummary";
import PaymentMethods from "@/components/PaymentMethods";
import OrderSummary from "@/components/OrderSummary";
import { ChevronLeftIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";

export default function PaymentPage() {
	const { isSignedIn, isLoaded } = useUser();
	const [cart, setCart] = useState<iCart | null>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [paymentMethods] = useState<iPaymentMethod[]>(DUMMY_PAYMENT_METHODS);
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		// Fetch cart from API using axios
		const fetchCart = async () => {
			try {
				const res = await axios.get("/api/cart");
				setCart(res.data.cart);
			} catch (err) {
				setCart(null);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCart();
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
					item_name: `AMSA Order for ${cart.items_count} items`,
					item_description: cart.items
						.map((item) => `${item.title} (x${item.id})`)
						.join(", "),
					return_url: `${window?.location?.origin}/payment/success?payment_id=${paymentId}`,
					cancel_url: `${window?.location?.origin}/payment/cancel?payment_id=${paymentId}`,
					notify_url: `${window?.location?.origin}/api/payfast/notify`,
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

	if (!isLoaded) {
		return null;
	}
	if (!isSignedIn) {
		return <RedirectToSignIn />;
	}

	if (isLoading) {
		return (
			<div
				className={styles.container}
				style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							animation: "spin 1s linear infinite",
							borderRadius: "9999px",
							height: 64,
							width: 64,
							borderBottom: "4px solid #2563eb",
							margin: "0 auto 16px auto",
						}}></div>
					<h2
						style={{
							fontSize: 20,
							fontWeight: 600,
							color: "#374151",
							marginBottom: 8,
						}}>
						Loading your cart...
					</h2>
					<p style={{ color: "#6b7280" }}>
						Please wait while we prepare your checkout experience
					</p>
				</div>
			</div>
		);
	}

	if (!cart || cart.items.length === 0) {
		return (
			<div
				className={styles.container}
				style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<div style={{ textAlign: "center", maxWidth: 400, margin: "0 auto", padding: 32 }}>
					<div
						style={{
							width: 96,
							height: 96,
							background: "#f3f4f6",
							borderRadius: "9999px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							margin: "0 auto 24px auto",
						}}>
						<span style={{ fontSize: 32 }}>🛒</span>
					</div>
					<h2
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: "#111827",
							marginBottom: 16,
						}}>
						Your cart is empty
					</h2>
					<p style={{ color: "#4b5563", marginBottom: 24 }}>
						Looks like you haven&apos;t added any items to your cart yet. Start shopping
						to see your items here!
					</p>
					<Link
						href="/"
						style={{
							display: "inline-flex",
							alignItems: "center",
							padding: "12px 24px",
							border: "none",
							fontSize: 16,
							fontWeight: 500,
							borderRadius: 12,
							color: "#fff",
							background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
							boxShadow: "0 2px 8px rgba(99,102,241,0.15)",
							textDecoration: "none",
							transition: "background 0.2s",
						}}>
						Start Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{/* Enhanced Header */}
			<header className={styles.header}>
				<div className={styles.headerInner}>
					<div className={styles.headerLeft}>
						<Link href="/" className={styles.headerBack}>
							<ChevronLeftIcon style={{ height: 16, width: 16, marginRight: 4 }} />
							Back to shopping
						</Link>
						<div className={styles.headerDivider}></div>
						<h1 className={styles.headerTitle}>Secure Checkout</h1>
					</div>
					<div className={styles.headerRight}>
						<ShieldCheckIcon style={{ height: 16, width: 16 }} />
						<span style={{ display: "none" }}>SSL Secured</span>
						{/* Clerk UserButton added to top right */}
						<div style={{ marginLeft: 26 }}>
							<UserButton
								appearance={{
									elements: {
										avatarBox: {
											boxShadow: "0 2px 8px rgba(1,75,139,0.10)",
											borderRadius: "9999px",
											background: "var(--card)",
											transition: "box-shadow 0.2s",
											minWidth: 40,
											minHeight: 40,
										},
										userButtonPopoverCard: {
											background: "var(--card)",
											borderRadius: "1rem",
											boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
											border: "1px solid var(--border)",
											color: "var(--card-foreground)",
										},
										userButtonPopoverActionButton: {
											background: "var(--primary)",
											color: "var(--primary-foreground)",
											fontWeight: 600,
											transition: "box-shadow 0.2s",
											textWrap: "nowrap",
										},
									},
								}}
							/>
						</div>
					</div>
				</div>
			</header>

			<div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 16px" }}>
				{/* Progress Indicator */}
				<div className={styles.progress}>
					<div className={styles.progressInner}>
						<div className={styles.progressStep}>
							<div
								className={`${styles.progressCircle} ${styles.progressCircleActive}`}>
								1
							</div>
							<span className={styles.progressLabelActive}>Review Items</span>
						</div>
						<div className={styles.progressBarActive}></div>
						<div className={styles.progressStep}>
							<div
								className={`${styles.progressCircle} ${styles.progressCircleActive}`}>
								2
							</div>
							<span className={styles.progressLabelActive}>Payment</span>
						</div>
						<div className={styles.progressBarInactive}></div>
						<div className={styles.progressStep}>
							<div
								className={`${styles.progressCircle} ${styles.progressCircleInactive}`}>
								3
							</div>
							<span className={styles.progressLabelInactive}>Complete</span>
						</div>
					</div>
				</div>

				<div className={styles.grid}>
					{/* Main Content */}
					<div className={styles.mainContent}>
						{/* Cart Summary */}
						<div>
							<CartSummary cart={cart} />
						</div>

						{/* Payment Methods */}
						<div>
							<PaymentMethods
								paymentMethods={paymentMethods}
								selectedMethod={selectedPaymentMethod}
								onSelectMethod={handlePaymentMethodSelect}
							/>
						</div>
					</div>

					{/* Sidebar */}
					<div className={styles.sidebar}>
						<div>
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
				<div className={styles.trustSignals}>
					<div className={styles.trustSignalsInner}>
						<div className={styles.trustSignal}>
							<ShieldCheckIcon style={{ height: 20, width: 20, color: "#22c55e" }} />
							<span>256-bit SSL Encryption</span>
						</div>
						<div className={styles.trustSignal}>
							<span style={{ color: "#22c55e" }}>🔒</span>
							<span>PCI DSS Compliant</span>
						</div>
						<div className={styles.trustSignal}>
							<span style={{ color: "#22c55e" }}>✓</span>
							<span>Money-back Guarantee</span>
						</div>
						<div className={styles.trustSignal}>
							<span style={{ color: "#22c55e" }}>📞</span>
							<span>24/7 Support</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
