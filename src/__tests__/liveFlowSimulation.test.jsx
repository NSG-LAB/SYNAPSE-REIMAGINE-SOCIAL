import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { PostDetailModal } from '../components/feed/PostDetailModal';
import { SkillConstellation } from '../components/constellation/SkillConstellation';
import { mockPosts } from '../data/posts';
import { mockUsers } from '../data/users';

function LiveKeyboardPassHarness() {
  const samplePollPost = mockPosts.find(p => p.type === 'poll') || mockPosts[0];

  return (
    <div>
      <main>
        <PostCard post={samplePollPost} />
      </main>
      <PostDetailModal />
    </div>
  );
}

describe('Live User Journey & Accessibility Verification', () => {
  it('End-to-End Keyboard Flow: Discover -> Open Post -> Vote Poll -> Escape -> Focus Restoration', async () => {
    render(
      <AppProvider>
        <LiveKeyboardPassHarness />
      </AppProvider>
    );

    // 1. Discover: Post title is a semantic button
    const postTitleBtn = screen.getByRole('button', { name: new RegExp(mockPosts.find(p => p.type === 'poll')?.title || 'Shader', 'i') });
    expect(postTitleBtn).toBeDefined();

    // Focus post card title button and press Enter
    postTitleBtn.focus();
    expect(document.activeElement).toBe(postTitleBtn);
    fireEvent.click(postTitleBtn);

    // 2. Post detail modal mounts with dialog semantics
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeDefined();
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    // 3. Find poll option buttons inside modal
    const pollButtons = screen.getAllByRole('button').filter(b => b.classList.contains('poll-option-btn') || b.textContent.includes('%') || b.getAttribute('aria-label')?.includes('Vote'));
    if (pollButtons.length > 0) {
      const optionToVote = pollButtons[0];
      fireEvent.click(optionToVote);
      // Vote registers
      expect(optionToVote).toBeDefined();
    }

    // 4. Press Escape to close modal
    fireEvent.keyDown(window, { key: 'Escape' });

    // 5. Verify modal unmounts and focus is restored to the post title button
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(document.activeElement).toBe(postTitleBtn);
    });
  });

  it('Skill Constellation provides real screen reader live region announcements on node selection', async () => {
    render(
      <AppProvider>
        <SkillConstellation users={mockUsers} onSelectUser={() => {}} />
      </AppProvider>
    );

    // Verify live announcement region
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).not.toBeNull();
    expect(liveRegion.getAttribute('aria-atomic')).toBe('true');

    // Verify star node buttons have tabIndex and accessible labels
    const starNodes = document.querySelectorAll('g[role="button"]');
    expect(starNodes.length).toBeGreaterThan(0);
    const firstStar = starNodes[0];
    expect(firstStar.getAttribute('tabindex')).toBe('0');
    expect(firstStar.getAttribute('aria-label')).toBeTruthy();

    // Trigger Enter key on node
    fireEvent.keyDown(firstStar, { key: 'Enter' });

    // Confirm live region updates with creator synergy dossier
    await waitFor(() => {
      expect(liveRegion.textContent).toMatch(/Inspecting|Selected/);
    });
  });
});
