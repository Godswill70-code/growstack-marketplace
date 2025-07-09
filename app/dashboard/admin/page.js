'use client';

import { useEffect, useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase
      .from('admin_invites')
      .insert([{ email, invited_by: user.id }]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage(`✅ Invite sent to ${email}`);
      setEmail('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👑 Admin Dashboard</h2>

      <div style={{ marginTop: '2rem', maxWidth: '400px' }}>
        <h3>Invite New Admin</h3>
        <form onSubmit={handleInvite}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Send Invite
          </button>
        </form>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
      }
