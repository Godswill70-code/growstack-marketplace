'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../../utils/supabaseClient'

export default function CustomerDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login') // redirect if not logged in
      } else {
        setSession(session)
      }
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login')
      } else {
        setSession(session)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  if (!session) {
    return null // we already redirect
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>✅ Customer Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  )
         }
