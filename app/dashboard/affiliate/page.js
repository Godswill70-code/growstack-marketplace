'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function AffiliateDashboard() {
  const [user, setUser] = useState(null);
  const [refLink, setRefLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      const base = 'https://growstack-marketplace.vercel.app';
      const link = `${base}/?ref=${user.id}`;
      setRefLink(link);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎯 Affiliate Dashboard</h2>

      {user ? (
        <div style={{ marginTop: '2rem' }}>
          <p>Your referral link:</p>
          <input
            type="text"
            value={refLink}
            readOnly
            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
          />
          <button
            onClick={copyToClipboard}
            style={{
              marginTop: '1rem',
              padding: '0.8rem 1.5rem',
              background: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      ) : (
        <p>Loading your affiliate link...</p>
      )}
    </div>
  );
}
