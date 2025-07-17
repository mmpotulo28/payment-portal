import { iCart } from "@/lib/types";
import { CreditCardIcon, ShieldCheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import styles from "./OrderSummary.module.css";

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
	isProcessing,
}: OrderSummaryProps) {
	const subtotal = cart.total_amount;
	const taxRate = 0.15; // 15% VAT
	const tax = subtotal * taxRate;
	const shipping = 0; // Free shipping
	const discount = 0; // No discount for now
	const total = subtotal + tax + shipping - discount;

	const canProceed = selectedPaymentMethod && !isProcessing;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.headerTitle}>Order Summary</h2>
				<p className={styles.headerDesc}>Review your purchase</p>
			</div>

			<div className={styles.body}>
				{/* Order Details */}
				<div className={styles.orderDetails}>
					<div className={styles.orderRow}>
						<span>Subtotal ({cart.items_count} items)</span>
						<span className={styles.orderRowValue}>R{subtotal.toFixed(2)}</span>
					</div>
					<div className={styles.orderRow}>
						<span>VAT (15%)</span>
						<span className={styles.orderRowValue}>R{tax.toFixed(2)}</span>
					</div>
					<div className={styles.orderRow}>
						<span>Shipping</span>
						<span style={{ color: "#1bb800", fontWeight: 500 }}>Free</span>
					</div>
					{discount > 0 && (
						<div className={styles.orderRow}>
							<span>Discount</span>
							<span style={{ color: "#1bb800", fontWeight: 500 }}>
								-R{discount.toFixed(2)}
							</span>
						</div>
					)}
					<div className={styles.orderTotal}>
						<span>Total</span>
						<span>R{total.toFixed(2)}</span>
					</div>
					<p className={styles.orderTotalVat}>VAT included in final price</p>
				</div>

				{/* Payment Button */}
				<div>
					<button
						onClick={onProceedToPayment}
						disabled={!canProceed}
						className={clsx(
							styles.paymentBtn,
							canProceed ? styles.paymentBtnEnabled : styles.paymentBtnDisabled,
						)}>
						{isProcessing ? (
							<>
								<div className={styles.paymentBtnSpinner}></div>
								Redirecting to PayFast...
							</>
						) : (
							<>
								<CreditCardIcon style={{ height: 20, width: 20, marginRight: 8 }} />
								Complete Payment - R{total.toFixed(2)}
							</>
						)}
					</button>
					{!selectedPaymentMethod && (
						<p className={styles.paymentBtnError}>
							Please select a payment method to continue
						</p>
					)}
				</div>

				{/* Security Badges */}
				<div className={styles.securityBadges}>
					<div className={clsx(styles.securityBadge, styles.securityBadgeGreen)}>
						<ShieldCheckIcon style={{ height: 16, width: 16 }} />
						<span>SSL Secured</span>
					</div>
					<div className={clsx(styles.securityBadge, styles.securityBadgeBlue)}>
						<span>🔒</span>
						<span>256-bit Encryption</span>
					</div>
					<div className={clsx(styles.securityBadge, styles.securityBadgeGreen)}>
						<CheckCircleIcon style={{ height: 16, width: 16 }} />
						<span>PCI Compliant</span>
					</div>
					<div className={clsx(styles.securityBadge, styles.securityBadgeGreen)}>
						<span>🛡️</span>
						<span>Fraud Protection</span>
					</div>
				</div>

				{/* Items Preview */}
				<div className={styles.itemsPreview}>
					<h3 className={styles.itemsPreviewTitle}>Items in this order</h3>
					<div className={styles.itemsPreviewList}>
						{cart.items.map((item) => (
							<div key={item.id} className={styles.itemsPreviewItem}>
								<div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
									<p className={styles.itemsPreviewItemName}>{item.title}</p>
									<p className={styles.itemsPreviewItemDesc}>
										Qty: {1} × R{item.price.toFixed(2)}
									</p>
								</div>
								<p className={styles.itemsPreviewItemName}>
									R{(item.price * 1).toFixed(2)}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Delivery Info */}
				<div className={styles.deliveryInfo}>
					<h3 className={styles.deliveryInfoTitle}>Delivery Information</h3>
					<div className={styles.deliveryInfoList}>
						<div className={clsx(styles.deliveryInfoItem, styles.deliveryInfoBlue)}>
							<ClockIcon style={{ height: 16, width: 16 }} />
							<span>Orders processed within 1-2 business days</span>
						</div>
						<div className={clsx(styles.deliveryInfoItem, styles.deliveryInfoGreen)}>
							<span>📧</span>
							<span>Email confirmation sent immediately</span>
						</div>
						<div className={clsx(styles.deliveryInfoItem, styles.deliveryInfoBlue)}>
							<span>🚚</span>
							<span>Free shipping on all orders</span>
						</div>
					</div>
				</div>

				{/* Support */}
				<div className={styles.support}>
					<div className={styles.supportBox}>
						<div className={styles.supportText}>
							<p className={styles.supportTitle}>Need help?</p>
							<p>Contact our support team at</p>
							<p className={styles.supportEmail}>support@paymentportal.com</p>
							<p className={styles.supportPhone}>📞 Available 24/7</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
