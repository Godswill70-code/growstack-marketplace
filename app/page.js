'use client';

import Link from 'next/link';

export default function HomePage() { return ( <div style={{ fontFamily: 'Arial, sans-serif', padding: '1rem' }}> {/* Hero Section */} <section style={{ textAlign: 'center', marginTop: '4rem' }}> <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111' }}> Growstack Marketplace </h1> <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '0.5rem' }}> Africa’s premier platform for digital creators, affiliates & customers. </p> <div style={{ marginTop: '2rem' }}> <Link href="/signup"> <button style={buttonPrimary}>Get Started</button> </Link> <Link href="/dashboard/customer"> <button style={buttonSecondary}>Browse Products</button> </Link> </div> </section>

{/* Featured Products (static preview or fetch dynamically later) */}
  <section style={{ marginTop: '4rem' }}>
    <h2 style={sectionTitle}>🔥 Featured Products</h2>
    <div style={productGrid}>
      <ProductCard title="WhatsApp Marketing Mastery" price="3,500" />
      <ProductCard title="Faceless Video Blueprint" price="5,000" />
      <ProductCard title="AI Tools for Marketers" price="2,000" />
      <ProductCard title="Digital Product Starter Kit" price="4,000" />
    </div>
  </section>

  {/* How It Works */}
  <section style={{ marginTop: '4rem' }}>
    <h2 style={sectionTitle}>🚀 How It Works</h2>
    <ol style={{ listStyle: 'none', padding: 0 }}>
      <li style={step}>1️⃣ Create your digital product</li>
      <li style={step}>2️⃣ Promote it using our affiliate system</li>
      <li style={step}>3️⃣ Earn and scale your digital business</li>
    </ol>
  </section>

  {/* Testimonials */}
  <section style={{ marginTop: '4rem' }}>
    <h2 style={sectionTitle}>💬 What Users Say</h2>
    <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
      "Growstack helped me launch and earn from my first eBook in 7 days!" – Ada, Nigeria
    </div>
  </section>

  {/* Footer */}
  <footer style={{ marginTop: '4rem', borderTop: '1px solid #ccc', padding: '2rem 0', textAlign: 'center', color: '#666' }}>
    &copy; {new Date().getFullYear()} Growstack Marketplace. Built for Africa.
  </footer>
</div>

); }

function ProductCard({ title, price }) { return ( <div style={productCard}> <h3>{title}</h3> <p>₦{price}</p> <button style={buttonSecondary}>View</button> </div> ); }

const sectionTitle = { fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '1rem', color: '#222', };

const step = { marginBottom: '0.5rem', fontSize: '1.1rem', };

const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', };

const productCard = { border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#fff', };

const buttonPrimary = { backgroundColor: '#1e3a8a', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', marginRight: '1rem', };

const buttonSecondary = { backgroundColor: '#e0e7ff', color: '#1e3a8a', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', };

  
