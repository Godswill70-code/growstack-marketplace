// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <Link href="/" style={styles.logo}>
          Growstack
        </Link>
      </div>
      <div style={styles.links}>
        <Link href="/login" style={styles.link}>Login</Link>
        <Link href="/signup" style={styles.link}>Signup</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  logo: {
    textDecoration: 'none',
    color: '#333',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: '500',
  },
};
