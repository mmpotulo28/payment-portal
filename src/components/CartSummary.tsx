import { iCart } from "@/lib/types";
import { TrashIcon, PlusIcon, MinusIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

interface CartSummaryProps {
	cart: iCart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
	const [quantities, setQuantities] = useState<Record<string, number>>(
		cart.items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
	);
	const [favorites, setFavorites] = useState<Record<string, boolean>>({});

	const updateQuantity = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) return;
		setQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
		// TODO: Update cart in backend/state management
		console.log(`Update item ${itemId} to quantity ${newQuantity}`);
	};

	const removeItem = (itemId: string) => {
		// TODO: Implement item removal logic
		console.log(`Remove item ${itemId}`);
	};

	const toggleFavorite = (itemId: string) => {
		setFavorites(prev => ({ ...prev, [itemId]: !prev[itemId] }));
	};

	const calculateItemTotal = (itemId: string, price: number) => {
		return price * (quantities[itemId] || 1);
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-lg font-semibold text-gray-900">Your Items</h2>
						<p className="text-sm text-gray-600">{cart.items_count} items in your cart</p>
					</div>
					<div className="text-right">
						<p className="text-sm text-gray-500">Subtotal</p>
						<p className="text-lg font-bold text-gray-900">R{cart.total_amount.toFixed(2)}</p>
					</div>
				</div>
			</div>

			<div className="divide-y divide-gray-200">
				{cart.items.map((item, index) => {
					const itemQuantity = quantities[item.id] || item.quantity;
					const itemTotal = calculateItemTotal(item.id, item.price);
					
					return (
						<div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
							<div className="flex items-start space-x-4">
								{/* Item Image */}
								<div className="flex-shrink-0 relative group">
									<Image
										src={item.image}
										alt={item.item_name}
										width={80}
										height={80}
										className="rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
								</div>

								{/* Item Details */}
								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="text-base font-medium text-gray-900 truncate">
												{item.item_name}
											</h3>
											{item.item_description && (
												<p className="text-sm text-gray-600 mt-1 line-clamp-2">
													{item.item_description}
												</p>
											)}
										</div>
										
										{/* Favorite Button */}
										<button
											onClick={() => toggleFavorite(item.id)}
											className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
											title={favorites[item.id] ? "Remove from favorites" : "Add to favorites"}
										>
											{favorites[item.id] ? (
												<HeartIconSolid className="h-5 w-5 text-red-500" />
											) : (
												<HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
											)}
										</button>
									</div>

									<div className="mt-4 flex items-center justify-between">
										<div className="flex items-center space-x-4">
											{/* Quantity Controls */}
											<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
												<button
													onClick={() => updateQuantity(item.id, Math.max(1, itemQuantity - 1))}
													className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
													disabled={itemQuantity <= 1}
													title="Decrease quantity"
												>
													<MinusIcon className="h-4 w-4 text-gray-600" />
												</button>
												<span className="px-4 py-2 text-sm font-medium text-gray-900 border-x border-gray-300 bg-gray-50">
													{itemQuantity}
												</span>
												<button
													onClick={() => updateQuantity(item.id, itemQuantity + 1)}
													className="p-2 hover:bg-gray-100 transition-colors"
													title="Increase quantity"
												>
													<PlusIcon className="h-4 w-4 text-gray-600" />
												</button>
											</div>

											{/* Remove Button */}
											<button
												onClick={() => removeItem(item.id)}
												className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
												title="Remove item"
											>
												<TrashIcon className="h-4 w-4" />
											</button>
										</div>

										{/* Price */}
										<div className="text-right">
											<p className="text-base font-medium text-gray-900">
												R{itemTotal.toFixed(2)}
											</p>
											{itemQuantity > 1 && (
												<p className="text-xs text-gray-500">
													R{item.price.toFixed(2)} each
												</p>
											)}
										</div>
									</div>

									{/* Item Status/Tags */}
									<div className="mt-3 flex items-center space-x-2">
										<span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
											✓ In Stock
										</span>
										{index === 0 && (
											<span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
												🚚 Free Shipping
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Cart Total */}
			<div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-600">
						<p>Subtotal ({cart.items_count} items)</p>
						<p className="text-xs text-green-600 mt-1">🚚 Free shipping included</p>
					</div>
					<div className="text-right">
						<span className="text-lg font-bold text-gray-900">
							R{cart.total_amount.toFixed(2)}
						</span>
						<p className="text-xs text-gray-500 mt-1">VAT included</p>
					</div>
				</div>
			</div>
		</div>
	);
}
