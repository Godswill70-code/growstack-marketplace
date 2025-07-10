'use client';
import { useEffect } from 'react';

export default function ChatBotWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "vZwJw2Kv67xuVf6XJH6VC");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
      }
