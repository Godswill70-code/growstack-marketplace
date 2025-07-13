'use client';

import { useEffect, useState } from 'react'; import { useRouter } from 'next/navigation'; import supabase from '../../../utils/supabaseClient';

export default function ProfilePage() { const [profile, setProfile] = useState(null); const [loading, setLoading] = useState(true); const [fullName, setFullName] = useState(''); const [phone, setPhone] = useState(''); const [message, setMessage] = useState(''); const router = useRouter();

useEffect(() => { const fetchProfile = async () => { const { data: { session }, } = await supabase.auth.getSession();

if (!session) {
    router.push('/login');
    return;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error(error);
    setMessage('Failed to load profile');
  } else {
    setProfile(data);
    setFullName(data.full_name || '');
    setPhone(data.phone || '');
  }
  setLoading(false);
};

fetchProfile();

}, [router]);

const handleUpdate = async () => { const { error } = await supabase .from('profiles') .update({ full_name: fullName, phone }) .eq('id', profile.id);

if (error) {
  setMessage('Failed to update profile');
} else {
  setMessage('Profile updated successfully');
}

};

if (loading) return <p>Loading...</p>;

return ( <div style={{ padding: '2rem' }}> <h2>🧑 Profile Settings</h2>

<p><strong>Email:</strong> {profile.email}</p>
  <p><strong>Role:</strong> {profile.role}</p>
  <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>

  <div style={{ marginTop: '1rem' }}>
    <label>Full Name:</label>
    <input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      style={inputStyle}
    />

    <label>Phone Number:</label>
    <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      style={inputStyle}
    />

    <button onClick={handleUpdate} style={buttonStyle}>
      Save Changes
    </button>
    {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
  </div>
</div>

); }

const inputStyle = { display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '100%', maxWidth: '400px', };

const buttonStyle = { padding: '0.5rem 1rem', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', };

  
