'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 shadow-md bg-white">
        <div className="flex items-center">
          {/* Hamburger Menu */}
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <span className="ml-3 font-bold text-xl text-[#0f172a]">Growstack</span>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            className="text-xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link href="/auth/signup">
            <span className="block bg-white text-gray-900 rounded px-4 py-2 font-semibold hover:bg-gray-200">
              Sign Up
            </span>
          </Link>
          <Link href="/auth/login">
            <span className="block bg-white text-gray-900 rounded px-4 py-2 font-semibold hover:bg-gray-200">
              Log In
            </span>
          </Link>
        </nav>
      </div>

      {/* Page Content */}
      <main className="p-6 mt-10 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#0f172a]">Welcome to Growstack Marketplace</h1>
        <p className="text-lg text-gray-700">
          Africa’s #1 platform to discover, promote, and profit from digital products.
        </p>
      </main>

      {/* Overlay (when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
              }
