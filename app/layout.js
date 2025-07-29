export const metadata = {
  title: 'Growstack Marketplace',
  description: 'Your digital product hub in Africa'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
    }
