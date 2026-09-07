import { describe, it, expect } from 'vitest';

function getLevel(xp) {
  return Math.floor(xp / 1000) + 1;
}

function getXPInCurrentLevel(xp) {
  return xp % 1000;
}

function getLevelTitle(level) {
  if (level >= 10) return 'Legendary Architect';
  if (level >= 8) return 'Master Builder';
  if (level >= 6) return 'Senior Maker';
  if (level >= 4) return 'Active Creator';
  if (level >= 3) return 'Rising Spark';
  if (level >= 2) return 'Community Member';
  return 'Fresh Explorer';
}

describe('Spark Streak & XP Gamification Engine', () => {
  it('calculates correct level and current level progress from XP', () => {
    expect(getLevel(0)).toBe(1);
    expect(getXPInCurrentLevel(0)).toBe(0);

    expect(getLevel(999)).toBe(1);
    expect(getXPInCurrentLevel(999)).toBe(999);

    expect(getLevel(1000)).toBe(2);
    expect(getXPInCurrentLevel(1000)).toBe(0);

    expect(getLevel(2890)).toBe(3);
    expect(getXPInCurrentLevel(2890)).toBe(890);

    expect(getLevel(10500)).toBe(11);
    expect(getXPInCurrentLevel(10500)).toBe(500);
  });

  it('assigns progressive titles across level thresholds', () => {
    expect(getLevelTitle(1)).toBe('Fresh Explorer');
    expect(getLevelTitle(2)).toBe('Community Member');
    expect(getLevelTitle(3)).toBe('Rising Spark');
    expect(getLevelTitle(4)).toBe('Active Creator');
    expect(getLevelTitle(5)).toBe('Active Creator');
    expect(getLevelTitle(6)).toBe('Senior Maker');
    expect(getLevelTitle(8)).toBe('Master Builder');
    expect(getLevelTitle(10)).toBe('Legendary Architect');
  });

  it('calculates streak continuity correctly across dates', () => {
    const today = new Date('2026-09-07T12:00:00Z');
    const yesterday = new Date('2026-09-06T12:00:00Z');
    const twoDaysAgo = new Date('2026-09-05T12:00:00Z');

    const isConsecutive = (d1, d2) => {
      const diff = Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
      return diff === 1;
    };

    expect(isConsecutive(today, yesterday)).toBe(true);
    expect(isConsecutive(today, twoDaysAgo)).toBe(false);
  });
});
