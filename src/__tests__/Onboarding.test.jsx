import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingBanner } from '../components/common/OnboardingBanner';
import * as AppContextModule from '../context/AppContext';

describe('OnboardingBanner Component', () => {
  const mockSetCurrentView = vi.fn();
  const mockOpenModal = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(AppContextModule, 'useApp').mockReturnValue({
      setCurrentView: mockSetCurrentView,
      openModal: mockOpenModal
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all 3 pillars (Sparks, Guilds, Sprints) when not dismissed', () => {
    render(<OnboardingBanner />);
    expect(screen.getByText(/Welcome to the Maker Network/i)).toBeDefined();
    expect(screen.getByText('Sparks')).toBeDefined();
    expect(screen.getByText('Guilds')).toBeDefined();
    expect(screen.getByText('Sprints & XP')).toBeDefined();
  });

  it('allows navigation to guilds and matching skills via quick action buttons', () => {
    render(<OnboardingBanner />);
    const exploreGuildsBtn = screen.getByRole('button', { name: /Explore Guilds/i });
    fireEvent.click(exploreGuildsBtn);
    expect(mockSetCurrentView).toHaveBeenCalledWith('communities');

    const matchSkillsBtn = screen.getByRole('button', { name: /Match Skills/i });
    fireEvent.click(matchSkillsBtn);
    expect(mockSetCurrentView).toHaveBeenCalledWith('people');

    const postSparkBtn = screen.getByRole('button', { name: /Post a Spark/i });
    fireEvent.click(postSparkBtn);
    expect(mockOpenModal).toHaveBeenCalledWith('createPost');
  });

  it('dismisses and persists to localStorage on close', () => {
    render(<OnboardingBanner />);
    const dismissBtn = screen.getByLabelText('Dismiss welcome banner');
    fireEvent.click(dismissBtn);

    expect(screen.queryByText(/Welcome to the Maker Network/i)).toBeNull();
    expect(window.localStorage.getItem('synapse_onboarding_dismissed')).toBe('true');
  });
});
