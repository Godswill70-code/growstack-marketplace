'use client';
import { useState, useEffect } from 'react';

export default function LanguageSelector() {
  const [language, setLanguage] = useState('en');

  // Load previously selected language (if any)
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem('preferredLanguage', selected);

    // For now, we just store it, later you can trigger translations
    console.log('🌐 Language changed to:', selected);
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      style={{
        padding: '6px 10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
        marginLeft: 'auto',
      }}
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="de">Deutsch</option>
      <option value="pt">Português</option>
    </select>
  );
  }
