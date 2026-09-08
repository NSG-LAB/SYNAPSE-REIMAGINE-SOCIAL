import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { SafeImage } from '../common/SafeImage';
import { mockUsers } from '../../data/users';
import { UserCheck, UserPlus, MessageSquare, MapPin } from 'lucide-react';

export function ProfileDetailModal() {
  const { 
    activeModal, 
    closeModal, 
    followedUserIds, 
    toggleFollowUser, 
    startConversationWithUser,
    posts 
  } = useApp();

  const isOpen = activeModal.type === 'profileDetail';
  if (!isOpen || !activeModal.data) return null;

  // Resolve user profile
  const user = mockUsers.find(u => u.id === activeModal.data.id || u.handle === activeModal.data.handle) || activeModal.data;
  const isFollowed = followedUserIds.includes(user.id);
  const userSparks = posts.filter(p => p.author?.id === user.id || p.author?.handle === user.handle);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={user.name} maxWidth="680px">
      <div>
        {/* Cover & Avatar Header */}
        <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
          <div
            style={{
              height: '140px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: user.cover ? `url(${user.cover}) center/cover` : 'var(--gradient-brand)'
            }}
          />
          <SafeImage
            src={user.avatar}
            alt={user.name}
            type="avatar"
            name={user.name}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: 'var(--radius-full)',
              border: '4px solid var(--color-bg-surface)',
              objectFit: 'cover',
              position: 'absolute',
              bottom: '-28px',
              left: '1.25rem',
              boxShadow: 'var(--shadow-md)'
            }}
          />
          <div style={{ position: 'absolute', bottom: '-28px', right: '1.25rem', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => toggleFollowUser(user.id)}
              className={`btn btn-sm ${isFollowed ? 'btn-secondary' : 'btn-primary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {isFollowed ? <><UserCheck size={14} color="var(--color-accent-emerald)" /> Connected</> : <><UserPlus size={14} /> Connect</>}
            </button>
            <button
              onClick={() => {
                closeModal();
                startConversationWithUser(user);
              }}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <MessageSquare size={14} /> Message
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{user.name}</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>@{user.handle}</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{user.role}</div>
          {user.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              <MapPin size={13} /> {user.location}
            </div>
          )}
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {user.bio}
          </p>
        </div>

        {/* Stats Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            background: 'var(--color-bg-elevated)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Karma</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{user.stats?.karma || 1200}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Sparks</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{user.stats?.sparks || 42}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Completed</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-accent-emerald)' }}>{user.stats?.challengesCompleted || 6}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Collabs</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-accent-cyan)' }}>{user.stats?.collaborators || 24}</div>
          </div>
        </div>

        {/* Skills Offered & Needed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--color-bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-emerald)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Skills Offered
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {user.skillsOffered?.map(s => (
                <span key={s} className="badge badge-emerald" style={{ fontSize: '0.75rem', textTransform: 'none' }}>{s}</span>
              )) || <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>None listed</span>}
            </div>
          </div>

          <div style={{ background: 'var(--color-bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-amber)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Seeking Collaborators In
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {user.skillsNeeded?.map(s => (
                <span key={s} className="badge badge-amber" style={{ fontSize: '0.75rem', textTransform: 'none' }}>{s}</span>
              )) || <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Open to explore</span>}
            </div>
          </div>
        </div>

        {/* Recent Activity Sparks */}
        {userSparks.length > 0 && (
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Recent Contributions ({userSparks.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {userSparks.map(spark => (
                <div
                  key={spark.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
                    {spark.communityName} • {spark.timestamp}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{spark.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
