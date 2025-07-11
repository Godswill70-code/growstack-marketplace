'use client';
import { useState, useEffect } from 'react';
import supabase from '../../utils/supabaseClient';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setCreatorId(session.user.id); // auto-fills the creator_id
      }
    };
    fetchUser();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!creatorId) {
      setMessage('User not logged in.');
      return;
    }

    const fileName = `${Date.now()}-${image.name}`;
    const { data: storageData, error: uploadError } = await supabase.storage
      .from('products-files')
      .upload(fileName, image);

    if (uploadError) {
      setMessage('Failed to upload image.');
      return;
    }

    const imageUrl = supabase.storage.from('products-files').getPublicUrl(fileName).data.publicUrl;

    const { error: dbError } = await supabase.from('products').insert([
      {
        title,
        description,
        price,
        link,
        image: imageUrl,
        creator_id: creatorId, // automatically added
      },
    ]);

    if (dbError) {
      setMessage('Error uploading product.');
    } else {
      setMessage('Product uploaded successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setLink('');
      setImage(null);
    }
  };

  return (
    <div>
      <h2>Upload Product</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Product Link" value={link} onChange={(e) => setLink(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
  }
