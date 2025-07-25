'use client';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ✅ Metadata for icons and SEO
export const metadata = {
  title: 'Growstack Marketplace',
  description: 'The leading digital product platform in Africa',
  icons: {
    icon: '/favicon.ico', // your favicon
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png' },
      { rel: 'icon', url: '/android-chrome-512x512.png' },
    ],
  },
};

// ✅ A separate client component to handle searchParams inside a Suspense boundary
function HandleReferral() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('referral_id', ref);
    }
  }, [searchParams]);

  return null; // nothing to render visually
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial' }}>
        <Navbar />
        {/* ✅ Wrap the searchParams logic in Suspense */}
        <Suspense fallback={null}>
          <HandleReferral />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
        }
