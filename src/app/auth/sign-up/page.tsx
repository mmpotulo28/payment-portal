"use client";

import { SignUp } from "@clerk/nextjs";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
	return (
		<div
			className={styles.container}
			style={{
				minHeight: "100vh",
				position: "relative",
				overflow: "hidden",
				background: "linear-gradient(120deg, var(--muted) 0%, var(--secondary) 100%)",
			}}>
			{/* Animated background overlay */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 0,
					pointerEvents: "none",
					background:
						"radial-gradient(circle at 20% 40%, #eaf3fb 0%, transparent 60%), radial-gradient(circle at 80% 70%, #b6cfff 0%, transparent 60%)",
					opacity: 0.7,
					animation: "fadeIn 1.2s ease",
				}}
			/>
			<div
				style={{
					position: "relative",
					zIndex: 1,
					display: "grid",
					gridTemplateColumns: "1fr",
					gap: 32,
					width: "100%",
					maxWidth: 1100,
					margin: "0 auto",
					padding: "64px 16px",
				}}
				className="animate-fadeIn">
				{/* Responsive grid for desktop */}
				<style>
					{`
						@media (min-width: 900px) {
							.page-signup-grid {
								grid-template-columns: 1fr 1fr;
								gap: 48px;
							}
						}
					`}
				</style>
				<div className="page-signup-grid" style={{ display: "grid", gap: 32 }}>
					{/* Left Info/Trust Section */}
					<div
						style={{
							flex: 1,
							minWidth: 280,
							maxWidth: 420,
							background: "var(--card)",
							borderRadius: "1.5rem",
							boxShadow: "0 4px 24px rgba(0,75,139,0.08)",
							border: "1px solid var(--border)",
							padding: 40,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							animation: "fadeIn 1.2s cubic-bezier(.4,0,.2,1)",
						}}>
						<h2
							style={{
								fontSize: "2.2rem",
								fontWeight: 800,
								color: "var(--card-foreground)",
								marginBottom: 18,
								letterSpacing: "-1px",
							}}>
							Create Your Account
						</h2>
						<p
							style={{
								color: "var(--muted-foreground)",
								fontSize: "1.15rem",
								marginBottom: 28,
								lineHeight: 1.6,
							}}>
							Unlock a personalized payment experience. Fast, secure, and tailored
							just for you.
						</p>
						<div style={{ marginBottom: 28, width: "100%" }}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									marginBottom: 10,
								}}>
								<span style={{ color: "#1976c5", fontSize: 22 }}>🧑‍💻</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									Easy Account Management
								</span>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									marginBottom: 10,
								}}>
								<span style={{ color: "#1bb8a6", fontSize: 22 }}>⚡</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									Lightning-fast Checkout
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
								<span style={{ color: "#b6cfff", fontSize: 22 }}>🎁</span>
								<span style={{ color: "var(--muted-foreground)", fontWeight: 600 }}>
									Exclusive Member Rewards
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
								Why join us?
							</h3>
							<ul
								style={{
									color: "var(--muted-foreground)",
									fontSize: "1rem",
									paddingLeft: 20,
									margin: 0,
									lineHeight: 1.7,
								}}>
								<li>✓ Save your payment methods securely</li>
								<li>✓ Track orders & get instant updates</li>
								<li>✓ Access 24/7 expert support</li>
								<li>✓ Enjoy exclusive offers & discounts</li>
							</ul>
						</div>
					</div>
					{/* Right Clerk Sign Up Card */}
					<div
						className={styles.clerk}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minWidth: 280,
						}}>
						<SignUp
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
