// Communities / Guilds for SYNAPSE

export const mockCommunities = [
  {
    id: 'comm-1',
    name: 'Generative AI & Shader Lab',
    slug: 'generative-ai-shader-lab',
    tagline: 'Code as canvas: GLSL, WebGPU, Latent Spaces & Creative Algorithms',
    description: 'A laboratory for creative coders, digital alchemists, and visual mathematicians pushing the limits of real-time shaders, diffusion models, and generative systems.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    icon: '✨',
    category: 'Technology',
    memberCount: 4280,
    activityLevel: 'Hyperactive',
    activityScore: 98,
    isJoinedDefault: true,
    rules: [
      'Share source code or breakdowns whenever posting generative visuals.',
      'Constructive feedback only on creative experiments.',
      'No low-effort prompt spam; explain the technique and underlying intent.'
    ],
    featuredChallenge: '7-Day WebGL Fluid Simulation Sprint',
    topics: ['GLSL', 'Three.js', 'Creative Coding', 'Diffusion', 'WebGPU'],
    moderators: ['Zara Thorne', 'Kai Vance']
  },
  {
    id: 'comm-2',
    name: 'Indie Founders & Solopreneurs',
    slug: 'indie-founders-solopreneurs',
    tagline: 'Building profitable, sovereign, calm software in the open',
    description: 'A transparent guild for bootstrapped builders, indie hackers, and micro-SaaS creators trading revenue metrics, conversion tactics, and technical architecture.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    icon: '🚀',
    category: 'Startups',
    memberCount: 6150,
    activityLevel: 'High',
    activityScore: 92,
    isJoinedDefault: true,
    rules: [
      'Celebrate shipping over endless planning.',
      'Transparent metrics and honest post-mortems welcome.',
      'No self-promotional link dumping without actionable context.'
    ],
    featuredChallenge: 'Weekend Launch: Micro-Tool MVP',
    topics: ['Bootstrapping', 'SaaS', 'Stripe', 'Local-First', 'Marketing'],
    moderators: ['Marcus Chen']
  },
  {
    id: 'comm-3',
    name: 'Spatial Audio & Soundscapes',
    slug: 'spatial-audio-soundscapes',
    tagline: 'Reactive acoustics, modular synthesizers, and binaural ecology',
    description: 'Sound designers, patch builders, and acoustic researchers crafting immersive 3D audio environments for interactive installations, XR, and mental clarity.',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    icon: '🎧',
    category: 'Music',
    memberCount: 2840,
    activityLevel: 'Active Sprints',
    activityScore: 84,
    isJoinedDefault: true,
    rules: [
      'Include listening instructions (headphones recommended / speaker layout).',
      'Cite sound sources and field recording locations.',
      'Honor open audio sharing protocols.'
    ],
    featuredChallenge: '48h Binaural Field Recording Remix',
    topics: ['Spatial Audio', 'Eurorack', 'Max/MSP', 'Sound Ecology', 'Ableton'],
    moderators: ['Elena Rostova']
  },
  {
    id: 'comm-4',
    name: 'Climate Tech & Bio-Regeneration',
    slug: 'climate-tech-bio-regeneration',
    tagline: 'Radical ecological restoration through open telemetry and biology',
    description: 'Bridging open-source hardware, synthetic biology, mycology, and decentralized environmental monitoring to heal local biomes and capture carbon.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    icon: '🌿',
    category: 'Science',
    memberCount: 3790,
    activityLevel: 'High',
    activityScore: 89,
    isJoinedDefault: false,
    rules: [
      'Prioritize peer-reviewed methodology or reproducible field data.',
      'Zero greenwashing tolerance.',
      'Encourage local community deployment and open licenses.'
    ],
    featuredChallenge: 'Open Sensor Air-Quality Network Build',
    topics: ['Climate Data', 'Mycology', 'Permaculture', 'Renewables', 'Sensors'],
    moderators: ['Amina Diallo', 'Dr. Tariq Al-Mansoor']
  },
  {
    id: 'comm-5',
    name: 'Street Photography & Raw Vision',
    slug: 'street-photography-raw-vision',
    tagline: 'Human geometry, shadows, and fleeting truth on 35mm and digital',
    description: 'Documentary visionaries exploring the geometry of city life, subway candid moments, architectural rhythms, and black-and-white film development.',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1200&auto=format&fit=crop&q=80',
    icon: '📷',
    category: 'Photography',
    memberCount: 5120,
    activityLevel: 'Steady',
    activityScore: 81,
    isJoinedDefault: false,
    rules: [
      'State focal length, camera body, and film stock if applicable.',
      'Respect the dignity of subjects in public spaces.',
      'Weekly crit threads require giving 2 critiques to receive 1.'
    ],
    featuredChallenge: 'High-Contrast Monochrome Street Walk',
    topics: ['35mm Film', 'Street Photography', 'Darkroom', 'Leica', 'Composition'],
    moderators: ['Liam Gallagher']
  },
  {
    id: 'comm-6',
    name: 'Tactile Interfaces & Design Systems',
    slug: 'tactile-interfaces-design-systems',
    tagline: 'Crafting fluid micro-gestures, haptics, and accessible design tokens',
    description: 'Product designers and frontend tinkerers obsessed with friction, spring physics, accessibility contrast, variable type systems, and playful spatial interactions.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    icon: '🎨',
    category: 'Design',
    memberCount: 7890,
    activityLevel: 'Hyperactive',
    activityScore: 96,
    isJoinedDefault: true,
    rules: [
      'Provide interactive codepens, Figma links, or motion captures.',
      'Accessibility is non-negotiable; test keyboard navigation and contrast.',
      'Share the UX reasoning behind unconventional patterns.'
    ],
    featuredChallenge: 'Zero-JS Micro-Interaction Redesign',
    topics: ['Design Systems', 'Figma', 'Micro-Interactions', 'CSS Tokens', 'A11y'],
    moderators: ['Kai Vance', 'Devon Cruz']
  },
  {
    id: 'comm-7',
    name: 'Indie Game Jams & Atmosphere',
    slug: 'indie-game-jams-atmosphere',
    tagline: 'Evocative pixel worlds, non-violent mechanics, and cozy interactive stories',
    description: 'Game devs, pixel artists, chiptune composers, and narrative architects collaborating on 48-hour jams, atmospheric adventures, and experimental game mechanics.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    icon: '🎮',
    category: 'Gaming',
    memberCount: 4410,
    activityLevel: 'Active Sprints',
    activityScore: 88,
    isJoinedDefault: false,
    rules: [
      'Play and feedback at least two jam submissions when entering.',
      'Open-source jam assets whenever feasible.',
      'Celebrate quirky, emotional, experimental mechanics.'
    ],
    featuredChallenge: '1-Button Cozy Game Sprint',
    topics: ['Godot', 'Pixel Art', 'Game Jam', 'Narrative', 'Atmosphere'],
    moderators: ['Sora Takahashi']
  },
  {
    id: 'comm-8',
    name: 'Open Hardware & Mesh Radios',
    slug: 'open-hardware-mesh-radios',
    tagline: 'Soldering decentralized communication and off-grid solar nodes',
    description: 'Electronics builders creating off-grid LoRa mesh networks, open PCBs, solar telemetry stations, and hardware that empowers communities without cloud reliance.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    icon: '⚡',
    category: 'Technology',
    memberCount: 3180,
    activityLevel: 'High',
    activityScore: 86,
    isJoinedDefault: false,
    rules: [
      'Upload KiCad schematics and bill-of-materials for projects.',
      'Safety first when working with high-voltage or lithium chemistry.',
      'Help beginners debug solder bridges with kindness.'
    ],
    featuredChallenge: 'Build a 10km LoRa Solar Mesh Node',
    topics: ['LoRa', 'KiCad', 'ESP32', 'Off-grid', 'PCB Design'],
    moderators: ['Leo Morales']
  },
  {
    id: 'comm-9',
    name: 'Speculative Sci-Fi & Deep Reading',
    slug: 'speculative-sci-fi-deep-reading',
    tagline: 'Dissecting optimistic futures, cybernetic sociology, and solar utopias',
    description: 'A synchronous book club reading sci-fi, philosophy of technology, solarpunk anthologies, and post-capitalist economics. Weekly long-form salon discussions.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80',
    icon: '📚',
    category: 'Education',
    memberCount: 2260,
    activityLevel: 'Steady',
    activityScore: 78,
    isJoinedDefault: false,
    rules: [
      'Mark major story spoilers clearly with content tags.',
      'Quote chapter and page references to enrich discussions.',
      'Bring curiosity and diverse societal perspectives.'
    ],
    featuredChallenge: 'Ursula Le Guin Worldbuilding Study',
    topics: ['Sci-Fi', 'Solarpunk', 'Philosophy', 'Book Club', 'Worldbuilding'],
    moderators: ['Chloe Dubois']
  },
  {
    id: 'comm-10',
    name: 'Afrofuturist 3D & Spatial Worlds',
    slug: 'afrofuturist-3d-spatial-worlds',
    tagline: 'Fractal heritage architectures blended with high-tech virtual realms',
    description: 'Unreal Engine 5 and Blender artists fusing traditional African mythologies, textile geometries, and cosmic sci-fi worldbuilding into interactive 3D spaces.',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80',
    icon: '🪐',
    category: 'Art',
    memberCount: 3490,
    activityLevel: 'High',
    activityScore: 91,
    isJoinedDefault: true,
    rules: [
      'Celebrate authentic cultural storytelling and indigenous cosmologies.',
      'Share lighting and sculpting breakdowns.',
      'Support peer render critiques with patience.'
    ],
    featuredChallenge: 'Fractal Palace 3D Modeling Challenge',
    topics: ['Unreal Engine', 'Blender', 'Afrofuturism', '3D Sculpting', 'Worldbuilding'],
    moderators: ['Kofi Mensah']
  },
  {
    id: 'comm-11',
    name: 'Typography Archives & Variable Fonts',
    slug: 'typography-archives-variable-fonts',
    tagline: 'Reviving tactile letterpress and pushing dynamic font axes',
    description: 'Type designers, specimen hunters, and editorial publishers engineering responsive variable fonts, parametric ligatures, and preserving endangered letterpress traditions.',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    icon: '🔤',
    category: 'Design',
    memberCount: 3950,
    activityLevel: 'Steady',
    activityScore: 82,
    isJoinedDefault: false,
    rules: [
      'Credit typefoundries and original punchcutters accurately.',
      'Test your variable axes across browsers before releasing specimens.',
      'Constructive kerning critiques are our love language.'
    ],
    featuredChallenge: 'Design an Optical Size Axis in Glyphs',
    topics: ['Typography', 'Variable Fonts', 'Letterpress', 'Glyphs', 'Editorial'],
    moderators: ['Maya Lin-Peterson']
  },
  {
    id: 'comm-12',
    name: 'Clean Energy & Microgrid Pioneers',
    slug: 'clean-energy-microgrid-pioneers',
    tagline: 'Democratizing distributed battery banks, solar trackers, and community power',
    description: 'Energy engineers and grassroots organizers building open battery management systems, local energy trading protocols, and off-grid resilient communities.',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    icon: '☀️',
    category: 'Science',
    memberCount: 2630,
    activityLevel: 'Active Sprints',
    activityScore: 85,
    isJoinedDefault: false,
    rules: [
      'Document voltage thresholds and safety shutdown mechanisms.',
      'Share real-world efficiency benchmarks.',
      'Advocate for community energy ownership.'
    ],
    featuredChallenge: 'Open Inverter Telemetry Dashboard Build',
    topics: ['Solar', 'Microgrids', 'Batteries', 'IoT', 'Energy Sovereignty'],
    moderators: ['Arjun Mehta']
  }
];
