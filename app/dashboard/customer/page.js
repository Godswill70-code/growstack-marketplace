'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function CustomerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return;
      }

      setUser(session.user);
      setRole(data.role);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleRoleUpdate = async (newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id);

    if (error) {
      alert('Failed to update role');
      return;
    }

    setRole(newRole);
    router.push(`/dashboard/${newRole}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👋 Welcome, {user.email}</h2>
      <p>Your current role: <strong>{role}</strong></p>

      <div style={{ marginTop: '2rem' }}>
        {role !== 'creator' && (
          <button onClick={() => handleRoleUpdate('creator')} style={buttonStyle}>
            Become a Creator
          </button>
        )}

        {role !== 'affiliate' && (
          <button onClick={() => handleRoleUpdate('affiliate')} style={buttonStyle}>
            Become an Affiliate
          </button>
        )}

        {role === 'admin' && (
          <button onClick={() => router.push('/dashboard/admin')} style={adminButton}>
            Go to Admin Panel
          </button>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'block',
  marginTop: '1rem',
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const adminButton = {
  ...buttonStyle,
  backgroundColor: '#000',
};
