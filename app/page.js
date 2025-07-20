'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* ✅ Top section with Logo */}
      <section className="flex flex-col items-center py-10 px-4">
        <Image
          src="/file_000000000ac461f590983b2630a05f13.png"
          alt="Growstack Logo"
          width={120}
          height={120}
          className="mb-6"
        />
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          Growstack Marketplace
        </h1>
        <p className="text-lg text-center max-w-xl">
          Africa’s premier platform empowering <strong>digital creators</strong>,
          <strong> affiliates</strong>, and <strong>customers</strong> to thrive together.
        </p>
      </section>

      {/* ✅ How it works section */}
      <section className="bg-gray-100 py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">🚀 How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-3">👩‍💻 Creators</h3>
            <p>
              Upload and sell your digital products easily. Reach thousands of customers ready to buy.
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-3">🤝 Affiliates</h3>
            <p>
              Promote high-quality products and earn commissions on every sale you drive.
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-3">🛍️ Customers</h3>
            <p>
              Discover trusted products tailored for Africa’s growing digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Trust building section (replaces featured products) */}
      <section className="py-12 px-6 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-3xl font-bold text-center mb-6">💎 Why Choose Growstack?</h2>
        <p className="text-lg max-w-3xl mx-auto text-center leading-relaxed">
          At <strong>Growstack</strong>, trust is our foundation. Every product is reviewed, every creator
          is verified, and every affiliate is empowered to deliver value.  
          <br /><br />
          We’re not just another marketplace—we are a community of innovators reshaping Africa’s
          digital landscape. Your success is our mission, and we provide secure payments,
          real-time analytics, and world‑class support to help you scale.
        </p>

        {/* Optional visuals */}
        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <div className="p-6 bg-white rounded-xl shadow w-60 text-center">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Platform</h3>
            <p className="text-sm">Your transactions and data are always safe with us.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow w-60 text-center">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Payouts</h3>
            <p className="text-sm">Earn commissions and receive payments quickly & transparently.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow w-60 text-center">
            <h3 className="text-xl font-semibold mb-2">💼 Dedicated Support</h3>
            <p className="text-sm">We’re here to help you succeed, every step of the way.</p>
          </div>
        </div>
      </section>

      {/* ✅ Get Started button moved to bottom */}
      <section className="py-10 flex justify-center">
        <button
          onClick={() => router.push('/signup')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow"
        >
          🚀 Get Started
        </button>
      </section>
    </main>
  );
            }
