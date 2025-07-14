import '../globals.css';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabaseClient';
import ChatBotWidget from '../../components/ChatBotWidget';

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📊 Dashboard</h2>
      <div>{children}</div>
      <ChatBotWidget />
    </div>
  );
}
