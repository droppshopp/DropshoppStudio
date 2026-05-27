import React, { useState, useMemo } from 'react';
import { 
  Shirt, BookOpen, Gift, Coffee, Baby, Sparkles, Star, ShoppingBag, 
  Search, Check, Plus, Minus, Trash, HelpCircle, ChevronDown, 
  ChevronUp, ArrowRight, Tag, Share2, Mail, CheckCircle, Info, Heart
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, BLOGS, DESIGN_GRAPHICS, FONTS } from './data';
import { Product, CartItem, CustomizationState, BlogPost } from './types';
import { ProductMockup } from './components/ProductMockup';

export default function App() {
  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'shop' | 'studio' | 'blog' | 'faq'>('shop');

  // Customizer State
  const [customizer, setCustomizer] = useState<CustomizationState>({
    productType: 'tshirt',
    color: '#ec4899', // vibrant pink default
    text: 'STAY RAD',
    textColor: '#ffffff',
    fontFamily: 'font-sans',
    graphicId: 'retro-sunset'
  });

  // Shop Core State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'item-initial-1',
      productId: 'prod-retro-tee',
      name: 'Retro Horizon Organic Tee',
      price: 29.99,
      color: '#1e293b',
      size: 'L',
      quantity: 1,
      image: 'retro-sunset'
    },
    {
      id: 'item-initial-2',
      productId: 'prod-smiley-tumbler',
      name: 'Retro Smile Insulated Tumbler',
      price: 27.99,
      color: '#eab308',
      quantity: 1,
      image: 'smile'
    }
  ]);

  // UI Micro-States
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  
  // Custom Product Color Presets for Customizer
  const productColors: Record<string, string[]> = {
    tshirt: ['#ec4899', '#3b82f6', '#1e293b', '#f8fafc', '#eab308', '#a855f7'],
    mug: ['#0f172a', '#3b82f6', '#ec4899', '#ef4444', '#10b981', '#f59e0b'],
    journal: ['#a855f7', '#ec4899', '#eab308', '#06b6d4', '#111827', '#10b981'],
    tote: ['#f4f4f5', '#1e293b', '#fbbf24', '#f472b6', '#3b82f6'],
    tumbler: ['#eab308', '#0f172a', '#ec4899', '#06b6d4', '#ef4444', '#10b981']
  };

  const getPriceForType = (type: string) => {
    switch (type) {
      case 'tshirt': return 32.99;
      case 'mug': return 16.99;
      case 'journal': return 21.99;
      case 'tote': return 24.99;
      case 'tumbler': return 28.99;
      default: return 25.00;
    }
  };

  // Filter and Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory || (selectedCategory === 'trending' && product.isTrending);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart Metrics Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Bundle Discounts:
  // 1 item: No discount
  // 2 items: 15% discount
  // 3+ items: 25% discount!
  const cartQuantity = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const bundleDiscountPercentage = useMemo(() => {
    if (cartQuantity >= 3) return 25;
    if (cartQuantity === 2) return 15;
    return 0;
  }, [cartQuantity]);

  const discountAmount = useMemo(() => {
    let amt = (cartSubtotal * bundleDiscountPercentage) / 100;
    if (couponApplied) {
      amt += (cartSubtotal - amt) * 0.15; // extra 15% off first order discount
    }
    return amt;
  }, [cartSubtotal, bundleDiscountPercentage, couponApplied]);

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartQuantity >= 3 ? 0 : 4.99; // Free express shipping for 3+ items!
  }, [cartSubtotal, cartQuantity]);

  const cartTotal = useMemo(() => {
    const total = cartSubtotal - discountAmount + shippingCost;
    return Math.max(0, total);
  }, [cartSubtotal, discountAmount, shippingCost]);

  // Cart Utility functions
  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    const finalColor = selectedColor || product.colors[0];
    const finalSize = selectedSize || (product.sizes ? product.sizes[0] : undefined);
    const itemKey = `${product.id}-${finalColor}-${finalSize || ''}`;

    const existingIndex = cart.findIndex((item) => item.id === itemKey);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: itemKey,
          productId: product.id,
          name: product.name,
          price: product.price,
          color: finalColor,
          size: finalSize,
          quantity: 1,
          image: product.images[0]
        }
      ]);
    }
    setCartOpen(true);
  };

  const handleAddCustomToCart = () => {
    const customId = `custom-${Date.now()}`;
    const price = getPriceForType(customizer.productType);
    const name = `Custom Personalized ${customizer.productType.charAt(0).toUpperCase() + customizer.productType.slice(1)}`;
    
    setCart([
      ...cart,
      {
        id: customId,
        productId: 'custom-product',
        name: name,
        price: price,
        color: customizer.color,
        size: customizer.productType === 'tshirt' ? 'L' : undefined,
        quantity: 1,
        image: customizer.graphicId,
        isCustom: true,
        customDetails: { ...customizer }
      }
    ]);
    setCartOpen(true);
  };

  const updateQuantity = (itemId: string, increment: boolean) => {
    const updated = cart.map((item) => {
      if (item.id === itemId) {
        const nextQty = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    });
    setCart(updated);
  };

  const removeItem = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'WELCOME15') {
      setCouponApplied(true);
      setCouponMessage('YAY! Your 15% VIP discount is now active!');
    } else {
      setCouponMessage('Invalid coupon code. Try WELCOME15!');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setCouponApplied(true);
      setCouponMessage('Code WELCOME15 automatically applied for 15% off first order!');
    }
  };

  const quickNewsletterInput = (email: string) => {
    setNewsletterEmail(email);
    setNewsletterSubscribed(true);
    setCouponApplied(true);
    setCouponMessage('Code WELCOME15 automatically applied for 15% off first order!');
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  const getLucideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt': return <Shirt className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Gift': return <Gift className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      case 'Baby': return <Baby className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <Gift className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic Promotion Ticker bar */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 px-4 py-2.5 text-center text-xs font-bold text-white tracking-wider flex items-center justify-center gap-2 overflow-hidden shadow-sm">
        <span className="inline-block animate-pulse">🔥</span>
        <span>CREATIVE LAUNCH DEALS: BUY 2 GET 15% OFF, BUY 3+ GET 25% OFF BOTH PERSONALIZED AND STANDARD PRINTS!</span>
        <button 
          onClick={() => { setCouponApplied(true); setCouponMessage('YAY! Code WELCOME15 is now active!'); }} 
          className="ml-3 bg-white text-purple-700 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase hover:bg-yellow-300 transform hover:scale-105 transition-all"
        >
          Apply "WELCOME15"
        </button>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo Concept */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setActiveTab('shop'); setSelectedCategory('all'); }}>
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-800 leading-none">
                Drop<span className="text-pink-500">shopp</span>Studio
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-bold uppercase">Creative Prints</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('all'); }} 
              className={`hover:text-pink-500 transition-colors ${activeTab === 'shop' && selectedCategory === 'all' ? 'text-pink-600 font-bold' : ''}`}
            >
              Browse Shop
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('apparel'); }} 
              className={`hover:text-pink-500 transition-colors ${activeTab === 'shop' && selectedCategory === 'apparel' ? 'text-pink-600 font-bold' : ''}`}
            >
              Apparel
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('drinkware'); }} 
              className={`hover:text-pink-500 transition-colors ${activeTab === 'shop' && selectedCategory === 'drinkware' ? 'text-pink-600 font-bold' : ''}`}
            >
              Drinkware
            </button>
            <button 
              onClick={() => setActiveTab('studio')} 
              className={`hover:text-pink-500 transition-colors flex items-center gap-1 ${activeTab === 'studio' ? 'text-pink-600 font-bold' : ''}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              Creative Lab
            </button>
            <button 
              onClick={() => setActiveTab('blog')} 
              className={`hover:text-pink-500 transition-colors ${activeTab === 'blog' ? 'text-pink-600 font-bold' : ''}`}
            >
              Stories & Ideas
            </button>
            <button 
              onClick={() => setActiveTab('faq')} 
              className={`hover:text-pink-500 transition-colors ${activeTab === 'faq' ? 'text-pink-600 font-bold' : ''}`}
            >
              FAQs
            </button>
          </nav>
        </div>

        {/* Header Right Action Items */}
        <div className="flex items-center gap-4">
          {/* Animated Search Bar */}
          <div className="relative group hidden sm:block">
            <input 
              type="text" 
              placeholder="Search funny mugs, custom tees..." 
              value={searchQuery}
              onChange={(e) => { 
                setSearchQuery(e.target.value); 
                if (activeTab !== 'shop') setActiveTab('shop'); 
              }}
              className="bg-slate-100 rounded-full py-2 pl-4 pr-10 text-xs w-48 lg:w-60 outline-none border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all font-medium text-slate-800"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-2.5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          </div>

          {/* Shopping Cart Trigger */}
          <button 
            id="cart-trigger"
            onClick={() => setCartOpen(true)} 
            className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/50 flex items-center justify-center relative transition-all active:scale-95 group"
            title="Open Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-700 group-hover:text-pink-500 transition-colors" />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white scale-110 shadow-md transform animate-bounce">
                {cartQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Container Viewport */}
      <main className="flex-1 flex flex-col">
        
        {/* SHOP TAB ROOT FLOW */}
        {activeTab === 'shop' && (
          <div className="flex-1 flex flex-col gap-0">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-12 px-6 lg:px-16 w-full relative overflow-hidden flex flex-col-reverse lg:flex-row items-center gap-12">
              {/* Abstract decorative elements */}
              <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px]" />
              
              <div className="flex-1 space-y-7 relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-black tracking-widest uppercase">
                  <span className="flex h-2 w-2 rounded-full bg-pink-400"></span>
                  Print On Demand Reimagined
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-cyan-200">
                  Create.<br />Print. Inspire.
                </h1>
                
                <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
                  Unique, premium quality apparel, vegan leather journals, custom drinkware, and gifts made to inspire and color your lifestyle. Styled with absolute pixel perfection.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => {
                      const shopSec = document.getElementById('marketplace-grid');
                      if (shopSec) shopSec.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-extrabold text-sm shadow-xl shadow-purple-950/20 hover:scale-105 active:scale-95 transition-transform"
                    id="hero-shop-now"
                  >
                    Shop Now
                  </button>
                  <button 
                    onClick={() => setActiveTab('studio')}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-extrabold text-sm tracking-wide transition-all"
                  >
                    Custom Studio Lab ✨
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <p className="font-extrabold text-pink-400 text-base">200K+</p>
                    <p className="text-slate-400 font-semibold">Happy Customers</p>
                  </div>
                  <div>
                    <p className="font-extrabold text-cyan-400 text-base">100%</p>
                    <p className="text-slate-400 font-semibold">Vegan Leather & Organic Fabrics</p>
                  </div>
                  <div>
                    <p className="font-extrabold text-purple-400 text-base">3-Day</p>
                    <p className="text-slate-400 font-semibold">Quick Continental Shipping</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Mockup Showcase on Hero slider */}
              <div className="flex-1 w-full max-w-md relative flex items-center justify-center lg:py-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/25 to-transparent rounded-3xl blur-2xl transform -rotate-6 scale-95" />
                
                {/* Visual presentation device framing */}
                <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 w-full relative group">
                  <span className="absolute top-4 left-4 text-[10px] font-black tracking-widest text-[#a855f7] bg-purple-500/10 px-2.5 py-1 rounded-sm uppercase">Creative Studio Sample</span>
                  
                  {/* Rotating sample product images utilizing real mockup renderer */}
                  <div className="aspect-square w-full rounded-2xl flex items-center justify-center bg-zinc-950/25 p-4 mb-4 relative">
                    <ProductMockup 
                      type="tshirt" 
                      baseColor="#a855f7" 
                      graphicId="retro-sunset" 
                      text="CHASE DREAMS" 
                      textColor="#ffffff"
                      fontFamily="font-cursive"
                      className="w-full h-full max-h-[240px]" 
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-white text-sm">Personalized Active Studio Tee</h4>
                      <p className="text-slate-400">Created in our 3D Studio Lab</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-pink-400 text-sm">$32.99</p>
                      <button 
                        onClick={() => {
                          setCustomizer({
                            productType: 'tshirt',
                            color: '#a855f7',
                            text: 'CHASE DREAMS',
                            textColor: '#ffffff',
                            fontFamily: 'font-cursive',
                            graphicId: 'retro-sunset'
                          });
                          setActiveTab('studio');
                        }}
                        className="text-cyan-400 font-black hover:underline cursor-pointer"
                      >
                        Edit in Lab →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCT CATEGORIES GRID MAP */}
            <section className="py-12 bg-white px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Shop By Designed Collection</h2>
                  <p className="text-slate-500 text-sm font-medium">Explore high-vibe products sorted by categories</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div 
                    onClick={() => setSelectedCategory('all')} 
                    className={`rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer border transition-all ${selectedCategory === 'all' ? 'border-purple-500 bg-purple-50 shadow-md scale-105' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:shadow-sm'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white mb-3 flex items-center justify-center font-extrabold text-lg">🛍️</div>
                    <span className="font-bold text-slate-800 text-xs">All Collection</span>
                  </div>

                  {CATEGORIES.map((cat) => (
                    <div 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer border transition-all ${selectedCategory === cat.id ? 'border-pink-500 bg-pink-50 shadow-md scale-105' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:shadow-sm'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-purple-600 mb-3 flex items-center justify-center">
                        {getLucideIcon(cat.icon)}
                      </div>
                      <span className="font-bold text-slate-800 text-xs">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BEST SELLERS SECTION */}
            <section id="marketplace-grid" className="py-12 bg-slate-50 px-6 lg:px-16 flex-1">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 filter-row">
                  <div>
                    <span className="text-xs font-black text-pink-500 uppercase tracking-widest mb-1.5 block">TRENDING BEST SELLERS</span>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                      {selectedCategory === 'all' ? 'All Curated Gear' : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Marketplace'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {searchQuery && (
                      <span className="bg-purple-100 text-purple-700 font-bold text-xs py-1.5 px-3 rounded-full flex items-center gap-1">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:text-pink-500 font-extrabold ml-1">×</button>
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-semibold">{filteredProducts.length} premium products available</span>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 max-w-md mx-auto p-8 space-y-4">
                    <p className="text-5xl">🔭</p>
                    <h3 className="text-lg font-black text-slate-800">No matched products</h3>
                    <p className="text-xs text-slate-400">We couldn't find items that matched "{searchQuery}". Try updating your query or browse categories.</p>
                    <button 
                      onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-wider"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id}
                        className="bg-white p-3.5 rounded-3xl border border-slate-100 flex flex-col group cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all relative"
                        onClick={() => setSelectedProductDetails(product)}
                      >
                        {/* Tags over image */}
                        {product.isTrending && (
                          <div className="absolute top-5 left-5 bg-pink-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm z-10 uppercase tracking-widest animate-pulse">
                            TRENDING
                          </div>
                        )}
                        {product.isNew && (
                          <div className="absolute top-5 left-5 bg-cyan-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm z-10 uppercase tracking-widest">
                            NEW
                          </div>
                        )}

                        {/* Interactive Product Mock Graphic */}
                        <div className="aspect-square bg-slate-50 rounded-2xl mb-4.5 relative overflow-hidden flex items-center justify-center group-hover:bg-slate-100 transition-all p-4">
                          <ProductMockup 
                            type={product.id === 'prod-retro-tee' || product.id === 'prod-wildheart-kids-tee' || product.id === 'prod-electric-zap-hoodie' ? 'tshirt' : product.id === 'prod-dream-journal' ? 'journal' : product.id === 'prod-rainbow-mug' ? 'mug' : product.id === 'prod-smiley-tumbler' ? 'tumbler' : 'tote'} 
                            baseColor={product.colors[0]} 
                            graphicId={product.images[0]} 
                            className="w-full h-full max-h-[160px] max-w-[160px]" 
                          />
                          
                          {/* Hover effect indicator */}
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white/95 text-slate-800 py-2 px-4 rounded-full text-[11px] font-black tracking-widest uppercase shadow-md pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-all">
                              Configure & Detail
                            </span>
                          </div>
                        </div>

                        {/* Rating & reviews summary info */}
                        <div className="flex items-center gap-1.5 px-1 mb-2">
                          <div className="flex text-amber-400 text-xs">
                            {"★".repeat(Math.round(product.rating))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-extrabold">({product.reviewCount})</span>
                        </div>

                        {/* Core Details */}
                        <div className="flex-1 px-1">
                          <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition-colors line-clamp-1">{product.name}</h3>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Pricing and Action row */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 px-1">
                          <div>
                            {product.originalPrice ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-black text-rose-500">${product.price}</span>
                                <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                              </div>
                            ) : (
                              <span className="text-sm font-black text-slate-800">${product.price}</span>
                            )}
                          </div>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="mt-3.5 w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider active:scale-95 hover:bg-pink-600 hover:shadow-lg transition-all"
                        >
                          Quick Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* WHY CHOOSE DROPSHOPPSTUDIO */}
            <section className="py-16 bg-white px-6 lg:px-16 border-t border-slate-50">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="text-xs font-black text-pink-500 uppercase tracking-widest">Our Promise</span>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">The DropshoppStudio Difference</h2>
                  <p className="text-slate-500 text-sm font-medium">Why millions choose our vibrant print-on-demand custom gear</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="text-center p-6 space-y-4 rounded-3xl bg-pink-50/50 border border-pink-100/50">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">✨</div>
                    <h3 className="font-bold text-slate-800 text-sm">Premium Printing</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Rich high-gloss prints, clean soft ink textures, and double stitched collars that survive any washer.</p>
                  </div>
                  
                  <div className="text-center p-6 space-y-4 rounded-3xl bg-blue-50/50 border border-blue-100/50">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">✈️</div>
                    <h3 className="font-bold text-slate-800 text-sm">Fast Global Delivery</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Parcels packed, custom printed, and shipped with tracking information in 3 days continental.</p>
                  </div>

                  <div className="text-center p-6 space-y-4 rounded-3xl bg-amber-50/50 border border-amber-100/50">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">🎨</div>
                    <h3 className="font-bold text-slate-800 text-sm">Unique Designs</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Exclusive illustrations created by in-house coloristas, styled to pop with premium aesthetic presence.</p>
                  </div>

                  <div className="text-center p-6 space-y-4 rounded-3xl bg-purple-50/50 border border-purple-100/50">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">🏷️</div>
                    <h3 className="font-bold text-slate-800 text-sm">Affordable Prices</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">High quality custom streetwear prints and bullet journals made available without middleman markups.</p>
                  </div>

                  <div className="text-center p-6 space-y-4 rounded-3xl bg-emerald-50/50 border border-emerald-100/50">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">✓</div>
                    <h3 className="font-bold text-slate-800 text-sm">Secure Checkout</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">256-bit SSL encrypted bank-level transfer security ensuring safe customer orders each step.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* INSTAGRAM STYLE REEL */}
            <section className="py-12 bg-slate-50 px-6 lg:px-16 overflow-hidden">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-black text-purple-600 block uppercase">@DROPSHOPPSTUDIO</span>
                    <h3 className="text-xl font-black text-slate-800 mt-1">Inspired Lifestyles</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400 hover:text-pink-600 cursor-pointer">Follow Us on TikTok & IG →</span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { url: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&q=80&w=350', tag: 'Apparel' },
                    { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=350', tag: 'Tees' },
                    { url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=350', tag: 'Journals' },
                    { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=350', tag: 'Ceramics' },
                    { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=350', tag: 'Carry Totes' }
                  ].map((item, idx) => (
                    <div key={idx} className="aspect-square relative rounded-2xl overflow-hidden group shadow-sm bg-slate-200">
                      <img 
                        src={item.url} 
                        alt="lifestyle product dropshopp" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                        <span className="text-white font-black text-xs">#{item.tag}</span>
                        <span className="text-[10px] text-pink-300 font-bold">dropshopp.studio</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-16 bg-white px-6 lg:px-16 border-t border-slate-100">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="text-xs font-black text-pink-500 uppercase tracking-widest">Happy Shoppers</span>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tight">Voted 4.9/5 Stars</h2>
                  <p className="text-slate-500 text-sm font-medium">Listen to the creative community talk about our apparel, design process & packaging.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div 
                      key={t.id} 
                      className={`p-8 rounded-3xl border-2 shadow-sm transition-all hover:shadow-md ${t.colorClass}`}
                    >
                      <div className="flex text-yellow-400 font-bold text-lg mb-4">
                        {"★".repeat(t.rating)}
                      </div>
                      
                      <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed italic mb-6">
                        "{t.review}"
                      </p>

                      <div className="flex items-center gap-3">
                        <img 
                          src={t.avatar} 
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-xs">{t.name}</h4>
                          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CREATIVE 3D CUSTOMIZER STUDIO LAB TAB */}
        {activeTab === 'studio' && (
          <div className="flex-1 bg-slate-900 text-slate-100 py-12 px-6 lg:px-16 animate-fadeIn">
            <div className="max-w-7xl mx-auto space-y-8">
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-black text-pink-400 uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded-sm">Dropshopp Studio Lab</span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Print Sandbox</h1>
                  <p className="text-slate-400 text-sm">Personalize custom t-shirts, vegan notebooks, magic cups, carry totes, and thermos tumblers. Pick a stamp, color & text!</p>
                </div>
                
                <div className="bg-slate-800/80 p-2 border border-slate-700/50 rounded-xl flex items-center gap-2">
                  <div className="animate-ping w-2.5 h-2.5 bg-green-500 rounded-full ml-2"></div>
                  <span className="text-xs font-extrabold text-slate-300 pr-2">Live Graphic Renderer Online</span>
                </div>
              </div>

              {/* Main Workspace Frame split into Interactive Controls and Interactive Live Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Section Column LEFT: Customizer Config options */}
                <div className="lg:col-span-5 bg-slate-800 rounded-3xl p-6 border border-slate-700/50 space-y-6">
                  
                  {/* Select product canvas type */}
                  <div className="space-y-3">
                    <label className="text-xs font-black tracking-wider uppercase text-slate-400 flex justify-between">
                      <span>1. Custom Canvas Selection</span>
                      <span className="text-pink-400 font-extrabold animate-pulse">${getPriceForType(customizer.productType)}</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'tshirt', name: 'Organic Apparel', icon: '👕' },
                        { id: 'mug', name: 'Ceramic Mug', icon: '☕' },
                        { id: 'journal', name: 'Bullet Journal', icon: '📔' },
                        { id: 'tote', name: 'Carry Tote', icon: '👜' },
                        { id: 'tumbler', name: 'Thermos Tumbler', icon: '🧉' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => {
                            setCustomizer({
                              ...customizer,
                              productType: type.id as any,
                              color: productColors[type.id][0] // reset to matching safe color range
                            });
                          }}
                          className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center border font-bold text-xs transition-all active:scale-95 cursor-pointer ${customizer.productType === type.id ? 'border-pink-500 bg-pink-500/10 text-white shadow-lg' : 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300'}`}
                        >
                          <span className="text-xl mb-1">{type.icon}</span>
                          <span className="text-[10px] leading-snug">{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pick apparel canvas color based on product presets */}
                  <div className="space-y-3">
                    <label className="text-xs font-black tracking-wider uppercase text-slate-400">2. Select Fabric / Canvas Color</label>
                    <div className="flex flex-wrap gap-2.5">
                      {productColors[customizer.productType].map((col) => (
                        <button
                          key={col}
                          onClick={() => setCustomizer({ ...customizer, color: col })}
                          className={`w-9 h-9 rounded-full relative border-2 flex items-center justify-center transition-transform hover:scale-110 active:scale-90 ${customizer.color === col ? 'border-pink-400 scale-105 shadow-md shadow-pink-500/20' : 'border-slate-700'}`}
                          style={{ backgroundColor: col }}
                          title={col}
                        >
                          {customizer.color === col && (
                            <Check className="w-4 h-4 text-white font-extrabold mix-blend-difference" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select central designer graphics stamps */}
                  <div className="space-y-3">
                    <label className="text-xs font-black tracking-wider uppercase text-slate-400">3. Choose Colorista Stamp Graphic</label>
                    <div className="grid grid-cols-4 gap-2">
                      {DESIGN_GRAPHICS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setCustomizer({ ...customizer, graphicId: g.id })}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${customizer.graphicId === g.id ? 'border-pink-500 bg-pink-500/10 text-white' : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200'}`}
                        >
                          <span className="text-lg mb-1">{g.icon}</span>
                          <span className="text-[10px] leading-tight line-clamp-1">{g.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom printed slogans wording text customization */}
                  <div className="space-y-3.5">
                    <label className="text-xs font-black tracking-wider uppercase text-slate-400 flex justify-between">
                      <span>4. Custom Printed Motto</span>
                      <span className="text-slate-500">Max 25 chars</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. SLAY ALL DAY" 
                      value={customizer.text}
                      onChange={(e) => setCustomizer({ ...customizer, text: e.target.value.slice(0, 25) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none focus:border-pink-500 transition-all"
                    />

                    {/* Choose slogan font and text color */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-[10px] font-black tracking-wide text-slate-400 uppercase">Text Font style</span>
                        <select 
                          value={customizer.fontFamily}
                          onChange={(e) => setCustomizer({ ...customizer, fontFamily: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none mt-1.5 focus:border-pink-500"
                        >
                          {FONTS.map(f => (
                            <option key={f.value} value={f.value}>{f.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <span className="text-[10px] font-black tracking-wide text-slate-400 uppercase">Text Highlight Color</span>
                        <div className="flex gap-1.5 mt-2">
                          {['#ffffff', '#000000', '#facc15', '#f43f5e', '#a855f7'].map(c => (
                            <button
                              key={c}
                              onClick={() => setCustomizer({ ...customizer, textColor: c })}
                              className={`w-6 h-6 rounded-full border-2 ${customizer.textColor === c ? 'border-pink-500' : 'border-slate-700'}`}
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit item configuration to cart */}
                  <button
                    onClick={handleAddCustomToCart}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white rounded-full font-black text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg shadow-pink-500/20 transition-all cursor-pointer mt-4"
                  >
                    Add This Custom Specimen to Cart • ${(getPriceForType(customizer.productType)).toFixed(2)}
                  </button>
                </div>

                {/* Section Column RIGHT: Real 3D Preview Frame Canvas */}
                <div className="lg:col-span-7 bg-zinc-950 rounded-[2.5rem] p-8 border-2 border-slate-800 aspect-square flex flex-col items-center justify-center relative min-h-[420px]">
                  {/* Subtle retro matrix dots grids in dark backdrop for precise design feel */}
                  <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-25" />
                  
                  {/* Custom interactive indicator watermark */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-900/90 text-slate-400 text-[10px] font-black border border-slate-700 px-3.5 py-1.5 rounded-full uppercase tracking-widest z-10 select-none">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Creative Core Active
                  </div>

                  {/* Large rendering viewport invoking modular graphics system overlay */}
                  <div className="relative w-full h-[320.5px] max-h-[360px] flex items-center justify-center">
                    <ProductMockup
                      type={customizer.productType}
                      baseColor={customizer.color}
                      graphicId={customizer.graphicId}
                      text={customizer.text}
                      textColor={customizer.textColor}
                      fontFamily={customizer.fontFamily}
                      className="w-full h-full transform hover:rotate-3 transition-transform duration-500 scale-110 select-none"
                    />
                  </div>

                  {/* Sandbox specifications telemetry readout */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between gap-2 text-[10px] font-black tracking-widest text-slate-500 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 uppercase">
                    <span>Base type: {customizer.productType}</span>
                    <span>Stamp stamp: {customizer.graphicId}</span>
                    <span>Wording: {customizer.text || 'Nil'}</span>
                    <span>Tone: {customizer.color}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* STORIES, IDEAS & HOLISTIC BLOG SECTION */}
        {activeTab === 'blog' && (
          <div className="flex-1 py-12 bg-white px-6 lg:px-16 animate-fadeIn">
            <div className="max-w-7xl mx-auto space-y-12">
              
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-xs font-black text-pink-500 uppercase tracking-widest">Dropshopp Studio Journal</span>
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Trends & Slogan Inspiration</h1>
                <p className="text-slate-500 text-sm font-medium">Explore daily styling tips, custom merchandise guides, and color theory secrets from design directors.</p>
              </div>

              {/* Grid of articles representing POD trends */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOGS.map((blog) => (
                  <article key={blog.id} className="group border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col bg-slate-50">
                    <div className="aspect-[16/10] bg-slate-200 overflow-hidden relative">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 text-slate-800 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wide shadow-sm">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-extrabold tracking-wider">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                        <span>•</span>
                        <span>By {blog.author}</span>
                      </div>

                      <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-pink-600 transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="pt-4 mt-auto border-t border-slate-200/60">
                        <button 
                          onClick={() => setActiveBlog(blog)}
                          className="text-xs font-black text-purple-600 hover:text-pink-600 transition-colors inline-flex items-center gap-1 group/btn"
                        >
                          Read Full Article 
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* COLLAPSIBLE ACCORDION FAQS SECTION */}
        {activeTab === 'faq' && (
          <div className="flex-1 py-12 bg-slate-50 px-6 lg:px-16 animate-fadeIn">
            <div className="max-w-3xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <span className="text-xs font-black text-pink-500 uppercase tracking-widest">HAVE QUESTIONS?</span>
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Customer Support & Policies</h1>
                <p className="text-slate-500 text-sm font-medium">All the answers matching checkout, custom printing times, and refund rules.</p>
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm divide-y divide-slate-100">
                {[
                  {
                    q: 'How long does custom design printing take?',
                    a: 'Since every specimen is uniquely printed on-demand with professional precise ink pressing, it takes 1-2 business days to print, cure, and package. We then coordinate express global delivery immediately with tracked delivery notifications.'
                  },
                  {
                    q: 'What makes your apparel organic and safe?',
                    a: 'We strictly rely on heavyweight 100% certified organic French terry and ringspun cotton fabrics, leaving zero chemical or pesticide trace. All printing paints are water-based and zero-solvent, ensuring soft touch points safe for infants and adults alike.'
                  },
                  {
                    q: 'Can I return or refund a personalized print?',
                    a: 'Yes, absolutely! Unlike legacy custom shops that refuse customized modifications, DropshoppStudio provides a standard 30-day "Love it or Swap it" peace of mind guarantee. If the print, sizing, or colors are not perfectly matching your vibes, we will reissue or refund immediately.'
                  },
                  {
                    q: 'How should I care for my custom insulated tumbler and ceramic mug?',
                    a: 'Our custom thermal tumblers and gloss magic mugs utilize a high-density glaze baked at 1800°F. They are fully microwave and dishwasher safe. For the thermal insulated steel tumblers, hand washing maintains pristine insulation for decades.'
                  },
                  {
                    q: 'Do you offer custom group orders or bulk design pricing?',
                    a: 'Yes! We support custom corporate branding, group reunions, and custom team hoodies. Use the Creative Lab to visualize designs, or send us a prompt via email support to unlock exclusive corporate discount ladders up to 45% off!'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="py-4.5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full text-left flex justify-between items-center py-1 text-slate-800 focus:outline-none"
                    >
                      <span className="font-extrabold text-[#111827] text-base leading-snug">{item.q}</span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-pink-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {expandedFaq === idx && (
                      <div className="mt-3 text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold pl-1 animate-slideDown">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Secure help contact box */}
              <div className="bg-indigo-950 text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2 relative z-10">
                  <h3 className="font-extrabold text-xl">Still need direct assistance?</h3>
                  <p className="text-slate-300 text-xs max-w-md leading-relaxed font-semibold">Our physical custom studio operates 24/7. Shoot us an email and a real print architect will reply in 1 hour.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 relative z-10">
                  <span className="text-xs font-black text-pink-300">support@dropshopp.studio</span>
                  <a href="mailto:support@dropshopp.studio" className="px-6 py-3 bg-white text-purple-900 font-extrabold text-xs rounded-full uppercase tracking-widest hover:bg-yellow-300 transition-colors">Shoot Email</a>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER & EMAIL NEWSLETTER GRABBERS */}
      <section className="bg-slate-900 text-slate-200 border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Email Newsletter Section */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="text-white font-black text-lg tracking-tight uppercase">Get Exclusive Deals & New Drops!</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-semibold">Join the Dropshopp VIP list to get seasonal catalog booklets, instant VIP access to new creative tools, and immediately unlock a <span className="text-yellow-300 font-extrabold">15% discount code</span> for your first basket purchase.</p>
            
            {newsletterSubscribed ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-400 font-extrabold">
                <CheckCircle className="w-5 h-5" />
                <span>Subscribed! Use code <strong className="bg-white/25 px-1.5 py-0.5 rounded text-white ml-1">WELCOME15</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex bg-slate-800 p-1 rounded-full border border-slate-700 max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-transparent flex-1 px-4 text-xs text-white placeholder:text-slate-500 outline-none"
                  required
                />
                <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                  Unlock
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 font-black tracking-wider uppercase">
              <span>Quick tests:</span>
              <button onClick={() => quickNewsletterInput('hello@gmail.com')} className="hover:text-pink-400 underline">test@gmail.com</button>
              <span>•</span>
              <button onClick={() => quickNewsletterInput('designer@aol.com')} className="hover:text-pink-400 underline">designer@aol.com</button>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-white font-extrabold text-xs tracking-wider uppercase">Vibrancy Shop</h5>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('apparel'); }} className="hover:text-pink-400">Apparel Collection</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('journals'); }} className="hover:text-pink-400">Inspirational Journals</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('gifts'); }} className="hover:text-pink-400">Personalized Gifts</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('drinkware'); }} className="hover:text-pink-400">Premium Drinkware</button></li>
              <li><button onClick={() => { setActiveTab('shop'); setSelectedCategory('kids'); }} className="hover:text-pink-400">Kids Collection</button></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-white font-extrabold text-xs tracking-wider uppercase">Customer Support</h5>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-pink-400">Return Policy (30 Days)</button></li>
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-pink-400">Shipping Policy</button></li>
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-pink-400">FAQs & Order Tracking</button></li>
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-pink-400">Quality Guarantees</button></li>
              <li><button onClick={() => setActiveTab('faq')} className="hover:text-pink-400">Contact Print Architects</button></li>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-white font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5">
              <span>Dropshopp Brands</span>
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            </h5>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">DropshoppStudio represents a collaborative aesthetic project where art meeting digital printing precision. 100% committed to sustainable materials.</p>
            <div className="flex gap-4 text-xs font-black text-slate-300">
              <span className="hover:text-pink-400 cursor-pointer">INSTAGRAM</span>
              <span className="hover:text-pink-400 cursor-pointer">TIKTOK</span>
              <span className="hover:text-pink-400 cursor-pointer">PINTEREST</span>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="bg-slate-950 py-4 px-6 lg:px-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-3 text-[10px] font-bold text-slate-500 tracking-wide uppercase">
          <span>© 2026 DROPSHOPPSTUDIO INC. ALL RIGHTS RESERVED. MADE IN USA & EUROPE.</span>
          <div className="flex gap-4">
            <span>SECURE CHECKOUT BY STRIPE & PAYPAL</span>
            <span>•</span>
            <span>TERMS OF SERVICE</span>
            <span>•</span>
            <span>PRIVACY POLICY</span>
          </div>
        </div>
      </section>

      {/* OVERLAY: PRODUCT DETAIL SPECIFICATION MODAL */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-slate-100 flex flex-col md:flex-row relative">
            <button 
              onClick={() => setSelectedProductDetails(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center font-extrabold text-slate-500 z-10 hover:text-rose-500 transition-colors cursor-pointer"
            >
              ✕
            </button>
            
            {/* Modal Left Mockup Container */}
            <div className="md:w-[45%] bg-slate-50 p-6 flex flex-col justify-center items-center h-[320px] md:h-auto border-r border-slate-100">
              <div className="w-full aspect-square max-w-[200px] flex items-center justify-center relative bg-white rounded-2xl p-4 shadow-sm">
                <ProductMockup 
                  type={selectedProductDetails.id === 'prod-retro-tee' || selectedProductDetails.id === 'prod-wildheart-kids-tee' || selectedProductDetails.id === 'prod-electric-zap-hoodie' ? 'tshirt' : selectedProductDetails.id === 'prod-dream-journal' ? 'journal' : selectedProductDetails.id === 'prod-rainbow-mug' ? 'mug' : selectedProductDetails.id === 'prod-smiley-tumbler' ? 'tumbler' : 'tote'} 
                  baseColor={selectedProductDetails.colors[0]} 
                  graphicId={selectedProductDetails.images[0]} 
                  className="w-full h-full max-h-[160px] max-w-[160px]" 
                />
              </div>
              <div className="mt-4 flex gap-1.5">
                {selectedProductDetails.colors.map((c) => (
                  <span key={c} className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            {/* Modal Right Configuration Details Column */}
            <div className="flex-1 p-8 space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{selectedProductDetails.category}</span>
                <h3 className="text-xl font-extrabold text-slate-800 leading-snug mt-1">{selectedProductDetails.name}</h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(Math.round(selectedProductDetails.rating))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-extrabold">{selectedProductDetails.reviewCount} user checkout reviews</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-semibold mt-4">
                  {selectedProductDetails.description}
                </p>

                {/* Sizing blocks if available */}
                {selectedProductDetails.sizes && (
                  <div className="space-y-2 mt-4.5">
                    <span className="text-[10px] font-black tracking-wide text-slate-400 uppercase">Available Sizes (Standard Fit):</span>
                    <div className="flex gap-2">
                      {selectedProductDetails.sizes.map(sz => (
                        <span key={sz} className="border border-slate-200 text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-lg bg-slate-50">{sz}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {selectedProductDetails.tags.map(t => (
                    <span key={t} className="text-[9px] font-extrabold px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full">#{t}</span>
                  ))}
                </div>
              </div>

              <div className="bottom-row pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-black tracking-widest block">ITEM PRICE</span>
                  <span className="text-lg font-black text-slate-900">${selectedProductDetails.price}</span>
                </div>
                
                <button
                  onClick={() => {
                    handleAddToCart(selectedProductDetails);
                    setSelectedProductDetails(null);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:scale-105 transition-transform"
                >
                  Buy Now & Add
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* OVERLAY: ACTIVE BLOG DRAWER MODAL READOUT */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-w-2xl w-full border border-slate-100 relative">
            <button 
              onClick={() => setActiveBlog(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md hover:bg-rose-500 hover:text-white rounded-full flex items-center justify-center font-extrabold text-slate-600 z-10 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="aspect-[16/8] bg-slate-100">
              <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">
                <span>{activeBlog.category}</span>
                <span>•</span>
                <span>{activeBlog.date}</span>
                <span>•</span>
                <span>By {activeBlog.author}</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-800 leading-snug">{activeBlog.title}</h3>
              
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold space-y-4 pt-2">
                <p>{activeBlog.content}</p>
                <p className="italic">To visualize how these seasonal design suggestions look on physical gear, load our Print Sandbox and custom design your own specimen in seconds!</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setActiveBlog(null);
                    setActiveTab('studio');
                  }}
                  className="px-6 py-3.5 bg-purple-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-colors"
                >
                  Load Custom Studio Lab
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* OVERLAY: SLIDE-OUT SHOPPING CART DRAWER PANEL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-slate-100 relative animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Your Creative Basket</h3>
                <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  {cartQuantity} items
                </span>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 border border-slate-100 flex items-center justify-center font-bold text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* PROGRESS METER FOR ACTIVE BUNDLE DISCOUNTS */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 shrink-0 text-white space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold uppercase tracking-wide">🔥 Bundle Discounts meter:</span>
                <span className="font-black">
                  {cartQuantity === 0 ? 'Buy 2 items for 15%' : cartQuantity === 1 ? '1 item more for 15% OFF' : cartQuantity === 2 ? 'Add 1 more for 25% OFF!' : 'Max 25% off VIP applied! 🎉'}
                </span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-yellow-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartQuantity / 3) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-white/80 font-semibold uppercase tracking-wider">
                <span>1 Item (Standard)</span>
                <span className={cartQuantity >= 2 ? 'text-yellow-300 font-extrabold' : ''}>2 Items (15% OFF)</span>
                <span className={cartQuantity >= 3 ? 'text-yellow-300 font-extrabold' : ''}>3+ Items (25% OFF + Free Ship)</span>
              </div>
            </div>

            {/* Drawer items list body scroll */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <p className="text-5xl">🛒</p>
                  <h4 className="font-black text-slate-800 text-base">Your basket is empty</h4>
                  <p className="text-xs text-slate-400 max-w-[240px] mx-auto font-semibold">Start looking around or craft custom prints inside our studio lab!</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setActiveTab('shop');
                    }}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-wider"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 divide-y divide-slate-100">
                  {cart.map((item, idx) => (
                    <div key={item.id} className={`flex gap-3.5 pt-3.5 first:pt-0 ${item.isCustom ? 'bg-amber-50/30 p-2 rounded-xl border border-amber-100/40' : ''}`}>
                      
                      {/* Interactive mock colorized thumbnail representation */}
                      <div className="w-16 h-16 shrink-0 bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center">
                        <ProductMockup 
                          type={item.isCustom ? item.customDetails?.productType || 'tshirt' : item.productId === 'prod-retro-tee' || item.productId === 'prod-wildheart-kids-tee' || item.productId === 'prod-electric-zap-hoodie' ? 'tshirt' : item.productId === 'prod-dream-journal' ? 'journal' : item.productId === 'prod-rainbow-mug' ? 'mug' : item.productId === 'prod-smiley-tumbler' ? 'tumbler' : 'tote'} 
                          baseColor={item.color} 
                          graphicId={item.image} 
                          text={item.isCustom ? item.customDetails?.text : ''}
                          fontFamily={item.isCustom ? item.customDetails?.fontFamily : 'font-sans'}
                          className="w-full h-full p-1 scale-[1.05]" 
                        />
                      </div>

                      {/* Info lines description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-extrabold text-slate-800 text-xs truncate pr-2">{item.name}</h4>
                          <span className="text-xs font-black text-slate-900 shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-400 font-extrabold uppercase">
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: item.color }} />
                            Color: {item.color}
                          </span>
                          {item.size && (
                            <span>• Size: {item.size}</span>
                          )}
                          {item.isCustom && (
                            <span className="text-amber-600 font-black tracking-widest">★ CREATIVE LAB SPECIMEN</span>
                          )}
                        </div>

                        {/* Quantity management row counter */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                            <button 
                              onClick={() => updateQuantity(item.id, false)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-slate-500 hover:text-slate-800 focus:outline-none"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black px-2.5 text-slate-800 select-none">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, true)}
                              className="w-6 h-6 flex items-center justify-center font-bold text-slate-500 hover:text-slate-800 focus:outline-none"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] text-slate-400 hover:text-rose-500 font-black uppercase inline-flex items-center gap-1"
                          >
                            <Trash className="w-3 h-3" />
                            Remove
                          </button>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Pricing breakdown and mock transaction forms */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
              
              {/* Promo code drawer block */}
              <form onSubmit={applyCoupon} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo Code (WELCOME15)" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-white border rounded-lg px-3 py-1.5 text-xs flex-1 outline-none text-slate-800 uppercase placeholder:text-slate-400"
                />
                <button type="submit" className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wide cursor-pointer">
                  Apply
                </button>
              </form>

              {couponMessage && (
                <div className={`p-2.5 rounded-lg text-[11px] font-black uppercase text-center ${couponApplied ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                  {couponMessage}
                </div>
              )}

              {/* Subtotal listing stats indicators */}
              <div className="space-y-1.5 text-xs text-slate-600 font-semibold">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {bundleDiscountPercentage > 0 && (
                  <div className="flex justify-between text-pink-500 font-extrabold">
                    <span>Bundle Discount ({bundleDiscountPercentage}%)</span>
                    <span>-${((cartSubtotal * bundleDiscountPercentage) / 100).toFixed(2)}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-extrabold">
                    <span>VIP Extra Discount (15%)</span>
                    <span>-${((cartSubtotal * 0.15)).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tracked Fast Delivery</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-500 uppercase">FREE SHIPPING</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-black text-sm">
                  <span>TOTAL BASKET PRICE</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA triggers */}
              {cart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white rounded-xl font-black text-xs tracking-widest uppercase hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  Place Mock Order
                </button>
              )}

            </div>

          </div>
        </div>
      )}

      {/* OVERLAY: MOCK ORDER PLACED SUCCESS POPUP */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full border border-slate-100 text-center space-y-5 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold shadow">
              ✓
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-black text-pink-500 tracking-widest uppercase">ORDER PROCESSED SECURELY</span>
              <h2 className="text-2xl font-black text-slate-800">Your custom parcel is booked!</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Thank you for shopping from DropshoppStudio. Your parcel design is verified. Our modular printers have begun fabric-pressing! Settle back while tracking info transfers in 3 hours.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 text-left space-y-1 text-xs text-slate-600 font-semibold uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Specimen ID</span>
                <strong className="text-slate-900">DSS-96263-K</strong>
              </div>
              <div className="flex justify-between">
                <span>Printing status</span>
                <strong className="text-purple-600 font-black animate-pulse">INCUBATING SEAMS...</strong>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderPlaced(false);
                setCartOpen(false);
                setActiveTab('shop');
              }}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-colors cursor-pointer"
            >
              Continue Creative Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
