import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { CommunityCard } from '../components/communities/CommunityCard';
import { EventCard } from '../components/events/EventCard';
import { PersonCard } from '../components/people/PersonCard';
import { EmptyState } from '../components/common/EmptyState';
import { mockUsers } from '../data/users';
import { Search, Sparkles, Compass, Award, Users } from 'lucide-react';

export function ExplorePage() {
  const { 
    posts, 
    communities, 
    events, 
    searchQuery, 
    setSearchQuery, 
    userProfile 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'posts' | 'communities' | 'events' | 'people'

  const q = searchQuery.toLowerCase().trim();

  // Search Results
  const matchingPosts = posts.filter(p => 
    !q || 
    p.title.toLowerCase().includes(q) || 
    p.content.toLowerCase().includes(q) || 
    p.communityName.toLowerCase().includes(q) || 
    p.author.name.toLowerCase().includes(q) || 
    p.tags?.some(t => t.toLowerCase().includes(q))
  );

  const matchingCommunities = communities.filter(c => 
    !q || 
    c.name.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q) || 
    c.category.toLowerCase().includes(q) || 
    c.topics?.some(t => t.toLowerCase().includes(q))
  );

  const matchingEvents = events.filter(e => 
    !q || 
    e.title.toLowerCase().includes(q) || 
    e.description.toLowerCase().includes(q) || 
    e.category.toLowerCase().includes(q) || 
    e.organizer.name.toLowerCase().includes(q)
  );

  const matchingPeople = mockUsers.filter(u => 
    u.id !== userProfile.id && (
      !q || 
      u.name.toLowerCase().includes(q) || 
      u.handle.toLowerCase().includes(q) || 
      u.role.toLowerCase().includes(q) || 
      u.bio.toLowerCase().includes(q) || 
      u.skillsOffered?.some(s => s.toLowerCase().includes(q))
    )
  );

  const totalMatches = matchingPosts.length + matchingCommunities.length + matchingEvents.length + matchingPeople.length;

  return (
    <div>
      {/* Header with Search */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          marginBottom: '1.5rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
          <Search size={15} /> Discovery Matrix
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
          Explore the SYNAPSE Ecosystem
        </h1>

        {/* Big Search Input */}
        <div style={{ position: 'relative', maxWidth: '600px', marginTop: '0.75rem' }}>
          <Search
            size={18}
            color="var(--color-text-muted)"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all sparks, guilds, challenges, and makers..."
            className="input-field"
            style={{
              paddingLeft: '2.8rem',
              paddingRight: '1rem',
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-elevated)'
            }}
          />
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
        {[
          { id: 'all', label: `All (${totalMatches})` },
          { id: 'posts', label: `Sparks (${matchingPosts.length})`, icon: Sparkles },
          { id: 'communities', label: `Guilds (${matchingCommunities.length})`, icon: Compass },
          { id: 'events', label: `Challenges (${matchingEvents.length})`, icon: Award },
          { id: 'people', label: `People (${matchingPeople.length})`, icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Content */}
      {totalMatches === 0 ? (
        <EmptyState
          icon={Search}
          title="No Match Found"
          description={`We couldn't find any results matching "${searchQuery}". Try searching with different keywords.`}
          actionLabel="Clear Search Query"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Sparks Section */}
          {(activeTab === 'all' || activeTab === 'posts') && matchingPosts.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--color-primary)" /> Discussion Sparks ({matchingPosts.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {matchingPosts.slice(0, activeTab === 'all' ? 4 : 20).map(p => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}

          {/* Guilds Section */}
          {(activeTab === 'all' || activeTab === 'communities') && matchingCommunities.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={18} color="var(--color-accent-cyan)" /> Topic Guilds ({matchingCommunities.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                {matchingCommunities.slice(0, activeTab === 'all' ? 4 : 20).map(c => (
                  <CommunityCard key={c.id} community={c} />
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          {(activeTab === 'all' || activeTab === 'events') && matchingEvents.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} color="var(--color-accent-amber)" /> Sprints & Jams ({matchingEvents.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                {matchingEvents.slice(0, activeTab === 'all' ? 3 : 20).map(e => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </div>
          )}

          {/* People Section */}
          {(activeTab === 'all' || activeTab === 'people') && matchingPeople.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} color="var(--color-accent-emerald)" /> Makers & Collaborators ({matchingPeople.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
                {matchingPeople.slice(0, activeTab === 'all' ? 4 : 20).map(u => (
                  <PersonCard key={u.id} user={u} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
