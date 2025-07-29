// app/layout.js
export const metadata = {
  title: 'Growstack',
  description: 'Marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
