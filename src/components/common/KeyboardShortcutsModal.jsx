import React from 'react';
import { Modal } from './Modal';
import { Sparkles, Navigation, Palette } from 'lucide-react';

const SHORTCUT_GROUPS = [
  {
    title: 'Navigation',
    icon: Navigation,
    items: [
      { key: '1', label: 'Go to Discover Feed' },
      { key: '2', label: 'Go to Topic Guilds' },
      { key: '3', label: 'Go to Challenges & Sprints' },
      { key: '4', label: 'Go to Synergy Matcher' },
      { key: '5', label: 'Go to Collaborative Chat' }
    ]
  },
  {
    title: 'Creation & Actions',
    icon: Sparkles,
    items: [
      { key: 'c', label: 'Create new Idea Spark / Poll' },
      { key: 'g', label: 'Launch new Topic Guild' },
      { key: '/', label: 'Focus global search input' }
    ]
  },
  {
    title: 'Preferences & General',
    icon: Palette,
    items: [
      { key: 't', label: 'Toggle theme (Dark / Porcelain / OLED)' },
      { key: '?', label: 'Open keyboard shortcuts modal' },
      { key: 'Esc', label: 'Dismiss active modal / dialog' }
    ]
  }
];

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" maxWidth="580px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Navigate SYNAPSE with maximum velocity using native keyboard triggers. Press <kbd style={kbdStyle}>Esc</kbd> anytime to close.
        </p>

        {SHORTCUT_GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.title}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-text)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                <Icon size={14} /> {group.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-elevated)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <span style={{ fontSize: '0.825rem', color: 'var(--color-text-primary)' }}>{item.label}</span>
                    <kbd style={kbdStyle}>{item.key}</kbd>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

const kbdStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '24px',
  padding: '0.15rem 0.45rem',
  fontSize: '0.75rem',
  fontFamily: 'monospace',
  fontWeight: 700,
  color: 'var(--color-text-primary)',
  background: 'var(--color-bg-highlight)',
  border: '1px solid var(--border-medium)',
  borderRadius: 'var(--radius-xs)',
  boxShadow: '0 2px 0 var(--border-subtle)'
};
