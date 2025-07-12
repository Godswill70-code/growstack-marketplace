'use client';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RootLayout({ children }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('referral_id', ref);
    }
  }, [searchParams]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial' }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
