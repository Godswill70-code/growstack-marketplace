import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// ✅ Metadata for icons and SEO (allowed now, because no "use client" at top)
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

// ✅ Client component for referral handling
function HandleReferralClient() {
  'use client';
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('referral_id', ref);
    }
  }, [searchParams]);

  return null;
}

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
