'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function AdminDashboard() {
  const [admins, setAdmins] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert('You must be logged in');
        return;
      }

      setCurrentUser(user);

      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('role', 'admin');

      if (error) {
        console.error('Failed to fetch admins:', error.message);
      } else {
        setAdmins(data);
      }

      setLoading(false);
    };

    fetchAdmins();
  }, []);

  const removeAdmin = async (adminId) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'customer' })
      .eq('id', adminId);

    if (error) {
      alert('Failed to remove admin');
      console.error(error.message);
    } else {
      setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠 Admin Dashboard</h2>
      <p style={{ marginBottom: '1rem' }}>
        Welcome, manage your platform below.
      </p>

      <h3>👑 Current Admins:</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {admins.map((admin) => (
            <li
              key={admin.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem',
                borderBottom: '1px solid #ddd',
              }}
            >
              <span>{admin.email}</span>
              {admin.id !== currentUser?.id && (
                <button
                  style={{
                    background: '#f44336',
                    color: '#fff',
                    border: 'none',
                    padding: '0.3rem 0.6rem',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                  onClick={() => removeAdmin(admin.id)}
                >
                  Remove Admin
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
    }
