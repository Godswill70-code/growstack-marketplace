'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function CreatorDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', user.id) // Ensure this field exists in your DB
        .order('created_at', { ascending: false });

      if (!error) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎨 Creator Dashboard</h2>
      <p>Welcome! Manage your digital products and uploads below.</p>

      <button
        onClick={() => router.push('/upload')}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        + Upload New Product
      </button>

      <div style={{ marginTop: '2rem' }}>
        <h3>Your Products</h3>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products uploaded yet.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id} style={{ marginBottom: '1rem' }}>
                <strong>{product.title}</strong> - ₦{product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
        }
