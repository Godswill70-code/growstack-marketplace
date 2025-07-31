'use client';

import Link from 'next/link';
import React from 'react';

export default function HamburgerMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} className="text-white focus:outline-none">
          ✕
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-4">
        <Link href="/login" className="hover:text-yellow-400">
          Login
        </Link>
        <Link href="/signup" className="hover:text-yellow-400">
          Sign Up
        </Link>
        <Link href="/dashboard" className="hover:text-yellow-400">
          Dashboard
        </Link>
      </nav>
    </div>
  );
      }
