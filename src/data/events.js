// Events & Participatory Challenges for SYNAPSE

export const mockEvents = [
  {
    id: 'event-1',
    title: '7-Day WebGL & Shader Morphogenesis Sprint',
    type: 'challenge',
    category: 'Technology',
    date: 'Oct 14 - Oct 21, 2025',
    time: 'Async Sprint + Live Stage Finale',
    location: 'Virtual / SYNAPSE Shader Stage',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Zara Thorne',
      handle: 'zaracodes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      role: 'Shader Alchemist'
    },
    communityId: 'comm-1',
    communityName: 'Generative AI & Shader Lab',
    description: 'Push real-time math into organic biology. Build an interactive WebGL or WebGPU shader simulation based on reaction-diffusion, cellular automata, or slime-mold Physarum algorithms. All submissions will be featured in the 3D Community Gallery.',
    participantsCount: 184,
    maxParticipants: 250,
    isJoinedDefault: true,
    rewardXP: 350,
    difficulty: 'Intermediate',
    stages: [
      { id: 's1', name: 'Ideation & Algorithm Selection', completed: true, date: 'Day 1-2' },
      { id: 's2', name: 'Compute / Fragment Shader Setup', completed: true, date: 'Day 3-4' },
      { id: 's3', name: 'Interactive Touch / Audio Reactivity', completed: false, date: 'Day 5-6' },
      { id: 's4', name: 'Community Showcase & Peer Review', completed: false, date: 'Day 7' }
    ]
  },
  {
    id: 'event-2',
    title: 'Weekend Monochrome Street Photography Sprint',
    type: 'challenge',
    category: 'Photography',
    date: 'Saturday, Oct 18, 2025',
    time: '48-Hour Global Photo Run',
    location: 'Anywhere Worldwide / Local Meetups',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Liam Gallagher',
      handle: 'liam_lens',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      role: 'Street Photographer'
    },
    communityId: 'comm-5',
    communityName: 'Street Photography & Raw Vision',
    description: 'Step outside with one fixed focal length lens (or your phone locked to monochrome). The theme is "Shadows & Rhythms of Transit". Submit up to 3 raw un-retouched frames for constructive community critique and a digital zine feature.',
    participantsCount: 242,
    maxParticipants: 300,
    isJoinedDefault: false,
    rewardXP: 200,
    difficulty: 'All Levels',
    stages: [
      { id: 's1', name: 'Street Walk & Capture', completed: false, date: 'Saturday Morning' },
      { id: 's2', name: 'Curate Top 3 Frames', completed: false, date: 'Sunday 14:00 UTC' },
      { id: 's3', name: 'Peer Critiques & Zine Assembly', completed: false, date: 'Sunday Evening' }
    ]
  },
  {
    id: 'event-3',
    title: 'Zero-JS Micro-Interaction Design Sprint',
    type: 'challenge',
    category: 'Design',
    date: 'Oct 22 - Oct 25, 2025',
    time: '72-Hour Rapid Hack',
    location: 'Online Workshop & CodePen',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Kai Vance',
      handle: 'kaivance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Creative Technologist'
    },
    communityId: 'comm-6',
    communityName: 'Tactile Interfaces & Design Systems',
    description: 'Craft high-fidelity, tactile UI micro-interactions using only modern CSS capabilities (scroll-driven animations, popover API, subgrid, anchor positioning, and css transitions). Celebrate the sheer power of lightweight web standards.',
    participantsCount: 310,
    maxParticipants: 400,
    isJoinedDefault: true,
    rewardXP: 280,
    difficulty: 'Intermediate',
    stages: [
      { id: 's1', name: 'Prompt Reveal & Component Selection', completed: false, date: 'Oct 22' },
      { id: 's2', name: 'Pure CSS Prototype Build', completed: false, date: 'Oct 23' },
      { id: 's3', name: 'Accessibility & Screen Reader Testing', completed: false, date: 'Oct 24' },
      { id: 's4', name: 'Show & Tell Livestream', completed: false, date: 'Oct 25' }
    ]
  },
  {
    id: 'event-4',
    title: 'Open LoRa Mesh Node Build & Deployment',
    type: 'workshop',
    category: 'Technology',
    date: 'Oct 27, 2025',
    time: '15:00 - 18:00 UTC',
    location: 'Santiago Maker Lab & Hybrid Stream',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Leo Morales',
      handle: 'leomorales',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      role: 'Hardware Hacker'
    },
    communityId: 'comm-8',
    communityName: 'Open Hardware & Mesh Radios',
    description: 'Hands-on live teardown and firmware flashing workshop. We will assemble a solar-powered off-grid LoRa repeater node from common off-the-shelf parts for less than $25 total. Schematics and Bill of Materials provided in advance.',
    participantsCount: 156,
    maxParticipants: 200,
    isJoinedDefault: false,
    rewardXP: 250,
    difficulty: 'Beginner Friendly',
    stages: [
      { id: 's1', name: 'Hardware Prep & BOM Verification', completed: false, date: 'Pre-event' },
      { id: 's2', name: 'Firmware Flashing & Mesh Tuning', completed: false, date: '15:00 UTC' },
      { id: 's3', name: 'Solar Charge & Field Enclosure Setup', completed: false, date: '17:00 UTC' }
    ]
  },
  {
    id: 'event-5',
    title: 'Atmospheric "One Key, Infinite Emotion" Game Jam',
    type: 'challenge',
    category: 'Gaming',
    date: 'Oct 31 - Nov 2, 2025',
    time: '48-Hour Weekend Game Jam',
    location: 'Itch.io + SYNAPSE Discord Stage',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Sora Takahashi',
      handle: 'soragames',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      role: 'Indie Game Director'
    },
    communityId: 'comm-7',
    communityName: 'Indie Game Jams & Atmosphere',
    description: 'Can one single button invoke wonder, grief, or peace? Build a 3-minute emotional adventure in Godot, Unity, or PICO-8 where the only interaction is a single spacebar press or screen tap.',
    participantsCount: 418,
    maxParticipants: 500,
    isJoinedDefault: false,
    rewardXP: 400,
    difficulty: 'All Levels',
    stages: [
      { id: 's1', name: 'Theme Deep Dive & Team Matchmaking', completed: false, date: 'Oct 31' },
      { id: 's2', name: 'Mechanic Prototyping', completed: false, date: 'Nov 1' },
      { id: 's3', name: 'Audio Scoring & Juice Polish', completed: false, date: 'Nov 2' },
      { id: 's4', name: 'Community Playtesting Party', completed: false, date: 'Nov 3' }
    ]
  },
  {
    id: 'event-6',
    title: 'Decentralized Climate Heatmap Hackathon',
    type: 'challenge',
    category: 'Science',
    date: 'Nov 7 - Nov 9, 2025',
    time: 'Civic Data Hackathon',
    location: 'Nairobi & Amsterdam Co-Working Hubs',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Amina Diallo',
      handle: 'aminadiallo',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
      role: 'Climate Data Scientist'
    },
    communityId: 'comm-4',
    communityName: 'Climate Tech & Bio-Regeneration',
    description: 'Join civic hackers and cartographers as we ingest live telemetry from 400 citizen bicycle temperature sensors to build an open, accessible heat mitigation vector map for vulnerable neighborhoods.',
    participantsCount: 198,
    maxParticipants: 250,
    isJoinedDefault: false,
    rewardXP: 320,
    difficulty: 'Intermediate',
    stages: [
      { id: 's1', name: 'Dataset Schema & API Onboarding', completed: false, date: 'Nov 7' },
      { id: 's2', name: 'MapLibre GL & Frontend Visualization', completed: false, date: 'Nov 8' },
      { id: 's3', name: 'Civic Policy Integration Review', completed: false, date: 'Nov 9' }
    ]
  },
  {
    id: 'event-7',
    title: 'Speculative Sci-Fi Salon: Le Guin & Solarpunk Governance',
    type: 'salon',
    category: 'Education',
    date: 'Sunday, Nov 16, 2025',
    time: '18:00 - 20:00 UTC',
    location: 'Interactive Audio Room',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Chloe Dubois',
      handle: 'chloe_reads',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
      role: 'Literary Essayist'
    },
    communityId: 'comm-9',
    communityName: 'Speculative Sci-Fi & Deep Reading',
    description: 'An open philosophical salon analyzing the political, economic, and emotional architecture of voluntary collective societies. Bring your favorite quotes and reflections.',
    participantsCount: 94,
    maxParticipants: 120,
    isJoinedDefault: true,
    rewardXP: 150,
    difficulty: 'Open Discussion',
    stages: [
      { id: 's1', name: 'Core Reading: Chapters 4-8', completed: false, date: 'Pre-reading' },
      { id: 's2', name: 'Live Fishbowl Discussion', completed: false, date: 'Nov 16' },
      { id: 's3', name: 'Synthesis Essay Publishing', completed: false, date: 'Post-salon' }
    ]
  },
  {
    id: 'event-8',
    title: 'Binaural Field Recording & Generative Audio Lab',
    type: 'workshop',
    category: 'Music',
    date: 'Nov 22, 2025',
    time: '16:00 - 19:00 UTC',
    location: 'Virtual Sound Lab / Ableton Link',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    organizer: {
      name: 'Elena Rostova',
      handle: 'elena_sound',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      role: 'Spatial Audio Designer'
    },
    communityId: 'comm-3',
    communityName: 'Spatial Audio & Soundscapes',
    description: 'Learn how to capture high-dynamic-range ambisonic field recordings, clean wind distortion with phase-cancellation, and feed the audio into granular synthesis loops.',
    participantsCount: 165,
    maxParticipants: 200,
    isJoinedDefault: false,
    rewardXP: 220,
    difficulty: 'Intermediate',
    stages: [
      { id: 's1', name: 'Ambisonic Mic Rig Configuration', completed: false, date: 'Hour 1' },
      { id: 's2', name: 'Granular Resynthesis & Spatialization', completed: false, date: 'Hour 2' },
      { id: 's3', name: 'Collaborative Soundscape Mixdown', completed: false, date: 'Hour 3' }
    ]
  }
];
