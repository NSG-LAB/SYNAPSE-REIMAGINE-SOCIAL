import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { FilterBar } from '../components/feed/FilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { 
  Sparkles, 
  Flame, 
  PlusCircle, 
  Users, 
  Award 
} from 'lucide-react';

export function DiscoverPage() {
  const { 
    userProfile, 
    posts, 
    selectedCategory, 
    sortBy, 
    openModal 
  } = useApp();

  const [activeIntent, setActiveIntent] = useState('All');

  const intents = [
    { id: 'All', label: 'All Sparks', icon: Sparkles },
    { id: 'Collab', label: 'Collabs', icon: Users },
    { id: 'Sprint', label: 'Challenges', icon: Flame },
    { id: 'Showcase', label: 'Showcases', icon: Award }
  ];

  // Filtering & Sorting
  const filteredPosts = posts.filter(post => {
    // Category filter
    if (selectedCategory !== 'All' && post.tags && !post.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))) {
      return false;
    }
    // Intent filter
    if (activeIntent === 'Collab' && post.type !== 'question' && post.type !== 'spark') return false;
    if (activeIntent === 'Sprint' && post.type !== 'challenge') return false;
    if (activeIntent === 'Showcase' && post.type !== 'showcase') return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    if (sortBy === 'active') return (b.commentsCount || 0) - (a.commentsCount || 0);
    if (sortBy === 'recommended') return (b.likesCount * 2 + (b.commentsCount || 0)) - (a.likesCount * 2 + (a.commentsCount || 0));
    // Default: trending
    return (b.likesCount + (b.savesCount || 0) * 2) - (a.likesCount + (a.savesCount || 0) * 2);
  });

  return (
    <div>
      {/* Modern Hero Dashboard Welcome Area */}
      <section
        aria-label="Welcome and Intent"
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(1.2rem, 3.5vw, 2rem)',
          marginBottom: '1.25rem',
          background: 'radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.15) 0%, rgba(17, 23, 38, 0.95) 70%)',
          border: '1px solid var(--border-medium)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-emerald)', display: 'inline-block', boxShadow: '0 0 10px var(--color-accent-emerald)' }} />
            Welcome back, {userProfile.name.split(' ')[0]}
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.3rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.65rem' }}>
            Where Ideas Turn into <span className="gradient-text">Collaborative Action</span>
          </h1>

          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', maxWidth: '640px', lineHeight: 1.55, marginBottom: '1.25rem' }}>
            Discover active builders, participate in 48-hour challenges, join topic guilds, and build real-world creations.
          </p>

          {/* Intent Selector Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Intent:</span>
            {intents.map((item) => {
              const Icon = item.icon;
              const isSelected = activeIntent === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIntent(item.id)}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.78rem'
                  }}
                >
                  <Icon size={13} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Decorative Ambient Glow in background */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
      </section>

      {/* Quick Action Banner */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '1rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 0 }}>
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', objectFit: 'cover', flexShrink: 0 }}
          />
          <button
            onClick={() => openModal('createPost')}
            className="input-field"
            style={{
              padding: '0.5rem 0.85rem',
              color: 'var(--color-text-muted)',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-elevated)',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
              minWidth: 0
            }}
          >
            Ignite a spark, launch a challenge, or ask...
          </button>
        </div>

        <button
          onClick={() => openModal('createPost')}
          className="btn btn-primary btn-sm spark-banner-btn"
          style={{ borderRadius: 'var(--radius-full)', flexShrink: 0 }}
        >
          <PlusCircle size={15} />
          <span className="hide-on-mobile-text">Post Spark</span>
        </button>
      </div>

      {/* Category Pills & Sort Bar */}
      <FilterBar />

      {/* Feed Stream */}
      <main aria-label="Sparks and Discussions Feed">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <EmptyState
            title="No Sparks Found"
            description={`No contributions match category "${selectedCategory}" with intent "${activeIntent}". Try clearing filters or create a new spark!`}
            actionLabel="Post New Spark"
            onAction={() => openModal('createPost')}
          />
        )}
      </main>

      <style>{`
        @media (max-width: 540px) {
          .hide-on-mobile-text {
            display: none !important;
          }
          .spark-banner-btn {
            padding: 0.35rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
