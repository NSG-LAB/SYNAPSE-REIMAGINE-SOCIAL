import { describe, it, expect } from 'vitest';
import { parseHash, getHashForState } from '../utils/router';

describe('Router and Deep Link Synchronization', () => {
  it('parses empty hash as default view', () => {
    expect(parseHash('')).toEqual({ view: null, modal: null });
    expect(parseHash('#/')).toEqual({ view: null, modal: null });
  });

  it('parses valid top-level view hashes', () => {
    expect(parseHash('#/communities')).toEqual({ view: 'communities', modal: null });
    expect(parseHash('#/events')).toEqual({ view: 'events', modal: null });
    expect(parseHash('#/people')).toEqual({ view: 'people', modal: null });
    expect(parseHash('#/messages')).toEqual({ view: 'messages', modal: null });
    expect(parseHash('#/settings')).toEqual({ view: 'settings', modal: null });
  });

  it('parses entity deep links', () => {
    expect(parseHash('#/post/post-1')).toEqual({
      view: 'discover',
      modal: { type: 'postDetail', id: 'post-1' }
    });

    expect(parseHash('#/guild/comm-2')).toEqual({
      view: 'communities',
      modal: { type: 'communityDetail', id: 'comm-2' }
    });

    expect(parseHash('#/event/event-3')).toEqual({
      view: 'events',
      modal: { type: 'eventDetail', id: 'event-3' }
    });

    expect(parseHash('#/profile/user-4')).toEqual({
      view: 'people',
      modal: { type: 'profileDetail', id: 'user-4' }
    });
  });

  it('supports legacy raw id hash patterns', () => {
    expect(parseHash('#post-10')).toEqual({
      view: 'discover',
      modal: { type: 'postDetail', id: 'post-10' }
    });
    expect(parseHash('#comm-5')).toEqual({
      view: 'communities',
      modal: { type: 'communityDetail', id: 'comm-5' }
    });
  });

  it('computes correct hash for view and modal state', () => {
    expect(getHashForState('communities', { type: null, data: null })).toBe('#/communities');
    expect(getHashForState('discover', { type: 'postDetail', data: { id: 'post-1' } })).toBe('#/post/post-1');
    expect(getHashForState('communities', { type: 'communityDetail', data: { id: 'comm-1' } })).toBe('#/guild/comm-1');
    expect(getHashForState('events', { type: 'eventDetail', data: { id: 'event-1' } })).toBe('#/event/event-1');
    expect(getHashForState('people', { type: 'profileDetail', data: { id: 'user-1' } })).toBe('#/profile/user-1');
  });
});
