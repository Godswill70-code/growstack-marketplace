// app/page.js
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to English as the default locale
  redirect('/en');
  return null;
}
