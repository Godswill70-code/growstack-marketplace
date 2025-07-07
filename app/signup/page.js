"use client";

import { useState } from "react"; import { supabase } from "../../utils/supabaseClient"; import { useRouter } from "next/navigation";

export default function SignupPage() { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);

const router = useRouter();

const handleSignup = async (e) => { e.preventDefault(); setLoading(true); setError(null);

const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

setLoading(false);

if (error) {
  setError(error.message);
} else {
  alert("✅ Signup successful. Check your email to confirm.");
  router.push("/login");
}

};

return ( <div style={{ maxWidth: 400, margin: "auto", paddingTop: 60 }}> <h2 style={{ fontWeight: "bold", fontSize: 28, textAlign: "center" }}>Create Account</h2>

<form onSubmit={handleSignup} style={{ marginTop: 30 }}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      style={inputStyle}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      style={inputStyle}
    />

    <button
      type="submit"
      disabled={loading}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        fontWeight: "bold",
        fontSize: 16,
        cursor: "pointer",
      }}
    >
      {loading ? "Signing up..." : "Sign Up"}
    </button>

    {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
  </form>
</div>

); }

const inputStyle = { width: "100%", padding: "12px", marginBottom: "16px", border: "1px solid #ccc", borderRadius: "6px", };

                                      
