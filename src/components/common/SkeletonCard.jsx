import React from 'react';

export function SkeletonCard({ type = 'post' }) {
  if (type === 'community') {
    return (
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}
      >
        <div className="skeleton" style={{ width: '100%', height: '110px', borderRadius: 'var(--radius-md)' }} />
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="skeleton" style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)' }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ width: '60%', height: '16px', marginBottom: '6px' }} />
            <div className="skeleton" style={{ width: '35%', height: '12px' }} />
          </div>
        </div>
        <div className="skeleton" style={{ width: '90%', height: '14px' }} />
        <div className="skeleton" style={{ width: '75%', height: '14px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <div className="skeleton" style={{ width: '80px', height: '28px', borderRadius: 'var(--radius-full)' }} />
          <div className="skeleton" style={{ width: '80px', height: '28px', borderRadius: 'var(--radius-md)' }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-full)' }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ width: '140px', height: '16px', marginBottom: '6px' }} />
          <div className="skeleton" style={{ width: '90px', height: '12px' }} />
        </div>
      </div>
      <div className="skeleton" style={{ width: '80%', height: '22px' }} />
      <div className="skeleton" style={{ width: '100%', height: '14px' }} />
      <div className="skeleton" style={{ width: '95%', height: '14px' }} />
      <div className="skeleton" style={{ width: '70%', height: '14px' }} />
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <div className="skeleton" style={{ width: '60px', height: '32px', borderRadius: 'var(--radius-md)' }} />
        <div className="skeleton" style={{ width: '60px', height: '32px', borderRadius: 'var(--radius-md)' }} />
        <div className="skeleton" style={{ width: '60px', height: '32px', borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  );
}
