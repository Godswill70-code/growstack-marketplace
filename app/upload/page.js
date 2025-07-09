'use client';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function UploadProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    setMessage('');

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    // Upload file to Supabase bucket
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('product-files')
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      setMessage('❌ File upload failed.');
      return;
    }

    // Get public URL of the uploaded file
    const { data: publicUrlData } = supabase
      .storage
      .from('product-files')
      .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    // Insert product into products table
    const { error: dbError } = await supabase
      .from('products')
      .insert([{ title, description, price, link: fileUrl }]);

    if (dbError) {
      console.error(dbError);
      setMessage(`❌ Upload failed: ${dbError.message}`);
    } else {
      setMessage('✅ Product uploaded successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setFile(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload a Product</h2>
      {message && <p style={{ color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>}
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        cols={40}
      /><br /><br />

      <input
        type="number"
        placeholder="Price in Naira"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      /><br /><br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
    }
