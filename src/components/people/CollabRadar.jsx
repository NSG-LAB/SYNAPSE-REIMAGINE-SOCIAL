import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { mockUsers } from '../../data/users';
import { Radar, ArrowLeftRight, MessageSquare, UserPlus, Check, Zap } from 'lucide-react';

// Calculate match score between two users
function computeMatchScore(currentUser, otherUser) {
  const currentOffers = (currentUser.skillsOffered || []).map(s => s.toLowerCase());
  const currentNeeds = (currentUser.skillsNeeded || []).map(s => s.toLowerCase());
  const otherOffers = (otherUser.skillsOffered || []).map(s => s.toLowerCase());
  const otherNeeds = (otherUser.skillsNeeded || []).map(s => s.toLowerCase());

  // What current user can offer that other user needs
  const iCanHelp = currentOffers.filter(s =>
    otherNeeds.some(n => n.includes(s) || s.includes(n))
  );
  // What other user can offer that current user needs
  const theyCanHelp = otherOffers.filter(s =>
    currentNeeds.some(n => n.includes(s) || s.includes(n))
  );

  // Bidirectional match is much more valuable
  const bidirectionalBonus = (iCanHelp.length > 0 && theyCanHelp.length > 0) ? 25 : 0;
  
  // Shared interests bonus
  const sharedInterests = (currentUser.interests || []).filter(i =>
    (otherUser.interests || []).some(j => j.toLowerCase() === i.toLowerCase())
  );

  const rawScore = (iCanHelp.length * 20) + (theyCanHelp.length * 20) + bidirectionalBonus + (sharedInterests.length * 5);
  const matchPercent = Math.min(Math.round(rawScore), 99);

  return {
    matchPercent,
    iCanHelp: currentOffers.filter(s => otherNeeds.some(n => n.includes(s) || s.includes(n))).map(s =>
      currentUser.skillsOffered.find(sk => sk.toLowerCase() === s) || s
    ),
    theyCanHelp: otherOffers.filter(s => currentNeeds.some(n => n.includes(s) || s.includes(n))).map(s =>
      otherUser.skillsOffered.find(sk => sk.toLowerCase() === s) || s
    ),
    sharedInterests,
    isBidirectional: iCanHelp.length > 0 && theyCanHelp.length > 0,
  };
}

function MatchRing({ percent, size = 48, strokeWidth = 3 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const getColor = (p) => {
    if (p >= 70) return '#10b981';
    if (p >= 50) return '#6366f1';
    if (p >= 30) return '#f59e0b';
    return '#64748b';
  };

  const color = getColor(percent);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(100, 116, 139, 0.15)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 4px ${color}40)`,
          }}
        />
      </svg>
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: size > 40 ? '0.75rem' : '0.6rem',
        fontWeight: 800,
        color,
      }}>
        {percent}%
      </span>
    </div>
  );
}

function CollabMatchCard({ match, onConnect, onMessage, onViewProfile, isFollowed, compact = false }) {
  const { user, matchPercent, iCanHelp, theyCanHelp, sharedInterests, isBidirectional } = match;

  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.6rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          transition: 'border-color var(--transition-fast)',
        }}
        onClick={() => onViewProfile(user)}
      >
        <MatchRing percent={matchPercent} size={36} strokeWidth={2.5} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {theyCanHelp.length > 0 ? `Offers: ${theyCanHelp[0]}` : user.role.split('&')[0].trim()}
          </div>
        </div>
        {isBidirectional && (
          <ArrowLeftRight size={12} color="var(--color-accent-emerald)" style={{ flexShrink: 0 }} />
        )}
      </div>
    );
  }

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.1rem',
        background: 'var(--color-bg-surface)',
        border: isBidirectional ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-medium)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        minWidth: '260px',
        maxWidth: '320px',
        flex: '0 0 auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: 44, height: 44, borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
          {isBidirectional && (
            <span style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 16, height: 16, borderRadius: '50%',
              background: 'var(--color-accent-emerald)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)',
            }}>
              <ArrowLeftRight size={8} color="#fff" />
            </span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.role}
          </div>
        </div>
        <MatchRing percent={matchPercent} size={48} />
      </div>

      {/* Skill Exchange */}
      <div style={{ marginBottom: '0.75rem' }}>
        {theyCanHelp.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.35rem',
            fontSize: '0.75rem', color: 'var(--color-text-secondary)',
          }}>
            <span style={{ color: 'var(--color-accent-emerald)', fontWeight: 700, flexShrink: 0, fontSize: '0.68rem' }}>
              THEY OFFER →
            </span>
            <span style={{ fontWeight: 600 }}>
              {theyCanHelp.join(', ')}
            </span>
          </div>
        )}
        {iCanHelp.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.4rem',
            fontSize: '0.75rem', color: 'var(--color-text-secondary)',
          }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0, fontSize: '0.68rem' }}>
              YOU OFFER →
            </span>
            <span style={{ fontWeight: 600 }}>
              {iCanHelp.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Shared Interests */}
      {sharedInterests.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
          {sharedInterests.slice(0, 3).map(interest => (
            <span
              key={interest}
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <button
          onClick={() => onConnect(user.id)}
          className={`btn btn-sm ${isFollowed ? 'btn-secondary' : 'btn-primary'}`}
          style={{ borderRadius: 'var(--radius-full)', flex: 1, fontSize: '0.75rem' }}
        >
          {isFollowed ? <Check size={12} /> : <UserPlus size={12} />}
          {isFollowed ? 'Connected' : 'Connect'}
        </button>
        <button
          onClick={() => onMessage(user)}
          className="btn btn-sm btn-ghost"
          style={{ borderRadius: 'var(--radius-full)', fontSize: '0.75rem' }}
        >
          <MessageSquare size={12} />
        </button>
      </div>
    </div>
  );
}

export function CollabRadar({ compact = false, maxResults = 8 }) {
  const {
    userProfile,
    followedUserIds,
    toggleFollowUser,
    startConversationWithUser,
    openModal,
  } = useApp();

  const matches = useMemo(() => {
    const otherUsers = mockUsers.filter(u => u.id !== userProfile.id);
    return otherUsers
      .map(user => {
        const result = computeMatchScore(userProfile, user);
        return { user, ...result };
      })
      .filter(m => m.matchPercent > 0)
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, maxResults);
  }, [userProfile, maxResults]);

  if (matches.length === 0) return null;

  // Compact mode for RightRail
  if (compact) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-bg-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <span style={{
            fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
            color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            <Radar size={15} color="var(--color-accent-emerald)" /> Collab Radar
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {matches.slice(0, 3).map(match => (
            <CollabMatchCard
              key={match.user.id}
              match={match}
              onConnect={toggleFollowUser}
              onMessage={startConversationWithUser}
              onViewProfile={(u) => openModal('profileDetail', u)}
              isFollowed={followedUserIds.includes(match.user.id)}
              compact
            />
          ))}
        </div>
      </div>
    );
  }

  // Full radar section for PeoplePage
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <Radar size={18} color="var(--color-accent-emerald)" />
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Collaboration Radar
              </span>
              {matches.filter(m => m.isBidirectional).length > 0 && (
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-accent-emerald)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  animation: 'pulse 2s infinite',
                }}>
                  <Zap size={9} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                  {matches.filter(m => m.isBidirectional).length} mutual matches
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Smart-matched based on your skills offered ↔ skills needed
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.72rem', color: 'var(--color-text-muted)',
          }}>
            <ArrowLeftRight size={12} color="var(--color-accent-emerald)" />
            <span>= Bidirectional match</span>
          </div>
        </div>
      </div>

      {/* Horizontally scrollable cards */}
      <div
        style={{
          display: 'flex',
          gap: '0.85rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        {matches.map(match => (
          <div key={match.user.id} style={{ scrollSnapAlign: 'start' }}>
            <CollabMatchCard
              match={match}
              onConnect={toggleFollowUser}
              onMessage={startConversationWithUser}
              onViewProfile={(u) => openModal('profileDetail', u)}
              isFollowed={followedUserIds.includes(match.user.id)}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
