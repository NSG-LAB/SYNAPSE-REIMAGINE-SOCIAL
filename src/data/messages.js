// Mock Conversations and Chat Threads for SYNAPSE

export const initialConversations = [
  {
    id: 'conv-1',
    contact: {
      id: 'user-5',
      name: 'Zara Thorne',
      handle: 'zaracodes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      role: 'Shader Artist & Creative Coder',
      online: true,
      mutualGuilds: 3
    },
    unreadCount: 2,
    lastMessageTimestamp: '10m ago',
    messages: [
      {
        id: 'm1-1',
        sender: 'contact',
        text: 'Hey Kai! Loved your Chroma-Token generator release.',
        timestamp: 'Yesterday at 16:40'
      },
      {
        id: 'm1-2',
        sender: 'user',
        text: 'Thanks Zara! The OKLCH perceptual lightness interpolation really solved the dark mode saturation blowouts.',
        timestamp: 'Yesterday at 17:05'
      },
      {
        id: 'm1-3',
        sender: 'contact',
        text: 'Are you joining the 7-Day Shader Morphogenesis sprint on Monday? I was wondering if we could pair on a reactive audio-driven reaction diffusion canvas.',
        timestamp: '10m ago'
      },
      {
        id: 'm1-4',
        sender: 'contact',
        text: 'I can send you the WGSL compute pipeline repo to look over if you are up for it!',
        timestamp: '9m ago'
      }
    ]
  },
  {
    id: 'conv-2',
    contact: {
      id: 'user-2',
      name: 'Marcus Chen',
      handle: 'marcus_chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      role: 'Indie Founder & Systems Architect',
      online: true,
      mutualGuilds: 4
    },
    unreadCount: 0,
    lastMessageTimestamp: '2h ago',
    messages: [
      {
        id: 'm2-1',
        sender: 'contact',
        text: 'Kai, saw your comment on the local-first poll. We just benchmarked Yjs over binary WebSockets with 500ms jitter.',
        timestamp: '3h ago'
      },
      {
        id: 'm2-2',
        sender: 'user',
        text: 'How did the vector clock merge feel? Any noticeable UI stalls on mobile threads?',
        timestamp: '2h 15m ago'
      },
      {
        id: 'm2-3',
        sender: 'contact',
        text: 'Practically imperceptible on iOS Safari! Let us do a quick screen share after the sprint wrap-up.',
        timestamp: '2h ago'
      }
    ]
  },
  {
    id: 'conv-3',
    contact: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: 'elena_sound',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      role: 'Spatial Audio Designer',
      online: false,
      mutualGuilds: 2
    },
    unreadCount: 0,
    lastMessageTimestamp: 'Yesterday',
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        text: 'Elena, were those ambisonic field recordings captured with the Sennheiser AMBEO or an open tetrahedral array?',
        timestamp: 'Yesterday at 11:20'
      },
      {
        id: 'm3-2',
        sender: 'contact',
        text: 'Custom DIY array with matched Primo EM272 capsules! Printed the housing on a resin printer. I will post the schematics in the Spatial Audio guild tomorrow.',
        timestamp: 'Yesterday at 14:10'
      }
    ]
  },
  {
    id: 'conv-4',
    contact: {
      id: 'user-3',
      name: 'Amina Diallo',
      handle: 'aminadiallo',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
      role: 'Climate Data Scientist',
      online: false,
      mutualGuilds: 2
    },
    unreadCount: 0,
    lastMessageTimestamp: '2 days ago',
    messages: [
      {
        id: 'm4-1',
        sender: 'contact',
        text: 'Kai, we have about 400 cyclist telemetry data points formatted in GeoJSON. Could you advise on how to animate the thermal gradient trails smoothly?',
        timestamp: '2 days ago'
      },
      {
        id: 'm4-2',
        sender: 'user',
        text: 'Definitely! Using deck.gl Tripmaterial layers or a custom WebGL vertex displacement shader will keep it at 60 FPS easily. Let us set up a branch.',
        timestamp: '2 days ago'
      }
    ]
  },
  {
    id: 'conv-5',
    contact: {
      id: 'user-4',
      name: 'Liam Gallagher',
      handle: 'liam_lens',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      role: 'Street Photographer',
      online: true,
      mutualGuilds: 1
    },
    unreadCount: 1,
    lastMessageTimestamp: '3 hours ago',
    messages: [
      {
        id: 'm5-1',
        sender: 'contact',
        text: 'Hey! The weekend monochrome sprint is live. Make sure to bring your camera if you are in the city!',
        timestamp: '3 hours ago'
      }
    ]
  }
];
