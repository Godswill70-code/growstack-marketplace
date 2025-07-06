export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <header style={{ padding: '1rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <img
            src="/file_000000000ac461f590983b2630a05f13.png"
            alt="Growstack Marketplace Logo"
            style={{ height: '40px', marginRight: '1rem' }}
          />
          <h1 style={{ fontSize: '1.5rem' }}>Growstack Marketplace</h1>
        </header>

        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
            }
