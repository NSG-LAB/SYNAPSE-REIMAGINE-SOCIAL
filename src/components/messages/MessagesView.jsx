import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Search, ArrowLeft, Sparkles } from 'lucide-react';

export function MessagesView() {
  const { 
    conversations, 
    activeChatId, 
    setActiveChatId, 
    sendMessage, 
    openModal 
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(Boolean(activeChatId));
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find(c => c.id === activeChatId) || conversations[0];

  const filteredConversations = conversations.filter(c => 
    c.contact.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.contact.handle.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Auto-scroll chat to bottom when active conversation or messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConv?.messages?.length, activeConv?.id]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeConv) return;
    sendMessage(activeConv.id, messageText);
    setMessageText('');
  };

  const handleSelectConv = (id) => {
    setActiveChatId(id);
    setShowMobileChat(true);
  };

  const quickReplies = [
    "Sounds great, let's pair on this!",
    "Are you joining the upcoming sprint?",
    "Sent you the repo link to check out.",
    "Love this direction!"
  ];

  return (
    <div
      className="glass-panel messages-container"
      style={{
        display: 'flex',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        height: 'calc(100dvh - var(--nav-height) - 4.5rem)',
        minHeight: '480px',
        border: '1px solid var(--border-subtle)',
        background: 'var(--color-bg-surface)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Left Pane: Conversation Threads */}
      <div
        className={`conv-list-pane ${showMobileChat ? 'hide-on-mobile-pane' : ''}`}
        style={{
          width: '320px',
          flexShrink: 0,
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-elevated)',
          minWidth: 0
        }}
      >
        {/* Header */}
        <div style={{ padding: '1rem 0.85rem 0.65rem 0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Messages</h2>
            <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>
              {conversations.length} circles
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              color="var(--color-text-muted)"
              style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search conversations..."
              className="input-field"
              style={{
                paddingLeft: '2.2rem',
                fontSize: '0.85rem',
                paddingTop: '0.45rem',
                paddingBottom: '0.45rem'
              }}
            />
          </div>
        </div>

        {/* Thread List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConversations.map((conv) => {
            const isActive = activeConv?.id === conv.id;
            const lastMsg = conv.messages[conv.messages.length - 1];
            return (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className="btn-ghost"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--color-bg-highlight)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent'
                }}
              >
                {/* Avatar with Online Pip */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={conv.contact.avatar}
                    alt={conv.contact.name}
                    style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                  />
                  {conv.contact.online && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '1px',
                        right: '1px',
                        width: '9px',
                        height: '9px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-accent-emerald)',
                        border: '2px solid var(--color-bg-surface)'
                      }}
                    />
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conv.contact.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                      {conv.lastMessageTimestamp}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                    {lastMsg ? (lastMsg.sender === 'user' ? `You: ${lastMsg.text}` : lastMsg.text) : 'Start a chat'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Area */}
      {activeConv ? (
        <div
          className={`chat-active-pane ${!showMobileChat ? 'hide-on-mobile-pane' : ''}`}
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-bg-surface)',
            overflow: 'hidden'
          }}
        >
          {/* Active Chat Header */}
          <div
            style={{
              padding: '0.65rem 0.85rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-bg-elevated)',
              gap: '0.5rem',
              minWidth: 0,
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
              <button
                onClick={() => setShowMobileChat(false)}
                className="btn-icon mobile-back-btn"
                style={{ width: '32px', height: '32px', display: 'none', flexShrink: 0 }}
                aria-label="Back to conversations list"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={() => openModal('profileDetail', activeConv.contact)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0, textAlign: 'left', flex: 1 }}
              >
                <img
                  src={activeConv.contact.avatar}
                  alt={activeConv.contact.name}
                  style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeConv.contact.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent-emerald)', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeConv.contact.role || 'Collaborator'}</span>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => openModal('profileDetail', activeConv.contact)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', flexShrink: 0, padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
            >
              <span className="hide-on-xs-text">View </span>Profile
            </button>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              padding: '1rem 0.85rem',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {activeConv.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: isUser ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '0.7rem 0.95rem',
                      borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: isUser ? 'var(--gradient-brand)' : 'var(--color-bg-elevated)',
                      color: isUser ? '#ffffff' : 'var(--color-text-primary)',
                      border: isUser ? 'none' : '1px solid var(--border-medium)',
                      fontSize: '0.8875rem',
                      lineHeight: 1.45,
                      boxShadow: 'var(--shadow-sm)',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '2px', padding: '0 4px' }}>
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Suggestions */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              overflowX: 'auto',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--color-bg-surface)',
              flexShrink: 0,
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendMessage(activeConv.id, reply)}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <Sparkles size={11} color="var(--color-primary)" />
                {reply}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '0.65rem 0.85rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              background: 'var(--color-bg-elevated)',
              width: '100%',
              boxSizing: 'border-box',
              flexShrink: 0
            }}
          >
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Message ${activeConv.contact.name.split(' ')[0]}...`}
              className="input-field"
              style={{
                flex: 1,
                minWidth: 0,
                width: 'auto',
                fontSize: '16px',
                height: '42px',
                padding: '0 0.85rem',
                margin: 0
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              aria-label="Send message"
              style={{ flexShrink: 0, height: '42px', padding: '0 1rem', borderRadius: 'var(--radius-md)' }}
            >
              <Send size={15} />
              <span>Send</span>
            </button>
          </form>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Select a conversation to start collaborating
        </div>
      )}

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 768px) {
          .messages-container {
            height: calc(100vh - var(--nav-height) - 58px - env(safe-area-inset-bottom, 0px)) !important;
            height: calc(100dvh - var(--nav-height) - 58px - env(safe-area-inset-bottom, 0px)) !important;
            min-height: 0 !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
            border-bottom: none !important;
          }
          .conv-list-pane {
            width: 100% !important;
            border-right: none !important;
          }
          .hide-on-mobile-pane {
            display: none !important;
          }
          .mobile-back-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 420px) {
          .hide-on-xs-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
