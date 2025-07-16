import { redirect } from 'next/navigation';
import supabase from '../../../utils/supabaseClient';
import HamburgerMenu from '../../../components/HamburgerMenu';

export default async function CustomerLayout({ children }) {
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Optionally, you can check if profile exists
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    redirect('/signup');
  }

  return (
    <div style={{ padding: '1rem' }}>
      {children}
    </div>
  );
}
