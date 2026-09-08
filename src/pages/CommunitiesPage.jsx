import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityCard } from '../components/communities/CommunityCard';
import { EmptyState } from '../components/common/EmptyState';
import { categories } from '../data/topics';
import { Compass, Plus, Search, Check } from 'lucide-react';

export function CommunitiesPage() {
  const { 
    communities, 
    joinedCommunityIds, 
    openModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'joined' | 'hyperactive'
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCommunities = communities.filter(c => {
    // Search query
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const match = c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.topics.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Category
    if (selectedCategory !== 'All' && c.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // Tab filter
    if (activeTab === 'joined') {
      return joinedCommunityIds.includes(c.id);
    }
    if (activeTab === 'hyperactive') {
      return c.activityLevel === 'Hyperactive' || c.activityLevel === 'High';
    }

    return true;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
            <Compass size={15} /> Topic Spaces & Guilds
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800 }}>Explore Creative Guilds</h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', maxWidth: '580px', lineHeight: 1.5 }}>
            Purpose-driven spaces where domain experts, artists, engineers, and researchers conduct sprints and build open knowledge.
          </p>
        </div>

        <button
          onClick={() => openModal('createCommunity')}
          className="btn btn-primary"
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Plus size={16} /> Launch New Guild
        </button>
      </div>

      {/* Control Strip: Tabs & Search */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 0.85rem',
          marginBottom: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Tabs with Smooth Touch Scrolling */}
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
            All Guilds ({communities.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`btn btn-sm ${activeTab === 'joined' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <Check size={13} /> Joined ({joinedCommunityIds.length})
          </button>
          <button
            onClick={() => setActiveTab('hyperactive')}
            className={`btn btn-sm ${activeTab === 'hyperactive' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            🔥 Most Active
          </button>
        </div>

        {/* Guild Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '280px', flex: '1 1 200px', minWidth: 0 }}>
          <Search size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search guilds by name or tag..."
            className="input-field"
            style={{ paddingLeft: '2.2rem', paddingRight: '0.75rem', paddingTop: '0.4rem', paddingBottom: '0.4rem', fontSize: '0.8125rem', width: '100%', boxSizing: 'border-box' }}
          />
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

      {/* Grid of Community Cards */}
      {filteredCommunities.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.35rem'
          }}
        >
          {filteredCommunities.map((comm) => (
            <CommunityCard key={comm.id} community={comm} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title="No Guilds Found"
          description="We couldn't find any communities matching your criteria. Be a pioneer and launch your own guild or clear filters!"
          actionLabel="Launch New Guild"
          onAction={() => openModal('createCommunity')}
          secondaryActionLabel="Reset Filters"
          onSecondaryAction={() => {
            setSelectedCategory('All');
            setFilterQuery('');
            setActiveTab('all');
          }}
        />
      )}
    </div>
  );
}
