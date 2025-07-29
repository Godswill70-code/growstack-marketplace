'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* Hamburger Icon (only visible when menu is closed) */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="p-3 text-black focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar Menu */}
      {isOpen && (
        <>
          {/* Dark background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-2/3 h-full bg-white z-50 p-5 shadow-lg transition-transform duration-300">
            <h2 className="text-xl font-bold mb-6">Growstack</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/signup" onClick={closeMenu} className="block text-black hover:underline">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" onClick={closeMenu} className="block text-black hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
            }
