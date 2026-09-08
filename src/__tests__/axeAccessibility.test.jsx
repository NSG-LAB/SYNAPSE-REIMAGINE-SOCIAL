import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import axe from 'axe-core';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { OnboardingBanner } from '../components/common/OnboardingBanner';
import { PostCard } from '../components/feed/PostCard';
import { mockPosts } from '../data/posts';
import { AppProvider } from '../context/AppContext';

describe('Axe DevTools Automated Accessibility Audit', () => {
  it('Modal passes axe accessibility standards', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} title="Accessibility Verified Dialog">
        <div>
          <p>Dialog description for keyboard users</p>
          <button type="button">Perform Action</button>
        </div>
      </Modal>
    );

    const results = await axe.run(container, {
      rules: {
        // region rule requires landmarks on full page, not isolated modal unit
        region: { enabled: false }
      }
    });

    const criticalViolations = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
    expect(criticalViolations).toHaveLength(0);
  });

  it('EmptyState passes axe accessibility audit', async () => {
    const { container } = render(
      <EmptyState
        title="No Results Found"
        description="Try a different query or reset all search filters."
        actionLabel="Reset Filters"
        onAction={() => {}}
      />
    );

    const results = await axe.run(container);
    const criticalViolations = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
    expect(criticalViolations).toHaveLength(0);
  });

  it('OnboardingBanner passes axe accessibility audit', async () => {
    const { container } = render(
      <AppProvider>
        <OnboardingBanner />
      </AppProvider>
    );

    const results = await axe.run(container);
    const criticalViolations = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
    expect(criticalViolations).toHaveLength(0);
  });

  it('PostCard passes axe accessibility audit', async () => {
    const { container } = render(
      <AppProvider>
        <PostCard post={mockPosts[0]} />
      </AppProvider>
    );

    const results = await axe.run(container);
    const criticalViolations = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
    expect(criticalViolations).toHaveLength(0);
  });
});
