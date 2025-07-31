'use client';

import Image from 'next/image';
import Link from 'next/link';
import HamburgerMenu from '../components/HamburgerMenu';
import GrowstackLogo from '../public/Growstack_logo.png'; // ✅ Your logo

export default function HomePage() {
  return (
    <main style={styles.main}>
      {/* Top bar with only the new HamburgerMenu and title */}
      <div style={styles.topBar}>
        <HamburgerMenu />
        <h1 style={styles.topTitle}>Growstack</h1>
      </div>

      {/* Logo */}
      <div style={styles.logoContainer}>
        <Image
          src={GrowstackLogo}
          alt="Growstack Logo"
          width={120}
          height={120}
          style={{ marginBottom: '1rem' }}
        />
      </div>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h2 style={styles.title}>Growstack Marketplace</h2>
        <p style={styles.subtitle}>
          Africa’s premier platform for digital creators, affiliates & customers.
        </p>
      </section>

      {/* Trust-building Section */}
      <section style={styles.trustSection}>
        <h3 style={styles.heading}>Why Choose Growstack?</h3>
        <p style={styles.text}>
          We are committed to helping you create, promote, and sell your digital products with ease.
          Growstack provides a secure platform, instant payouts, and a vibrant community of creators
          and affiliates you can trust.
        </p>
        <p style={styles.text}>
          Your journey to financial independence starts here — designed to support you every step of
          the way.
        </p>
      </section>

      {/* How it works */}
      <section style={styles.howItWorks}>
        <h3 style={styles.heading}>How it Works</h3>
        <ul style={styles.list}>
          <li>👨‍💼 Sign up and set up your profile.</li>
          <li>👩‍💻 Upload and sell your digital products.</li>
          <li>💼 Affiliates promote your products and earn commissions.</li>
          <li>💰 Get instant payments and grow your business!</li>
        </ul>
      </section>

      {/* Get Started Button */}
      <div style={styles.getStartedContainer}>
        <Link href="/signup" style={styles.getStartedBtn}>
          🚀 Get Started
        </Link>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        © 2025 Growstack Marketplace. All rights reserved.
      </footer>
    </main>
  );
}

const styles = {
  main: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    position: 'relative',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #ddd',
    marginBottom: '1rem',
  },
  topTitle: {
    marginLeft: '1rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    padding: '0 1rem',
  },
  trustSection: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '0.75rem',
  },
  text: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.8rem',
  },
  howItWorks: {
    marginBottom: '3rem',
  },
  list: {
    paddingLeft: '1.2rem',
    color: '#333',
    fontSize: '1rem',
  },
  getStartedContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  getStartedBtn: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    textDecoration: 'none',
  },
  footer: {
    textAlign: 'center',
    padding: '1rem 0',
    fontSize: '0.9rem',
    color: '#666',
    borderTop: '1px solid #ddd',
  },
};
