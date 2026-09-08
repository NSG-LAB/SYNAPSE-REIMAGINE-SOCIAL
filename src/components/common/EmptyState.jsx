import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

/**
 * Signature EmptyState component ensuring no screen is a dead end.
 * Always renders an expressive icon, helpful description, and explicit action buttons.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.icon] - Icon component to render
 * @param {string} [props.title] - Heading text
 * @param {string} [props.description] - Supportive description
 * @param {string} [props.actionLabel] - Primary action button label
 * @param {() => void} [props.onAction] - Primary action callback
 * @param {string} [props.secondaryActionLabel] - Secondary action label
 * @param {() => void} [props.onSecondaryAction] - Secondary action callback
 */
export function EmptyState({
  icon: Icon = Compass,
  title = 'No items found',
  description = 'Try adjusting your search query, selecting another category, or explore new guilds.',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) {
  return (
    <div
      role="region"
      aria-label={title}
      className="glass-panel"
      style={{
        padding: '3.5rem 2rem',
        borderRadius: 'var(--radius-xl)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        margin: '1.5rem 0',
        border: '1px dashed var(--border-medium)',
        background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.07) 0%, var(--color-bg-surface) 70%)'
      }}
    >
      {/* Signature glowing cosmic artwork with orbiting particle and floating icon */}
      <div className="cosmic-art-container">
        <div className="cosmic-orbit-ring">
          <div className="cosmic-floating-dot" />
        </div>
        <div className="cosmic-core-glow" />
        <div className="cosmic-center-icon" style={{ color: 'var(--color-primary)' }}>
          <Icon size={28} />
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: 700 }}>{title}</h2>
        <p style={{ maxWidth: '440px', margin: '0 auto', fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
          {description}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.25rem' }}>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="btn btn-primary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Sparkles size={16} />
            {actionLabel}
          </button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="btn btn-secondary"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
