"use client";

import Link from "next/link"; import { useEffect, useState } from "react"; import { createClient } from "../../utils/supabaseClient";

const Navbar = () => { const supabase = createClient(); const [user, setUser] = useState(null);

useEffect(() => { const getUser = async () => { const { data: { user } } = await supabase.auth.getUser(); setUser(user); }; getUser(); }, []);

return ( <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}> <Link href="/"> <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Growstack Marketplace</h2> </Link>

<div style={{ display: "flex", gap: "1rem" }}>
    {user ? (
      <>
        <Link href="/dashboard">
          <button style={buttonStyle}>Dashboard</button>
        </Link>
        <Link href="/profile">
          <button style={buttonStyle}>Profile</button>
        </Link>
      </>
    ) : (
      <>
        <Link href="/auth/signup">
          <button style={buttonStyle}>Sign Up</button>
        </Link>
        <Link href="/auth/login">
          <button style={buttonOutlineStyle}>Login</button>
        </Link>
      </>
    )}
  </div>
</nav>

); };

const buttonStyle = { padding: "0.5rem 1rem", backgroundColor: "#2c3e50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };

const buttonOutlineStyle = { padding: "0.5rem 1rem", backgroundColor: "white", color: "#2c3e50", border: "1px solid #2c3e50", borderRadius: "4px", cursor: "pointer" };

export default Navbar;

  
