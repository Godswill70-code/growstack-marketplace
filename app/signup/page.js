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

    console.log('🔄 Signing up user with email:', email);

    // Step 1: Sign up user
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      console.error('❌ Signup error:', signupError);
      setMessage(`❌ Signup failed: ${signupError.message}`);
      setLoading(false);
      return;
    }

    console.log('✅ Signup succeeded:', signupData);
    const userId = signupData?.user?.id;

    // Step 2: Check admin_invites table
    let role = 'customer';
    const { data: invited, error: inviteError } = await supabase
      .from('admin_invites')
      .select('*')
      .eq('email', email)
      .maybeSingle(); // safer than single()

    if (inviteError) {
      console.warn('⚠️ Admin invite check error:', inviteError.message);
    } else if (invited) {
      role = 'admin';
    }

    console.log('➡️ Role to insert in profiles:', role);

    // Step 3: Insert profile
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        email,
        role,
      },
    ]);

    if (profileError) {
      console.error('❌ Profile insert error:', profileError);
      setMessage(`❌ Profile creation failed: ${profileError.message}`);
    } else {
      console.log('✅ Profile inserted successfully');
      setMessage('✅ Signup successful!');
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
        {message && (
          <p
            style={{
              marginTop: '1rem',
              color: message.startsWith('❌') ? 'red' : 'green',
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
               }
