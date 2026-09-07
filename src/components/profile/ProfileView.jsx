import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../feed/PostCard';
import { CommunityCard } from '../communities/CommunityCard';
import { EventCard } from '../events/EventCard';
import { 
  Sparkles, 
  Compass, 
  Award, 
  Bookmark, 
  MapPin, 
  Globe, 
  Calendar, 
  Edit3, 
  Zap, 
  Users 
} from 'lucide-react';

export function ProfileView() {
  const { 
    userProfile, 
    openModal, 
    posts, 
    communities, 
    events, 
    joinedCommunityIds, 
    joinedEventIds, 
    savedPostIds 
  } = useApp();

  const [activeTab, setActiveTab] = useState('sparks'); // 'sparks' | 'guilds' | 'challenges' | 'saved'

  // Filtered collections
  const myPosts = posts.filter(p => p.author?.handle === userProfile.handle || p.author?.name === userProfile.name);
  const myGuilds = communities.filter(c => joinedCommunityIds.includes(c.id));
  const myEvents = events.filter(e => joinedEventIds.includes(e.id));
  const mySavedPosts = posts.filter(p => savedPostIds.includes(p.id));

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Banner & Avatar Container */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Cover Photo */}
        <div
          style={{
            height: '180px',
            width: '100%',
            background: userProfile.cover ? `url(${userProfile.cover}) center/cover` : 'var(--gradient-brand)',
            position: 'relative'
          }}
        />

        {/* Profile Info Row */}
        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', position: 'relative' }}>
          {/* Avatar and Edit Button */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '-42px', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              style={{
                width: '92px',
                height: '92px',
                borderRadius: 'var(--radius-full)',
                border: '4px solid var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                objectFit: 'cover'
              }}
            />

            <button
              onClick={() => openModal('editProfile')}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1.1rem' }}
            >
              <Edit3 size={15} /> Edit Profile
            </button>
          </div>

          {/* User Names & Role */}
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '2px' }}>{userProfile.name}</h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
            @{userProfile.handle}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
            {userProfile.role}
          </div>

          {/* Bio */}
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', maxWidth: '720px', marginBottom: '1rem' }}>
            {userProfile.bio}
          </p>

          {/* Metadata Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
            {userProfile.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={14} /> {userProfile.location}
              </span>
            )}
            {userProfile.joinedDate && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {userProfile.joinedDate}
              </span>
            )}
            {userProfile.website && (
              <a
                href={userProfile.website}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-accent-cyan)' }}
              >
                <Globe size={14} /> {userProfile.website.replace('https://', '')}
              </a>
            )}
          </div>

          {/* Karma & Impact Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
              gap: '0.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ background: 'var(--color-bg-elevated)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Community Karma</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>{userProfile.stats.karma}</div>
            </div>

            <div style={{ background: 'var(--color-bg-elevated)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Published Sparks</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent-amber)' }}>{myPosts.length}</div>
            </div>

            <div style={{ background: 'var(--color-bg-elevated)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Challenges Sprinted</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent-emerald)' }}>{myEvents.length}</div>
            </div>

            <div style={{ background: 'var(--color-bg-elevated)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Guild Memberships</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent-cyan)' }}>{myGuilds.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          maxWidth: '100%'
        }}
      >
        <button
          onClick={() => setActiveTab('sparks')}
          className={`btn btn-sm ${activeTab === 'sparks' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <Sparkles size={14} /> My Sparks ({myPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('guilds')}
          className={`btn btn-sm ${activeTab === 'guilds' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <Compass size={14} /> Joined Guilds ({myGuilds.length})
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={`btn btn-sm ${activeTab === 'challenges' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <Award size={14} /> Active Sprints ({myEvents.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`btn btn-sm ${activeTab === 'saved' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <Bookmark size={14} /> Saved Sparks ({mySavedPosts.length})
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'sparks' && (
          <div>
            {myPosts.length > 0 ? (
              myPosts.map(p => <PostCard key={p.id} post={p} />)
            ) : (
              <p style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                You haven’t posted any sparks yet. Click "New Spark" to share with the community!
              </p>
            )}
          </div>
        )}

        {activeTab === 'guilds' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
            {myGuilds.length > 0 ? (
              myGuilds.map(c => <CommunityCard key={c.id} community={c} />)
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                You haven't joined any guilds yet. Explore guilds to connect with creators!
              </p>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
            {myEvents.length > 0 ? (
              myEvents.map(e => <EventCard key={e.id} event={e} />)
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                No active challenges joined. Head over to Challenges to find an upcoming jam!
              </p>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {mySavedPosts.length > 0 ? (
              mySavedPosts.map(p => <PostCard key={p.id} post={p} />)
            ) : (
              <p style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                No saved sparks yet. Bookmark any post from the feed to review it later.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
