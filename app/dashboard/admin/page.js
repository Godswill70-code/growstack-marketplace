'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role !== 'admin') {
        router.push('/dashboard/customer');
        return;
      }

      setUser(session.user);
    };

    getUser();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(inviteEmail);

    if (error) {
      setMessage('❌ Failed to invite admin: ' + error.message);
    } else {
      // After invite, we’ll set them as admin manually in Supabase
      setMessage('✅ Invite sent. Don’t forget to set their role to "admin" in the Supabase table.');
    }

    setInviteEmail('');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👑 Admin Dashboard</h2>
      <p>Welcome, {user.email}</p>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>📧 Invite New Admin</h3>
        <form onSubmit={handleInvite}>
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Enter email to invite"
            required
            style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Send Invite</button>
        </form>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🔗 Quick Access</h3>
        <ul>
          <li><a href="/dashboard/customer">Customer Dashboard</a></li>
          <li><a href="/dashboard/creator">Creator Dashboard</a></li>
          <li><a href="/dashboard/affiliate">Affiliate Dashboard</a></li>
        </ul>
      </div>
    </div>
  );
    }
