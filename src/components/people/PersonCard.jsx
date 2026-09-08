import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { UserPlus, UserCheck, MessageSquare, MapPin } from 'lucide-react';

/**
 * PersonCard displays user avatar, name, handle, bio, and follow/message buttons.
 * Fully keyboard accessible with semantic buttons for profile view and interactions.
 *
 * @param {Object} props
 * @param {import('../../data/mockData').User} props.user - User data object
 * @returns {React.ReactElement}
 */
export function PersonCard({ user }) {
  const { 
    followedUserIds, 
    toggleFollowUser, 
    openModal, 
    startConversationWithUser 
  } = useApp();

  const isFollowed = followedUserIds.includes(user.id);

  return (
    <div
      className="glass-panel card-interactive person-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => openModal('profileDetail', user)}
            style={{ padding: 0 }}
            aria-label={`View ${user.name}'s profile`}
          >
            <SafeImage
              src={user.avatar}
              alt={user.name}
              type="avatar"
              name={user.name}
              loading="lazy"
              style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
            />
          </button>
          <div>
            <h2
              style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.25 }}
            >
              <button
                type="button"
                onClick={() => openModal('profileDetail', user)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {user.name}
              </button>
            </h2>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              @{user.handle}
            </div>
            {user.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                <MapPin size={11} />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Karma Badge */}
        {user.stats?.karma && (
          <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
            {user.stats.karma} Karma
          </span>
        )}
      </div>

      {/* Role */}
      <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
        {user.role}
      </div>

      {/* Bio */}
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.45, marginBottom: '0.85rem', flex: 1 }}>
        {user.bio}
      </p>

      {/* Skills Offered / Needed Synergy Box */}
      <div style={{ background: 'var(--color-bg-elevated)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {user.skillsOffered && (
          <div style={{ fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--color-accent-emerald)', fontWeight: 700 }}>Offers: </span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{user.skillsOffered.join(' • ')}</span>
          </div>
        )}
        {user.skillsNeeded && (
          <div style={{ fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--color-accent-amber)', fontWeight: 700 }}>Seeks: </span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{user.skillsNeeded.join(' • ')}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <button
          onClick={() => toggleFollowUser(user.id)}
          className={`btn btn-sm ${isFollowed ? 'btn-secondary' : 'btn-primary'}`}
          style={{ flex: 1, borderRadius: 'var(--radius-full)' }}
          aria-label={`${isFollowed ? 'Disconnect from' : 'Connect with'} ${user.name}`}
        >
          {isFollowed ? (
            <>
              <UserCheck size={14} color="var(--color-accent-emerald)" /> Connected
            </>
          ) : (
            <>
              <UserPlus size={14} /> Connect
            </>
          )}
        </button>

        <button
          onClick={() => startConversationWithUser(user)}
          className="btn btn-secondary btn-sm"
          style={{ borderRadius: 'var(--radius-full)' }}
          title="Direct Message"
          aria-label={`Send message to ${user.name}`}
        >
          <MessageSquare size={14} />
        </button>
      </div>
    </div>
  );
}
