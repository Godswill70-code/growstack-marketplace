'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function UploadPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (!session) {
        router.push('/login');
      }
    };

    getSession();
  }, [router]);

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Upload Product</h1>
      <form>
        {/* Replace this with your actual upload form */}
        <label>Product Title</label>
        <input type="text" name="title" required />

        <br /><br />

        <label>Description</label>
        <textarea name="description" required></textarea>

        <br /><br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
  }
