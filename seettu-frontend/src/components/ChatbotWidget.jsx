import React, { useState } from 'react';
import axios from 'axios';

const ChatbotWidget = ({ userId }) => {
    // Managing open/close state of the chat window
    const [isOpen, setIsOpen] = useState(false);
    
    // Default chat messages list
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! Ask me about Seettu rules or your payment due dates.' }
    ]);
    
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const CHATBOT_API = 'http://localhost:8080/api/chatbot/ask';

    // Form submit handler to handle backend request
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = inputText.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInputText('');
        setLoading(true);

        try {
            const response = await axios.post(CHATBOT_API, {
                message: userMsg,
                userId: userId || null
            });
            setMessages(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, unable to connect to chatbot service.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    style={{ padding: '12px 20px', borderRadius: '25px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                >
                    💬 Ask Assistant
                </button>
            )}

            {isOpen && (
                <div style={{ width: '320px', height: '420px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <div style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Seettu Assistant 🤖</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>✖</button>
                    </div>

                    <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#f1f0f0',
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    maxWidth: '80%',
                                    fontSize: '14px'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div style={{ fontSize: '12px', color: '#888' }}>Typing...</div>}
                    </div>

                    <form onSubmit={handleSendMessage} style={{ display: 'flex', borderTop: '1px solid #eee', padding: '5px' }}>
                        <input 
                            type="text" 
                            placeholder="Type a question..." 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            style={{ flex: 1, padding: '8px', border: 'none', outline: 'none' }}
                        />
                        <button type="submit" style={{ padding: '8px 12px', border: 'none', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;