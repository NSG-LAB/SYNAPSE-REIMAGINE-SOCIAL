import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export function EmptyState({
  icon: Icon = Compass,
  title = 'No items found',
  description = 'Try adjusting your search query, selecting another category, or explore new guilds.',
  actionLabel,
  onAction
}) {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '3.5rem 2rem',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        margin: '1.5rem 0'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-bg-highlight)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)'
        }}
      >
        <Icon size={32} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>{title}</h3>
        <p style={{ maxWidth: '420px', margin: '0 auto', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          <Sparkles size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
