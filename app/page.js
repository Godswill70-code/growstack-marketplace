'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🚀 Growstack Marketplace</h2>
      <p style={{ marginTop: '1rem' }}>
        Discover, promote, and earn from digital products like courses and ebooks.
      </p>

      <section style={{ marginTop: '2rem' }}>
        <h3>📦 Uploaded Products</h3>
        {products.length === 0 ? (
          <p>No products uploaded yet.</p>
        ) : (
          <ul style={{ marginTop: '1rem' }}>
            {products.map((product) => (
              <li key={product.id} style={{ marginBottom: '1rem' }}>
                <strong>{product.title}</strong><br />
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  {product.link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
    }
