'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '../utils/supabaseClient';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!error) {
        setUser(session.user);
        setRole(data.role);
      }
    };

    fetchUser();
  }, []);

  const handleRoleSwitch = async (newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', user.id);

    if (!error) {
      router.push(`/dashboard/${newRole}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: '1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ☰
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '3rem',
            left: '0',
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            padding: '1rem',
            width: '230px',
            zIndex: 999,
          }}
        >
          <p><strong>{user?.email}</strong></p>
          <p style={{ color: '#555' }}>Role: <b>{role}</b></p>

          <Link href="/profile" style={linkStyle}>⚙️ Profile Settings</Link>

          {role !== 'creator' && (
            <button onClick={() => handleRoleSwitch('creator')} style={linkStyle}>
              🎬 Become a Creator
            </button>
          )}

          {role !== 'affiliate' && (
            <button onClick={() => handleRoleSwitch('affiliate')} style={linkStyle}>
              🤝 Become an Affiliate
            </button>
          )}

          {role === 'admin' && (
            <Link href="/dashboard/admin" style={linkStyle}>
              🛠 Admin Panel
            </Link>
          )}

          <button onClick={handleLogout} style={{ ...linkStyle, color: 'red' }}>
            🔓 Log out
          </button>
        </div>
      )}
    </div>
  );
}

const linkStyle = {
  display: 'block',
  padding: '10px 0',
  background: 'none',
  border: 'none',
  color: '#333',
  textAlign: 'left',
  fontSize: '1rem',
  width: '100%',
  cursor: 'pointer',
};
