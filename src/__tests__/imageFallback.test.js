import { describe, it, expect } from 'vitest';
import { getInitials, getAvatarFallback, getCoverFallback, getPostFallback } from '../utils/imageFallback';

describe('Image Fallback Generator', () => {
  it('extracts correct initials from names', () => {
    expect(getInitials('Elena Rostova')).toBe('ER');
    expect(getInitials('Marcus Vance')).toBe('MV');
    expect(getInitials('SingleName')).toBe('SI');
    expect(getInitials('')).toBe('S');
    expect(getInitials('Dr. Jane Doe')).toBe('DD');
  });

  it('generates valid SVG Data URI for avatar with initials', () => {
    const uri = getAvatarFallback('Elena Rostova');
    expect(uri.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    expect(uri).toContain('ER');
    expect(uri).toContain('%3Csvg');
  });

  it('generates valid SVG Data URI for guild cover', () => {
    const uri = getCoverFallback('Generative AI Lab', 'Technology');
    expect(uri.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    expect(uri).toContain('%3Csvg');
  });

  it('generates valid SVG Data URI for post spark showcase', () => {
    const uri = getPostFallback('New WebGPU Shader');
    expect(uri.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    expect(uri).toContain('%3Csvg');
  });
});
