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
        height: 'calc(58px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTop: '1px solid var(--border-medium)',
        background: 'var(--color-glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem'
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
              padding: '0.35rem 0',
              color: isActive ? 'var(--color-primary-text)' : 'var(--color-text-muted)',
              position: 'relative',
              flex: 1,
              background: 'none'
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                transition: 'background-color var(--transition-fast)'
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? 'var(--color-primary-text)' : 'currentColor'} />
              {item.badge > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-accent-rose)'
                  }}
                />
              )}
            </div>
            <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--color-primary-text)' : 'inherit' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
