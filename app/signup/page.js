'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // 1️⃣ Sign up the user in Supabase Auth
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setMessage(`❌ Signup failed: ${signupError.message}`);
      setLoading(false);
      return;
    }

    const userId = signupData?.user?.id;
    if (!userId) {
      setMessage('❌ Signup succeeded but no user ID was returned.');
      setLoading(false);
      return;
    }

    // 2️⃣ Check if this email is in admin_invites table
    let role = 'customer';
    try {
      const { data: invited, error: inviteError } = await supabase
        .from('admin_invites')
        .select('*')
        .eq('email', email)
        .maybeSingle(); // avoids throwing if no row

      if (inviteError) {
        console.warn('⚠️ Admin invite lookup error:', inviteError.message);
      }

      if (invited) {
        role = 'admin';
      }
    } catch (err) {
      console.warn('⚠️ Admin invite lookup exception:', err);
    }

    // 3️⃣ Insert profile into profiles table
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,       // must match auth.uid()
        email: email,
        role: role,
        full_name: '',    // optional field if exists
        phone: ''         // optional field if exists
      },
    ]);

    if (profileError) {
      console.error('❌ Profile creation error:', profileError.message);
      setMessage('✅ Signup succeeded but ❌ failed to create profile.');
    } else {
      setMessage('🎉 Signup & profile created successfully!');
      // redirect after short delay
      setTimeout(() => {
        router.push('/login');
      }, 1200);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </form>
    </div>
  );
    }
