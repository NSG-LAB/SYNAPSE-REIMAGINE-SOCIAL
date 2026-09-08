/**
 * SYNAPSE Lightweight Hash Router & Deep Link Synchronizer
 * Enables deep linking, browser back/forward buttons, and state preservation on page reload
 * without requiring server rewrite configuration (fully compatible with GitHub Pages).
 */

const VALID_VIEWS = new Set([
  'discover',
  'communities',
  'events',
  'people',
  'explore',
  'messages',
  'notifications',
  'profile',
  'settings'
]);

/**
 * Parses the current window.location.hash or a given hash string.
 * Returns { view, modal: { type, id } | null }
 */
export function parseHash(hashInput = window.location.hash) {
  let hash = hashInput || '';
  if (hash.startsWith('#')) hash = hash.slice(1);
  if (hash.startsWith('/')) hash = hash.slice(1);

  // Clean empty or default
  if (!hash) {
    return { view: null, modal: null };
  }

  const parts = hash.split('/').filter(Boolean);
  const root = parts[0]?.toLowerCase();
  const id = parts[1];

  // Deep links for entities
  if (root === 'post' && id) {
    return { view: 'discover', modal: { type: 'postDetail', id } };
  }
  if ((root === 'guild' || root === 'community') && id) {
    return { view: 'communities', modal: { type: 'communityDetail', id } };
  }
  if (root === 'event' && id) {
    return { view: 'events', modal: { type: 'eventDetail', id } };
  }
  if ((root === 'user' || root === 'person') && id) {
    return { view: 'people', modal: { type: 'profileDetail', id } };
  }
  if (root === 'profile' && id && id !== 'edit') {
    return { view: 'people', modal: { type: 'profileDetail', id } };
  }

  // Backwards compatibility with raw IDs like #post-1 or #comm-1
  if (hash.startsWith('post-')) {
    return { view: 'discover', modal: { type: 'postDetail', id: hash } };
  }
  if (hash.startsWith('comm-')) {
    return { view: 'communities', modal: { type: 'communityDetail', id: hash } };
  }

  // Views
  if (VALID_VIEWS.has(root)) {
    return { view: root, modal: null };
  }

  return { view: null, modal: null };
}

/**
 * Computes the URL hash corresponding to the current view and active modal.
 */
export function getHashForState(currentView, activeModal) {
  if (activeModal?.type && activeModal?.data?.id) {
    switch (activeModal.type) {
      case 'postDetail':
        return `#/post/${activeModal.data.id}`;
      case 'communityDetail':
        return `#/guild/${activeModal.data.id}`;
      case 'eventDetail':
        return `#/event/${activeModal.data.id}`;
      case 'profileDetail':
        return `#/profile/${activeModal.data.id}`;
      default:
        break;
    }
  }

  return `#/${currentView || 'discover'}`;
}

/**
 * Synchronizes the browser address bar hash with current view & modal state.
 */
export function pushRoute(currentView, activeModal, replace = false) {
  const newHash = getHashForState(currentView, activeModal);
  if (window.location.hash !== newHash) {
    if (replace) {
      window.history.replaceState(null, '', newHash);
    } else {
      window.history.pushState(null, '', newHash);
    }
  }
}
