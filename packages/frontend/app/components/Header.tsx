'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/auth-context';
import { useCart } from '../contexts/cart-context';

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">SoleMate</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/products"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/cart"
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <span className="sr-only">Cart</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Welcome, {user.firstName || user.email}</span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
