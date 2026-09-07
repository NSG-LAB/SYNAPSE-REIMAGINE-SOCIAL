import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Compass, Award, MessageSquare, UserCheck } from 'lucide-react';

export function MobileNav() {
  const { currentView, setCurrentView, unreadMessagesCount } = useApp();

  const items = [
    { id: 'discover', label: 'Discover', icon: Sparkles },
    { id: 'communities', label: 'Guilds', icon: Compass },
    { id: 'events', label: 'Challenges', icon: Award },
    { id: 'messages', label: 'Chat', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'profile', label: 'Profile', icon: UserCheck }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="mobile-bottom-nav glass-panel"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 850,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTop: '1px solid var(--border-medium)',
        background: 'var(--color-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '0 0.5rem'
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '0.4rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              position: 'relative',
              flex: 1
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              {item.badge > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-accent-rose)'
                  }}
                />
              )}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 700 : 500 }}>
              {item.label}
            </span>
          </button>
        );
      })}

      <style>{`
        @media (min-width: 900px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
