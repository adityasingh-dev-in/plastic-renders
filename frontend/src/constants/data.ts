// ─── 01. BRANDING & SOCIAL ──────────────────────────────────────────
export const STATS = [
  { num: '500+',    label: 'Happy Clients' },
  { num: '25+',     label: 'Awards Won' },
  { num: '1000+',   label: 'Projects Completed' },
  { num: '10+',     label: 'Years Experience' },
];

export const SOCIAL_LINKS = {
  whatsapp:  'https://wa.me/918382838382',
  instagram: 'https://instagram.com/plastic.renders',
};

// ─── 02. NAVIGATION ──────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Services',      href: '#services' },
  { label: 'Video Works',   href: '#video-works' },
  { label: '3D Works',      href: '#3d-works' },
  { label: 'About',         href: '#about' },
  { label: 'Testimonials',  href: '#testimonials' },
  { label: 'Contact',       href: '#contact' },
];

// ─── 03. SERVICES ────────────────────────────────────────────────────
export const SERVICES = [
  {
    tag:      'Creative',
    title:    'Video Editing',
    emoji:    '🎬',
    desc:     'Professional video post-production that captures and retains your audience’s attention.',
    long:     'High-quality video editing tailored for your brand. We handle color grading, motion graphics, sound design, and narrative pacing.',
    features: ['Color grading & correction', 'Motion graphics & VFX', 'Cinematic sound design', 'Narrative story pacing', 'Social media formatting'],
    c1:       '#b8c8f8',
    c2:       '#7090e0',
  },
  {
    tag:      'Design',
    title:    '3D Model Designing',
    emoji:    '🧊',
    desc:     'High-detail 3D modeling and photorealistic rendering for your products or concepts.',
    long:     'We bring your ideas to life in three dimensions. From industrial product models to abstract digital assets.',
    features: ['High-poly & low-poly modeling', 'Photorealistic rendering', 'Texture and material design', 'Lighting & environment setup', 'Animation-ready assets'],
    c1:       '#a8d8f0',
    c2:       '#5b9bd5',
  },
];

// ─── 04. PORTFOLIO ───────────────────────────────────────────────────
export const VIDEO_PROJECTS = [
  {
    title:     'Cinematic Brand Anthem',
    desc:      'High-energy promotional video blending motion graphics with live-action footage.',
    thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1200',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    title:     'Product Launch Trailer',
    desc:      'Sleek, fast-paced product reveal featuring intense color grading and sharp sound design.',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200',
    youtubeId: 'jNQXAC9IVRw',
  },
  {
    title:     'Travel Documentary Teaser',
    desc:      'Breathtaking drone shots and narrative pacing creating deep emotional viewer engagement.',
    thumbnail: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=1200',
    youtubeId: 'M7lc1UVf-VE',
  },
];

export const MODEL_PROJECTS = [
  {
    title:     'Abstract Architectural Concept',
    desc:      'Photorealistic rendering of a futuristic pavilion with complex lighting and glass materials.',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1600',
    ],
  },
  {
    title:     'Industrial Product Visualization',
    desc:      'High-poly modeling of a high-end audio receiver showcasing brushed metal and LED details.',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1563089145-599997674dc9?auto=format&fit=crop&q=80&w=1600',
    ],
  },
  {
    title:     'Game Ready Fantasy Assets',
    desc:      'Optimized low-poly environment props with hand-painted textures for real-time engines.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=1600',
    ],
  },
];

// ─── 05. SOCIAL PROOF ────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name:     'Sarah Chen',
    role:     'CEO, TechStart',
    initials: 'SC',
    color:    'blue',
    quote:    'The team delivered beyond our expectations. Their new brand identity perfectly captures our vision.',
  },
  {
    name:     'Michael Rodriguez',
    role:     'Founder, GrowthLabs',
    initials: 'MR',
    color:    'blue',
    quote:    'Professional, creative, and incredibly efficient. They transformed our outdated website into a modern platform.',
  },
  {
    name:     'Emily Watson',
    role:     'Marketing Director, Innovate Inc',
    initials: 'EW',
    color:    'blue',
    quote:    'Their digital marketing strategy helped us reach our target audience effectively. We saw a 300% increase in leads.',
  },
  {
    name:     'James Park',
    role:     'Product Manager, FinTech Solutions',
    initials: 'JP',
    color:    'blue',
    quote:    'The UI/UX redesign was a game-changer for our app. User satisfaction scores jumped significantly.',
  },
];
