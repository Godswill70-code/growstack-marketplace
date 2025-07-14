'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import supabase from '../../../utils/supabaseClient';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  const referralId = searchParams.get('ref'); // ?ref=affiliateId

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        setMessage('Product not found');
        setLoading(false);
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const handlePurchase = async () => {
    if (!product) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      alert('You must be logged in to make a purchase.');
      return;
    }

    const { error } = await supabase.from('purchases').insert([
      {
        product_id: product.id,
        creator_id: product.creator_id,
        user_id: session.user.id,
        amount: product.price,
        affiliate_id: referralId || null,
        affiliate_commission: referralId ? product.price * 0.1 : 0, // 10% commission
      },
    ]);

    if (error) {
      alert('Purchase failed. Please try again.');
    } else {
      alert('Purchase successful!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>💰 Price: ₦{product.price}</p>
      {product.image && (
        <img
          src={product.image}
          alt="product"
          style={{ maxWidth: '300px', marginTop: '1rem' }}
        />
      )}

      <button
        onClick={handlePurchase}
        style={{
          marginTop: '1.5rem',
          padding: '10px 20px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
        }}
      >
        Purchase
      </button>
    </div>
  );
}
