import React from 'react';
import { useApp } from '../../context/AppContext';
import { categories, sortOptions } from '../../data/topics';
import { SlidersHorizontal } from 'lucide-react';

export function FilterBar() {
  const { selectedCategory, setSelectedCategory, sortBy, setSortBy } = useApp();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        margin: '1.25rem 0',
        padding: '0.5rem 0'
      }}
    >
      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '4px',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          flex: '1 1 auto',
          minWidth: 0
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 700 : 500,
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sort Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SlidersHorizontal size={14} color="var(--color-text-muted)" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field"
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.8125rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            width: 'auto'
          }}
          aria-label="Sort content by"
        >
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
