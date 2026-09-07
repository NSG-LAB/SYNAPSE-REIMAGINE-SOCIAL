import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, Globe, Terminal, Shield, Zap } from 'lucide-react';

export function Footer() {
  const { setCurrentView } = useApp();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--color-bg-surface)',
        padding: '3rem 1.5rem 2rem 1.5rem',
        marginTop: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1rem'
              }}
            >
              S
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>SYNAPSE</span>
            <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>v2.4</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            Reimagining social connection through purposeful participation, collaborative action, community guilds, and skill synergy.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
            Platform Pillars
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
            <li>
              <button onClick={() => setCurrentView('discover')} className="btn-ghost" style={{ padding: 0 }}>
                ⚡ Action Sparks & Discussions
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('communities')} className="btn-ghost" style={{ padding: 0 }}>
                🏰 Topic Guilds & Labs
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('events')} className="btn-ghost" style={{ padding: 0 }}>
                🏆 48h Jams & Participatory Sprints
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('people')} className="btn-ghost" style={{ padding: 0 }}>
                🤝 Skill Match & Synergy Finder
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
            Core Philosophy
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
            Designed to eradicate passive doomscrolling by shifting rewards to active proof-of-work, shared challenges, and genuine creative fellowship.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-cyan">Zero Vanity Metric</span>
            <span className="badge badge-emerald">Open Synergy</span>
            <span className="badge badge-amber">Local Persistence</span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '2rem auto 0 auto',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: 'var(--color-text-muted)'
        }}
      >
        <div>
          Crafted with <Heart size={13} color="var(--color-accent-rose)" style={{ display: 'inline', verticalAlign: 'middle' }} /> for the <strong>REIMAGINE SOCIAL</strong> Challenge.
        </div>
        <div>
          Frontend-only architecture • No tracking • Persistent LocalStorage
        </div>
      </div>
    </footer>
  );
}
