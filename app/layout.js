import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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

// ✅ Move client-side logic into a separate component
function HandleReferralClient() {
  // This component itself must be marked as client
  'use client';
  const searchParams = useSearchParams();

  React.useEffect(() => {
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
        {/* ✅ Wrap the searchParams logic in Suspense */}
        <Suspense fallback={null}>
          <HandleReferralClient />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
       }
