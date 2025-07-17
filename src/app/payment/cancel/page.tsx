"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
	XCircleIcon,
	ExclamationTriangleIcon,
	ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { HomeIcon, CreditCardIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import styles from "./CancelPage.module.css";

export function PaymentCancelContent() {
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
			<div className={styles.centered + " " + styles.container}>
				<div className={styles.spinner}></div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{/* Cancel Animation */}
				<div className={styles.textCenter}>
					<div className={styles.cancelIcon}>
						<XCircleIcon
							style={{ height: 64, width: 64, color: "var(--destructive)" }}
						/>
					</div>
					<h1 className={styles.cancelTitle}>Payment Cancelled</h1>
					<p className={styles.cancelDesc}>Your payment was not processed</p>
					{paymentId && (
						<p className={styles.cancelRef}>
							Reference: <span className={styles.cancelRefCode}>{paymentId}</span>
						</p>
					)}
				</div>

				{/* Information Card */}
				<div className={styles.infoCard}>
					<div className={styles.infoHeader}>
						<h2 className={styles.infoTitle}>What Happened?</h2>
						<p className={styles.infoDesc}>
							Your payment was cancelled and no charges were made
						</p>
					</div>
					<div className={styles.infoBody}>
						<div className={styles.infoGrid}>
							{/* Reassurance */}
							<div>
								<h3 className={styles.reassureTitle}>Don&apos;t Worry!</h3>
								<div className={styles.reassureList}>
									<div className={styles.reassureItem}>
										<ExclamationTriangleIcon
											style={{ height: 16, width: 16, color: "#fbbf24" }}
										/>
										<span>No charges were made to your account</span>
									</div>
									<div className={styles.reassureItem}>
										<ShoppingCartIcon
											style={{
												height: 16,
												width: 16,
												color: "var(--primary)",
											}}
										/>
										<span>Your cart items are still saved</span>
									</div>
									<div className={styles.reassureItem}>
										<CreditCardIcon
											style={{ height: 16, width: 16, color: "#1bb800" }}
										/>
										<span>You can try payment again anytime</span>
									</div>
								</div>
							</div>
							{/* Common Reasons */}
							<div>
								<h3 className={styles.reasonsTitle}>Common Reasons</h3>
								<div className={styles.reasonsList}>
									<p>• Changed your mind during checkout</p>
									<p>• Browser back button was pressed</p>
									<p>• Payment window was closed</p>
									<p>• Network connection issues</p>
									<p>• Decided to use a different payment method</p>
								</div>
							</div>
						</div>
						{/* Action Buttons */}
						<div className={styles.actionSection}>
							<div className={styles.actionGrid}>
								<Link
									href="/payment"
									className={styles.actionBtn + " " + styles.actionBtnPrimary}>
									<CreditCardIcon
										style={{ height: 20, width: 20, marginRight: 8 }}
									/>
									Try Payment Again
								</Link>
								<Link
									href="/"
									className={styles.actionBtn + " " + styles.actionBtnSecondary}>
									<HomeIcon style={{ height: 20, width: 20, marginRight: 8 }} />
									Continue Shopping
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Help Section */}
				<div className={styles.helpSection}>
					<div className={styles.textCenter}>
						<div
							style={{
								margin: "0 auto 16px auto",
								width: 48,
								height: 48,
								background: "#e0eaff",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<ChatBubbleLeftRightIcon
								style={{ height: 24, width: 24, color: "var(--primary)" }}
							/>
						</div>
						<h2 className={styles.helpTitle}>Need Help?</h2>
						<p className={styles.helpDesc}>
							If you&apos;re experiencing payment issues or have questions, our
							support team is here to assist you.
						</p>
					</div>
					<div className={styles.helpGrid}>
						<div className={styles.helpCard}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>📧</div>
							<p className={styles.helpCardTitle}>Email Support</p>
							<p className={styles.helpCardDesc}>support@paymentportal.com</p>
						</div>
						<div
							className={styles.helpCard}
							style={{
								background:
									"linear-gradient(90deg, #d1f7c4 0%, var(--secondary) 100%)",
							}}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>📞</div>
							<p className={styles.helpCardTitle}>Phone Support</p>
							<p className={styles.helpCardDesc}>+27 (0) 11 123 4567</p>
						</div>
						<div
							className={styles.helpCard}
							style={{
								background: "linear-gradient(90deg, #f3e8ff 0%, #ffeaea 100%)",
							}}>
							<div style={{ fontSize: 24, marginBottom: 8 }}>💬</div>
							<p className={styles.helpCardTitle}>Live Chat</p>
							<p className={styles.helpCardDesc}>Available 24/7</p>
						</div>
					</div>
				</div>

				{/* Alternative Payment Methods */}
				<div className={styles.altSection}>
					<div className={styles.altCard}>
						<h3 className={styles.altTitle}>Try a Different Payment Method</h3>
						<p className={styles.altDesc}>
							We support multiple payment options to make your checkout experience as
							smooth as possible.
						</p>
						<div className={styles.altMethods}>
							<div className={styles.altMethod}>
								<span style={{ fontSize: 20 }}>💳</span>
								<span>Credit Cards</span>
							</div>
							<div className={styles.altMethod}>
								<span style={{ fontSize: 20 }}>🏦</span>
								<span>EFT</span>
							</div>
							<div className={styles.altMethod}>
								<span style={{ fontSize: 20 }}>📱</span>
								<span>Mobile Money</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function PaymentCancelPage() {
return (
<Suspense fallback="loading cancel content...">
<PaymentCancelContent/>
</Suspense>
)