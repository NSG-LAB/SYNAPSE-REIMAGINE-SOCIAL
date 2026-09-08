import React from 'react';
import { useApp } from '../../context/AppContext';
import { CollabRadar } from '../people/CollabRadar';
import { Flame, Compass, Plus, Check, Zap } from 'lucide-react';

export function RightRail() {
  const { 
    communities, 
    events, 
    joinedCommunityIds, 
    toggleJoinCommunity, 
    openModal, 
    setCurrentView 
  } = useApp();

  const trendingCommunities = communities.slice(0, 3);
  const upcomingChallenges = events.slice(0, 3);

  return (
    <aside aria-label="Discovery & Recommendations" className="right-rail">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Why SYNAPSE Manifesto Callout */}
        <div
          className="glass-panel"
          style={{
            padding: '1.2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-text)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            <Zap size={14} /> The SYNAPSE Ethos
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Connect through <strong>purposeful participation</strong>, not doomscrolling. Join guilds, hack in sprints, and co-create with creators who share your craft.
          </p>
        </div>

        {/* Trending Guilds */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Compass size={15} color="var(--color-primary)" /> Trending Guilds
            </span>
            <button
              onClick={() => setCurrentView('communities')}
              className="btn-ghost"
              style={{ fontSize: '0.75rem', color: 'var(--color-primary-text)', padding: 0 }}
            >
              See all
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {trendingCommunities.map((comm) => {
              const isJoined = joinedCommunityIds.includes(comm.id);
              return (
                <div key={comm.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <button
                    onClick={() => openModal('communityDetail', comm)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textAlign: 'left', minWidth: 0, flex: 1 }}
                  >
                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{comm.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {comm.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {comm.memberCount.toLocaleString()} members
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => toggleJoinCommunity(comm.id)}
                    className={`btn btn-sm ${isJoined ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem' }}
                  >
                    {isJoined ? <Check size={12} /> : <Plus size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Challenges & Jams */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={15} color="var(--color-accent-amber)" /> Active Sprints
            </span>
            <button
              onClick={() => setCurrentView('events')}
              className="btn-ghost"
              style={{ fontSize: '0.75rem', color: 'var(--color-primary-text)', padding: 0 }}
            >
              Explore
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {upcomingChallenges.map((ev) => (
              <div
                key={ev.id}
                onClick={() => openModal('eventDetail', ev)}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-elevated)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-subtle)',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                    +{ev.rewardXP} XP
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{ev.date}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.35, marginBottom: '4px' }}>
                  {ev.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {ev.participantsCount} participants building
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Collab Radar */}
        <CollabRadar compact maxResults={3} />
      </div>
    </aside>
  );
}
