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
      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          fontSize: '1.8rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10001,
        }}
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 10000,
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: open ? 0 : '-270px',
          height: '100vh',
          width: '250px',
          background: '#fff',
          boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
          transition: 'left 0.3s ease-in-out',
          zIndex: 10001,
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            alignSelf: 'flex-end',
            fontSize: '1.2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          ❌
        </button>

        {/* Content */}
        {user ? (
          <>
            <p><strong>{user.email}</strong></p>
            <p style={{ color: '#555' }}>Role: <b>{role}</b></p>

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
  padding: '10px 0',
  border: 'none',
  background: 'none',
  color: '#333',
  fontSize: '1rem',
  textAlign: 'left',
  cursor: 'pointer',
};
