import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ClientLayout } from './client-layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'SoleMate - Your Premier Footwear Destination',
  description: 'Find your perfect pair of shoes at SoleMate',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen">
//         <AuthProvider>
//           <CartProvider>
//             <Header />
//             <main className="flex-grow">
//               {children}
//             </main>
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }
