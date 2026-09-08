import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafeImage } from './SafeImage';
import { 
  Search, 
  Plus, 
  Bell, 
  MessageSquare, 
  Moon, 
  Sun, 
  Sparkles, 
  Compass, 
  Users, 
  Award, 
  Settings, 
  Radio
} from 'lucide-react';

export function Navbar() {
  const {
    theme,
    setTheme,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    userProfile,
    unreadNotificationsCount,
    unreadMessagesCount,
    openModal
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'discover', label: 'Discover', icon: Sparkles },
    { id: 'communities', label: 'Guilds', icon: Compass },
    { id: 'events', label: 'Challenges', icon: Award },
    { id: 'people', label: 'People Match', icon: Users },
    { id: 'explore', label: 'Explore All', icon: Search }
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setProfileDropdownOpen(false);
  };

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('midnight');
    else setTheme('dark');
  };

  return (
    <header className="glass-panel navbar-header">
      <div className="navbar-inner">
        {/* Left: Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
          <button
            onClick={() => handleNavClick('discover')}
            className="navbar-brand-btn"
            aria-label="SYNAPSE Home"
          >
            <div className="navbar-brand-icon">
              <Radio size={18} color="#ffffff" />
            </div>
            <div>
              <span className="navbar-brand-title">
                SYNAPSE
              </span>
              <span className="hide-on-mobile-subtitle navbar-brand-sub">
                Reimagine Social
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: 'none',
              gap: '0.35rem',
              alignItems: 'center'
            }}
            className="desktop-nav-links"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '0.45rem 0.9rem',
                    fontWeight: 600
                  }}
                >
                  <Icon size={15} />
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Live Instant Search Input (Desktop/Tablet) */}
        <div
          style={{
            flex: 1,
            maxWidth: '360px',
            position: 'relative',
            display: 'none'
          }}
          className="search-bar-container"
        >
          <Search
            size={16}
            color="var(--color-text-muted)"
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentView !== 'explore' && e.target.value.trim().length > 0) {
                setCurrentView('explore');
              }
            }}
            placeholder="Search sparks, guilds, challenges, people..."
            className="input-field"
            style={{
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.45rem',
              paddingBottom: '0.45rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)'
            }}
            aria-label="Search SYNAPSE platform"
          />
        </div>

        {/* Right: Actions cluster (Optimized for Mobile width) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          {/* Create Spark Action Button */}
          <button
            onClick={() => openModal('createPost')}
            className="btn btn-primary btn-sm spark-action-btn"
            aria-label="Create New Spark"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.8rem'
            }}
            title="Create New Spark"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hide-on-mobile">New Spark</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label={`Toggle theme (Current: ${theme})`}
            title={`Theme: ${theme}`}
            style={{ width: '36px', height: '36px' }}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Messages (Desktop only - mobile uses bottom nav) */}
          <button
            onClick={() => setCurrentView('messages')}
            className="btn-icon hide-on-mobile-icon"
            style={{ position: 'relative', width: '36px', height: '36px' }}
            aria-label={`Messages (${unreadMessagesCount} unread)`}
          >
            <MessageSquare size={17} />
            {unreadMessagesCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  width: '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: '0 0 8px var(--color-primary)'
                }}
              />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setCurrentView('notifications')}
            className="btn-icon"
            style={{ position: 'relative', width: '36px', height: '36px' }}
            aria-label={`Notifications (${unreadNotificationsCount} unread)`}
          >
            <Bell size={17} />
            {unreadNotificationsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'var(--color-accent-rose)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1
                }}
              >
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Trigger */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--border-medium)',
                background: 'var(--color-bg-surface)'
              }}
              aria-expanded={profileDropdownOpen}
              aria-label="User profile menu"
            >
              <SafeImage
                src={userProfile.avatar}
                alt={userProfile.name}
                type="avatar"
                name={userProfile.name}
                style={{ width: '30px', height: '30px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
              />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <>
                <div
                  onClick={() => setProfileDropdownOpen(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 940,
                    background: 'transparent'
                  }}
                  aria-hidden="true"
                />
                <div
                  className="glass-panel profile-dropdown-panel"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '230px',
                    maxWidth: 'calc(100vw - 1.5rem)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    zIndex: 950,
                    animation: 'fadeIn 0.15s ease-out'
                  }}
                >
                  <div style={{ padding: '0.35rem 0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{userProfile.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>@{userProfile.handle}</div>
                  </div>

                <button
                  onClick={() => {
                    setCurrentView('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  <Users size={15} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    openModal('editProfile');
                    setProfileDropdownOpen(false);
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  <Sparkles size={15} />
                  Edit Profile
                </button>

                <button
                  onClick={() => {
                    setCurrentView('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: 'flex-start', width: '100%' }}
                >
                  <Settings size={15} />
                  Preferences & Settings
                </button>
              </div>
            </>
          )}
        </div>
        </div>
      </div>

      {/* Responsive layout CSS rules for header */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .search-bar-container {
            display: block !important;
          }
        }
        @media (max-width: 899px) {
          .hide-on-mobile-icon {
            display: none !important;
          }
        }
        @media (max-width: 639px) {
          .hide-on-mobile {
            display: none !important;
          }
          .spark-action-btn {
            padding: 0 !important;
            width: 36px !important;
            height: 36px !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .hide-on-mobile-subtitle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
