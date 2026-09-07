// Notifications data for SYNAPSE

export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'challenge_joined',
    title: 'New collaborator joined your sprint',
    description: 'Devon Cruz RSVP’d to the Zero-JS Micro-Interaction Design Sprint!',
    timestamp: '15m ago',
    read: false,
    user: {
      name: 'Devon Cruz',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      handle: 'devoncruz'
    },
    targetType: 'event',
    targetId: 'event-3'
  },
  {
    id: 'notif-2',
    type: 'comment',
    title: 'New discussion reply',
    description: 'Elena Rostova commented on your discussion: "Reactive Reaction-Diffusion in WebGPU"',
    timestamp: '1h ago',
    read: false,
    user: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      handle: 'elena_sound'
    },
    targetType: 'post',
    targetId: 'post-2'
  },
  {
    id: 'notif-3',
    type: 'guild_invite',
    title: 'Guild Invitation',
    description: 'Kofi Mensah invited you to collaborate in Afrofuturist 3D & Spatial Worlds',
    timestamp: '3h ago',
    read: false,
    user: {
      name: 'Kofi Mensah',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      handle: 'kofi_design'
    },
    targetType: 'community',
    targetId: 'comm-10'
  },
  {
    id: 'notif-4',
    type: 'follow',
    title: 'New Connection',
    description: 'Dr. Tariq Al-Mansoor started following your research sparks and joined your network',
    timestamp: '5h ago',
    read: true,
    user: {
      name: 'Dr. Tariq Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      handle: 'tariq_bio'
    },
    targetType: 'user',
    targetId: 'user-6'
  },
  {
    id: 'notif-5',
    type: 'like',
    title: 'Sparks Appreciation',
    description: 'Marcus Chen and 14 others bookmarked your Chroma-Token accessible color generator',
    timestamp: 'Yesterday',
    read: true,
    user: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      handle: 'marcus_chen'
    },
    targetType: 'post',
    targetId: 'post-19'
  },
  {
    id: 'notif-6',
    type: 'challenge_milestone',
    title: 'Stage Completed',
    description: 'Stage 2 "Compute Shader Setup" marked completed in 7-Day WebGL Morphogenesis Sprint',
    timestamp: '2 days ago',
    read: true,
    user: {
      name: 'Zara Thorne',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      handle: 'zaracodes'
    },
    targetType: 'event',
    targetId: 'event-1'
  }
];
