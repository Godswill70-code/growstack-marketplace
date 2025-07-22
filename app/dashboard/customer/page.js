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
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        if (data?.session?.user) {
          setUser(data.session.user);
        }
        setLoading(false);
      }
    };

    loadSession();

    // 🔥 Listen to future auth state changes (this solves the race condition)
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Fetch profile role only after we have a user
  useEffect(() => {
    if (!user) return;
    const fetchRole = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error.message);
      } else {
        setRole(data.role);
      }
    };
    fetchRole();
  }, [user]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Products fetch error:', error.message);
      else setProducts(data);
    };
    fetchProducts();
  }, []);

  // ✅ Redirect if NOT logged in (but only after we know loading is done)
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>⏳ Checking session…</p>;
  }

  if (!user) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Redirecting to login…</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👋 Welcome, {user.email}</h2>
      <p>Your current role: <strong>{role}</strong></p>

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
