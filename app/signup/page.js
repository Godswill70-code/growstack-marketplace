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

    // Sign up user
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setMessage(signupError.message);
      setLoading(false);
      return;
    }

    const userId = signupData?.user?.id;

    // Check admin_invites table
    const { data: invited, error: inviteError } = await supabase
      .from('admin_invites')
      .select('*')
      .eq('email', email)
      .single();

    const role = invited ? 'admin' : 'customer';

    // Add to profiles table
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        email,
        role,
      },
    ]);

    if (profileError) {
      setMessage('Signup succeeded but failed to create profile.');
    } else {
      setMessage('Signup successful!');
      router.push('/login');
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
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </form>
    </div>
  );
    }
