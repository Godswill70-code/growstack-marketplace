'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function CustomerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return;
      }

      setUser(session.user);
      setRole(data.role);
      setLoading(false);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data);
      }
    };

    fetchUser();
    fetchProducts();
  }, [router]);

  const handleRoleUpdate = async (newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id);

    if (error) {
      alert('Failed to update role');
      return;
    }

    setRole(newRole);
    router.push(`/dashboard/${newRole}`);
  };

  const handlePurchase = async (product) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage('You must be logged in to purchase.');
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
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👋 Welcome, {user.email}</h2>
      <p>Your current role: <strong>{role}</strong></p>

      <div style={{ marginTop: '2rem' }}>
        {role !== 'creator' && (
          <button onClick={() => handleRoleUpdate('creator')} style={buttonStyle}>
            Become a Creator
          </button>
        )}

        {role !== 'affiliate' && (
          <button onClick={() => handleRoleUpdate('affiliate')} style={buttonStyle}>
            Become an Affiliate
          </button>
        )}

        {role === 'admin' && (
          <button onClick={() => router.push('/dashboard/admin')} style={adminButton}>
            Go to Admin Panel
          </button>
        )}
      </div>

      {/* Display Products to Buy */}
      <div style={{ marginTop: '3rem' }}>
        <h3>🛒 Available Products</h3>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul style={{ marginTop: '1rem' }}>
            {products.map((product) => (
              <li key={product.id} style={productCard}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <p>💰 ₦{product.price}</p>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: '200px', marginTop: '0.5rem' }}
                />
                <button onClick={() => handlePurchase(product)} style={{ marginTop: '1rem' }}>
                  Buy Now
                </button>
              </li>
            ))}
          </ul>
        )}
        {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'block',
  marginTop: '1rem',
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const adminButton = {
  ...buttonStyle,
  backgroundColor: '#000',
};

const productCard = {
  padding: '1rem',
  border: '1px solid #ccc',
  marginBottom: '1rem',
  borderRadius: '8px',
};
