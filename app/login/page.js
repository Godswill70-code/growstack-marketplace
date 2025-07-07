'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Get user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        setErrorMsg(profileError.message);
        return;
      }

      // Redirect based on role
      const role = profile.role;
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customer');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
    </div>
  );
}
