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
    e.preventDefault(); // ✅ stop page refresh
    console.log('⏳ Trying to log in...');
    setLoading(true);
    setError('');

    // ✅ sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      setError(error.message);
      setLoading(false);
      return;
    }

    console.log('✅ Login response:', data.user);

    // ✅ fetch role from profiles
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError.message);
      setError('Could not fetch profile. Try again.');
      setLoading(false);
      return;
    }

    const role = userProfile?.role;
    console.log('🎯 Role found:', role);

    // ✅ redirect based on role
    try {
      if (role === 'admin') {
        console.log('➡️ Redirecting to /dashboard/admin...');
        await router.push('/dashboard/admin');
      } else if (role === 'creator') {
        console.log('➡️ Redirecting to /dashboard/creator...');
        await router.push('/dashboard/creator');
      } else if (role === 'affiliate') {
        console.log('➡️ Redirecting to /dashboard/affiliate...');
        await router.push('/dashboard/affiliate');
      } else {
        console.log('➡️ Redirecting to /dashboard/customer...');
        await router.push('/dashboard/customer');
      }
    } catch (redirectErr) {
      console.error('❌ Redirect error:', redirectErr);
      setError('Redirect failed. Please try again.');
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
