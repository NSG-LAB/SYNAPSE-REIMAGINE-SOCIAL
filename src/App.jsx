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

import { PageSkeleton } from './components/common/PageSkeleton';

function MainContent() {
  const { currentView } = useApp();

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
