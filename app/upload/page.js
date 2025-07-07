'use client';

import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic form validation
    if (!title || !description || !price || !link) {
      alert('Please fill in all fields');
      return;
    }

    // ✅ Upload to Supabase
    const { data, error } = await supabase
      .from('products')
      .insert([{ title, description, price: parseFloat(price), link }]);

    if (error) {
      alert('❌ Upload failed: ' + error.message);
    } else {
      alert('✅ Product uploaded successfully!');
      // Optional: Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setLink('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Upload a Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price (₦)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
        <input
          type="url"
          placeholder="Download Link (Google Drive, etc)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Upload</button>
      </form>
    </div>
  );
}

// 🔧 Inline styles (simple mobile-friendly)
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
