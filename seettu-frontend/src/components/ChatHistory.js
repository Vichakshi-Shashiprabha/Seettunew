import React from 'react';
import { useTranslation } from 'react-i18next';

function ChatHistory({ messages, isTyping, chatEndRef }) {
  const { t } = useTranslation();

  return (
    <div className="chat-history">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-bubble-wrapper ${msg.sender}`}>
          <div className={`message-bubble ${msg.sender}`}>
            {msg.sender === 'bot' && msg.textKey ? t(msg.textKey) : msg.text}
          </div>
          <span className="timestamp">{msg.time}</span>
        </div>
      ))}

      {/* Typing indicator bubble */}
      {isTyping && (
        <div className="message-bubble-wrapper bot">
          <div className="message-bubble bot typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatHistory;