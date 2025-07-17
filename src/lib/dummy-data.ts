import { iAuction, iAuctionItem, iBid, iCartItem, iCart, iPaymentMethod } from "./types";

export const DUMMY_AUCTIONS: iAuction[] = [
	{
		id: "1",
		name: "Mock Auction 1",
		start_time: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
		created_by: "admin",
		date_created: new Date().toISOString(),
		description: "This is a mock auction for testing purposes.",
		duration: 60,
		re_open_count: 0,
		items_count: 10,
	},
	{
		id: "2",
		name: "Mock Auction 2",
		start_time: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
		created_by: "admin",
		date_created: new Date().toISOString(),
		description: "This is another mock auction for testing purposes.",
		duration: 120,
		re_open_count: 0,
		items_count: 5,
	},
];

export const DUMMY_ITEMS: iAuctionItem[] = [
	{
		id: "item-1",
		title: "Vintage Watch",
		description: "A beautiful vintage watch.",
		image: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300"],
		price: 120,
		category: "Watches",
		condition: "used",
		auction: DUMMY_AUCTIONS[0],
	},
	{
		id: "item-2",
		title: "Antique Vase",
		description: "Rare antique vase from 19th century.",
		image: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300"],
		price: 80,
		category: "Antiques",
		condition: "used",
		auction: DUMMY_AUCTIONS[0],
	},
	{
		id: "item-3",
		title: "Rare Coin",
		description: "A rare collectible coin.",
		image: ["https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300"],
		price: 50,
		category: "Collectibles",
		condition: "new",
		auction: DUMMY_AUCTIONS[1],
	},
];

export const DUMMY_CART_ITEMS: iCartItem[] = [
	{
		id: "cart-1",
		item_id: "item-1",
		item_name: "Vintage Watch",
		item_description: "A beautiful vintage watch from the 1950s",
		price: 120,
		quantity: 1,
		image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300",
		user_id: "user-123",
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: "cart-2",
		item_id: "item-2",
		item_name: "Antique Vase",
		item_description: "Rare antique vase from 19th century",
		price: 80,
		quantity: 2,
		image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
		user_id: "user-123",
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: "cart-3",
		item_id: "item-3",
		item_name: "Rare Coin",
		item_description: "A rare collectible coin from the Roman era",
		price: 50,
		quantity: 1,
		image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300",
		user_id: "user-123",
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

export const DUMMY_CART: iCart = {
	id: "cart-user-123",
	user_id: "user-123",
	items: DUMMY_CART_ITEMS,
	total_amount: DUMMY_CART_ITEMS.reduce((total, item) => total + item.price * item.quantity, 0),
	items_count: DUMMY_CART_ITEMS.reduce((count, item) => count + item.quantity, 0),
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export const DUMMY_PAYMENT_METHODS: iPaymentMethod[] = [
	{
		id: "payfast",
		name: "PayFast",
		description: "Pay securely with PayFast - Credit Cards, EFT, and more",
		icon: "💳",
		enabled: true,
	},
	{
		id: "bank-transfer",
		name: "Bank Transfer",
		description: "Direct bank transfer (Manual verification required)",
		icon: "🏦",
		enabled: false,
	},
	{
		id: "crypto",
		name: "Cryptocurrency",
		description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
		icon: "₿",
		enabled: false,
	},
];

export const DUMMY_BIDS: iBid[] = [
	{
		itemId: "item-1",
		amount: 120,
		userId: "user_1",
		timestamp: new Date().toISOString(),
	},
	{
		itemId: "item-2",
		amount: 85,
		userId: "user_2",
		timestamp: new Date().toISOString(),
	},
	{
		itemId: "item-3",
		amount: 55,
		userId: "user_1",
		timestamp: new Date().toISOString(),
	},
];

export const DUMMY_NOTIFICATIONS = [
	{
		id: "1",
		message: "Your order #1234 has been shipped.",
		type: "success",
		read: false,
		created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
	},
	{
		id: "2",
		message: "Payment for order #1233 failed.",
		type: "error",
		read: false,
		created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
	},
	{
		id: "3",
		message: "Welcome to Auction Market SA!",
		type: "info",
		read: true,
		created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "4",
		message: "Your bid was outbid on item #567.",
		type: "warning",
		read: true,
		created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
	},
];
