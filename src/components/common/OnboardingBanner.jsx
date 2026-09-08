import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Sparkles, Users, Flame, X, ArrowRight } from 'lucide-react';

/**
 * OnboardingBanner introduces first-time visitors to the core mechanics of SYNAPSE:
 * Sparks (Proof of Work), Guilds (Maker Collectives), and Sprints (Skill Bounties).
 * Persists dismissal to localStorage so returning users are not repeatedly prompted.
 */
export function OnboardingBanner() {
  const [isDismissed, setIsDismissed] = useLocalStorage('synapse_onboarding_dismissed', false);
  const { setCurrentView, openModal } = useApp();

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Welcome to SYNAPSE"
      className="onboarding-banner glass-panel"
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        marginBottom: '1.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
            <Sparkles size={15} /> Welcome to the Maker Network
          </div>
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.55rem)', fontWeight: 800, lineHeight: 1.25 }}>
            Social Media Reimagined for <span className="gradient-text">High-Agency Builders</span>
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', maxWidth: '680px', marginTop: '0.35rem', lineHeight: 1.55 }}>
            SYNAPSE rejects vanity metrics and doomscrolling in favor of proof-of-work, craft guilds, and complementary skill matchmaking. Here is how it works:
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss welcome banner"
          className="btn-icon"
          style={{ width: '32px', height: '32px', flexShrink: 0 }}
        >
          <X size={16} />
        </button>
      </div>

      {/* 3 Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        {/* Pillar 1: Sparks */}
        <div
          style={{
            background: 'var(--color-bg-surface)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.925rem', color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
            <span style={{ color: 'var(--color-accent-cyan)' }}>⚡</span>
            <span>Sparks</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', lineHeight: 1.45, margin: 0 }}>
            Share proof of work, questions, and polls. No vanity follower loops—just craft.
          </p>
        </div>

        {/* Pillar 2: Guilds */}
        <div
          style={{
            background: 'var(--color-bg-surface)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.925rem', color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
            <Users size={16} style={{ color: 'var(--color-accent-emerald)' }} />
            <span>Guilds</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', lineHeight: 1.45, margin: 0 }}>
            Autonomous communities organized by discipline and craft rather than algorithms.
          </p>
        </div>

        {/* Pillar 3: Sprints & Bounties */}
        <div
          style={{
            background: 'var(--color-bg-surface)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.925rem', color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
            <Flame size={16} style={{ color: 'var(--color-accent-amber)' }} />
            <span>Sprints & XP</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', lineHeight: 1.45, margin: 0 }}>
            Join collaborative prototype challenges to earn XP and showcase real project output.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setCurrentView('communities')}
            className="btn btn-sm btn-secondary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Explore Guilds <ArrowRight size={13} />
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('people')}
            className="btn btn-sm btn-secondary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Match Skills <ArrowRight size={13} />
          </button>
          <button
            type="button"
            onClick={() => openModal('createPost')}
            className="btn btn-sm btn-primary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Post a Spark ⚡
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="btn btn-sm btn-ghost"
          style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}
        >
          Got it, dismiss
        </button>
      </div>
    </aside>
  );
}
