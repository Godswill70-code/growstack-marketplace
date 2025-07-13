'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HamburgerMenu({ role }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Dashboard', href: `/dashboard/${role}` },
    { label: 'Profile', href: '/dashboard/profile' },
    { label: 'Switch to Creator', href: '/dashboard/creator' },
    { label: 'Switch to Affiliate', href: '/dashboard/affiliate' },
    { label: 'Switch to Customer', href: '/dashboard/customer' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={menuButtonStyle}>
        ☰
      </button>

      {open && (
        <div style={menuStyle}>
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <div style={linkStyle}>{link.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const menuButtonStyle = {
  fontSize: '24px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const menuStyle = {
  position: 'absolute',
  top: '30px',
  left: '0',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  padding: '10px',
  zIndex: 999,
};

const linkStyle = {
  padding: '8px 12px',
  borderBottom: '1px solid #eee',
  textDecoration: 'none',
  color: '#333',
  cursor: 'pointer',
};
