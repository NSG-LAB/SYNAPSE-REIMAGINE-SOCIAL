import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { 
  CheckCheck, 
  Flame, 
  MessageSquare, 
  Compass, 
  UserCheck, 
  Heart, 
  ExternalLink 
} from 'lucide-react';

export function NotificationsView() {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    openModal, 
    posts, 
    events, 
    communities 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');

  const filtered = notifications.filter(n => {
    if (activeTab === 'challenges') return n.type.includes('challenge');
    if (activeTab === 'discussions') return n.type === 'comment' || n.type === 'like';
    if (activeTab === 'guilds') return n.type === 'guild_invite';
    return true;
  });

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);

    if (notif.targetType === 'event') {
      const ev = events.find(e => e.id === notif.targetId);
      if (ev) openModal('eventDetail', ev);
    } else if (notif.targetType === 'post') {
      const p = posts.find(post => post.id === notif.targetId);
      if (p) openModal('postDetail', p);
    } else if (notif.targetType === 'community') {
      const c = communities.find(comm => comm.id === notif.targetId);
      if (c) openModal('communityDetail', c);
    } else if (notif.targetType === 'user') {
      openModal('profileDetail', notif.user);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'challenge_joined':
      case 'challenge_milestone':
        return <Flame size={16} color="var(--color-accent-amber)" />;
      case 'comment':
        return <MessageSquare size={16} color="var(--color-primary)" />;
      case 'guild_invite':
        return <Compass size={16} color="var(--color-accent-cyan)" />;
      case 'follow':
        return <UserCheck size={16} color="var(--color-accent-emerald)" />;
      case 'like':
      default:
        return <Heart size={16} color="var(--color-accent-rose)" />;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Activity & Notifications</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Stay updated with your active challenges, guild invites, and peer collaborations
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="btn btn-secondary btn-sm"
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <CheckCheck size={15} /> Mark All as Read
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
        {[
          { id: 'all', label: 'All Activity' },
          { id: 'challenges', label: 'Sprints & Jams' },
          { id: 'discussions', label: 'Sparks & Comments' },
          { id: 'guilds', label: 'Guild Invites' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length > 0 ? (
          filtered.map((notif) => (
            <div
              key={notif.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNotificationClick(notif);
                }
              }}
              onClick={() => handleNotificationClick(notif)}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                cursor: 'pointer',
                background: notif.read ? 'var(--color-bg-surface)' : 'var(--color-bg-highlight)',
                borderLeft: notif.read ? '3px solid transparent' : '3px solid var(--color-primary)',
                transition: 'transform var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ position: 'relative' }}>
                  <SafeImage
                    src={notif.user.avatar}
                    alt={notif.user.name}
                    type="avatar"
                    name={notif.user.name}
                    style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-full)',
                      padding: '2px',
                      display: 'flex'
                    }}
                  >
                    {renderIcon(notif.type)}
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>
                    {notif.title}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {notif.description}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {notif.timestamp}
                </span>
                <ExternalLink size={14} color="var(--color-text-muted)" />
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            No notifications in this filter tab.
          </p>
        )}
      </div>
    </div>
  );
}
