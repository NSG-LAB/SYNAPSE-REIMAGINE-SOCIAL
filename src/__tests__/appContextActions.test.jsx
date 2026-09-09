import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';

function TestConsumer() {
  const {
    posts,
    likedPostIds,
    savedPostIds,
    toggleLike,
    toggleSave,
    communities,
    joinedCommunityIds,
    toggleJoinCommunity,
    events,
    joinedEventIds,
    toggleJoinEvent,
    followedUserIds,
    toggleFollowUser,
    streakData,
    gainXP,
    activeModal,
    openModal,
    closeModal,
    theme,
    setTheme,
    currentView,
    setCurrentView
  } = useApp();

  const firstPost = posts[0];
  const firstCommunity = communities[0];
  const firstEvent = events[0];

  return (
    <div>
      <div data-testid="current-view">{currentView}</div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="modal-type">{activeModal?.type || 'none'}</div>
      <div data-testid="xp-value">{streakData.xp}</div>
      <div data-testid="first-post-likes">{firstPost.likesCount}</div>
      <div data-testid="first-post-liked">{likedPostIds.includes(firstPost.id) ? 'yes' : 'no'}</div>
      <div data-testid="first-post-saved">{savedPostIds.includes(firstPost.id) ? 'yes' : 'no'}</div>
      <div data-testid="comm-joined">{joinedCommunityIds.includes(firstCommunity.id) ? 'yes' : 'no'}</div>
      <div data-testid="event-joined">{joinedEventIds.includes(firstEvent.id) ? 'yes' : 'no'}</div>
      <div data-testid="user-followed">{followedUserIds.includes('test-user-x') ? 'yes' : 'no'}</div>

      <button data-testid="btn-view-people" onClick={() => setCurrentView('people')}>View People</button>
      <button data-testid="btn-theme-light" onClick={() => setTheme('light')}>Theme Light</button>
      <button data-testid="btn-like-post" onClick={() => toggleLike(firstPost.id)}>Like Post</button>
      <button data-testid="btn-bookmark-post" onClick={() => toggleSave(firstPost.id)}>Bookmark Post</button>
      <button data-testid="btn-join-comm" onClick={() => toggleJoinCommunity(firstCommunity.id)}>Toggle Guild</button>
      <button data-testid="btn-join-event" onClick={() => toggleJoinEvent(firstEvent.id)}>Toggle Event</button>
      <button data-testid="btn-follow-user" onClick={() => toggleFollowUser('test-user-x')}>Toggle User</button>
      <button data-testid="btn-gain-xp" onClick={() => gainXP(100, 'posted')}>Gain XP</button>
      <button data-testid="btn-open-modal" onClick={() => openModal('createPost')}>Open Modal</button>
      <button data-testid="btn-close-modal" onClick={closeModal}>Close Modal</button>
    </div>
  );
}

describe('AppContext Global State & Action Dispatchers', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('updates current view and theme deterministically', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    expect(screen.getByTestId('current-view').textContent).toBe('discover');
    fireEvent.click(screen.getByTestId('btn-view-people'));
    expect(screen.getByTestId('current-view').textContent).toBe('people');

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    fireEvent.click(screen.getByTestId('btn-theme-light'));
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('toggles like and bookmark status on posts', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    const initialLiked = screen.getByTestId('first-post-liked').textContent;
    fireEvent.click(screen.getByTestId('btn-like-post'));
    const nextLiked = screen.getByTestId('first-post-liked').textContent;
    expect(nextLiked).not.toBe(initialLiked);

    fireEvent.click(screen.getByTestId('btn-bookmark-post'));
    expect(screen.getByTestId('first-post-saved').textContent).toBe('yes');
  });

  it('toggles community guild and sprint participation', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    const initialComm = screen.getByTestId('comm-joined').textContent;
    fireEvent.click(screen.getByTestId('btn-join-comm'));
    expect(screen.getByTestId('comm-joined').textContent).not.toBe(initialComm);

    const initialEvent = screen.getByTestId('event-joined').textContent;
    fireEvent.click(screen.getByTestId('btn-join-event'));
    expect(screen.getByTestId('event-joined').textContent).not.toBe(initialEvent);
  });

  it('toggles user follow connections and awards XP bounties', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    expect(screen.getByTestId('user-followed').textContent).toBe('no');
    fireEvent.click(screen.getByTestId('btn-follow-user'));
    expect(screen.getByTestId('user-followed').textContent).toBe('yes');

    const prevXp = parseInt(screen.getByTestId('xp-value').textContent, 10);
    fireEvent.click(screen.getByTestId('btn-gain-xp'));
    const newXp = parseInt(screen.getByTestId('xp-value').textContent, 10);
    expect(newXp).toBe(prevXp + 100);
  });

  it('opens and closes global modal states', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    expect(screen.getByTestId('modal-type').textContent).toBe('none');
    fireEvent.click(screen.getByTestId('btn-open-modal'));
    expect(screen.getByTestId('modal-type').textContent).toBe('createPost');
    fireEvent.click(screen.getByTestId('btn-close-modal'));
    expect(screen.getByTestId('modal-type').textContent).toBe('none');
  });
});
