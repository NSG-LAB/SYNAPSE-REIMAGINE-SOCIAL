import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from '../common/SafeImage';
import { EmptyState } from '../common/EmptyState';
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
  Edit3
} from 'lucide-react';
import { StreakXPWidget } from './StreakXPWidget';

export function ProfileView() {
  const { 
    userProfile, 
    openModal, 
    setCurrentView,
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
    <div className="profile-container">
      {/* Banner & Avatar Container */}
      <div className="glass-panel profile-card">
        {/* Cover Photo */}
        <div
          className="profile-cover"
          style={{
            background: userProfile.cover ? `url(${userProfile.cover}) center/cover` : 'var(--gradient-brand)'
          }}
        />

        {/* Profile Info Row */}
        <div className="profile-body">
          {/* Avatar and Edit Button */}
          <div className="profile-header-actions">
            <SafeImage
              src={userProfile.avatar}
              alt={userProfile.name}
              type="avatar"
              name={userProfile.name}
              className="profile-avatar-img"
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
          <h1 className="profile-title">{userProfile.name}</h1>
          <div className="profile-handle">
            @{userProfile.handle}
          </div>
          <div className="profile-role">
            {userProfile.role}
          </div>

          {/* Bio */}
          <p className="profile-bio">
            {userProfile.bio}
          </p>

          {/* Metadata Badges */}
          <div className="profile-meta-row">
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
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <div className="profile-stat-label">Community Karma</div>
              <div className="profile-stat-value" style={{ color: 'var(--color-primary)' }}>{userProfile.stats.karma}</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-label">Published Sparks</div>
              <div className="profile-stat-value" style={{ color: 'var(--color-accent-amber)' }}>{myPosts.length}</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-label">Challenges Sprinted</div>
              <div className="profile-stat-value" style={{ color: 'var(--color-accent-emerald)' }}>{myEvents.length}</div>
            </div>

            <div className="profile-stat-box">
              <div className="profile-stat-label">Guild Memberships</div>
              <div className="profile-stat-value" style={{ color: 'var(--color-accent-cyan)' }}>{myGuilds.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak & XP Widget */}
      <StreakXPWidget />

      {/* Tabs */}
      <div className="profile-tabs-scroll">
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
              <EmptyState
                icon={Sparkles}
                title="No Sparks Shared Yet"
                description="Share your first spark, proof-of-work snippet, or ask a technical inquiry to earn XP."
                actionLabel="Share First Spark"
                onAction={() => openModal('createPost')}
              />
            )}
          </div>
        )}

        {activeTab === 'guilds' && (
          <div>
            {myGuilds.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                {myGuilds.map(c => <CommunityCard key={c.id} community={c} />)}
              </div>
            ) : (
              <EmptyState
                icon={Compass}
                title="No Guilds Joined"
                description="Guilds are autonomous maker collectives. Join one to collaborate on projects and participate in sprints."
                actionLabel="Explore Guilds"
                onAction={() => setCurrentView('communities')}
              />
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            {myEvents.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                {myEvents.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            ) : (
              <EmptyState
                icon={Award}
                title="No Active Sprints"
                description="Participate in timed maker sprints and solve bounties to level up your maker rank."
                actionLabel="Browse Active Sprints"
                onAction={() => setCurrentView('events')}
              />
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {mySavedPosts.length > 0 ? (
              mySavedPosts.map(p => <PostCard key={p.id} post={p} />)
            ) : (
              <EmptyState
                icon={Bookmark}
                title="No Saved Sparks"
                description="You haven't bookmarked any sparks yet. Save insightful discussions or proof-of-work for quick reference."
                actionLabel="Discover Sparks"
                onAction={() => setCurrentView('discover')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
