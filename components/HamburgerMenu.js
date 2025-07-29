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
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    setOpen(false);
  };

  const handleNavigate = (path) => {
    router.push(path);
    setOpen(false);
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

      {/* Slide-in Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : '-260px',
          height: '100vh',
          width: '250px',
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
          transition: 'left 0.3s ease-in-out',
          zIndex: 9999,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            alignSelf: 'flex-end',
            fontSize: '1.2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ❌
        </button>

        {user ? (
          <>
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
          </>
        ) : (
          <>
            <button onClick={() => handleNavigate('/signup')} style={linkStyle}>
              📝 Sign Up
            </button>
            <button onClick={() => handleNavigate('/login')} style={linkStyle}>
              🔐 Login
            </button>
          </>
        )}
      </div>
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
