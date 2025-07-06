'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(false)
    setError('')

    const { error } = await supabase.from('products').insert([
      { title, description, price, link }
    ])

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTitle('')
      setDescription('')
      setPrice('')
      setLink('')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload a Product</h1>
      {success && <p style={{ color: 'green' }}>✅ Product uploaded successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input placeholder="Download link" value={link} onChange={(e) => setLink(e.target.value)} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
        }
