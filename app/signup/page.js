'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../utils/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      return;
    }

    // Fetch role based on invite
    let role = 'customer';
    const { data: inviteData } = await supabase
      .from('admin_invites')
      .select('email')
      .eq('email', email)
      .single();

    if (inviteData) {
      role = 'admin';
    }

    // Insert into profiles table
    await supabase.from('profiles').insert([
      {
        id: data.user.id,
        email,
        role,
      },
    ]);

    alert('Signup successful!');
    router.push('/dashboard/customer');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '3rem' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
    }
