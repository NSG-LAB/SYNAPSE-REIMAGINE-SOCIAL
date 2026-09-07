import { describe, it, expect } from 'vitest';
import { mockUsers, currentUser } from '../data/users';
import { mockCommunities } from '../data/communities';
import { mockEvents } from '../data/events';
import { mockPosts } from '../data/posts';
import { categories, skillFilters } from '../data/topics';

describe('Data Layer & Schema Integrity', () => {
  it('validates currentUser profile structure', () => {
    expect(currentUser).toBeDefined();
    expect(currentUser.id).toBeDefined();
    expect(currentUser.name).toBe('Kai Vance');
    expect(Array.isArray(currentUser.skillsOffered)).toBe(true);
    expect(Array.isArray(currentUser.skillsNeeded)).toBe(true);
    expect(currentUser.skillsOffered.length).toBeGreaterThan(0);
    expect(currentUser.skillsNeeded.length).toBeGreaterThan(0);
  });

  it('validates all mock users have required skill synergy fields', () => {
    expect(mockUsers.length).toBeGreaterThanOrEqual(10);
    mockUsers.forEach(user => {
      expect(user.id).toMatch(/^user-/);
      expect(user.name).toBeTruthy();
      expect(typeof user.handle).toBe('string');
      expect(user.handle.length).toBeGreaterThan(0);
      expect(Array.isArray(user.skillsOffered)).toBe(true);
      expect(Array.isArray(user.skillsNeeded)).toBe(true);
    });
  });

  it('validates mock communities conform to Guild schema', () => {
    expect(mockCommunities.length).toBeGreaterThanOrEqual(6);
    mockCommunities.forEach(community => {
      expect(community.id).toMatch(/^comm-/);
      expect(community.name).toBeTruthy();
      expect(community.category).toBeTruthy();
      expect(typeof community.memberCount).toBe('number');
      expect(community.description).toBeTruthy();
      expect(Array.isArray(community.rules)).toBe(true);
    });
  });

  it('validates mock events conform to Challenge schema', () => {
    expect(mockEvents.length).toBeGreaterThanOrEqual(5);
    mockEvents.forEach(event => {
      expect(event.id).toMatch(/^event-/);
      expect(event.title).toBeTruthy();
      expect(typeof event.rewardXP).toBe('number');
      expect(event.rewardXP).toBeGreaterThan(0);
      expect(Array.isArray(event.stages)).toBe(true);
    });
  });

  it('validates topics and categories have comprehensive coverage', () => {
    expect(categories.length).toBeGreaterThanOrEqual(8);
    expect(skillFilters.length).toBeGreaterThanOrEqual(8);
    expect(mockPosts.length).toBeGreaterThanOrEqual(10);
  });
});
