import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]'
].join(', ');

export function Modal({ isOpen, onClose, title, children, maxWidth = '640px' }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Focus trap and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    // 1. Capture the element that triggered the modal
    triggerElementRef.current = document.activeElement;

    // Prevent body scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Move focus into the modal once rendered
    const focusTimer = requestAnimationFrame(() => {
      if (!modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length > 0) {
        // If there's an autofocus element or an input, prefer it, otherwise focus the close button or first focusable
        const preferred = modalRef.current.querySelector('[autofocus]') || focusable[0];
        preferred.focus();
      } else {
        modalRef.current.focus();
      }
    });

    // 3. Intercept Escape (to close) and Tab (to trap focus inside dialog)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;

        const focusables = Array.from(modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
          .filter(el => {
            if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') return false;
            if (el.offsetParent !== null || el.getClientRects().length > 0) return true;
            // Fallback for JSDOM or headless environments without full layout geometry
            const isJsdom = typeof navigator !== 'undefined' && /jsdom|Node\.js/i.test(navigator.userAgent);
            return isJsdom && el.style.display !== 'none' && el.style.visibility !== 'hidden';
          });

        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: if on first element, wrap to last
          if (document.activeElement === firstElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // 4. Restore focus to the trigger element on close
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        // Small delay to ensure the DOM has updated
        setTimeout(() => {
          triggerElementRef.current?.focus();
        }, 10);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        tabIndex={-1}
        className="modal-content glass-panel"
        style={{
          width: '100%',
          maxWidth,
          maxHeight: 'min(92vh, 92dvh)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)',
          animation: 'modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          outline: 'none'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            flexShrink: 0
          }}
        >
          <h2 id="modal-headline" style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3 }}>
            {title}
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close dialog"
            className="btn-icon"
            style={{ width: '32px', height: '32px', flexShrink: 0 }}
          >
            <X size={17} />
          </button>
        </div>

        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
