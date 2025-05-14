
// Define types for our data
export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButton: string;
  ctaLink: string;
  secondaryButton: string;
  secondaryLink: string;
}

export interface AboutSection {
  title: string;
  description: string[];
  image: string;
  skills: string[];
}

export interface MenuItem {
  title: string;
  url: string;
}

export interface HeaderContent {
  logo: string;
  menuItems: MenuItem[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  createdAt: string;
  read: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  featured: boolean;
  features?: string[]; // Make features optional with ?
}

export interface FooterContent {
  logo: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  menuItems: MenuItem[];
  copyrightText: string;
}

export interface ContactPageContent {
  title: string;
  subtitle: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  mapLocation: string;
}

export interface Review {
  id: string;
  name: string;
  company?: string;
  text: string;
  rating: number;
  image?: string;
}

export interface ReviewsSection {
  title: string;
  subtitle: string;
  reviews: Review[];
}

export interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string[]; // This is an array of strings
  ogImage: string;
  favicon: string;
}

// Map database message to our application Message type
export function mapDbMessageToMessage(dbMessage: any): Message {
  return {
    id: dbMessage.id,
    name: dbMessage.name,
    email: dbMessage.email,
    subject: dbMessage.subject,
    message: dbMessage.message,
    date: dbMessage.created_at || new Date().toISOString().split('T')[0],
    createdAt: dbMessage.created_at || new Date().toISOString(),
    read: dbMessage.read || false
  };
}

// Type for new message submission
export type NewMessage = Omit<Message, 'id' | 'date' | 'createdAt' | 'read'>;
