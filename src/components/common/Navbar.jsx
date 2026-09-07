import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  PlusCircle, 
  Bell, 
  MessageSquare, 
  Moon, 
  Sun, 
  Sparkles, 
  Compass, 
  Users, 
  Award, 
  Settings, 
  Menu, 
  X,
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('midnight');
    else setTheme('dark');
  };

  return (
    <header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-glass-border)',
        padding: '0 1.25rem'
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}
      >
        {/* Left: Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button
            onClick={() => handleNavClick('discover')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}
            aria-label="SYNAPSE Home"
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <Radio size={22} color="#ffffff" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  letterSpacing: '-0.03em',
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                  lineHeight: 1
                }}
              >
                SYNAPSE
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase'
                }}
              >
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

        {/* Center: Live Instant Search Input */}
        <div
          style={{
            flex: 1,
            maxWidth: '380px',
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
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-full)'
            }}
            aria-label="Search SYNAPSE platform"
          />
        </div>

        {/* Right: Actions, Notifications, Messages, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Create Spark Action */}
          <button
            onClick={() => openModal('createPost')}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: 'var(--radius-full)' }}
          >
            <PlusCircle size={16} />
            <span className="hide-on-mobile">New Spark</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label={`Toggle theme (Current: ${theme})`}
            title={`Theme: ${theme}`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Messages */}
          <button
            onClick={() => setCurrentView('messages')}
            className="btn-icon"
            style={{ position: 'relative' }}
            aria-label={`Messages (${unreadMessagesCount} unread)`}
          >
            <MessageSquare size={18} />
            {unreadMessagesCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '9px',
                  height: '9px',
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
            style={{ position: 'relative' }}
            aria-label={`Notifications (${unreadNotificationsCount} unread)`}
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'var(--color-accent-rose)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '17px',
                  height: '17px',
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

          {/* Profile Trigger */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '3px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--border-medium)',
                background: 'var(--color-bg-surface)'
              }}
              aria-expanded={profileDropdownOpen}
              aria-label="User profile menu"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
              />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  width: '230px',
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
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="btn-icon mobile-menu-toggle"
            style={{ display: 'none' }}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="glass-panel mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: 'var(--color-bg-surface)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 990
          }}
        >
          {/* Mobile Search */}
          <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <Search
              size={16}
              color="var(--color-text-muted)"
              style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'explore') setCurrentView('explore');
              }}
              placeholder="Search SYNAPSE..."
              className="input-field"
              style={{ paddingLeft: '2.5rem', fontSize: '0.875rem' }}
            />
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start', width: '100%' }}
              >
                <Icon size={18} />
                {link.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Inline styles for responsive Navbar helpers */}
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
          .mobile-menu-toggle {
            display: inline-flex !important;
          }
        }
        @media (max-width: 580px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
