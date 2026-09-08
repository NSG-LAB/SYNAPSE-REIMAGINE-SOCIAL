import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { EmptyState } from '../components/common/EmptyState';
import { categories } from '../data/topics';
import { Award, Flame, Check, Zap } from 'lucide-react';

export function EventsPage() {
  const { events, joinedEventIds } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'joined' | 'weekend'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = events.filter(e => {
    if (selectedCategory !== 'All' && e.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (activeTab === 'joined') {
      return joinedEventIds.includes(e.id);
    }
    if (activeTab === 'weekend') {
      return e.title.toLowerCase().includes('weekend') || e.type === 'challenge';
    }
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(1.15rem, 3.5vw, 2rem)',
          marginBottom: '1.25rem',
          background: 'radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.15) 0%, rgba(17, 23, 38, 0.95) 75%)',
          border: '1px solid var(--border-medium)',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-accent-amber)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
          <Flame size={16} /> Participatory Social Sprints
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
          Connect by Doing: <span className="gradient-text">Challenges & Sprints</span>
        </h1>
        <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', maxWidth: '640px', lineHeight: 1.55 }}>
          Step out of the spectator seat. Join 48-hour jams, 7-day creative code sprints, field photo runs, and open source builds to earn XP and forge lifelong collaborator bonds.
        </p>
      </div>

      {/* Tabs & Controls with Smooth Touch Scrolling */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 0.85rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            alignItems: 'center',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            maxWidth: '100%',
            flex: '1 1 auto',
            minWidth: 0,
            paddingBottom: '2px'
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            All Challenges ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`btn btn-sm ${activeTab === 'joined' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <Check size={13} /> Joined By Me ({joinedEventIds.length})
          </button>
          <button
            onClick={() => setActiveTab('weekend')}
            className={`btn btn-sm ${activeTab === 'weekend' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            ⚡ Fast Jams
          </button>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <Zap size={14} color="var(--color-accent-amber)" />
          <span>Earn proof-of-work karma</span>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Event Cards */}
      {filteredEvents.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.35rem'
          }}
        >
          {filteredEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Award}
          title="No Sprints Found"
          description={`No active events match category "${selectedCategory}". Try selecting another category or resetting filters!`}
          actionLabel="Reset Sprints Filter"
          onAction={() => {
            setSelectedCategory('All');
            setActiveTab('all');
          }}
        />
      )}
    </div>
  );
}
