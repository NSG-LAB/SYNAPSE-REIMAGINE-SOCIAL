import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <aside aria-label="Notifications" className="toast-container" style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem',
      maxWidth: '380px',
      width: 'calc(100% - 3rem)',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="toast-item glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: isSuccess
                ? '4px solid var(--color-accent-emerald)'
                : isError
                ? '4px solid var(--color-accent-rose)'
                : '4px solid var(--color-primary)',
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'auto',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
              {isSuccess && <CheckCircle2 size={18} color="var(--color-accent-emerald)" />}
              {isError && <AlertCircle size={18} color="var(--color-accent-rose)" />}
              {!isSuccess && !isError && <Info size={18} color="var(--color-primary)" />}
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                {toast.title}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast notification"
              className="btn-ghost"
              style={{ padding: '0.25rem', borderRadius: 'var(--radius-xs)', color: 'var(--color-text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
