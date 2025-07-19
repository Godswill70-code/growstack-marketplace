'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ stop page reload
    setLoading(true);
    setError('');
    setDebug('⏳ Trying to log in...');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setDebug((prev) => prev + '\n❌ Login error: ' + error.message);
      setLoading(false);
      return;
    }

    setDebug((prev) => prev + '\n✅ Login response: ' + JSON.stringify(data.user));

    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      setError(profileError.message);
      setDebug((prev) => prev + '\n❌ Profile fetch error: ' + profileError.message);
      setLoading(false);
      return;
    }

    const role = userProfile?.role;
    setDebug((prev) => prev + '\n🎯 Role found: ' + role);

    // ✅ Delay redirect by 5 seconds so you can read debug
    setDebug((prev) => prev + '\n⏳ Redirecting in 5 seconds...');

    setTimeout(() => {
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'creator') {
        router.push('/dashboard/creator');
      } else if (role === 'affiliate') {
        router.push('/dashboard/affiliate');
      } else {
        router.push('/dashboard/customer');
      }
    }, 5000);

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
      {debug && (
        <pre
          style={{
            background: '#f9f9f9',
            color: '#333',
            padding: '10px',
            marginTop: '1rem',
            textAlign: 'left',
            fontSize: '12px',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            border: '1px solid #ccc',
            borderRadius: '6px',
          }}
        >
          {debug}
        </pre>
      )}
    </div>
  );
}
