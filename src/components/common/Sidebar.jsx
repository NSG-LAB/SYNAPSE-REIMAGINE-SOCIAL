import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Compass, 
  Award, 
  Users, 
  Search, 
  MessageSquare, 
  Bell, 
  UserCheck, 
  Plus, 
  Settings
} from 'lucide-react';
import { StreakXPWidget } from '../profile/StreakXPWidget';

export function Sidebar() {
  const {
    currentView,
    setCurrentView,
    userProfile,
    communities,
    joinedCommunityIds,
    unreadNotificationsCount,
    unreadMessagesCount,
    openModal
  } = useApp();

  const joinedCommunities = communities.filter(c => joinedCommunityIds.includes(c.id));

  const navItems = [
    { id: 'discover', label: 'Discover Sparks', icon: Sparkles },
    { id: 'communities', label: 'Topic Guilds', icon: Compass, badge: joinedCommunities.length },
    { id: 'events', label: 'Challenges & Jams', icon: Award },
    { id: 'people', label: 'Synergy Matcher', icon: Users },
    { id: 'explore', label: 'Explore & Search', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: unreadMessagesCount },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount },
    { id: 'profile', label: 'My Impact Profile', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside aria-label="Sidebar Navigation" className="sidebar-desktop">
      {/* User Quick Karma Card */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          background: 'var(--color-bg-surface)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            style={{ width: '46px', height: '46px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userProfile.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              @{userProfile.handle}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ background: 'var(--color-bg-elevated)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Karma</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{userProfile.stats.karma}</div>
          </div>
          <div style={{ background: 'var(--color-bg-elevated)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Sparks</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent-amber)' }}>{userProfile.stats.sparks}</div>
          </div>
        </div>
      </div>

      {/* Compact Streak & XP Widget */}
      <div style={{ marginBottom: '1.25rem' }}>
        <StreakXPWidget compact />
      </div>

      {/* Main Navigation Links */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          marginBottom: '1.5rem'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem'
              }}
            >
              <Icon size={18} />
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.count > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--color-accent-rose)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {item.count}
                </span>
              )}
              {item.badge !== undefined && !item.count && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Joined Guilds Quick Access */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.1rem',
          background: 'var(--color-bg-surface)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, color: 'var(--color-text-muted)' }}>
            My Guilds ({joinedCommunities.length})
          </span>
          <button
            onClick={() => openModal('createCommunity')}
            title="Create new community guild"
            className="btn-icon"
            style={{ width: '26px', height: '26px', borderRadius: 'var(--radius-sm)' }}
          >
            <Plus size={14} />
          </button>
        </div>

        {joinedCommunities.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            No guilds joined yet. Explore the directory to find your craft!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {joinedCommunities.slice(0, 5).map(comm => (
              <button
                key={comm.id}
                onClick={() => openModal('communityDetail', comm)}
                className="btn-ghost"
                style={{
                  padding: '0.4rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{comm.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                  {comm.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
