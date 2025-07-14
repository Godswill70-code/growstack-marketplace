'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../utils/supabaseClient';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
      } else {
        setUser(session.user);
        setFullName(data?.full_name || '');
        setPhone(data?.phone || '');
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone })
      .eq('id', user.id);

    if (error) {
      setMessage('❌ Failed to update profile.');
    } else {
      setMessage('✅ Profile updated successfully!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>👤 Profile Settings</h2>

      <label>Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        style={inputStyle}
      />

      <label>Phone Number</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
        style={inputStyle}
      />

      <button onClick={handleSave} style={buttonStyle}>
        💾 Save Changes
      </button>

      {message && <p style={{ marginTop: '1rem', color: '#0a0' }}>{message}</p>}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.7rem 1.5rem',
  backgroundColor: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};
