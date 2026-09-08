import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from '../components/feed/PostCard';
import * as AppContextModule from '../context/AppContext';

const mockPost = {
  id: 'post-test-1',
  type: 'spark',
  author: {
    id: 'user-1',
    name: 'Elena Rostova',
    handle: 'elena_ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
  },
  communityId: 'comm-1',
  communityName: 'Generative AI Lab',
  title: 'Composable Agentic Pipelines in WebGPU',
  content: 'Here is a breakdown of memory barriers and dispatch cycles.',
  timestamp: '2h ago',
  likesCount: 12,
  savesCount: 4,
  commentsCount: 2,
  comments: []
};

const mockPollPost = {
  ...mockPost,
  id: 'post-test-poll',
  type: 'poll',
  poll: {
    totalVotes: 10,
    userVotedOptionId: null,
    options: [
      { id: 'opt-1', text: 'Option Alpha', votes: 6 },
      { id: 'opt-2', text: 'Option Beta', votes: 4 }
    ]
  }
};

describe('PostCard Keyboard Accessibility & User Interactions', () => {
  const mockOpenModal = vi.fn();
  const mockVotePoll = vi.fn();
  const mockToggleLike = vi.fn();
  const mockAddToast = vi.fn();

  beforeEach(() => {
    vi.spyOn(AppContextModule, 'useApp').mockReturnValue({
      toggleLike: mockToggleLike,
      toggleSave: vi.fn(),
      votePoll: mockVotePoll,
      addComment: vi.fn(),
      likedPostIds: [],
      savedPostIds: [],
      openModal: mockOpenModal,
      addToast: mockAddToast
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders title inside a semantic keyboard-accessible button', () => {
    render(<PostCard post={mockPost} />);
    const titleButton = screen.getByRole('button', { name: 'Composable Agentic Pipelines in WebGPU' });
    expect(titleButton).toBeDefined();

    // Verify Tab focus and activation
    titleButton.focus();
    expect(document.activeElement).toBe(titleButton);

    fireEvent.click(titleButton);
    expect(mockOpenModal).toHaveBeenCalledWith('postDetail', mockPost);
  });

  it('allows keyboard navigation to author profile', () => {
    render(<PostCard post={mockPost} />);
    const authorButton = screen.getByRole('button', { name: 'View Elena Rostova\'s profile' });
    expect(authorButton).toBeDefined();

    fireEvent.click(authorButton);
    expect(mockOpenModal).toHaveBeenCalledWith('profileDetail', mockPost.author);
  });

  it('renders interactive poll buttons and registers votes', () => {
    render(<PostCard post={mockPollPost} />);
    const optAlphaBtn = screen.getByRole('button', { name: /Option Alpha/i });
    const optBetaBtn = screen.getByRole('button', { name: /Option Beta/i });

    expect(optAlphaBtn).toBeDefined();
    expect(optBetaBtn).toBeDefined();

    // Cast vote on Option Beta
    fireEvent.click(optBetaBtn);
    expect(mockVotePoll).toHaveBeenCalledWith('post-test-poll', 'opt-2');
  });

  it('triggers like and toast notifications on click', () => {
    render(<PostCard post={mockPost} />);
    const likeBtn = screen.getByRole('button', { name: /Like spark/i });
    fireEvent.click(likeBtn);
    expect(mockToggleLike).toHaveBeenCalledWith(mockPost.id);
  });
});
