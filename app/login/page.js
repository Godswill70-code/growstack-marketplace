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

    // ✅ Sign in with Supabase
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    // ✅ Fetch user profile role
    const userId = loginData.user?.id;
    if (!userId) {
      setError('No user returned from login.');
      setLoading(false);
      return;
    }

    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError.message);
      // fallback to default dashboard
      router.push('/dashboard/customer');
      return;
    }

    const role = userProfile?.role;

    // ✅ Redirect based on role
    if (role === 'admin') {
      router.push('/dashboard/admin');
    } else if (role === 'creator') {
      router.push('/dashboard/creator');
    } else if (role === 'affiliate') {
      router.push('/dashboard/affiliate');
    } else {
      // default to customer dashboard
      router.push('/dashboard/customer');
    }

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
