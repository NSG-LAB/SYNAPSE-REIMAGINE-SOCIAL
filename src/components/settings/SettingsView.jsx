import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Moon, Sun, Monitor, Shield, Bell, Database, RotateCcw, Check } from 'lucide-react';

export function SettingsView() {
  const { theme, setTheme, resetAllData, addToast } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [collaborationOpen, setCollaborationOpen] = useState(true);
  const [compactDensity, setCompactDensity] = useState(false);

  const handleToggle = (setter, label) => {
    setter(prev => {
      const next = !prev;
      addToast(`${label}: ${next ? 'Enabled' : 'Disabled'}`, 'info');
      return next;
    });
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Platform Settings & Preferences</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Customize your SYNAPSE environment, visual aesthetics, and local data settings
        </p>
      </div>

      {/* Visual Appearance & Theme */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sun size={18} color="var(--color-accent-amber)" /> Visual Aesthetics & Themes
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
          Select the display mode that suits your lighting and workspace preference.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
          {/* Dark */}
          <button
            onClick={() => setTheme('dark')}
            className="btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: '#111726',
              color: '#f8fafc',
              border: theme === 'dark' ? '2px solid var(--color-primary)' : '1px solid var(--border-medium)',
              boxShadow: theme === 'dark' ? 'var(--shadow-glow)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
              <Moon size={18} color="#818cf8" />
              {theme === 'dark' && <Check size={16} color="var(--color-primary)" />}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Deep Slate (Dark)</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>High-contrast dark mode for creative focus</div>
          </button>

          {/* Light */}
          <button
            onClick={() => setTheme('light')}
            className="btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: '#ffffff',
              color: '#0f172a',
              border: theme === 'light' ? '2px solid var(--color-primary)' : '1px solid #cbd5e1',
              boxShadow: theme === 'light' ? 'var(--shadow-glow)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
              <Sun size={18} color="#ea580c" />
              {theme === 'light' && <Check size={16} color="var(--color-primary)" />}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Porcelain (Light)</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Clean paper-like daylight readability</div>
          </button>

          {/* Midnight OLED */}
          <button
            onClick={() => setTheme('midnight')}
            className="btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: '#000000',
              color: '#f8fafc',
              border: theme === 'midnight' ? '2px solid var(--color-primary)' : '1px solid #27272a',
              boxShadow: theme === 'midnight' ? 'var(--shadow-glow)' : 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.5rem' }}>
              <Monitor size={18} color="#06b6d4" />
              {theme === 'midnight' && <Check size={16} color="var(--color-primary)" />}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Midnight OLED</div>
            <div style={{ fontSize: '0.75rem', color: '#71717a' }}>True pure black for AMOLED screens</div>
          </button>
        </div>
      </div>

      {/* Collaboration & Privacy Preferences */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} color="var(--color-accent-emerald)" /> Privacy & Participation Defaults
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
          Decide how other creators discover your profile and match with your offered skills.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Open for Direct Challenge Invites</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Allow guild stewards to ping you for sprint jams</div>
            </div>
            <button
              onClick={() => handleToggle(setCollaborationOpen, 'Open for Challenge Invites')}
              className={`btn btn-sm ${collaborationOpen ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {collaborationOpen ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>In-App Activity Toasts</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Show instant feedback for likes, saves, and messages</div>
            </div>
            <button
              onClick={() => handleToggle(setNotificationsEnabled, 'Activity Toasts')}
              className={`btn btn-sm ${notificationsEnabled ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {notificationsEnabled ? 'Active' : 'Muted'}
            </button>
          </div>
        </div>
      </div>

      {/* Local Storage & Reset */}
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={18} color="var(--color-accent-rose)" /> Local State Management
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
          All your contributions, joined guilds, votes, and messages are stored locally in your browser’s localStorage.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Reset Demo State</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Clear local storage and restore pristine mock data</div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo state (joined guilds, messages, profile edits) to default?')) {
                resetAllData();
              }
            }}
            className="btn btn-danger btn-sm"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <RotateCcw size={15} /> Reset Everything
          </button>
        </div>
      </div>
    </div>
  );
}
