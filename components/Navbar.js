"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        position: "relative",
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left side: Logo & Hamburger */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            marginRight: "1rem",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
        <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Growstack</span>
      </div>


      {/* Dropdown menu for Signup/Login */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "4rem",
            left: "1rem",
            background: "#fff",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
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
