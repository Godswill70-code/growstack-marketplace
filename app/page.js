'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HamburgerMenu from '../components/HamburgerMenu';
import GrowstackLogo from '../public/Growstack_logo.png';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center">
          <Image src={GrowstackLogo} alt="Growstack Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-gray-800">Growstack</span>
        </div>

        {/* Hamburger Icon */}
        <button
          className="text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Growstack Marketplace</h1>
        <p className="text-gray-600">
          A platform where creators, affiliates, and customers connect to grow together.
        </p>
      </div>
    </div>
  );
    }
