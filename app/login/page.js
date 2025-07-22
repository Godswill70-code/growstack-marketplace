'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('⏳ Attempting login with:', email);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('❌ Sign-in error:', signInError.message);
      setError(signInError.message);
      setLoading(false);
      return;
    }

    console.log('✅ Login successful. User ID:', data.user.id);

    // Fetch the user's profile role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('❌ Failed to fetch profile:', profileError.message);
      setError('Could not fetch profile info.');
      setLoading(false);
      return;
    }

    console.log('🎯 Role found:', profile.role);

    // Redirect based on role
    if (profile.role === 'admin') {
      console.log('➡️ Redirecting to /dashboard/admin');
      router.push('/dashboard/admin');
    } else if (profile.role === 'creator') {
      console.log('➡️ Redirecting to /dashboard/creator');
      router.push('/dashboard/creator');
    } else if (profile.role === 'affiliate') {
      console.log('➡️ Redirecting to /dashboard/affiliate');
      router.push('/dashboard/affiliate');
    } else {
      console.log('➡️ Redirecting to /dashboard/customer');
      router.push('/dashboard/customer');
    }

    // Force refresh after navigation
    setTimeout(() => {
      router.refresh();
    }, 500);

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '1.5rem' }}>Login to Growstack</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
