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
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 9999,
          background: 'transparent',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        aria-label="Open Menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : '-70%',
          width: '70%',
          height: '100vh',
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
          transition: 'left 0.3s ease-in-out',
          padding: '1.5rem 1rem',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            alignSelf: 'flex-end',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          ❌
        </button>

        {user ? (
          <>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{user?.email}</p>
            <p style={{ color: '#666', marginBottom: '1rem' }}>Role: <b>{role}</b></p>

            <Link href="/profile" style={linkStyle}>⚙️ Profile</Link>

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
    </>
  );
}

const linkStyle = {
  background: 'none',
  border: 'none',
  padding: '10px 0',
  color: '#333',
  textAlign: 'left',
  fontSize: '1rem',
  width: '100%',
  cursor: 'pointer',
  textDecoration: 'none',
};
