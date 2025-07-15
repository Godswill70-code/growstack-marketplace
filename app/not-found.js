'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function NotFoundContent() {
  // If you really don't need search params, you can remove this line entirely
  const params = useSearchParams()

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
    }
