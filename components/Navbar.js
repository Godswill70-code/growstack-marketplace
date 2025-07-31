"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Growstack</span>

      {/* Optional: static links for desktop view */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
