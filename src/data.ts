import { Product, Testimonial, BlogPost } from './types';

// Let's define the SVG graphics used in the preview and custom design studio
export const DESIGN_GRAPHICS = [
  { id: 'none', name: 'No Graphic', icon: 'Ø' },
  { id: 'retro-sunset', name: 'Retro Sunset', icon: '☀️' },
  { id: 'cute-flower', name: 'Daisy Bloom', icon: '🌸' },
  { id: 'lightning', name: 'Electric Zap', icon: '⚡' },
  { id: 'waves', name: 'Ocean Wave', icon: '🌊' },
  { id: 'cosmic-star', name: 'Cosmic Sparkle', icon: '✨' },
  { id: 'heart', name: 'Vibrant Heart', icon: '💖' },
  { id: 'smile', name: 'Retro Smile', icon: '☺' },
];

export const FONTS = [
  { value: 'font-sans', name: 'Modern Sans' },
  { value: 'font-mono', name: 'Creative Mono' },
  { value: 'font-serif', name: 'Classic Serif' },
  { value: 'font-cursive', name: 'Playful Brush' },
];

export const CATEGORIES = [
  { id: 'apparel', name: 'Apparel', count: 18, color: 'from-pink-500 to-rose-500', icon: 'Shirt' },
  { id: 'journals', name: 'Inspirational Journals', count: 12, color: 'from-purple-500 to-indigo-500', icon: 'BookOpen' },
  { id: 'gifts', name: 'Custom Gifts', count: 24, color: 'from-amber-400 to-orange-500', icon: 'Gift' },
  { id: 'drinkware', name: 'Drinkware & Mugs', count: 15, color: 'from-emerald-400 to-teal-500', icon: 'Coffee' },
  { id: 'kids', name: 'Kids Collection', count: 9, color: 'from-cyan-400 to-blue-500', icon: 'Baby' },
  { id: 'trending', name: 'Trending Designs', count: 32, color: 'from-fuchsia-500 to-pink-500', icon: 'Sparkles' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-retro-tee',
    name: 'Retro Horizon Organic Tee',
    description: 'Ultra-soft 100% organic cotton graphic tee featuring a vibrant hand-pressed retro sunset. Made with premium quality printing that stays soft and colorful wash after wash.',
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewCount: 142,
    category: 'apparel',
    images: ['retro-sunset'], // Rendered via graphic system dynamically inside card for beautiful visuals
    colors: ['#1e293b', '#f8fafc', '#ec4899', '#3b82f6', '#10b981'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Best Seller', 'Apparel', 'Retro'],
    isNew: false,
    isTrending: true,
  },
  {
    id: 'prod-dream-journal',
    name: '“Stay Inspired” Vegan Leather Journal',
    description: 'Rich vegan leather journal with gold-foiled bullet pages and a colorful inspirational motto cover. Ideal for sketches, daily logs, and dream-chasing planning.',
    price: 18.99,
    rating: 4.8,
    reviewCount: 89,
    category: 'journals',
    images: ['cute-flower'],
    colors: ['#a855f7', '#ec4899', '#eab308', '#06b6d4'],
    tags: ['Journals', 'Inspirational'],
    isNew: true,
    isTrending: false,
  },
  {
    id: 'prod-rainbow-mug',
    name: 'Cosmic Dreams Magic Ceramic Mug',
    description: 'Watch the vibrant cosmic design come alive when you pour in hot liquid. High-gloss coating, dishwasher and microwave safe, with a cozy-grip handle.',
    price: 14.99,
    originalPrice: 19.99,
    rating: 5.0,
    reviewCount: 204,
    category: 'drinkware',
    images: ['cosmic-star'],
    colors: ['#0f172a', '#3b82f6', '#ec4899'],
    tags: ['Best Seller', 'Drinkware', 'Gifts'],
    isNew: false,
    isTrending: true,
  },
  {
    id: 'prod-electric-zap-hoodie',
    name: 'Electric Energy Oversized Hoodie',
    description: 'Heavyweight organic French terry cotton hoodie with an eye-catching electric zap puff-print. Featuring a roomy double-lined hood and sturdy metal eyelets.',
    price: 54.99,
    rating: 4.7,
    reviewCount: 76,
    category: 'apparel',
    images: ['lightning'],
    colors: ['#000000', '#f1f5f9', '#eab308', '#2563eb'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    tags: ['Apparel', 'Trending'],
    isNew: true,
    isTrending: true,
  },
  {
    id: 'prod-ocean-tote',
    name: 'Vibrant Waves Heavy Canvas Tote',
    description: 'Sturdy 12oz natural cotton canvas tote featuring deep marine retro wave graphics. Extra-long handles, interior slip pocket, and heavy reinforce stitching.',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewCount: 112,
    category: 'gifts',
    images: ['waves'],
    colors: ['#f8fafc', '#1e293b', '#22c55e'],
    tags: ['Gifts', 'Eco-friendly', 'Accessories'],
    isNew: false,
    isTrending: false,
  },
  {
    id: 'prod-wildheart-kids-tee',
    name: 'Tiny Explorer Rainbow Kid Tee',
    description: 'Adorable colorful kid apparel designed to keep up with playgrounds. Soft breathable ringspun cotton with highly durable baby-safe digital print details.',
    price: 24.99,
    rating: 4.8,
    reviewCount: 45,
    category: 'kids',
    images: ['heart'],
    colors: ['#ec4899', '#3b82f6', '#facc15', '#f8fafc'],
    sizes: ['2T', '3T', '4T', '5T', 'Youth S', 'Youth M'],
    tags: ['Kids', 'Cute'],
    isNew: true,
    isTrending: false,
  },
  {
    id: 'prod-smiley-tumbler',
    name: 'Retro Smile Insulated Tumbler',
    description: 'Double-walled stainless steel vacuum insulated tumbler. Keeps drinks icy for 24 hours or steamy for 12. Complete with a splashproof leakproof lid and custom reusable straw.',
    price: 27.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviewCount: 156,
    category: 'drinkware',
    images: ['smile'],
    colors: ['#eab308', '#0f172a', '#ec4899', '#06b6d4'],
    tags: ['Drinkware', 'Trending'],
    isNew: false,
    isTrending: true,
  },
  {
    id: 'prod-cosmic-tote',
    name: 'Cosmic Stars Heavy Canvas Tote',
    description: 'Vibrant celestial print-on-demand tote bag. Extra-thick straps, reinforced stitching, and high-performance digital print detailing for everyday inspiration.',
    price: 22.99,
    rating: 4.9,
    reviewCount: 68,
    category: 'gifts',
    images: ['cosmic-star'],
    colors: ['#0f172a', '#f8fafc'],
    tags: ['Gifts', 'Accessories'],
    isNew: true,
    isTrending: false,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah K.',
    role: 'Verified Buyer',
    review: 'The print quality is absolutely breathtaking! I ordered the Retro Horizon Tee and the print is super soft and vibrant. It didn’t fade or crack in the wash. DropshoppStudio is my new favorite shop!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    colorClass: 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/10'
  },
  {
    id: 'test-2',
    name: 'Marcus L.',
    role: 'Gift Shopper',
    review: 'I customized a magic mug for my sister’s graduation. She was stunned! The tool is so easy to use and look at how clean the mug came out. Quick shipping too, arrived in 3 days.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    colorClass: 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/10'
  },
  {
    id: 'test-3',
    name: 'Elena R.',
    role: 'Decor Enthusiast',
    review: 'Ordered three bullet journals and a heavy canvas wave tote. Truly premium. The cover feels luxurious and notebook pages are thick enough that ink doesn’t leak. Customer service was ultra sweet!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    colorClass: 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/10'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Creative Ways to Decorate Your Workspace for Peak Creativity',
    excerpt: 'Transform your boring desk into an inspirational creative sanctuary with these simple custom prints, bright colors, and mood-boosting accessories!',
    content: 'An organized desk is good, but a decorated desk is where the magic happens. Integrating colors that trigger high-wavelength focus (like energetic blues and purples) or emotional positivity (like pinks and warm sunshine orange) can boost productivity by up to 15%. Discover how customizable mugs, curated positive-quote journals, and vibrant desk accessories can revolutionize your daily flow.',
    category: 'Workspace Inspiration',
    date: 'May 16, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=600',
    author: 'Emily Thorne'
  },
  {
    id: 'blog-2',
    title: 'The Ultimate Custom Birthday Gift Guide: Making It Deeply Personal',
    excerpt: 'Ditch the generic gift cards! Learn how to make one-of-a-kind mugs, totes, and custom apparel that tell a story. Safe ideas for every budget.',
    content: 'Nothing says "I appreciate you" like custom-built merchandise. In this guide, we break down top personalized POD concepts. For retro fans: customize lightweight tees with custom text like "Born to Ride, Forced to Work" paired with sunset icons. For travelers: heavy canvas totes containing personalized travel goals. Simple designs, major emotional impact.',
    category: 'Custom Gift Ideas',
    date: 'May 20, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    author: 'Jack Andrews'
  },
  {
    id: 'blog-3',
    title: 'Why Sustainable Materials are Changing the Apparel Industry For Good',
    excerpt: 'Explore why organic cotton and eco-conscious digital printing make your clothes last longer, feel softer, and save our beautiful blue planet.',
    content: 'Eco-conscious fashion is no longer a luxury—it:s a responsibility. At DropshoppStudio, we prioritize certified organic French terry and water-based biodegradable printing inks. These advanced POD technologies omit chemical runoffs, resulting in breathable, extra-cozy, and premium-feeling apparel that keeps oceans clean and land fertile.',
    category: 'Eco-Fashion Trends',
    date: 'May 24, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600',
    author: 'Elena Rostova'
  }
];
