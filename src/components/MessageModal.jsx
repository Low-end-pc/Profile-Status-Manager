import React, { useState } from 'react';
import { X, Send, ArrowLeft, CheckCheck, Smile } from 'lucide-react';

export default function MessageModal({ profile, isOpen, onClose, onShowToast }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Elena',
      avatar: profile.avatarUrl,
      text: `Hey there! Thanks for checking out my profile. What's on your mind?`,
      time: '10:14 AM',
      isMe: false
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You', 
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    onShowToast('Message sent to Elena! 💬');

    // Auto reply simulation after 1.2 seconds
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'Elena',
          avatar: profile.avatarUrl,
          text: `Got your note! I'll review and get back to you shortly.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        }
      ]);
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-modal-container message-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header with Back button */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              type="button" 
              className="browser-back-btn" 
              onClick={onClose}
              title="Return to Profile"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={profile.avatarUrl} alt={profile.name} className="modal-header-avatar" />
              <div>
                <h3 className="modal-header-title">{profile.name}</h3>
                <span className="modal-header-status">Active now</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="glass-icon-btn"
            style={{ width: '32px', height: '32px' }}
            onClick={onClose}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="chat-thread">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrap ${msg.isMe ? 'outgoing' : 'incoming'}`}>
              {!msg.isMe && (
                <img src={msg.avatar} alt="avatar" className="chat-bubble-avatar" />
              )}
              <div className="chat-bubble-content">
                <p className="chat-bubble-text">{msg.text}</p>
                <div className="chat-bubble-footer">
                  <span className="chat-time">{msg.time}</span>
                  {msg.isMe && <CheckCheck size={13} style={{ color: '#38bdf8' }} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="chat-input-bar">
          <input
            type="text"
            placeholder={`Message ${profile.name.split(' ')[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="chat-text-input"
            autoFocus
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!inputText.trim()}
          >
            <Send size={15} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
