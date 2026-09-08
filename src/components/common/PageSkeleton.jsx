import React from 'react';

/**
 * PageSkeleton renders an accessible, high-performance shimmer placeholder
 * during route-level lazy loading, providing visual continuity and feedback.
 */
export function PageSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}
    >
      {/* Top Banner Skeleton */}
      <div
        className="glass-panel skeleton-shimmer"
        style={{
          height: '140px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          opacity: 0.7
        }}
      />

      {/* Grid of Skeleton Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="skeleton-avatar skeleton-shimmer" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div className="skeleton-line skeleton-shimmer" style={{ width: '60%' }} />
                <div className="skeleton-line skeleton-shimmer" style={{ width: '40%', height: '10px' }} />
              </div>
            </div>
            <div className="skeleton-line skeleton-shimmer" style={{ width: '90%', height: '18px' }} />
            <div className="skeleton-line skeleton-shimmer" style={{ width: '100%' }} />
            <div className="skeleton-line skeleton-shimmer" style={{ width: '75%' }} />
          </div>
        ))}
      </div>
      <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
        Loading content...
      </span>
    </div>
  );
}
