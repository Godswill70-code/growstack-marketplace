'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function CreatorDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 Creator Dashboard</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '1rem' }}>
              <img
                src={`https://qsvfjpbsmvjcrzcyusca.supabase.co/storage/v1/object/public/products-files/${product.image}`}
                alt={product.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h3 style={{ marginTop: '1rem' }}>{product.title}</h3>
              <p>{product.description}</p>
              <strong>₦{product.price}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  }
