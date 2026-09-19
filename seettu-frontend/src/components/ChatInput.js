import React from 'react';
import { useTranslation } from 'react-i18next';

function ChatInput({ inputText, setInputText, handleSend }) {
  const { t } = useTranslation();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
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
  );
}

export default ChatInput;