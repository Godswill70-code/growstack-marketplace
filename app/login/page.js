'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    console.log('⏳ Attempting login with:', email)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      console.error('❌ Sign-in error:', signInError.message)
      setError(signInError.message)
      setLoading(false)
      return
    }

    console.log('✅ Login successful. User ID:', data.user.id)

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      console.error('❌ Failed to fetch profile:', profileError.message)
      setError('Could not fetch profile info.')
      setLoading(false)
      return
    }

    console.log('🎯 Role found:', profile.role)

    // ✅ Decide destination based on role
    let destination = '/dashboard/customer'
    if (profile.role === 'admin') destination = '/dashboard/admin'
    if (profile.role === 'creator') destination = '/dashboard/creator'
    if (profile.role === 'affiliate') destination = '/dashboard/affiliate'

    console.log('➡️ Redirecting to', destination)
    router.replace(destination) // ✅ smooth redirect

    setLoading(false)
  }

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
        onClick={handleLogin}
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
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  )
    }
