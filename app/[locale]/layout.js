import { NextIntlClientProvider } from 'next-intl';
import '../../styles/globals.css';
import Navbar from '../../components/Navbar';

export const metadata = {
  title: 'Growstack Marketplace',
  description: 'The leading digital product platform in Africa',
};

export default async function RootLayout({ children, params }) {
  let messages;
  try {
    messages = (await import(`../../locales/${params.locale}/common.json`)).default;
  } catch (error) {
    // fallback to English if locale file is missing
    messages = (await import(`../../locales/en/common.json`)).default;
  }

  return (
    <html lang={params.locale}>
      <body style={{ margin: 0, fontFamily: 'Arial' }}>
        <Navbar />
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
  }
