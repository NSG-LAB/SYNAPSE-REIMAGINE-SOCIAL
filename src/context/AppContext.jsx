import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { currentUser as initialUser, mockUsers } from '../data/users';
import { mockCommunities as initialCommunities } from '../data/communities';
import { mockPosts as initialPosts } from '../data/posts';
import { mockEvents as initialEvents } from '../data/events';
import { initialConversations } from '../data/messages';
import { initialNotifications } from '../data/notifications';
import { parseHash, pushRoute } from '../utils/router';

const AppContext = createContext(null);

// Default streak data
const defaultStreakData = {
  currentStreak: 7,
  longestStreak: 12,
  xp: 2890,
  level: 3,
  lastActiveDate: new Date().toDateString(),
  todayActions: { posted: false, commented: 0, joined: false },
};

export function AppProvider({ children }) {
  // Theme State: 'dark' | 'light' | 'midnight'
  const [theme, setTheme] = useLocalStorage('synapse_theme', 'dark');

  // Navigation View State (initialized from URL hash or localStorage)
  const [currentView, setCurrentViewState] = useState(() => {
    const fromHash = parseHash().view;
    if (fromHash) return fromHash;
    try {
      const saved = window.localStorage.getItem('synapse_current_view');
      if (saved) return JSON.parse(saved);
    } catch {}
    return 'discover';
  });

  const setCurrentView = useCallback((view) => {
    setCurrentViewState(view);
    try {
      window.localStorage.setItem('synapse_current_view', JSON.stringify(view));
    } catch {}
  }, []);

  // Global Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');

  // User Profile
  const [userProfile, setUserProfile] = useLocalStorage('synapse_user_profile', initialUser);

  // Streak & XP System
  const [streakData, setStreakData] = useLocalStorage('synapse_streak_data', defaultStreakData);

  // XP gain helper
  const gainXP = useCallback((amount, actionType) => {
    setStreakData(prev => {
      const today = new Date().toDateString();
      const isNewDay = prev.lastActiveDate !== today;
      let newStreak = prev.currentStreak;
      let todayActions = isNewDay ? { posted: false, commented: 0, joined: false } : { ...prev.todayActions };

      // Update streak
      if (isNewDay) {
        const lastDate = new Date(prev.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        newStreak = diffDays === 1 ? prev.currentStreak + 1 : (diffDays === 0 ? prev.currentStreak : 1);
      }

      // Track today's actions
      if (actionType === 'post') todayActions.posted = true;
      if (actionType === 'comment') todayActions.commented += 1;
      if (actionType === 'join') todayActions.joined = true;

      const newXP = prev.xp + amount;
      return {
        ...prev,
        xp: newXP,
        level: Math.floor(newXP / 1000) + 1,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
        todayActions,
      };
    });
  }, [setStreakData]);

  // Social Connections & Bookmarks
  const [joinedCommunityIds, setJoinedCommunityIds] = useLocalStorage(
    'synapse_joined_communities',
    initialCommunities.filter(c => c.isJoinedDefault).map(c => c.id)
  );

  const [likedPostIds, setLikedPostIds] = useLocalStorage(
    'synapse_liked_posts',
    initialPosts.filter(p => p.isLiked).map(p => p.id)
  );

  const [savedPostIds, setSavedPostIds] = useLocalStorage(
    'synapse_saved_posts',
    initialPosts.filter(p => p.isSaved).map(p => p.id)
  );

  const [followedUserIds, setFollowedUserIds] = useLocalStorage(
    'synapse_followed_users',
    ['user-1', 'user-2', 'user-5']
  );

  const [joinedEventIds, setJoinedEventIds] = useLocalStorage(
    'synapse_joined_events',
    initialEvents.filter(e => e.isJoinedDefault).map(e => e.id)
  );

  // Primary Entities State (with localStorage persistence)
  const [posts, setPosts] = useLocalStorage('synapse_posts', initialPosts);
  const [communities, setCommunities] = useLocalStorage('synapse_communities', initialCommunities);
  const [events, setEvents] = useLocalStorage('synapse_events', initialEvents);
  const [conversations, setConversations] = useLocalStorage('synapse_conversations', initialConversations);
  const [notifications, setNotifications] = useLocalStorage('synapse_notifications', initialNotifications);

  // Active Chat State
  const [activeChatId, setActiveChatIdState] = useState(initialConversations[0]?.id || null);

  const setActiveChatId = useCallback((id) => {
    setActiveChatIdState(id);
    if (id) {
      setConversations(cList => cList.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
    }
  }, [setConversations]);

  // Active Modal State: { type: string | null, data: any }
  const [activeModal, setActiveModal] = useState(() => {
    const route = parseHash();
    if (route.modal) {
      if (route.modal.type === 'postDetail') {
        let storedPosts = initialPosts;
        try {
          const raw = window.localStorage.getItem('synapse_posts');
          if (raw) storedPosts = JSON.parse(raw);
        } catch {}
        const found = storedPosts.find(p => p.id === route.modal.id);
        if (found) return { type: route.modal.type, data: found };
      } else if (route.modal.type === 'communityDetail') {
        let storedCommunities = initialCommunities;
        try {
          const raw = window.localStorage.getItem('synapse_communities');
          if (raw) storedCommunities = JSON.parse(raw);
        } catch {}
        const found = storedCommunities.find(c => c.id === route.modal.id || c.slug === route.modal.id);
        if (found) return { type: route.modal.type, data: found };
      } else if (route.modal.type === 'eventDetail') {
        let storedEvents = initialEvents;
        try {
          const raw = window.localStorage.getItem('synapse_events');
          if (raw) storedEvents = JSON.parse(raw);
        } catch {}
        const found = storedEvents.find(e => e.id === route.modal.id);
        if (found) return { type: route.modal.type, data: found };
      } else if (route.modal.type === 'profileDetail') {
        const found = mockUsers.find(u => u.id === route.modal.id || u.handle === route.modal.id);
        if (found) return { type: route.modal.type, data: found };
      }
    }
    return { type: null, data: null };
  });

  // Toast System
  const [toasts, setToasts] = useState([]);

  // Synchronize Theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast Trigger Helper
  const addToast = useCallback((title, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, type, timestamp: Date.now() }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Modal Handlers
  const openModal = useCallback((type, data = null) => {
    setActiveModal({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal({ type: null, data: null });
  }, []);

  // Synchronize URL hash with currentView and activeModal (deep links)
  useEffect(() => {
    pushRoute(currentView, activeModal);
  }, [currentView, activeModal]);

  // Handle browser back / forward navigation via hashchange & popstate
  useEffect(() => {
    const handleNavigation = () => {
      const route = parseHash();
      if (route.view && route.view !== currentView) {
        setCurrentViewState(route.view);
      }
      if (route.modal) {
        let modalData = null;
        if (route.modal.type === 'postDetail') {
          modalData = posts.find(p => p.id === route.modal.id);
        } else if (route.modal.type === 'communityDetail') {
          modalData = communities.find(c => c.id === route.modal.id || c.slug === route.modal.id);
        } else if (route.modal.type === 'eventDetail') {
          modalData = events.find(e => e.id === route.modal.id);
        } else if (route.modal.type === 'profileDetail') {
          modalData = mockUsers.find(u => u.id === route.modal.id || u.handle === route.modal.id);
        }
        if (modalData) {
          setActiveModal({ type: route.modal.type, data: modalData });
        }
      } else if (activeModal.type) {
        setActiveModal({ type: null, data: null });
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [currentView, activeModal.type, posts, communities, events]);

  // Community Interactions
  const toggleJoinCommunity = useCallback((communityId) => {
    setJoinedCommunityIds(prev => {
      const isJoined = prev.includes(communityId);
      const community = communities.find(c => c.id === communityId);
      const name = community ? community.name : 'Community';

      if (isJoined) {
        addToast(`Left guild: ${name}`, 'info');
        // Decrement community member count
        setCommunities(cList => cList.map(c => c.id === communityId ? { ...c, memberCount: Math.max(0, c.memberCount - 1) } : c));
        return prev.filter(id => id !== communityId);
      } else {
        gainXP(30, 'join');
        addToast(`Joined guild: ${name}! +30 XP 🎉`, 'success');
        // Increment community member count
        setCommunities(cList => cList.map(c => c.id === communityId ? { ...c, memberCount: c.memberCount + 1 } : c));
        try {
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
        } catch {}
        return [...prev, communityId];
      }
    });
  }, [communities, addToast, setCommunities, setJoinedCommunityIds, gainXP]);

  const createCommunity = useCallback((newComm) => {
    const commId = 'comm-' + Date.now();
    const created = {
      id: commId,
      name: newComm.name,
      slug: newComm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: newComm.tagline || 'New community guild on SYNAPSE',
      description: newComm.description,
      coverImage: newComm.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      icon: newComm.icon || '🚀',
      category: newComm.category || 'Technology',
      memberCount: 1,
      activityLevel: 'Active Sprints',
      activityScore: 90,
      isJoinedDefault: true,
      rules: newComm.rules || ['Be respectful', 'Share original work'],
      featuredChallenge: newComm.featuredChallenge || 'Founding Community Sprint',
      topics: newComm.topics || ['Community', 'Collaboration'],
      moderators: [userProfile.name]
    };

    setCommunities(prev => [created, ...prev]);
    setJoinedCommunityIds(prev => [...prev, commId]);
    addToast(`Guild "${created.name}" created successfully!`, 'success');
    closeModal();
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  }, [userProfile.name, setCommunities, setJoinedCommunityIds, addToast, closeModal]);

  // Post Interactions
  const toggleLike = useCallback((postId) => {
    setLikedPostIds(prev => {
      const isLiked = prev.includes(postId);
      setPosts(pList => pList.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likesCount: isLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1,
            isLiked: !isLiked
          };
        }
        return p;
      }));

      if (!isLiked) {
        addToast('Spark appreciated! ❤️', 'success');
        return [...prev, postId];
      } else {
        return prev.filter(id => id !== postId);
      }
    });
  }, [setLikedPostIds, setPosts, addToast]);

  const toggleSave = useCallback((postId) => {
    setSavedPostIds(prev => {
      const isSaved = prev.includes(postId);
      setPosts(pList => pList.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            savesCount: isSaved ? Math.max(0, p.savesCount - 1) : p.savesCount + 1,
            isSaved: !isSaved
          };
        }
        return p;
      }));

      if (!isSaved) {
        addToast('Saved to your sparks collection 📌', 'success');
        return [...prev, postId];
      } else {
        addToast('Removed from saved collection', 'info');
        return prev.filter(id => id !== postId);
      }
    });
  }, [setSavedPostIds, setPosts, addToast]);

  const votePoll = useCallback((postId, optionId) => {
    setPosts(pList => pList.map(p => {
      if (p.id === postId && p.poll) {
        if (p.poll.userVotedOptionId) return p; // already voted
        const updatedOptions = p.poll.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });
        return {
          ...p,
          poll: {
            ...p.poll,
            totalVotes: p.poll.totalVotes + 1,
            userVotedOptionId: optionId,
            options: updatedOptions
          }
        };
      }
      return p;
    }));
    addToast('Vote registered! 🗳️', 'success');
  }, [setPosts, addToast]);

  const addComment = useCallback((postId, content) => {
    if (!content.trim()) return;
    const newComment = {
      id: 'comm-' + Date.now(),
      author: {
        name: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar
      },
      timestamp: 'Just now',
      content: content.trim(),
      upvotes: 0
    };

    setPosts(pList => pList.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: (p.commentsCount || 0) + 1,
          comments: [newComment, ...(p.comments || [])]
        };
      }
      return p;
    }));
    gainXP(15, 'comment');
    addToast('Contribution posted to discussion! +15 XP 💬', 'success');
  }, [userProfile, setPosts, addToast, gainXP]);

  const createPost = useCallback((postData) => {
    const newPost = {
      id: 'post-' + Date.now(),
      type: postData.type || 'spark',
      author: {
        id: userProfile.id,
        name: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar,
        role: userProfile.role
      },
      communityId: postData.communityId || 'comm-1',
      communityName: postData.communityName || 'Generative AI & Shader Lab',
      title: postData.title,
      content: postData.content,
      image: postData.image || null,
      poll: postData.poll || null,
      tags: postData.tags || ['Community', 'IdeaSpark'],
      timestamp: 'Just now',
      likesCount: 1,
      isLiked: true,
      savesCount: 0,
      isSaved: false,
      commentsCount: 0,
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setLikedPostIds(prev => [...prev, newPost.id]);
    gainXP(50, 'post');
    addToast('New Spark shared with the community! +50 XP ⚡', 'success');
    closeModal();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  }, [userProfile, setPosts, setLikedPostIds, addToast, closeModal, gainXP]);

  // Event & Challenge Interactions
  const toggleJoinEvent = useCallback((eventId) => {
    setJoinedEventIds(prev => {
      const isJoined = prev.includes(eventId);
      const ev = events.find(e => e.id === eventId);
      const title = ev ? ev.title : 'Challenge';

      if (isJoined) {
        addToast(`Left ${ev?.type === 'challenge' ? 'challenge' : 'event'}: ${title}`, 'info');
        setEvents(eList => eList.map(e => e.id === eventId ? { ...e, participantsCount: Math.max(0, e.participantsCount - 1) } : e));
        return prev.filter(id => id !== eventId);
      } else {
        gainXP(40, 'join');
        addToast(`Joined ${ev?.type === 'challenge' ? 'challenge' : 'event'}: ${title}! +40 XP 🚀`, 'success');
        setEvents(eList => eList.map(e => e.id === eventId ? { ...e, participantsCount: e.participantsCount + 1 } : e));
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch {}
        return [...prev, eventId];
      }
    });
  }, [events, addToast, setEvents, setJoinedEventIds, gainXP]);

  // People & Following
  const toggleFollowUser = useCallback((userId) => {
    setFollowedUserIds(prev => {
      const isFollowed = prev.includes(userId);
      const user = mockUsers.find(u => u.id === userId);
      const name = user ? user.name : 'User';

      if (isFollowed) {
        addToast(`Unfollowed ${name}`, 'info');
        return prev.filter(id => id !== userId);
      } else {
        addToast(`Connected with ${name}! 🤝`, 'success');
        return [...prev, userId];
      }
    });
  }, [addToast, setFollowedUserIds]);

  // Messaging Interactions
  const sendMessage = useCallback((convId, text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setConversations(cList => cList.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          lastMessageTimestamp: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));
    addToast('Message sent 🚀', 'info');
  }, [setConversations, addToast]);

  const startConversationWithUser = useCallback((user) => {
    // Check if conversation already exists with this user
    const existing = conversations.find(c => c.contact.id === user.id || c.contact.handle === user.handle);
    if (existing) {
      setActiveChatId(existing.id);
      setCurrentView('messages');
      return;
    }

    const newConv = {
      id: 'conv-' + Date.now(),
      contact: {
        id: user.id,
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
        role: user.role,
        online: true,
        mutualGuilds: 2
      },
      unreadCount: 0,
      lastMessageTimestamp: 'Just now',
      messages: [
        {
          id: 'm-init-' + Date.now(),
          sender: 'user',
          text: `Hi ${user.name}! Loved your recent work and wanted to connect on SYNAPSE.`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveChatId(newConv.id);
    setCurrentView('messages');
    addToast(`Started conversation with ${user.name}`, 'success');
  }, [conversations, setConversations, setActiveChatId, setCurrentView, addToast]);

  // Notifications Interactions
  const markNotificationRead = useCallback((notifId) => {
    setNotifications(nList => nList.map(n => n.id === notifId ? { ...n, read: true } : n));
  }, [setNotifications]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(nList => nList.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  }, [setNotifications, addToast]);

  // Profile Updates
  const updateUserProfile = useCallback((updatedFields) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedFields
    }));
    addToast('Profile successfully updated! ✨', 'success');
    closeModal();
  }, [setUserProfile, addToast, closeModal]);

  // Reset Demo Data
  const resetAllData = useCallback(() => {
    window.localStorage.clear();
    setUserProfile(initialUser);
    setJoinedCommunityIds(initialCommunities.filter(c => c.isJoinedDefault).map(c => c.id));
    setLikedPostIds(initialPosts.filter(p => p.isLiked).map(p => p.id));
    setSavedPostIds(initialPosts.filter(p => p.isSaved).map(p => p.id));
    setFollowedUserIds(['user-1', 'user-2', 'user-5']);
    setJoinedEventIds(initialEvents.filter(e => e.isJoinedDefault).map(e => e.id));
    setPosts(initialPosts);
    setCommunities(initialCommunities);
    setEvents(initialEvents);
    setConversations(initialConversations);
    setNotifications(initialNotifications);
    setTheme('dark');
    addToast('All demo state reset to pristine default!', 'info');
  }, [
    setUserProfile, setJoinedCommunityIds, setLikedPostIds, setSavedPostIds,
    setFollowedUserIds, setJoinedEventIds, setPosts, setCommunities,
    setEvents, setConversations, setNotifications, setTheme, addToast
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const value = {
    theme,
    setTheme,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    userProfile,
    updateUserProfile,
    joinedCommunityIds,
    toggleJoinCommunity,
    createCommunity,
    communities,
    likedPostIds,
    toggleLike,
    savedPostIds,
    toggleSave,
    followedUserIds,
    toggleFollowUser,
    joinedEventIds,
    toggleJoinEvent,
    posts,
    createPost,
    votePoll,
    addComment,
    events,
    conversations,
    activeChatId,
    setActiveChatId,
    sendMessage,
    startConversationWithUser,
    notifications,
    unreadNotificationsCount,
    unreadMessagesCount,
    markNotificationRead,
    markAllNotificationsRead,
    activeModal,
    openModal,
    closeModal,
    toasts,
    addToast,
    removeToast,
    resetAllData,
    streakData,
    gainXP
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
