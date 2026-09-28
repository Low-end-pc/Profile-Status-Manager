export const STATUS_OPTIONS = [
  {
    id: 'online',
    label: 'Online',
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.18)',
    bgTint: 'rgba(34, 197, 94, 0.08)',
    borderTint: 'rgba(34, 197, 94, 0.25)',
    badgeText: 'Available',
    description: 'Available for pairing, reviews, and syncs'
  },
  {
    id: 'in-figma',
    label: 'In Figma',
    color: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.18)',
    bgTint: 'rgba(167, 139, 250, 0.08)',
    borderTint: 'rgba(167, 139, 250, 0.25)',
    badgeText: 'Designing',
    description: 'Refining design tokens and layout grids'
  },
  {
    id: 'dnd',
    label: 'Do Not Disturb',
    color: '#fb7185',
    glow: 'rgba(251, 113, 133, 0.18)',
    bgTint: 'rgba(251, 113, 133, 0.08)',
    borderTint: 'rgba(251, 113, 133, 0.25)',
    badgeText: 'Focus Mode',
    description: 'Deep in focus sprint. Urgent messages only'
  },
  {
    id: 'deep-work',
    label: 'Deep Work',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.18)',
    bgTint: 'rgba(56, 189, 248, 0.08)',
    borderTint: 'rgba(56, 189, 248, 0.25)',
    badgeText: 'Building',
    description: 'Implementing component primitives & shaders'
  },
  {
    id: 'away',
    label: 'Away / Coffee',
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.18)',
    bgTint: 'rgba(251, 191, 36, 0.08)',
    borderTint: 'rgba(251, 191, 36, 0.25)',
    badgeText: 'AFK',
    description: 'Stepped out for coffee. Back shortly'
  },
  {
    id: 'offline',
    label: 'Offline',
    color: '#71717a',
    glow: 'rgba(113, 113, 122, 0.12)',
    bgTint: 'rgba(113, 113, 122, 0.06)',
    borderTint: 'rgba(113, 113, 122, 0.18)',
    badgeText: 'Away',
    description: 'Offline for the day. Leave a message'
  }
];

export const GLASS_TINTS = [
  { id: 'neutral', label: 'Neutral Glass', rgb: '18, 20, 26', borderRgb: '255, 255, 255' },
  { id: 'slate', label: 'Cool Slate', rgb: '15, 23, 36', borderRgb: '186, 230, 253' },
  { id: 'sapphire', label: 'Midnight Navy', rgb: '11, 18, 38', borderRgb: '147, 197, 253' },
  { id: 'warm', label: 'Warm Charcoal', rgb: '24, 20, 18', borderRgb: '254, 215, 170' }
];

export const BACKGROUND_PRESETS = [
  { id: 'aurora', label: 'Subtle Aurora', primary: '#38bdf8', secondary: '#818cf8', tertiary: '#ec4899' },
  { id: 'graphite', label: 'Minimal Monochrome', primary: '#71717a', secondary: '#3f3f46', tertiary: '#27272a' },
  { id: 'deep-space', label: 'Deep Cosmos', primary: '#6366f1', secondary: '#0ea5e9', tertiary: '#10b981' },
  { id: 'ember', label: 'Warm Ember', primary: '#f97316', secondary: '#ef4444', tertiary: '#eab308' }
];

export const PROFILE_DATA = {
  name: 'Md Ifrit Yeamin Ishty',
  handle: '@ishty.design',
  role: 'Staff Product Designer & Interface Engineer',
  location: 'San Francisco, CA',
  timezone: 'PST (UTC-7)',
  avatarUrl: 'https://i.pinimg.com/736x/50/5e/ed/505eedfadfd9a560eb64c41abd036079.jpg?auto=format&fit=crop&w=400&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  bio: 'Designing refined interfaces, spatial UI architectures, and design token engines. Balancing human-centric simplicity with deep technical craftsmanship.',
  stats: [
    { label: 'Followers', value: '28.4k' },
    { label: 'Components', value: '148' },
    { label: 'Figma Rating', value: '4.9★' }
  ],
  skills: [
    { name: 'Design Systems', level: 'Lead' },
    { name: 'React 19 & Next', level: 'Senior' },
    { name: 'CSS Tokens & Variables', level: 'Expert' },
    { name: 'Optical Micro-Interactions', level: 'Lead' },
    { name: 'Web Performance', level: 'Advanced' },
    { name: 'Interface Ergonomics', level: 'Expert' }
  ],
  currentActivity: {
    title: 'Adaptive Glass Token Specification',
    category: 'Design Engineering',
    branch: 'feat/elevation-system',
    progress: 84,
    timeSpent: '2h active today'
  },
  recentActivities: [
    {
      id: 1,
      type: 'figma',
      title: 'Published Spatial Glass UI Kit v3.0',
      time: '2h ago',
      badge: 'Design'
    },
    {
      id: 2,
      type: 'github',
      title: 'Merged pull request #42 in interface-primitives',
      time: '4h ago',
      badge: 'Code'
    },
    {
      id: 3,
      type: 'article',
      title: 'Article: Modern CSS Backdrop Filters Done Right',
      time: 'Yesterday',
      badge: 'Writing'
    }
  ],
  socialLinks: [
    {
      name: 'Figma Community',
      handle: '@ishty_crafts',
      url: 'https://figma.com',
      icon: 'Figma',
      color: '#a78bfa'
    },
    {
      name: 'GitHub',
      handle: 'github.com/ishty-dev',
      url: 'https://github.com',
      icon: 'Github',
      color: '#e4e4e7'
    },
    {
      name: 'X (Twitter)',
      handle: '@ishty_codes',
      url: 'https://twitter.com',
      icon: 'Twitter',
      color: '#38bdf8'
    },
    {
      name: 'Dribbble',
      handle: 'dribbble.com/ishty',
      url: 'https://dribbble.com',
      icon: 'Dribbble',
      color: '#fb7185'
    },
    {
      name: 'Email Inquiries',
      handle: 'ifrit@creativeglass.io',
      url: 'mailto:ifrit@creativeglass.io',
      icon: 'Mail',
      color: '#34d399'
    }
  ]
};
