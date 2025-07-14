'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>🌱 Growstack</span>
          <div style={{ marginLeft: '1rem' }}>
            <button
              onClick={() => {
                const menu = document.getElementById('nav-menu');
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
              }}
              style={{
                padding: '0.5rem',
                fontSize: '1.2rem',
                marginLeft: '1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          </div>
        </div>

        <div id="nav-menu" style={{ display: 'none', position: 'absolute', top: '3.5rem', right: '1rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}>
          <Link href="/login">
            <p style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>Login</p>
          </Link>
          <Link href="/signup">
            <p style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>Signup</p>
          </Link>
        </div>
      </header>

      <main style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Welcome to <strong>Growstack Marketplace</strong> 👋
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>
          Discover, promote, and earn from premium digital products — from crash courses to expert eBooks.
        </p>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '12px' }}>
          <h2>🔥 Featured Products</h2>
          <ul>
            <li>📘 Affiliate Marketing Crash Course</li>
            <li>📙 Guide to Building a Digital Product</li>
            <li>🎥 How to Create Faceless Videos</li>
          </ul>
        </div>
      </main>
    </div>
  );
    }
