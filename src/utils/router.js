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
 *
 * @param {string} [hashInput=window.location.hash] - The URL hash string to parse
 * @returns {{ view: string | null, modal: { type: string, id?: string } | null }}
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

  // Action modals
  if (root === 'post' && id === 'new') {
    return { view: 'discover', modal: { type: 'createPost' } };
  }
  if ((root === 'guild' || root === 'community') && id === 'new') {
    return { view: 'communities', modal: { type: 'createCommunity' } };
  }
  if (root === 'profile' && id === 'edit') {
    return { view: 'profile', modal: { type: 'editProfile' } };
  }

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
  if (root === 'profile' && id) {
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
 *
 * @param {string} currentView - The current active page view (e.g. 'discover')
 * @param {{ type: string | null, data?: any }} activeModal - Active modal descriptor
 * @returns {string} The computed URL hash
 */
export function getHashForState(currentView, activeModal) {
  if (activeModal?.type) {
    if (activeModal.type === 'createPost') {
      return '#/post/new';
    }
    if (activeModal.type === 'createCommunity') {
      return '#/guild/new';
    }
    if (activeModal.type === 'editProfile') {
      return '#/profile/edit';
    }

    if (activeModal.data?.id) {
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
  }

  return `#/${currentView || 'discover'}`;
}

/**
 * Synchronizes the browser address bar hash with current view & modal state.
 *
 * @param {string} currentView - The active page view
 * @param {{ type: string | null, data?: any }} activeModal - The active modal
 * @param {boolean} [replace=false] - Whether to use history.replaceState instead of pushState
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
