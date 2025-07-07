import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial' }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
