import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import SuggestionChips from './components/SuggestionChips';
import './App.css';
import ChatbotWidget from './components/ChatbotWidget';
import AuditLogView from './components/AuditLogView';

function App() {
  const { t } = useTranslation();

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Load chat history from localStorage
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('seettu_chat_messages');
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (error) {
        console.error("Error parsing stored chat messages:", error);
      }
    }
    return [{ id: 1, sender: 'bot', textKey: 'chatbot.welcome', time: getCurrentTime() }];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Sync messages state with localStorage
  useEffect(() => {
    localStorage.setItem('seettu_chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Download chat thread as a .txt file
  const handleExport = () => {
    const chatContent = messages
      .map((msg) => `[${msg.time}] ${msg.sender.toUpperCase()}: ${msg.textKey ? t(msg.textKey) : msg.text}`)
      .join('\n');

    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `Seettu_Chat_History_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(fileUrl);
  };

  const getBotResponseKey = (userQuery) => {
    const query = userQuery.toLowerCase().trim();

    if (query.includes('score') || query.includes('discipline') || query.includes('ලකුණ') || query.includes('විනය') || query.includes('மதிப்பெண்')) {
      return 'botReplies.score';
    }
    if (query.includes('balance') || query.includes('ශේෂ') || query.includes('இருப்பு') || query.includes('sheshaya') || query.includes('keeyada')) {
      return 'botReplies.balance';
    }
    if (query.includes('date') || query.includes('දිනය') || query.includes('தேதி') || query.includes('kavadada') || query.includes('when')) {
      return 'botReplies.paymentDate';
    }
    if (query.includes('pay') || query.includes('ගෙව') || query.includes('பணம்')) {
      return 'botReplies.payment';
    }
    if (query.includes('hi') || query.includes('hello') || query.includes('හලෝ') || query.includes('ආයුබෝවන්') || query.includes('வணக்கம்')) {
      return 'botReplies.greeting';
    }

    return 'botReplies.default';
  };

  const handleSend = (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: getCurrentTime()
    };

    const responseKey = getBotResponseKey(text);

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        textKey: responseKey,
        time: getCurrentTime()
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleLogout = () => {
    const initialMsg = [{ id: Date.now(), sender: 'bot', textKey: 'chatbot.welcome', time: getCurrentTime() }];
    setMessages(initialMsg);
    localStorage.removeItem('seettu_chat_messages');
    setInputText('');
  };

  return (
    <div className="app-container">
      <Navbar onExport={handleExport} />
      <main className="main-content">
        <div className="card">
          <ChatHistory 
            messages={messages} 
            isTyping={isTyping} 
            chatEndRef={chatEndRef} 
          />

          <SuggestionChips onSelectChip={(chipText) => handleSend(chipText)} />

          <ChatInput 
            inputText={inputText} 
            setInputText={setInputText} 
            handleSend={handleSend} 
          />

          <button className="btn-logout" onClick={handleLogout}>
            {t('common.logout')}
          </button>
        </div>

        <div className="card">
    {/* existing chat components */}
  </div>

  {/* Activity Logging view component */}
  <AuditLogView userId={1} />
        
      </main>

      {/* Floating chatbot widget */}
      <ChatbotWidget userId={1} />
    </div>
  );
}

export default App;