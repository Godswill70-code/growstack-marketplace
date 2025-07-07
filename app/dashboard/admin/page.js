'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabaseClient';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const verifyAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { user } = session;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || data?.role !== 'admin') {
        router.push('/dashboard/customer'); // redirect non-admins
      } else {
        setIsAllowed(true);
      }

      setLoading(false);
    };

    verifyAdmin();
  }, []);

  if (loading) return <p>Checking access...</p>;
  if (!isAllowed) return null;

  return (
    <div>
      <h2>Welcome, Admin 👑</h2>
      <p>You can manage the entire platform here.</p>

      <section style={{ marginTop: '2rem' }}>
        <h4>Invite New Admin</h4>
        <p>Coming soon: form to invite new admins by email</p>
      </section>

      <ul style={{ marginTop: '1rem' }}>
        <li>🛠 Manage Products</li>
        <li>👤 Manage Users & Roles</li>
        <li>📊 Platform Analytics</li>
      </ul>
    </div>
  );
}
