'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../utils/supabaseClient';

export default function CustomerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      console.log('🔎 Checking session...');
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error('❌ Session error:', error);

      console.log('📌 Session data:', session);

      if (!session || !session.user) {
        console.log('❌ No session, redirecting to login');
        router.replace('/login');
        return;
      }

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('❌ Profile fetch error:', profileError);
        setLoading(false);
        return;
      }

      console.log('✅ Profile found:', profile);

      setUser(session.user);
      setRole(profile.role);
      setLoading(false);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('❌ Error fetching products:', error.message);
      } else {
        setProducts(data);
      }
    };

    fetchSessionAndProfile();
    fetchProducts();
  }, [router]);

  const handleRoleUpdate = async (newRole) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id);

    if (error) {
      alert('❌ Failed to update role');
      return;
    }

    console.log(`✅ Role updated to ${newRole}`);
    setRole(newRole);
    router.replace(`/dashboard/${newRole}`);
  };

  const handlePurchase = async (product) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setMessage('❌ You must be logged in to purchase.');
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

  if (loading) {
    return <p style={{ padding: '1rem' }}>⏳ Loading your dashboard...</p>;
  }

  return (
    <div style={containerStyle}>
      <h2>👋 Welcome, {user?.email}</h2>
      <p>Your current role: <strong>{role}</strong></p>

      <div style={{ marginTop: '1.5rem' }}>
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
          <button
            onClick={() => router.push('/dashboard/admin')}
            style={{ ...buttonStyle, backgroundColor: '#000' }}
          >
            Go to Admin Panel
          </button>
        )}
      </div>

      <button
        onClick={() => router.push('/marketplace')}
        style={{ ...buttonStyle, backgroundColor: '#10b981', marginTop: '2rem' }}
      >
        🛍️ Browse Marketplace
      </button>

      <div style={{ marginTop: '2rem' }}>
        <h3>🛒 Available Products</h3>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {products.map((product) => (
              <li key={product.id} style={productCard}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <p>💰 ₦{product.price}</p>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                )}
                <button onClick={() => handlePurchase(product)} style={buttonStyle}>
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

const containerStyle = {
  padding: '1rem',
  maxWidth: '600px',
  margin: '0 auto',
};

const buttonStyle = {
  display: 'block',
  marginTop: '1rem',
  padding: '12px 20px',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '16px',
};

const productCard = {
  padding: '1rem',
  border: '1px solid #ccc',
  marginTop: '1rem',
  borderRadius: '8px',
};
