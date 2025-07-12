'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../../utils/supabaseClient';

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage('You must be logged in to upload.');
      setLoading(false);
      return;
    }

    const userId = session.user.id;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { data: storageData, error: uploadError } = await supabase.storage
      .from('products-files')
      .upload(filePath, file);

    if (uploadError) {
      setMessage('Upload failed. Try again.');
      setLoading(false);
      return;
    }

    const { data: publicURLData } = supabase.storage
      .from('products-files')
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('products').insert([
      {
        title,
        description,
        price,
        image: publicURLData.publicUrl,
        creator_id: userId,
        link: publicURLData.publicUrl,
      },
    ]);

    if (insertError) {
      setMessage('Failed to save product.');
    } else {
      setMessage('✅ Product uploaded successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setFile(null);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: '#f9f9f9' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>📤 Upload Your Product</h2>

      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <input
          type="file"
          accept=".pdf,.mp4,.docx,.zip,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{ padding: '0.5rem' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.9rem',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
    }
