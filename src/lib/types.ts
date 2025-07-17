export enum iVariant {
	Primary = "primary",
	Secondary = "secondary",
	Tertiary = "tertiary",
	Quaternary = "quaternary",
	Quinary = "quinary",
}

export type iVariantType = keyof typeof iVariant;

export enum iSize {
	Small = "sm",
	Medium = "md",
	Large = "lg",
}

export enum iAuctionLabel {
	Hot = "hot",
	Sale = "sale",
	OpeningSoon = "openingSoon",
	Demo = "demo",
}

export type SizeType = keyof typeof iSize;

export interface iLockUpProps {
	id?: string;
	overline?: string;
	title: string;
	subtitle?: string;
	variant?: iVariant;
	size?: iSize;
	theme?: iTheme;
	centered?: boolean;
	bold?: boolean;
}

export enum iTheme {
	Light = "light",
	Dark = "dark",
}

export interface iTransaction {
	m_payment_id?: string;
	pf_payment_id: string;
	payment_status: "COMPLETE" | "CANCELLED";
	item_name: string;
	item_description?: string;
	amount_gross?: number;
	amount_fee?: number;
	amount_net?: number;
	custom_str1?: string;
	custom_str2?: string;
	custom_str3?: string;
	custom_str4?: string;
	custom_str5?: string;
	custom_int1?: number;
	custom_int2?: number;
	custom_int3?: number;
	custom_int4?: number;
	custom_int5?: number;
	name_first?: string;
	name_last?: string;
	email_address?: string;
	merchant_id: string;
	signature?: string;
	created_at?: string; // or Date, depending on your usage
}

export interface iFooter {
	subscribeTitle: string;
	subscribeDescription: string;
	privacyPolicyLink: string;
	links: { [group: string]: { href: string; label: string }[] };
	copyright: string;
}

export interface iBanner {
	title: string;
	content: string;
	size?: iSize;
	image?: { src: string; alt: string };
	actions?: { label: string; href: string }[];
}

export interface iListItem {
	title: string;
	href: string;
	children: React.ReactNode;
}

export interface iEmailService {
	id: number;
	name: string;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
}

export interface iEmail {
	id: number;
	from_email: string;
	to_email: string;
	subject: string;
	body: string;
	status: string;
	date_sent: string;
	sender_id: string;
	service_name: string;
	last_updated: string;
}

export enum iButtonType {
	Link = "link",
	Button = "button",
	Icon = "icon",
	Submit = "submit",
}

export enum iTarget {
	Blank = "_blank",
	Self = "_self",
	Parent = "_parent",
	Top = "_top",
	Empty = "",
}

export interface iButtonProps {
	hide?: boolean;
	variant?: iVariant;
	size?: iSize;
	iconEnd?: React.ReactNode;
	iconStart?: React.ReactNode;
	label?: string;
	className?: string;
	disabled?: boolean;
	centered?: boolean;
	isLoading?: boolean;
	key?: string | number;
	click?: () => void;
	type?: iButtonType;
	url?: {
		link: string;
		target?: iTarget;
	};
}

export type iCondition = "new" | "used";
export interface iAuctionItem {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string[]; // changed from string to string[]
	category: string;
	condition: iCondition;
	auction: iAuction;
	sold?: boolean; // Add this line
	created_at?: string;
	updated_at?: string;
}

export interface iAuction {
	id: string;
	name: string;
	description: string;
	start_time: string;
	duration: number;
	created_by: string;
	date_created: string;
	items_count: number;
	re_open_count: number;
	label?: iAuctionLabel;
}

export interface iBid {
	amount: number;
	userId: string;
	itemId: string;
	timestamp: string;
}

export type iBids = Record<string, iBid[]>;

export interface iSupabasePayload {
	eventType: "INSERT" | "UPDATE" | "DELETE";
	new: iBid;
	old: iBid | null;
}

export enum iOrderStatus {
	Unpaid = "UNPAID",
	Pending = "PENDING",
	Cancelled = "CANCELLED",
	Failed = "FAILED",
	Completed = "COMPLETED",
	Refunded = "REFUNDED",
	Expired = "EXPIRED",
	Processing = "PROCESSING",
}

export interface iOrder {
	id: number;
	order_id: string;
	user_id: string;
	item_id: string;
	item_name: string;
	payment_id: string;
	order_status: iOrderStatus;
	created_at: string;
	updated_at: string;
	price: number;
	user_email?: string;
	user_first_name?: string;
	user_last_name?: string;
	meta?: any;
	item?: iAuctionItem;
}

export interface iOrderApiResponse {
	orders: iOrder[];
	error?: string;
}

export interface iOrderWithDetails extends iOrder {
	item_details?: iAuctionItem;
	payment_info?: iTransaction;
}

export const typeBorder = {
	info: "border-l-4 border-blue-400",
	warning: "border-l-4 border-yellow-400",
	error: "border-l-4 border-red-400",
	success: "border-l-4 border-green-400",
	default: "border-l-4 border-gray-300",
};

export const typeBg = {
	info: "bg-blue-50 dark:bg-blue-900/30",
	warning: "bg-yellow-50 dark:bg-yellow-900/20",
	error: "bg-red-50 dark:bg-red-900/20",
	success: "bg-green-50 dark:bg-green-900/20",
	default: "bg-muted",
};

export interface iGroupedOrder {
	order_id: string;
	payment_id: string;
	user_id: string;
	user_name: string;
	user_email: string;
	created_at: string;
	items_count: number;
	total_amount: number;
	order_status: iOrderStatus;
	orders: iOrder[];
}

export interface iNotification {
	id: string;
	message: string;
	type: string;
	read: boolean;
	created_at?: string;
	user_id?: string;
}

export interface iCart {
	id: string;
	user_id: string;
	items: iAuctionItem[];
	total_amount: number;
	items_count: number;
	status: "OPEN" | "PAID" | "CLOSED";
	created_at: string;
	updated_at: string;
}

export interface iPaymentMethod {
	id: string;
	name: string;
	description: string;
	icon: string;
	enabled: boolean;
}
