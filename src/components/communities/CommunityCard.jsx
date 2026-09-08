import React from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { Users, Check, Plus, Award } from 'lucide-react';

export function CommunityCard({ community }) {
  const { joinedCommunityIds, toggleJoinCommunity, openModal } = useApp();
  const isJoined = joinedCommunityIds.includes(community.id);

  return (
    <div
      className="glass-panel community-card"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--border-subtle)',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
      }}
    >
      {/* Cover Image */}
      <button
        type="button"
        aria-label={`View ${community.name} guild details`}
        style={{
          height: '110px',
          width: '100%',
          position: 'relative',
          background: 'var(--color-bg-elevated)',
          overflow: 'hidden',
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          display: 'block',
          textAlign: 'left'
        }}
        onClick={() => openModal('communityDetail', community)}
      >
        <SafeImage
          src={community.coverImage}
          alt={community.name}
          type="cover"
          title={community.name}
          category={community.category}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))'
          }}
        />
        <span
          className="badge"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(10, 13, 20, 0.75)',
            backdropFilter: 'blur(8px)',
            color: 'var(--color-text-primary)'
          }}
        >
          {community.category}
        </span>
      </button>

      {/* Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header with Icon and Name */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '-2rem', marginBottom: '0.65rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-surface)',
              border: '2px solid var(--color-bg-surface)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              flexShrink: 0
            }}
          >
            {community.icon}
          </div>

          <div style={{ paddingTop: '1.25rem', flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                lineHeight: 1.25,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <button
                type="button"
                onClick={() => openModal('communityDetail', community)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block'
                }}
              >
                {community.name}
              </button>
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', lineHeight: 1.45, marginBottom: '0.85rem', flex: 1 }}>
          {community.tagline}
        </p>

        {/* Featured Challenge Pinned */}
        {community.featuredChallenge && (
          <div
            style={{
              background: 'var(--color-bg-elevated)',
              padding: '0.5rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1rem',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <Award size={14} color="var(--color-accent-amber)" />
            <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Sprint: <strong>{community.featuredChallenge}</strong>
            </span>
          </div>
        )}

        {/* Footer with Member Count & Join CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Users size={14} />
            <span>{community.memberCount.toLocaleString()} members</span>
          </div>

          <button
            onClick={() => toggleJoinCommunity(community.id)}
            className={`btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.85rem' }}
            aria-label={`${isJoined ? 'Leave' : 'Join'} guild ${community.name}`}
          >
            {isJoined ? (
              <>
                <Check size={14} color="var(--color-accent-emerald)" /> Joined
              </>
            ) : (
              <>
                <Plus size={14} /> Join Guild
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
