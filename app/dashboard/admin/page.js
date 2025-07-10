'use client';
import { useState, useEffect } from 'react';
import supabase from '../../utils/supabaseClient';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState([]);

  const fetchInvites = async () => {
    const { data, error } = await supabase
      .from('admin_invites')
      .select('email, created_at')
      .order('created_at', { ascending: false });

    if (!error) {
      setInvites(data);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Check if already invited
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

    const { error } = await supabase.from('admin_invites').insert([{ email }]);

    if (error) {
      setMessage('❌ Failed to send invite. Try again.');
    } else {
      setMessage('✅ Admin invite sent successfully!');
      setEmail('');
      fetchInvites();
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>👑 Admin Dashboard</h2>
      <p>Invite a new admin by entering their email below:</p>

      <form onSubmit={handleInvite} style={{ marginTop: '1rem' }}>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '0.6rem',
            width: '100%',
            marginBottom: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Inviting...' : 'Send Invite'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {invites.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>📋 Already Invited Admins</h4>
          <ul style={{ paddingLeft: '1rem' }}>
            {invites.map((invite) => (
              <li key={invite.email}>
                {invite.email} — <small>{new Date(invite.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
                                         }
