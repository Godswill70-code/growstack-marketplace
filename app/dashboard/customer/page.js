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
    const fetchUser = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session fetch error:', sessionError.message);
        setLoading(false);
        return;
      }

      if (!sessionData?.session?.user) {
        // Wait a moment before deciding user isn't logged in
        console.warn('No session yet, waiting...');
        setTimeout(() => {
          router.push('/login');
        }, 1000);
        return;
      }

      // ✅ User is logged in
      const user = sessionData.session.user;
      setUser(user);

      // Fetch role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError.message);
      } else {
        setRole(profile.role);
      }

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Product fetch error:', error.message);
      else setProducts(data);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>⏳ Loading your dashboard…</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👋 Welcome, {user?.email}</h2>
      <p>Your current role: <strong>{role}</strong></p>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => router.push('/marketplace')}
          style={{
            marginTop: '1rem',
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🛍️ Browse Marketplace
        </button>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3>🛒 Available Products</h3>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul style={{ marginTop: '1rem' }}>
            {products.map((product) => (
              <li key={product.id} style={{
                padding: '1rem',
                border: '1px solid #ccc',
                marginBottom: '1rem',
                borderRadius: '8px',
              }}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <p>💰 ₦{product.price}</p>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: '200px', marginTop: '0.5rem' }}
                />
                <button
                  onClick={() => alert('Purchase flow here')}
                  style={{ marginTop: '1rem' }}
                >
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
