'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Failed to load products');
        setLoading(false);
        return;
      }

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛍️ Marketplace</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>💰 ₦{product.price}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt="product"
                  style={{ width: '100%', maxWidth: '250px', marginBottom: '1rem' }}
                />
              )}
              <button
                onClick={() => router.push(`/product/${product.id}`)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                View & Buy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  }
