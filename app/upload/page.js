      'use client'
import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function UploadProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image.');
      return;
    }

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products-files')
      .upload(filePath, image);

    if (uploadError) {
      setMessage('Image upload failed: ' + uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from('products-files')
      .getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    const { error: insertError } = await supabase
      .from('products')
      .insert([
        {
          title,
          description,
          price: parseFloat(price),
          link,
          image: imageUrl,
        },
      ]);

    if (insertError) {
      setMessage('Error saving product: ' + insertError.message);
    } else {
      setMessage('✅ Product uploaded successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setLink('');
      setImage(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload a New Product</h2>
      <form onSubmit={handleUpload} style={styles.form}>
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />

        <textarea
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />

        <input
          type="number"
          placeholder="Price (₦)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="url"
          placeholder="Product access/download link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={styles.fileInput}
        />

        <button type="submit" style={styles.button}>Upload Product</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.6rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    minHeight: '100px',
    resize: 'vertical',
  },
  fileInput: {
    padding: '0.5rem',
    fontSize: '0.95rem',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '0.75rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0070f3',
  },
};
