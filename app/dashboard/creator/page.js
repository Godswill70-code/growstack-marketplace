'use client';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function CreatorDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatorId, setCreatorId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage('You are not logged in.');
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      setCreatorId(userId);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', userId);

      if (error) {
        setMessage('Failed to load products');
        setLoading(false);
        return;
      }

      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 Your Uploaded Products</h2>

      {message && <p>{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <ul style={{ marginTop: '1rem' }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                padding: '1rem',
                border: '1px solid #ccc',
                marginBottom: '1rem',
                borderRadius: '8px',
              }}
            >
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <p>💰 ${product.price}</p>
              <img
                src={product.image}
                alt="product"
                style={{ width: '100%', maxWidth: '200px', marginTop: '0.5rem' }}
              />
              <div style={{ marginTop: '0.5rem' }}>
                <button style={{ marginRight: '1rem' }}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
