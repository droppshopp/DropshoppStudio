export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[]; // Mocked realistic product photos/colors
  colors: string[];
  sizes?: string[];
  tags: string[];
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CustomizationState {
  productType: 'tshirt' | 'mug' | 'journal' | 'tote' | 'tumbler';
  color: string;
  text: string;
  textColor: string;
  fontFamily: string;
  graphicId: string;
}

export interface CartItem {
  id: string; // Unique instance ID (handles custom items too)
  productId: string;
  name: string;
  price: number;
  color: string;
  size?: string;
  quantity: number;
  image: string;
  isCustom?: boolean;
  customDetails?: CustomizationState;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  colorClass: string; // colorful background/border theme
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}
