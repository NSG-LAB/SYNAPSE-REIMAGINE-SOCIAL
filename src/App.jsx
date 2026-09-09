import React, { Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { RightRail } from './components/common/RightRail';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Code-split route-level pages and views via React.lazy
const DiscoverPage = React.lazy(() =>
  import('./pages/DiscoverPage').then(m => ({ default: m.DiscoverPage }))
);
const CommunitiesPage = React.lazy(() =>
  import('./pages/CommunitiesPage').then(m => ({ default: m.CommunitiesPage }))
);
const EventsPage = React.lazy(() =>
  import('./pages/EventsPage').then(m => ({ default: m.EventsPage }))
);
const PeoplePage = React.lazy(() =>
  import('./pages/PeoplePage').then(m => ({ default: m.PeoplePage }))
);
const ExplorePage = React.lazy(() =>
  import('./pages/ExplorePage').then(m => ({ default: m.ExplorePage }))
);
const MessagesView = React.lazy(() =>
  import('./components/messages/MessagesView').then(m => ({ default: m.MessagesView }))
);
const NotificationsView = React.lazy(() =>
  import('./components/notifications/NotificationsView').then(m => ({ default: m.NotificationsView }))
);
const ProfileView = React.lazy(() =>
  import('./components/profile/ProfileView').then(m => ({ default: m.ProfileView }))
);
const SettingsView = React.lazy(() =>
  import('./components/settings/SettingsView').then(m => ({ default: m.SettingsView }))
);

// Modals
import { CreatePostModal } from './components/feed/CreatePostModal';
import { PostDetailModal } from './components/feed/PostDetailModal';
import { CreateCommunityModal } from './components/communities/CreateCommunityModal';
import { CommunityDetailModal } from './components/communities/CommunityDetailModal';
import { EventDetailModal } from './components/events/EventDetailModal';
import { ProfileDetailModal } from './components/people/ProfileDetailModal';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';

import { PageSkeleton } from './components/common/PageSkeleton';

function MainContent() {
  const { currentView, activeModal, openModal, closeModal, setCurrentView, setTheme } = useApp();

  // Global Keyboard Shortcuts
  React.useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable) {
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        if (activeModal?.type === 'keyboardShortcuts') {
          closeModal();
        } else {
          openModal('keyboardShortcuts');
        }
      } else if (e.key === '1') {
        setCurrentView('discover');
      } else if (e.key === '2') {
        setCurrentView('communities');
      } else if (e.key === '3') {
        setCurrentView('events');
      } else if (e.key === '4') {
        setCurrentView('people');
      } else if (e.key === '5') {
        setCurrentView('messages');
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        openModal('createPost');
      } else if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        openModal('createCommunity');
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setTheme(t => (t === 'dark' ? 'light' : t === 'light' ? 'midnight' : 'dark'));
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeModal?.type, openModal, closeModal, setCurrentView, setTheme]);

  const renderView = () => {
    switch (currentView) {
      case 'communities':
        return <CommunitiesPage />;
      case 'events':
        return <EventsPage />;
      case 'people':
        return <PeoplePage />;
      case 'explore':
        return <ExplorePage />;
      case 'messages':
        return <MessagesView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'discover':
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Main Top Navigation Header */}
      <Navbar />

      {/* Core Responsive 3-Column / 2-Column / Mobile Layout */}
      <div className={`main-layout ${currentView === 'messages' ? 'is-messages' : ''}`}>
        {/* Left Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Center Main Stage Content */}
        <main className="content-area" id="main-content">
          <ErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              {renderView()}
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Right Desktop Rail (Show on Discover & Explore pages) */}
        {(currentView === 'discover' || currentView === 'explore') && (
          <RightRail />
        )}
      </div>

      {/* Global Footer (Hidden in Messages for native app viewport feel) */}
      {currentView !== 'messages' && <Footer />}

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Interactive Modals */}
      <CreatePostModal />
      <PostDetailModal />
      <CreateCommunityModal />
      <CommunityDetailModal />
      <EventDetailModal />
      <ProfileDetailModal />
      <EditProfileModal />
      <KeyboardShortcutsModal
        isOpen={activeModal?.type === 'keyboardShortcuts'}
        onClose={closeModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
