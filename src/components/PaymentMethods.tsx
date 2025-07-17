import { iPaymentMethod } from "@/lib/types";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import styles from "./PaymentMethods.module.css";

interface PaymentMethodsProps {
	paymentMethods: iPaymentMethod[];
	selectedMethod: string;
	onSelectMethod: (methodId: string) => void;
}

export default function PaymentMethods({
	paymentMethods,
	selectedMethod,
	onSelectMethod,
}: PaymentMethodsProps) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.headerTitle}>Payment Method</h2>
				<p className={styles.headerDesc}>
					Choose how you&apos;d like to pay for your order
				</p>
			</div>

			<div className={styles.methods}>
				<div className={styles.methodList}>
					{paymentMethods.map((method) => {
						const isSelected = selectedMethod === method.id && method.enabled;
						return (
							<div
								key={method.id}
								className={clsx(
									styles.method,
									method.enabled ? styles.methodEnabled : styles.methodDisabled,
									isSelected && styles.methodSelected,
								)}
								onClick={() => method.enabled && onSelectMethod(method.id)}>
								<div className={styles.methodContent}>
									{/* Payment Method Icon */}
									<div>
										<div
											className={clsx(
												styles.methodIcon,
												isSelected
													? styles.methodIconSelected
													: styles.methodIconUnselected,
											)}>
											{method.icon}
										</div>
									</div>

									{/* Payment Method Details */}
									<div className={styles.methodDetails}>
										<div style={{ display: "flex", alignItems: "center" }}>
											<h3 className={styles.methodName}>{method.name}</h3>
											{!method.enabled && (
												<span
													className={clsx(
														styles.methodBadge,
														styles.badgeComingSoon,
													)}>
													Coming Soon
												</span>
											)}
											{method.enabled && method.id === "payfast" && (
												<span
													className={clsx(
														styles.methodBadge,
														styles.badgeRecommended,
													)}>
													Recommended
												</span>
											)}
										</div>
										<p className={styles.methodDesc}>{method.description}</p>

										{/* Method-specific features */}
										{method.id === "payfast" && method.enabled && (
											<div className={styles.methodFeatures}>
												<div
													className={clsx(
														styles.feature,
														styles.featureGreen,
													)}>
													<CheckCircleIcon
														style={{ height: 12, width: 12 }}
													/>
													<span>Instant payment confirmation</span>
												</div>
												<div
													className={clsx(
														styles.feature,
														styles.featureGreen,
													)}>
													<CheckCircleIcon
														style={{ height: 12, width: 12 }}
													/>
													<span>
														South Africa&apos;s most trusted payment
														gateway
													</span>
												</div>
											</div>
										)}

										{method.id === "bank-transfer" && (
											<div
												className={clsx(
													styles.feature,
													styles.featureAmber,
												)}>
												<ExclamationTriangleIcon
													style={{ height: 12, width: 12 }}
												/>
												<span>Processing may take 1-3 business days</span>
											</div>
										)}

										{method.id === "crypto" && (
											<div
												className={clsx(
													styles.feature,
													styles.featureBlue,
												)}>
												<InformationCircleIcon
													style={{ height: 12, width: 12 }}
												/>
												<span>
													Bitcoin, Ethereum, and 50+ cryptocurrencies
													supported
												</span>
											</div>
										)}
									</div>

									{/* Selection Indicator */}
									{isSelected && (
										<div className={styles.selectionIndicator}>
											<CheckCircleIcon
												style={{
													height: 24,
													width: 24,
													color: "var(--primary)",
												}}
											/>
										</div>
									)}
								</div>

								{/* PayFast Additional Info */}
								{method.id === "payfast" && isSelected && (
									<div className={styles.payfastInfo}>
										<div className={styles.payfastInfoBox}>
											<div
												style={{
													display: "flex",
													alignItems: "flex-start",
													gap: 12,
												}}>
												<div>
													<CreditCardIcon
														style={{
															height: 20,
															width: 20,
															color: "var(--primary)",
														}}
													/>
												</div>
												<div
													style={{
														fontSize: 14,
														color: "var(--primary)",
													}}>
													<p style={{ fontWeight: 500, marginBottom: 8 }}>
														You&apos;ll be redirected to PayFast to
														complete your payment
													</p>
													<div className={styles.payfastInfoGrid}>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																gap: 4,
															}}>
															<span>💳</span>
															<span>Credit & Debit Cards</span>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																gap: 4,
															}}>
															<span>🏦</span>
															<span>EFT & Bank Transfer</span>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																gap: 4,
															}}>
															<span>📱</span>
															<span>Mobile Money</span>
														</div>
														<div
															style={{
																display: "flex",
																alignItems: "center",
																gap: 4,
															}}>
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
						);
					})}
				</div>

				{/* Security Notice */}
				<div className={styles.securityNotice}>
					<div className={styles.securityNoticeContent}>
						<div>
							<CheckCircleIcon
								style={{ height: 24, width: 24, color: "#1bb800", marginTop: 2 }}
							/>
						</div>
						<div className={styles.securityNoticeText}>
							<p className={clsx(styles.securityNoticeTitle, "mb-1")}>
								Your payment is secure
							</p>
							<p style={{ marginBottom: 8 }}>
								We use industry-standard encryption to protect your payment
								information. Your card details are never stored on our servers.
							</p>
							<div className={styles.securityNoticeFeatures}>
								<span style={{ display: "flex", alignItems: "center", gap: 4 }}>
									<span>🔒</span>
									<span>256-bit SSL</span>
								</span>
								<span style={{ display: "flex", alignItems: "center", gap: 4 }}>
									<span>🛡️</span>
									<span>PCI DSS Compliant</span>
								</span>
								<span style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
