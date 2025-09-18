'use client';

import { PropsWithChildren } from 'react';
import { AuthProvider } from './contexts/auth-context';
import { CartProvider } from './contexts/cart-context';
import Header from './components/Header';

export function ClientLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="flex-grow p-4">
          {children}
        </main>
      </CartProvider>
    </AuthProvider>
  );
}
