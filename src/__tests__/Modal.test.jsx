import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '../components/common/Modal';

function TestModalWrapper({ initialOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div>
      <button data-testid="open-trigger" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Test Dialog">
        <div>
          <input data-testid="input-inside" placeholder="Type here" />
          <button data-testid="action-inside" onClick={() => setIsOpen(false)}>
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

describe('Modal Component Accessibility & Focus Management', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()} title="Hidden Modal">Content</Modal>);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders with correct accessibility attributes when open', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} title="Accessible Dialog">Modal Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(screen.getByText('Accessible Dialog')).toBeDefined();
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Escape Test">Content</Modal>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('moves focus inside the modal on open and traps Tab focus', async () => {
    render(<TestModalWrapper initialOpen={false} />);
    const trigger = screen.getByTestId('open-trigger');

    // Focus and click trigger
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    fireEvent.click(trigger);

    // Modal opens
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeDefined();
    });

    const closeBtn = screen.getByLabelText('Close dialog');
    const input = screen.getByTestId('input-inside');
    const submitBtn = screen.getByTestId('action-inside');

    // Focus should be inside modal
    await waitFor(() => {
      const isInside = document.activeElement === closeBtn ||
                       document.activeElement === input ||
                       document.activeElement === submitBtn ||
                       document.activeElement === screen.getByRole('dialog');
      expect(isInside).toBe(true);
    });

    // Test Tab trap: from submitBtn (last element), Tab should wrap to closeBtn (first element)
    submitBtn.focus();
    expect(document.activeElement).toBe(submitBtn);

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });
    // In our keydown trap handler, pressing Tab on lastElement focuses firstElement (closeBtn)
    expect(document.activeElement).toBe(closeBtn);

    // Test Shift+Tab trap: from closeBtn (first element), Shift+Tab wraps to submitBtn (last element)
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(submitBtn);
  });

  it('restores focus to trigger element upon closing', async () => {
    render(<TestModalWrapper initialOpen={false} />);
    const trigger = screen.getByTestId('open-trigger');
    trigger.focus();
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeDefined();
    });

    // Close via Close button
    const closeBtn = screen.getByLabelText('Close dialog');
    fireEvent.click(closeBtn);

    // Modal is removed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });

    // Focus restored to trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });
});
