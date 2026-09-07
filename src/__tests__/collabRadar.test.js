import { describe, it, expect } from 'vitest';

// Pure logic extracted from CollabRadar for unit testing
function computeMatchScore(currentUser, otherUser) {
  const currentOffers = (currentUser.skillsOffered || []).map(s => s.toLowerCase());
  const currentNeeds = (currentUser.skillsNeeded || []).map(s => s.toLowerCase());
  const otherOffers = (otherUser.skillsOffered || []).map(s => s.toLowerCase());
  const otherNeeds = (otherUser.skillsNeeded || []).map(s => s.toLowerCase());

  const iCanHelp = currentOffers.filter(s =>
    otherNeeds.some(n => n.includes(s) || s.includes(n))
  );
  const theyCanHelp = otherOffers.filter(s =>
    currentNeeds.some(n => n.includes(s) || s.includes(n))
  );

  const bidirectionalBonus = (iCanHelp.length > 0 && theyCanHelp.length > 0) ? 25 : 0;
  
  const sharedInterests = (currentUser.interests || []).filter(i =>
    (otherUser.interests || []).some(j => j.toLowerCase() === i.toLowerCase())
  );

  const rawScore = (iCanHelp.length * 20) + (theyCanHelp.length * 20) + bidirectionalBonus + (sharedInterests.length * 5);
  const matchPercent = Math.min(Math.round(rawScore), 99);

  return {
    matchPercent,
    iCanHelp,
    theyCanHelp,
    sharedInterests,
    isBidirectional: iCanHelp.length > 0 && theyCanHelp.length > 0,
  };
}

describe('CollabRadar Match Algorithm', () => {
  it('identifies bidirectional complementary matches with bonus', () => {
    const userA = {
      skillsOffered: ['React', 'TypeScript'],
      skillsNeeded: ['Python', 'Machine Learning'],
      interests: ['AI', 'Open Source']
    };
    const userB = {
      skillsOffered: ['Python', 'PyTorch'],
      skillsNeeded: ['React', 'UI Design'],
      interests: ['AI', 'Robotics']
    };

    const result = computeMatchScore(userA, userB);
    expect(result.isBidirectional).toBe(true);
    expect(result.iCanHelp.length).toBeGreaterThan(0);
    expect(result.theyCanHelp.length).toBeGreaterThan(0);
    expect(result.sharedInterests).toEqual(['AI']);
    expect(result.matchPercent).toBeGreaterThanOrEqual(65);
  });

  it('handles unidirectional match without bidirectional bonus', () => {
    const userA = {
      skillsOffered: ['React'],
      skillsNeeded: ['Rust'],
      interests: []
    };
    const userB = {
      skillsOffered: ['Rust'],
      skillsNeeded: ['Go'],
      interests: []
    };

    const result = computeMatchScore(userA, userB);
    expect(result.isBidirectional).toBe(false);
    expect(result.theyCanHelp.length).toBe(1);
    expect(result.iCanHelp.length).toBe(0);
    expect(result.matchPercent).toBe(20);
  });

  it('caps match percent at 99%', () => {
    const userA = {
      skillsOffered: ['A', 'B', 'C', 'D'],
      skillsNeeded: ['E', 'F', 'G', 'H'],
      interests: ['1', '2', '3', '4', '5']
    };
    const userB = {
      skillsOffered: ['E', 'F', 'G', 'H'],
      skillsNeeded: ['A', 'B', 'C', 'D'],
      interests: ['1', '2', '3', '4', '5']
    };

    const result = computeMatchScore(userA, userB);
    expect(result.matchPercent).toBe(99);
  });

  it('returns zero for unrelated creators', () => {
    const userA = {
      skillsOffered: ['Pottery'],
      skillsNeeded: ['Gardening'],
      interests: ['Clay']
    };
    const userB = {
      skillsOffered: ['Quantum Physics'],
      skillsNeeded: ['Astrophysics'],
      interests: ['Stars']
    };

    const result = computeMatchScore(userA, userB);
    expect(result.matchPercent).toBe(0);
    expect(result.isBidirectional).toBe(false);
  });
});
