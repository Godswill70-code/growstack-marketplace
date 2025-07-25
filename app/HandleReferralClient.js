'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function HandleReferralClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('referral_id', ref);
    }
  }, [searchParams]);

  return null;
}
