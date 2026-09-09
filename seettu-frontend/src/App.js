import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './App.css';

function App() {
  const { t } = useTranslation();

  // Chat message thread state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: t('chatbot.welcome') }
  ]);

  const [inputText, setInputText] = useState('');
  
  // Reference for scroll container anchor
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message on state change
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message handler
  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated bot response
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: t('chatbot.sampleBot')
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">Seettu App 💳</div>
        <LanguageSwitcher />
      </header>

      <main className="main-content">
        <div className="card">
          
          {/* Scrollable message thread */}
          <div className="chat-history">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {/* Scroll target element */}
            <div ref={chatEndRef} />
          </div>

          {/* Controls section */}
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              placeholder={t('chatbot.placeholder')} 
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-send" onClick={handleSend}>
              {t('chatbot.send')}
            </button>
          </div>

          <button className="btn-logout">{t('common.logout')}</button>
        </div>
      </main>
    </div>
  );
}

export default App;