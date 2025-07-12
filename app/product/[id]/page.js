'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function ProductPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setMessage('Failed to load product.');
        setLoading(false);
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handlePurchase = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    const customerId = session.user.id;
    const affiliateId = searchParams.get('ref'); // Get ref code from URL if available

    // For now, simulate a purchase (no payment integration)
    const { error } = await supabase.from('purchases').insert([
      {
        product_id: id,
        creator_id: product.creator_id,
        customer_id: customerId,
        amount: product.price,
        affiliate_id: affiliateId || null,
        affiliate_commission: affiliateId ? product.price * 0.2 : 0,
      },
    ]);

    if (error) {
      setMessage('❌ Purchase failed. Please try again.');
    } else {
      setMessage('✅ Purchase successful!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <p>{product.description}</p>
      <p>💰 Price: ₦{product.price}</p>

      <button onClick={handlePurchase} style={buttonStyle}>
        Buy Now
      </button>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
}

const buttonStyle = {
  marginTop: '1rem',
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
