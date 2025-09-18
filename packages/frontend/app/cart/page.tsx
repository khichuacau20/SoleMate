'use client';

import { useCart } from '../contexts/cart-context';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some items to get started!</p>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul role="list" className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}`} className="p-4 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-24 h-24 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                      </div>
                      <p className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <span className="text-xl">-</span>
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                          className="mx-2 w-16 text-center border-gray-200 rounded-md"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <span className="text-xl">+</span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link
                href="/checkout"
                className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                or{' '}
                <Link href="/products" className="text-primary-600 font-medium hover:text-primary-500">
                  Continue Shopping
                  <span aria-hidden="true"> →</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
