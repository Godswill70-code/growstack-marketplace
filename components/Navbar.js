"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            marginRight: '1rem',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Growstack</span>
      </div>

      {menuOpen && (
        <div style={{ position: 'absolute', top: '4rem', left: '1rem', background: '#fff', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/signup">Signup</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
  }
