import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Payment | Auction Market SA",
	description: "Secure payment processing for Auction Market SA",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<ClerkProvider>{children}</ClerkProvider>
				<Script src="//code.tidio.co/ohxu3aax2hizek3hbmbg9m3ivxwffjts.js" async></Script>
			</body>
		</html>
	);
}
