/**
 * ──────────────────────────────────────────────────────────────────────────────
 * 👋 WELCOME TO THE CONTENT CONFIGURATION FILE
 * ──────────────────────────────────────────────────────────────────────────────
 * Use this file to update the text, images, and links on your website.
 * * 💡 TIPS FOR EDITING:
 * 1. Keep the symbols like [ ] and { } exactly where they are.
 * 2. Always wrap text in 'single quotes' or `backticks`.
 * 3. Ensure every item in a list ends with a comma ( , ).
 * 4. For images, paste the direct URL between the quotes.
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ─── 01. BRANDING & STATS ──────────────────────────────────────────
/**
 * These numbers appear in the 'Stats' section of your site.
 * To edit: Change the text inside 'num' and 'label'.
 */
export const STATS = [
  { num: '500+',    label: 'Happy Clients' },
  { num: '1000+',   label: 'Projects Completed' },
  { num: '10+',     label: 'Years Experience' },
];

// ─── 02. AI CHATBOT SETTINGS ───────────────────────────────────────
/**
 * AI_SYSTEM_PROMPT: This is the "brain" of your chatbot. 
 * Edit this to change how the AI behaves or to update your pricing/services.
 * Note: Use the ` (backtick) at the start and end to allow for multiple lines.
 */
export const AI_SYSTEM_PROMPT = `You are the AI assistant for Plastic Renders, a creative studio focused on 3D design and video editing services.

Your role is only to answer user questions about the services, pricing, and general information. You are NOT responsible for collecting user details, generating leads, or convincing users to start a project.

About Plastic Renders:
- Services:
  • 3D Model Designing (starting from ₹1000, depending on complexity)
  • Video Editing (starting from ₹2000, depending on complexity)
- Suitable for creators, brands, and individuals who need visual content

How you respond:
- Clear, natural, and human — never robotic or sales-driven
- Short and informative (2–4 sentences by default)
- Neutral and helpful tone
- Only answer what the user asks — do not push the conversation forward unnecessarily
- Do NOT ask follow-up questions unless absolutely required to clarify the question

Behavior rules:
- Do NOT try to sell or promote services aggressively
- Do NOT ask for personal details (name, email, etc.)
- Do NOT encourage users to start a project or contact unless they explicitly ask how
- Do NOT make assumptions about user intent
- Do NOT make up information

Goal:
Provide clear, accurate, and helpful information so users understand what Plastic Renders offers.`;

/**
 * CHIPS: These are the "Quick Question" buttons users see in the chat.
 * To add a new one: Add a comma after the last item and write your question in quotes.
 */
export const CHIPS = [
  "What services do you offer?",
  "What is the starting price?",
  "What kind of 3D models do you create?",
  "What type of videos do you edit?",
  "How long does a project usually take?",
  "Do prices change based on complexity?",
];

// ─── 03. CONTACT & SOCIALS ────────────────────────────────────────
/**
 * Update your social media links here. 
 * For WhatsApp, ensure the number starts with your country code (e.g., 91 for India).
 */
export const SOCIAL_LINKS = {
  whatsapp:  'https://wa.me/917355408607',
  instagram: 'https://instagram.com/plastic.renders',
};

// ─── 04. NAVIGATION ────────────────────────────────────────────────
/**
 * The links at the top of your website.
 * 'label' is what the user sees. 'href' is the section ID it scrolls to.
 * don't change it unless you know what you're doing
 */
export const NAV_LINKS = [
  { label: 'Services',      href: '#services' },
  { label: 'Video Works',   href: '#video-works' },
  { label: '3D Works',      href: '#works-3d' },
  { label: 'About',         href: '#about' },
  { label: 'Testimonials',  href: '#testimonials' },
  { label: 'Contact',       href: '#contact' },
];

// ─── 05. SERVICES ──────────────────────────────────────────────────
/**
 * Each { } block below represents one service card.
 * To add a service: Copy an entire { ... }, block, add a comma after the previous one, and paste.
 */
export const SERVICES = [
  {
    tag:      'Creative',
    image: 'https://images.pexels.com/photos/1188751/pexels-photo-1188751.jpeg',
    title:    'Video Editing',
    desc:     'Professional video post-production that captures and retains your audience’s attention.',
    long:     'High-quality video editing tailored for your brand. We handle color grading, motion graphics, sound design, and narrative pacing.',
    features: ['Color grading & correction', 'Motion graphics & VFX', 'Cinematic sound design', 'Narrative story pacing', 'Social media formatting'],
  },
  {
    tag:      'Design',
    image: 'https://images.pexels.com/photos/36025195/pexels-photo-36025195.jpeg',
    title:    '3D Model Designing',
    desc:     'High-detail 3D modeling and photorealistic rendering for your products or concepts.',
    long:     'We bring your ideas to life in three dimensions. From industrial product models to abstract digital assets.',
    features: ['High-poly & low-poly modeling', 'Photorealistic rendering', 'Texture and material design', 'Lighting & environment setup', 'Animation-ready assets'],
  },
];

// ─── 06. PORTFOLIO (VIDEOS) ────────────────────────────────────────
/**
 * Update your video portfolio here.
 * 'youtubeId' is the code at the end of a YouTube link (e.g., dQw4w9WgXcQ).
 */
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

// ─── 06. PORTFOLIO (3D MODELS) ─────────────────────────────────────
/**
 * Update your 3D work here.
 * 'images' is a list of multiple views/renders of the same project.
 */
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


// ─── 07. THE TEAM (ABOUT) ─────────────────────────────────────────
/**
 * This section features your team members.
 * 'tags' are the specific skills displayed on their profile.
 */
export const PROFESSIONALS = [
  {
    name: 'Alex Rivera',
    role: 'Video Editor',
    bio: 'Specializing in cinematic storytelling and high-energy motion graphics with good experience in post-production.',
    tags: ['Color Grading', 'VFX', 'Sound Design']
  },
  {
    name: 'Ansh Kumar',
    role: '3D Designer',
    bio: 'Expert in photorealistic product rendering and industrial modeling, bringing concepts to life in three dimensions.',
    tags: ['Modeling', 'Rendering', 'Texturing']
  }
];

// ─── 08. TESTIMONIALS ─────────────────────────────────────────────
/**
 * Reviews from your clients.
 * 'initials' and 'color' are used if you don't have a photo for the client.
 */
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
