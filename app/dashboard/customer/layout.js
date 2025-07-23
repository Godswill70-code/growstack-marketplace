'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../../utils/supabaseClient' // ✅ fixed relative path
import HamburgerMenu from '../../../components/HamburgerMenu';


export default function CustomerLayout({ children }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
      } else {
        // Optional: verify profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single()

        if (!profile) {
          router.replace('/signup')
        }
      }

      setChecking(false)
    }

    checkSession()
  }, [router])

  if (checking) {
    return <p>Loading...</p>
  }

  return <div style={{ padding: '1rem' }}>{children}</div>
          }
