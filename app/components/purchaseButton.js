'use client';

import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function PurchaseButton({ product }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    setMessage('');

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage('❌ Please log in to purchase.');
      setLoading(false);
      return;
    }

    const buyerId = session.user.id;
    const referralId = localStorage.getItem('referral_id');

    const { error } = await supabase.from('purchases').insert([
      {
        buyer_id: buyerId,
        product_id: product.id,
        creator_id: product.creator_id,
        amount: product.price,
        referral_id: referralId || null,
      },
    ]);

    if (error) {
      setMessage('❌ Failed to complete purchase.');
    } else {
      setMessage('✅ Purchase successful!');
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? 'Processing...' : 'Buy Now'}
      </button>
      {message && <p style={{ marginTop: '0.5rem', color: 'green' }}>{message}</p>}
    </div>
  );
  }
