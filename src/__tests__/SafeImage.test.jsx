import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SafeImage } from '../components/common/SafeImage';

describe('SafeImage Component Fallback Resilience', () => {
  it('renders with initial src', () => {
    render(<SafeImage src="https://example.com/test.jpg" alt="Test Image" />);
    const img = screen.getByAltText('Test Image');
    expect(img.getAttribute('src')).toBe('https://example.com/test.jpg');
  });

  it('switches to avatar initials SVG on error', () => {
    render(<SafeImage src="https://broken-domain.invalid/avatar.jpg" alt="Elena Rostova" type="avatar" name="Elena Rostova" />);
    const img = screen.getByAltText('Elena Rostova');

    // Trigger error event
    fireEvent.error(img);

    const src = img.getAttribute('src');
    expect(src.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    expect(src).toContain('ER');
  });

  it('switches to cover mesh SVG on error for community guilds', () => {
    render(<SafeImage src="https://broken-domain.invalid/cover.jpg" alt="AI Guild" type="cover" title="AI Guild" category="Technology" />);
    const img = screen.getByAltText('AI Guild');

    fireEvent.error(img);

    const src = img.getAttribute('src');
    expect(src.startsWith('data:image/svg+xml;utf8,')).toBe(true);
  });
});
