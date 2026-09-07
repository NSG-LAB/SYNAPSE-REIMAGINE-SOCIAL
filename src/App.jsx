import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { RightRail } from './components/common/RightRail';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { DiscoverPage } from './pages/DiscoverPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { EventsPage } from './pages/EventsPage';
import { PeoplePage } from './pages/PeoplePage';
import { ExplorePage } from './pages/ExplorePage';
import { MessagesView } from './components/messages/MessagesView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsView } from './components/settings/SettingsView';

// Modals
import { CreatePostModal } from './components/feed/CreatePostModal';
import { PostDetailModal } from './components/feed/PostDetailModal';
import { CreateCommunityModal } from './components/communities/CreateCommunityModal';
import { CommunityDetailModal } from './components/communities/CommunityDetailModal';
import { EventDetailModal } from './components/events/EventDetailModal';
import { ProfileDetailModal } from './components/people/ProfileDetailModal';
import { EditProfileModal } from './components/profile/EditProfileModal';

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
      <div className="main-layout">
        {/* Left Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Center Main Stage Content */}
        <main className="content-area" id="main-content">
          <ErrorBoundary>
            {renderView()}
          </ErrorBoundary>
        </main>

        {/* Right Desktop Rail (Show on Discover & Explore pages) */}
        {(currentView === 'discover' || currentView === 'explore') && (
          <RightRail />
        )}
      </div>

      {/* Global Footer */}
      <Footer />

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
