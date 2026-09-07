// Action-driven Sparks, Discussions, Polls, and Showcases for SYNAPSE

export const mockPosts = [
  {
    id: 'post-1',
    type: 'poll',
    author: {
      id: 'user-2',
      name: 'Marcus Chen',
      handle: 'marcus_chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      role: 'Indie Founder & Systems Architect'
    },
    communityId: 'comm-2',
    communityName: 'Indie Founders & Solopreneurs',
    title: 'Local-First sync in 2025: What is your production persistence stack?',
    content: 'We are redesigning our offline-first team canvas app. Between ElectricSQL, Automerge, and Yjs with SQLite, we are weighing developer ergonomics vs binary sync efficiency over unstable mobile connections. Which architecture are you betting on for real-time collaboration?',
    poll: {
      id: 'poll-1',
      totalVotes: 342,
      userVotedOptionId: null,
      options: [
        { id: 'opt-1', text: 'Yjs + IndexedDB / WebSocket', votes: 148 },
        { id: 'opt-2', text: 'Automerge CRDT + Local Repo', votes: 94 },
        { id: 'opt-3', text: 'ElectricSQL + Postgres sync', votes: 68 },
        { id: 'opt-4', text: 'Custom SQLite + Blob Delta Sync', votes: 32 }
      ]
    },
    tags: ['Local-First', 'CRDTs', 'Architecture', 'SaaS'],
    timestamp: '2 hours ago',
    likesCount: 54,
    isLiked: false,
    savesCount: 29,
    isSaved: false,
    commentsCount: 14,
    comments: [
      {
        id: 'comm-p1-1',
        author: {
          name: 'Zara Thorne',
          handle: 'zaracodes',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'
        },
        timestamp: '1 hour ago',
        content: 'Yjs with a lightweight Rust sync server has handled tens of thousands of simultaneous canvas strokes for our collaborative shader tool without choking. Highly recommend!',
        upvotes: 12
      },
      {
        id: 'comm-p1-2',
        author: {
          name: 'Kai Vance',
          handle: 'kaivance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
        },
        timestamp: '45 mins ago',
        content: 'ElectricSQL has been incredible for declarative schemas when you already know Postgres. The offline sync feels magical once set up.',
        upvotes: 8
      }
    ]
  },
  {
    id: 'post-2',
    type: 'showcase',
    author: {
      id: 'user-5',
      name: 'Zara Thorne',
      handle: 'zaracodes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      role: 'Shader Artist & Creative Coder'
    },
    communityId: 'comm-1',
    communityName: 'Generative AI & Shader Lab',
    title: 'Reactive Reaction-Diffusion in WebGPU: 120 FPS on Mobile',
    content: 'Finally pushed the live simulation running on pure WebGPU compute shaders. Instead of CPU ping-pong buffers, the Gray-Scott equations are computed across an 8-pass texture pyramid. It simulates biological cell morphogenesis in real time and responds to touch ripples!',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tags: ['WebGPU', 'GLSL', 'Morphogenesis', 'Three.js'],
    timestamp: '4 hours ago',
    likesCount: 189,
    isLiked: true,
    savesCount: 84,
    isSaved: true,
    commentsCount: 22,
    comments: [
      {
        id: 'comm-p2-1',
        author: {
          name: 'Elena Rostova',
          handle: 'elena_sound',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80'
        },
        timestamp: '3 hours ago',
        content: 'Could we pipe live FFT frequency bands into the feed/kill rates? Would love to map spatial synth pads to this morphogenesis!',
        upvotes: 19
      }
    ]
  },
  {
    id: 'post-3',
    type: 'challenge',
    author: {
      id: 'user-0',
      name: 'Kai Vance',
      handle: 'kaivance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Creative Technologist'
    },
    communityId: 'comm-6',
    communityName: 'Tactile Interfaces & Design Systems',
    title: '🔥 48-Hour Micro-Sprint: Redesigning The "Delete Account" Flow for Radical Humanity',
    content: 'Most offboarding patterns use dark UX: guilt-trips, tiny grey text, confusing dropdowns. For this sprint, design an offboarding flow that treats users with ultimate dignity: easy data export in 1 click, honest feedback collection, and an open door if they ever wish to return. Submissions open until Sunday!',
    tags: ['Challenge', 'DesignSprint', 'EthicalUX', 'MicroInteractions'],
    timestamp: '6 hours ago',
    likesCount: 97,
    isLiked: false,
    savesCount: 56,
    isSaved: false,
    commentsCount: 18,
    comments: [
      {
        id: 'comm-p3-1',
        author: {
          name: 'Devon Cruz',
          handle: 'devoncruz',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80'
        },
        timestamp: '5 hours ago',
        content: 'I am in! Prototyping a "Clean Slate Archive" modal in Origami with physical zip-file feedback.',
        upvotes: 11
      }
    ]
  },
  {
    id: 'post-4',
    type: 'spark',
    author: {
      id: 'user-3',
      name: 'Amina Diallo',
      handle: 'aminadiallo',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
      role: 'Climate Data Scientist'
    },
    communityId: 'comm-4',
    communityName: 'Climate Tech & Bio-Regeneration',
    title: 'Thesis: Hyper-local citizen sensors beat multi-million dollar satellites for street-level urban heat islands',
    content: 'Satellites measure rooftop thermal radiance at 30m resolution. But people walk under tree canopies and along asphalt corridors. By deploying $18 ESP32 temperature/humidity probes on bicycle courier frames, we captured a 7.4°C micro-climate delta within a 3-block radius in Nairobi. Seeking frontend folks to help us build an open real-time heatmap.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    tags: ['CitizenScience', 'ClimateTech', 'IoT', 'DataViz'],
    timestamp: '8 hours ago',
    likesCount: 142,
    isLiked: true,
    savesCount: 77,
    isSaved: true,
    commentsCount: 16,
    comments: [
      {
        id: 'comm-p4-1',
        author: {
          name: 'Leo Morales',
          handle: 'leomorales',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
        },
        timestamp: '7 hours ago',
        content: 'I have LoRa transmitters that can broadcast these packets without cellular SIM costs. Let us sync on an open payload spec!',
        upvotes: 15
      }
    ]
  },
  {
    id: 'post-5',
    type: 'question',
    author: {
      id: 'user-10',
      name: 'Nadia Benali',
      handle: 'nadiaben',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      role: 'AI Ethics Researcher'
    },
    communityId: 'comm-1',
    communityName: 'Generative AI & Shader Lab',
    title: 'How should decentralized social protocols handle provenance of synthetic media?',
    content: 'As deep generative tools become ubiquitous in daily communications, watermarking is easily stripped. What cryptographic or C2PA-style attestation feels lightweight enough for client-side validation without centralized surveillance authorities?',
    tags: ['AIAlignment', 'Cryptography', 'Provenance', 'Privacy'],
    timestamp: '11 hours ago',
    likesCount: 63,
    isLiked: false,
    savesCount: 31,
    isSaved: false,
    commentsCount: 9,
    comments: []
  },
  {
    id: 'post-6',
    type: 'showcase',
    author: {
      id: 'user-15',
      name: 'Kofi Mensah',
      handle: 'kofi_design',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      role: 'Afrofuturist 3D Visual Artist'
    },
    communityId: 'comm-10',
    communityName: 'Afrofuturist 3D & Spatial Worlds',
    title: 'The Great Golden Terraces of Shaka: Real-time Nanite & Lumen Environment',
    content: 'Built in Unreal Engine 5.5 using procedural Ghanaian geometric lattices. The lighting reacts to a dynamic celestial cycle where stars pulse in polyrhythms. Check out the 4K render sequence below!',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80',
    tags: ['Afrofuturism', 'UE5', '3DWorldbuilding', 'Architecture'],
    timestamp: '14 hours ago',
    likesCount: 231,
    isLiked: false,
    savesCount: 119,
    isSaved: false,
    commentsCount: 27,
    comments: []
  },
  {
    id: 'post-7',
    type: 'poll',
    author: {
      id: 'user-8',
      name: 'Maya Lin-Peterson',
      handle: 'mayalin',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      role: 'Type Designer & Print Archivist'
    },
    communityId: 'comm-11',
    communityName: 'Typography Archives & Variable Fonts',
    title: 'Specimen Choice: Which variable axis delivers the most expressive utility for screen readers?',
    content: 'We are compiling our next open variable typeface specimen book. We want an axis that offers genuine typographic hierarchy enhancement rather than just visual novelty.',
    poll: {
      id: 'poll-2',
      totalVotes: 215,
      userVotedOptionId: null,
      options: [
        { id: 'opt-21', text: 'Optical Size (opsz) - Legibility at small text', votes: 110 },
        { id: 'opt-22', text: 'Grade (GRAD) - Dark mode compensation', votes: 62 },
        { id: 'opt-23', text: 'Slant / Cursive (slnt/ital) transitions', votes: 28 },
        { id: 'opt-24', text: 'Width (wdth) - Dynamic tabular fit', votes: 15 }
      ]
    },
    tags: ['Typography', 'Accessibility', 'VariableFonts'],
    timestamp: '16 hours ago',
    likesCount: 88,
    isLiked: false,
    savesCount: 42,
    isSaved: false,
    commentsCount: 8,
    comments: []
  },
  {
    id: 'post-8',
    type: 'spark',
    author: {
      id: 'user-4',
      name: 'Liam Gallagher',
      handle: 'liam_lens',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      role: 'Street Photographer'
    },
    communityId: 'comm-5',
    communityName: 'Street Photography & Raw Vision',
    title: 'Rain, neon, and high contrast reflections: Notes from a 3am stroll through Soho',
    content: 'Shooting Kodak Tri-X pushed to 1600 ISO under sodium-vapor streetlights yields that unmistakable gritty silver-halide texture. In an era of smoothed HDR smartphone snapshots, there is something deeply grounding about honoring real film grain and deep unapologetic blacks.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=80',
    tags: ['StreetPhotography', '35mmFilm', 'Monochrome', 'London'],
    timestamp: '18 hours ago',
    likesCount: 165,
    isLiked: true,
    savesCount: 68,
    isSaved: false,
    commentsCount: 19,
    comments: []
  },
  {
    id: 'post-9',
    type: 'challenge',
    author: {
      id: 'user-7',
      name: 'Sora Takahashi',
      handle: 'soragames',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      role: 'Indie Game Director'
    },
    communityId: 'comm-7',
    communityName: 'Indie Game Jams & Atmosphere',
    title: '🎮 Announcing the "One Key, Infinite Emotion" Weekend Mini-Jam!',
    content: 'Rules: Your game can ONLY use a single button input (Spacebar or Tap). No movement joysticks, no mouse aiming. The theme is "Tenderness in the Abyss". Starts Friday at 18:00 UTC. Join the itch squad or link up with musicians and pixel artists right here in the comments!',
    tags: ['GameJam', 'IndieDev', 'Godot', 'PixelArt'],
    timestamp: '1 day ago',
    likesCount: 198,
    isLiked: false,
    savesCount: 104,
    isSaved: true,
    commentsCount: 35,
    comments: []
  },
  {
    id: 'post-10',
    type: 'spark',
    author: {
      id: 'user-11',
      name: 'Leo Morales',
      handle: 'leomorales',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      role: 'Hardware Hacker'
    },
    communityId: 'comm-8',
    communityName: 'Open Hardware & Mesh Radios',
    title: 'Completed: Solar LoRa Repeater running for 180 continuous days without mains power',
    content: 'Housed in an IP68 junction box on the Cerro San Cristóbal ridge. 5W polycrystalline panel paired with 2x 18650 LiFePO4 cells. It has handled over 140,000 community text packets across Santiago with zero packet drop during peak storms.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    tags: ['OpenHardware', 'LoRa', 'SolarPower', 'Resilience'],
    timestamp: '1 day ago',
    likesCount: 312,
    isLiked: false,
    savesCount: 145,
    isSaved: true,
    commentsCount: 42,
    comments: []
  },
  {
    id: 'post-11',
    type: 'question',
    author: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: 'elena_sound',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      role: 'Spatial Audio Designer'
    },
    communityId: 'comm-3',
    communityName: 'Spatial Audio & Soundscapes',
    title: 'Binaural panning: What HRTF dataset feels most natural across consumer IEMs?',
    content: 'Standard KEMAR dummy head measurements often sound hollow or overly phase-cancelled when users listen through standard AirPods or Sony earbuds. Has anyone trained personalized neural HRTFs with consumer camera ear scans? Let us compare test samples.',
    tags: ['SpatialAudio', 'Acoustics', 'Binaural', 'SoundDesign'],
    timestamp: '1 day ago',
    likesCount: 75,
    isLiked: false,
    savesCount: 41,
    isSaved: false,
    commentsCount: 12,
    comments: []
  },
  {
    id: 'post-12',
    type: 'showcase',
    author: {
      id: 'user-13',
      name: 'Arjun Mehta',
      handle: 'arjun_sol',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      role: 'Renewable Microgrid Engineer'
    },
    communityId: 'comm-12',
    communityName: 'Clean Energy & Microgrid Pioneers',
    title: 'Autonomous Solar Inverter Dashboard: Open source release v1.2',
    content: 'We just tagged v1.2 with localized peer-to-peer energy balance notifications. When your rooftop solar generation exceeds battery capacity, it pings your adjacent neighbors so they can charge electric scooters or run washing machines at surplus zero-cost rates.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    tags: ['Renewables', 'Microgrid', 'P2P', 'CleanEnergy'],
    timestamp: '2 days ago',
    likesCount: 184,
    isLiked: false,
    savesCount: 92,
    isSaved: false,
    commentsCount: 20,
    comments: []
  },
  {
    id: 'post-13',
    type: 'spark',
    author: {
      id: 'user-12',
      name: 'Chloe Dubois',
      handle: 'chloe_reads',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
      role: 'Literary Essayist'
    },
    communityId: 'comm-9',
    communityName: 'Speculative Sci-Fi & Deep Reading',
    title: 'Why Ursula K. Le Guin’s "The Dispossessed" is the ultimate blueprint for decentralized community governance',
    content: 'Le Guin understood that true freedom is not the absence of social bonds, but the presence of voluntary, transparent mutual responsibility. When algorithms do not gamify outrage, discourse can actually converge toward constructive stewardship. Join our Sunday salon discussion!',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
    tags: ['SciFi', 'Philosophy', 'LeGuin', 'BookClub'],
    timestamp: '2 days ago',
    likesCount: 124,
    isLiked: true,
    savesCount: 65,
    isSaved: false,
    commentsCount: 17,
    comments: []
  },
  {
    id: 'post-14',
    type: 'poll',
    author: {
      id: 'user-9',
      name: 'Devon Cruz',
      handle: 'devoncruz',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      role: 'Interaction Designer'
    },
    communityId: 'comm-6',
    communityName: 'Tactile Interfaces & Design Systems',
    title: 'Spring physics in web animations: What damping ratio gives you the most natural "physical" snap?',
    content: 'Tuning our modal and card dismissal physics. We want zero bouncing overshoot on accessibility-reduced-motion profiles, but juicy tactile spring feedback for touch gestures.',
    poll: {
      id: 'poll-3',
      totalVotes: 180,
      userVotedOptionId: null,
      options: [
        { id: 'opt-31', text: 'Critically Damped (Zeta = 1.0) - Crisp & Clean', votes: 85 },
        { id: 'opt-32', text: 'Slight Underdamped (Zeta = 0.8) - Subtle organic rebound', votes: 64 },
        { id: 'opt-33', text: 'Heavy Fluid Damping (Zeta = 1.2) - High friction luxury', votes: 22 },
        { id: 'opt-34', text: 'Linear cubic-bezier curves only', votes: 9 }
      ]
    },
    tags: ['Animation', 'MicroInteractions', 'CSS', 'FramerMotion'],
    timestamp: '2 days ago',
    likesCount: 92,
    isLiked: false,
    savesCount: 38,
    isSaved: false,
    commentsCount: 11,
    comments: []
  },
  {
    id: 'post-15',
    type: 'showcase',
    author: {
      id: 'user-6',
      name: 'Dr. Tariq Al-Mansoor',
      handle: 'tariq_bio',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      role: 'Synthetic Biologist'
    },
    communityId: 'comm-4',
    communityName: 'Climate Tech & Bio-Regeneration',
    title: 'Mycelium Acoustic Panels: 0.85 NRC rating grown in 12 days using agricultural hemp waste',
    content: 'Photos from our Zurich lab harvest. These panels match traditional fiberglass sound absorption without any volatile binder chemicals or hazardous dust. When discarded, they decompose into rich compost in 45 days.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    tags: ['Biomaterials', 'Mycology', 'SustainableDesign', 'Acoustics'],
    timestamp: '3 days ago',
    likesCount: 280,
    isLiked: false,
    savesCount: 162,
    isSaved: false,
    commentsCount: 31,
    comments: []
  },
  {
    id: 'post-16',
    type: 'challenge',
    author: {
      id: 'user-2',
      name: 'Marcus Chen',
      handle: 'marcus_chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      role: 'Indie Founder & Systems Architect'
    },
    communityId: 'comm-2',
    communityName: 'Indie Founders & Solopreneurs',
    title: '🚀 Challenge: Ship an MVP in 72 hours and get your first $1 online dollar',
    content: 'No complex landing pages. Solve one acute pain point for a specific niche, set up a simple payment link, and pitch it to 10 potential users. Post your live link here to get feedback from fellow builders!',
    tags: ['Bootstrapping', 'SaaS', 'Challenge', 'IndieHackers'],
    timestamp: '3 days ago',
    likesCount: 210,
    isLiked: false,
    savesCount: 95,
    isSaved: false,
    commentsCount: 28,
    comments: []
  },
  {
    id: 'post-17',
    type: 'spark',
    author: {
      id: 'user-14',
      name: 'Freja Lindqvist',
      handle: 'frejalind',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Regenerative Textile Artisan'
    },
    communityId: 'comm-4',
    communityName: 'Climate Tech & Bio-Regeneration',
    title: 'The ancient alchemy of living indigo fermentation vats: Why slow craft matters',
    content: 'Unlike petroleum synthetic dyes that poison rivers, a living natural indigo vat breathes, ferments with wheat bran and wood ash, and produces shades that age gracefully with sunlight and sea breeze.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&auto=format&fit=crop&q=80',
    tags: ['SlowCraft', 'NaturalDyes', 'Textiles', 'Sustainability'],
    timestamp: '3 days ago',
    likesCount: 118,
    isLiked: false,
    savesCount: 52,
    isSaved: false,
    commentsCount: 14,
    comments: []
  },
  {
    id: 'post-18',
    type: 'question',
    author: {
      id: 'user-7',
      name: 'Sora Takahashi',
      handle: 'soragames',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      role: 'Indie Game Director'
    },
    communityId: 'comm-7',
    communityName: 'Indie Game Jams & Atmosphere',
    title: 'How do you structure dialogue trees in Godot 4 without spaghetti nodes?',
    content: 'We are experimenting with Ink versus Dialogue Manager versus custom JSON graph evaluators. What has given you the smoothest localization and branch condition workflow?',
    tags: ['Godot', 'GameDev', 'NarrativeDesign', 'OpenSource'],
    timestamp: '4 days ago',
    likesCount: 84,
    isLiked: false,
    savesCount: 39,
    isSaved: false,
    commentsCount: 16,
    comments: []
  },
  {
    id: 'post-19',
    type: 'showcase',
    author: {
      id: 'user-0',
      name: 'Kai Vance',
      handle: 'kaivance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Creative Technologist'
    },
    communityId: 'comm-6',
    communityName: 'Tactile Interfaces & Design Systems',
    title: 'Open Source release: "Chroma-Token" accessible color system generator',
    content: 'Built a lightweight client-side tool that generates perceptually balanced, APCA-contrast compliant palette tokens in OKLCH space with automatic dark/light counterpart pairs. Zero dependencies, 4kb gzipped.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    tags: ['DesignSystems', 'Accessibility', 'OKLCH', 'OpenSource'],
    timestamp: '4 days ago',
    likesCount: 275,
    isLiked: true,
    savesCount: 138,
    isSaved: true,
    commentsCount: 33,
    comments: []
  },
  {
    id: 'post-20',
    type: 'spark',
    author: {
      id: 'user-11',
      name: 'Leo Morales',
      handle: 'leomorales',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      role: 'Hardware Hacker'
    },
    communityId: 'comm-8',
    communityName: 'Open Hardware & Mesh Radios',
    title: 'Why open firmware on consumer routers is an act of civil preparedness',
    content: 'When central ISPs experience brownouts or undersea cable cuts, communities with OpenWrt mesh relays can maintain neighborhood medical dispatch, water level monitoring, and family check-ins. Keep hardware open!',
    tags: ['OpenHardware', 'MeshNet', 'Decentralization', 'Resilience'],
    timestamp: '5 days ago',
    likesCount: 194,
    isLiked: false,
    savesCount: 88,
    isSaved: false,
    commentsCount: 22,
    comments: []
  }
];
