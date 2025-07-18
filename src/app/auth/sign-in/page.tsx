"use client";

import { SignIn } from "@clerk/nextjs";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
	return (
		<div className={styles.container}>
			{/* Animated background overlay */}
			<div className={styles.backgroundOverlay} />
			<div className={`${styles.responsiveContainer} animate-fadeIn`}>
				{/* Responsive flex for desktop */}
				<div className={styles.pageSigninFlex}>
					{/* Left Info/Trust Section */}
					<div className={styles.infoSection}>
						<h2
							style={{
								fontSize: "2.2rem",
								fontWeight: 800,
								color: "var(--card-foreground)",
								marginBottom: 18,
								letterSpacing: "-1px",
							}}>
							Welcome Back!
						</h2>
						<p
							style={{
								color: "var(--muted-foreground)",
								fontSize: "1.15rem",
								marginBottom: 28,
								lineHeight: 1.6,
							}}>
							Sign in to continue your seamless payment journey. Your data is
							protected and your experience is personalized.
						</p>
						<div style={{ marginBottom: 28, width: "100%" }}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									marginBottom: 10,
								}}>
								<span style={{ color: "#1976c5", fontSize: 22 }}>🔑</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									Quick & Secure Access
								</span>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									marginBottom: 10,
								}}>
								<span style={{ color: "#1bb8a6", fontSize: 22 }}>📦</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									View Order History Instantly
								</span>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									marginBottom: 10,
								}}>
								<span style={{ color: "#22c55e", fontSize: 22 }}>🔒</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									Bank-level Security
								</span>
							</div>
							<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
								<span style={{ color: "#b6cfff", fontSize: 22 }}>💬</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									24/7 Expert Support
								</span>
							</div>
						</div>
						<div
							style={{
								background:
									"linear-gradient(90deg, var(--muted) 0%, var(--secondary) 100%)",
								borderRadius: "1rem",
								padding: 18,
								marginTop: 18,
								width: "100%",
							}}>
							<h3
								style={{
									fontWeight: 600,
									color: "var(--card-foreground)",
									marginBottom: 6,
									fontSize: "1.1rem",
								}}>
								Benefits of signing in
							</h3>
							<ul
								style={{
									color: "var(--muted-foreground)",
									fontSize: "1rem",
									paddingLeft: 20,
									margin: 0,
									lineHeight: 1.7,
								}}>
								<li>✓ Access your saved payment methods</li>
								<li>✓ Track orders & get instant updates</li>
								<li>✓ Enjoy exclusive offers & discounts</li>
								<li>✓ Get priority support anytime</li>
							</ul>
						</div>
					</div>
					{/* Right Clerk Sign In Card */}
					<div
						className={styles.clerk}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minWidth: 280,
						}}>
						<SignIn
							appearance={{
								elements: {
									formButtonPrimary: {
										background:
											"linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
										color: "var(--primary-foreground)",
										borderRadius: "var(--radius)",
										fontWeight: 600,
										fontSize: "1rem",
										boxShadow: "0 2px 8px rgba(1,75,139,0.10)",
										transition: "box-shadow 0.2s",
									},
									card: {
										background: "var(--card)",
										borderRadius: "1rem",
										boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
										border: "1px solid var(--border)",
									},
									headerTitle: {
										color: "var(--card-foreground)",
										fontWeight: "bold",
										fontSize: "1.3rem",
									},
									headerSubtitle: {
										color: "var(--muted-foreground)",
										fontSize: "1rem",
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
