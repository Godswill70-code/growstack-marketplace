'use client'

import { useState } from 'react';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    fileUrl: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Product:', formData);
    alert("Product submitted (in development mode)");
    // In the future: send data to Supabase
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📤 Upload a Digital Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <input type="text" name="title" placeholder="Product Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (₦)" onChange={handleChange} required />
        <input type="text" name="fileUrl" placeholder="Google Drive or Cloud Link" onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image Link (Cloudinary or Imgur)" onChange={handleChange} />
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}
