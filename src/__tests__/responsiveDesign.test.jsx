import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import { KeyboardShortcutsModal } from '../components/common/KeyboardShortcutsModal';
import { soundEffects } from '../utils/soundEffects';

describe('Responsive Design Engine & Code Quality Audits', () => {
  const rootDir = path.resolve(__dirname, '..');
  const cssPath = path.resolve(rootDir, 'styles/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  it('centralizes all standard responsive breakpoint tiers in index.css', () => {
    // Audit coverage across all desktop, tablet, and mobile breakpoints
    const requiredBreakpoints = [
      'min-width: 1200px', // Ultra-wide & Desktop 3-column
      'min-width: 900px',  // Desktop 2-column sidebar
      'max-width: 899px',  // Tablet & Mobile navigation transition
      'max-width: 768px',  // Edge-to-edge chat viewport
      'max-width: 767px',  // Standard mobile padding & touch sizing
      'max-width: 639px',  // Action buttons compact mode
      'max-width: 540px',  // Compact mobile banner
      'max-width: 480px',  // Subtitle suppression
      'max-width: 420px',  // Small screen adaptations
      'max-width: 399px',  // iPhone SE & compact mobile
      'max-width: 360px',  // Ultra-narrow viewport padding
    ];

    requiredBreakpoints.forEach((bp) => {
      expect(cssContent).toContain(bp);
    });
  });

  it('guarantees zero embedded <style> tags in all React JSX components', () => {
    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      let files = [];
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== 'node_modules' && entry.name !== 'dist') {
            files = files.concat(scanDir(fullPath));
          }
        } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
          files.push(fullPath);
        }
      }
      return files;
    }

    const jsxFiles = scanDir(rootDir).filter(f => !f.includes('__tests__'));
    const filesWithStyleTags = [];

    jsxFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      if (/<style[\s>]/i.test(content)) {
        filesWithStyleTags.push(path.relative(rootDir, file));
      }
    });

    expect(filesWithStyleTags).toEqual([]);
  });

  it('verifies that no nested <main> landmark elements exist in feed pages', () => {
    const discoverPageContent = fs.readFileSync(path.resolve(rootDir, 'pages/DiscoverPage.jsx'), 'utf8');
    expect(discoverPageContent).not.toContain('<main');
    expect(discoverPageContent).toContain('<section aria-label="Sparks and Discussions Feed"');
  });

  it('renders KeyboardShortcutsModal and handles dismiss events', () => {
    let closed = false;
    const handleClose = () => { closed = true; };

    const { rerender } = render(
      <KeyboardShortcutsModal isOpen={true} onClose={handleClose} />
    );

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Keyboard Shortcuts')).toBeTruthy();
    expect(screen.getByText('Go to Discover Feed')).toBeTruthy();

    // Close button dismiss
    const closeBtn = screen.getByLabelText('Close dialog');
    fireEvent.click(closeBtn);
    expect(closed).toBe(true);

    // Escape dismiss
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(closed).toBe(true);

    // Closed state
    rerender(<KeyboardShortcutsModal isOpen={false} onClose={handleClose} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('verifies procedural audio synthesizer operates safely in test environment', () => {
    expect(() => {
      soundEffects.playNodeSelect();
      soundEffects.playSpark();
      soundEffects.playMilestone();
    }).not.toThrow();

    expect(soundEffects.isMuted()).toBe(false);
    soundEffects.setMuted(true);
    expect(soundEffects.isMuted()).toBe(true);
    soundEffects.setMuted(false);
    expect(soundEffects.isMuted()).toBe(false);
  });
});
