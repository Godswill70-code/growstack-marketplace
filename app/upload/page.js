'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function UploadPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
      if (!data.session) router.push('/login');
    };

    checkSession();
  }, [router]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) return alert('All fields are required');

    try {
      setUploading(true);

      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;

      // Save product to database
      const { error: insertError } = await supabase.from('products').insert([
        {
          title,
          description,
          file_url: fileUrl,
          user_id: session.user.id,
        },
      ]);

      if (insertError) throw insertError;

      alert('Upload successful!');
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (err) {
      alert('Error uploading file: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Upload Your Product</h1>
      <form onSubmit={handleUpload}>
        <label>Title:</label><br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <br /><br />

        <label>Description:</label><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <br /><br />

        <label>Upload File (PDF, MP4, etc):</label><br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />

        <br /><br />

        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
