'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '../utils/supabaseClient';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button onClick={toggleMenu} style={styles.hamburgerBtn}>
        ☰
      </button>

      {/* Slide-out Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <button onClick={closeMenu} style={styles.closeBtn}>
          ✕
        </button>
        <nav style={styles.nav}>
          <Link href="/" onClick={closeMenu} style={styles.link}>Home</Link>
          <Link href="/signup" onClick={closeMenu} style={styles.link}>Sign Up</Link>
          <Link href="/login" onClick={closeMenu} style={styles.link}>Login</Link>
          <Link href="/profile" onClick={closeMenu} style={styles.link}>Profile</Link>
        </nav>
      </div>
    </>
  );
}

const styles = {
  hamburgerBtn: {
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1001,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '220px',
    backgroundColor: '#fff',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
    padding: '1rem',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000,
  },
  closeBtn: {
    fontSize: '1.2rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
};
