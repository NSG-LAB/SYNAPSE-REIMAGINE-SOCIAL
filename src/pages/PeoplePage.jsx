import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PersonCard } from '../components/people/PersonCard';
import { EmptyState } from '../components/common/EmptyState';
import { SkillConstellation } from '../components/constellation/SkillConstellation';
import { CollabRadar } from '../components/people/CollabRadar';
import { mockUsers } from '../data/users';
import { skillFilters } from '../data/topics';
import { Users, Search, LayoutGrid, Orbit } from 'lucide-react';

export function PeoplePage() {
  const { userProfile, followedUserIds } = useApp();

  const [selectedSkill, setSelectedSkill] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyConnected, setOnlyConnected] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'constellation'

  // Exclude current user from people directory
  const directory = mockUsers.filter(u => u.id !== userProfile.id);

  const filteredPeople = directory.filter(person => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = person.name.toLowerCase().includes(q) ||
        person.handle.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q) ||
        person.bio.toLowerCase().includes(q) ||
        person.skillsOffered?.some(s => s.toLowerCase().includes(q)) ||
        person.skillsNeeded?.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Skill filter
    if (selectedSkill !== 'All') {
      const hasSkill = person.skillsOffered?.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase())) ||
        person.skillsNeeded?.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()));
      if (!hasSkill) return false;
    }

    // Connected only
    if (onlyConnected) {
      return followedUserIds.includes(person.id);
    }

    return true;
  });

  return (
    <div>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          marginBottom: '1.5rem',
          background: 'radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15) 0%, rgba(17, 23, 38, 0.95) 70%)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-accent-emerald)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
          <Users size={16} /> Synergy Matchmaking
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem' }}>
          Connect with <span className="gradient-cyan-text">Complementary Makers</span>
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '640px', lineHeight: 1.6 }}>
          Traditional networks connect people for vanity followers. SYNAPSE matches you based on complementary skills: what you offer vs what you seek for your next prototype.
        </p>
      </div>

      {/* Collaboration Radar Section */}
      <CollabRadar />

      {/* Control Strip */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px', flex: '1 1 220px' }}>
          <Search size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, skill, or name..."
            className="input-field"
            style={{ paddingLeft: '2.2rem', fontSize: '0.8125rem', paddingTop: '0.45rem', paddingBottom: '0.45rem', width: '100%' }}
          />
        </div>

        {/* View Toggle + Connected Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* View Mode Toggle */}
          <div style={{
            display: 'flex',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            border: '1px solid var(--border-medium)',
          }}>
            <button
              onClick={() => setViewMode('list')}
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 0, padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
              title="Grid View"
              aria-label="Grid directory view (screen-reader accessible)"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode('constellation')}
              className={`btn btn-sm ${viewMode === 'constellation' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: 0, padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
              title="Constellation View"
              aria-label="Constellation interactive graph view"
            >
              <Orbit size={14} />
            </button>
          </div>

          <button
            onClick={() => setOnlyConnected(prev => !prev)}
            className={`btn btn-sm ${onlyConnected ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {onlyConnected ? 'Showing Connected (Filter On)' : 'My Connections Only'}
          </button>
        </div>
      </div>

      {/* Constellation View */}
      {viewMode === 'constellation' ? (
        <div
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--border-medium)',
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem',
            color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem',
            textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            <Orbit size={15} /> Skill Constellation Map
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem', marginTop: 0 }}>
            Visual graph of makers positioned by skill synergy. Green lines highlight your skill matches. Navigate via mouse or Tab + Enter to inspect nodes. Switch to Grid View anytime for accessible text cards.
          </p>
          <SkillConstellation />
        </div>
      ) : (
        <>
          {/* Skill Filter Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}>
            <button
              onClick={() => setSelectedSkill('All')}
              className={`btn btn-sm ${selectedSkill === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.85rem', fontSize: '0.8rem', fontWeight: selectedSkill === 'All' ? 700 : 500, flexShrink: 0, whiteSpace: 'nowrap' }}
            >
              All Skills
            </button>
            {skillFilters.map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`btn btn-sm ${selectedSkill === skill ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: selectedSkill === skill ? 700 : 500,
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* People Grid */}
          {filteredPeople.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: '1.25rem'
              }}
            >
              {filteredPeople.map((user) => (
                <PersonCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="No Collaborators Match Filter"
              description="Try broadening your skill search or search query to find more creators."
              actionLabel="Reset Skill Filters"
              onAction={() => {
                setSelectedSkill('All');
                setSearchQuery('');
                setOnlyConnected(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
