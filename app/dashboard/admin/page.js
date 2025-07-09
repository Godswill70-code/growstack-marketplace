'use client';
import { useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Check if email is already invited
    const { data: existingInvite } = await supabase
      .from('admin_invites')
      .select('id')
      .eq('email', email)
      .single();

    if (existingInvite) {
      setMessage('This email has already been invited.');
      setLoading(false);
      return;
    }

    // Insert email into admin_invites table
    const { error } = await supabase.from('admin_invites').insert([{ email }]);

    if (error) {
      setMessage('Failed to send invite. Please try again.');
    } else {
      setMessage('Admin invite sent successfully!');
      setEmail('');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👑 Admin Dashboard</h2>
      <p>Invite a new admin by entering their email below:</p>

      <form onSubmit={handleInvite} style={{ marginTop: '1rem' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Inviting...' : 'Send Invite'}
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
      }
