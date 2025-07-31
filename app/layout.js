import '../styles/globals.css';
import { Suspense } from 'react';
import HandleReferralClient from './HandleReferralClient';

// ✅ Metadata for icons and SEO
export const metadata = {
  title: 'Growstack Marketplace',
  description: 'The leading digital product platform in Africa',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png' },
      { rel: 'icon', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial' }}>
        <Navbar />
        <Suspense fallback={null}>
          <HandleReferralClient />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
                   }
