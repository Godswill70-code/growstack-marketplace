'use client';

import { useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function PurchaseButton({ productId, price, title }) {
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [lastPurchase, setLastPurchase] = useState(null);
  const [error, setError] = useState('');

  const handlePurchase = async () => {
    setLoading(true);
    setConfirmation('');
    setError('');

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError('You must be logged in to purchase.');
      setLoading(false);
      return;
    }

    const userId = session.user.id;

    const urlParams = new URLSearchParams(window.location.search);
    const affiliateId = urlParams.get('ref');

    // Calculate 60% affiliate commission
    const commission = affiliateId ? price * 0.6 : 0;

    const { error: purchaseError } = await supabase.from('purchases').insert([
      {
        product_id: productId,
        customer_id: userId,
        amount: price,
        affiliate_id: affiliateId || null,
        affiliate_commission: affiliateId ? commission : null,
        creator_id: session.user.id, // Optional
      },
    ]);

    if (purchaseError) {
      setError('❌ Failed to process purchase.');
    } else {
      setConfirmation('✅ Purchase successful!');
      setLastPurchase({ title, amount: price });
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? 'Processing...' : 'Buy Now'}
      </button>

      {/* ✅ Success message */}
      {confirmation && (
        <p style={{ color: 'green', marginTop: '0.5rem' }}>{confirmation}</p>
      )}

      {/* 🔁 Optional preview */}
      {lastPurchase && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          <p><strong>Product:</strong> {lastPurchase.title}</p>
          <p><strong>Amount:</strong> ₦{lastPurchase.amount}</p>
        </div>
      )}

      {/* ❌ Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
      }
