import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  HeroSection,
  AboutSection,
  MenuItem,
  HeaderContent,
  Message,
  Project,
  Service,
  FooterContent,
  ContactPageContent,
  Review,
  ReviewsSection,
  SEOSettings
} from '../types/appTypes';
import { supabase } from '../integrations/supabase/client';
import { fetchContentSection, updateContentSection } from '../integrations/supabase/contentService';
import { toast } from 'sonner';

// Re-export these types so they can be imported directly from DataContext
export type { Message, Project, Service };

// Define context type
interface DataContextType {
  // Hero section
  heroSection: HeroSection;
  updateHeroSection: (data: HeroSection) => void;
  
  // About section
  aboutSection: AboutSection;
  updateAboutSection: (data: AboutSection) => void;
  
  // Header content
  headerContent: HeaderContent;
  updateHeaderContent: (data: HeaderContent) => void;
  
  // Service related state and functions
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Project related state and functions
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Message related state and functions
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, "id" | "date" | "createdAt" | "read">, id?: string) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  
  // Footer content
  footerContent: FooterContent;
  updateFooterContent: (data: FooterContent) => void;
  
  // Contact page content
  contactPageContent: ContactPageContent;
  updateContactPageContent: (data: ContactPageContent) => void;
  
  // Reviews section
  reviewsSection: ReviewsSection;
  updateReviewsSection: (data: ReviewsSection) => void;
  
  // SEO settings
  seoSettings: SEOSettings;
  updateSeoSettings: (settings: SEOSettings) => void;
  
  // Loading state
  isLoading: boolean;
}

// Create the context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper function to generate a random ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Default data values
const defaultHeroSection: HeroSection = {
  title: "Creative Solutions for Modern Businesses",
  subtitle: "We build high-quality digital experiences that drive results and help businesses grow.",
  backgroundImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  ctaButton: "Get Started",
  ctaLink: "/contact",
  secondaryButton: "Learn More",
  secondaryLink: "/services"
};

const defaultAboutSection: AboutSection = {
  title: "About Me",
  description: [
    "I'm a passionate Web Developer with over 5 years of experience in creating beautiful and functional websites for businesses across various industries.",
    "My goal is to help businesses establish a strong online presence through well-designed websites that engage visitors and convert them into customers."
  ],
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "UI/UX Design", "Responsive Design"]
};

const defaultHeaderContent: HeaderContent = {
  logo: "YourName",
  menuItems: [
    { title: "Home", url: "/" },
    { title: "Services", url: "/services" },
    { title: "Portfolio", url: "/portfolio" },
    { title: "Contact", url: "/contact" }
  ]
};

const defaultMessages: Message[] = [
  {
    id: "msg1",
    name: "John Smith",
    email: "john.smith@example.com",
    subject: 'Website Project Inquiry',
    message: "I'm interested in your web development services for my new business. Can we schedule a call to discuss the details?",
    date: '2023-05-10',
    createdAt: '2023-05-10T12:00:00Z',
    read: false
  },
  {
    id: "msg2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: 'Logo Design Project',
    message: "Hello, I need a new logo for my startup. I like your portfolio and would like to discuss working together.",
    date: '2023-05-08',
    createdAt: '2023-05-08T12:00:00Z',
    read: true
  },
  {
    id: "msg3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    subject: 'Mobile App Development',
    message: "We're looking for a developer to create a mobile app for our business. What's your availability in the coming months?",
    date: '2023-05-05',
    createdAt: '2023-05-05T12:00:00Z',
    read: true
  }
];

const defaultProjects: Project[] = [
  {
    id: "proj1",
    title: "E-commerce Website",
    category: "Web Development",
    description: "A fully responsive e-commerce website with product catalog, shopping cart, and secure checkout.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com"
  },
  {
    id: "proj2",
    title: "Fitness App",
    category: "Mobile Development",
    description: "A mobile app for tracking workouts, nutrition, and fitness goals with analytics and progress charts.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
  },
  {
    id: "proj3",
    title: "Real Estate Platform",
    category: "Web Development",
    description: "A real estate listing website with property search, filters, and map integration.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    technologies: ["Angular", "Node.js", "PostgreSQL", "Google Maps API"],
    link: "https://example.com"
  }
];

const defaultServices: Service[] = [
  {
    id: "serv1",
    title: "Web Development",
    description: "Custom websites built from scratch to meet your specific business needs. Includes responsive design, optimization, and seamless user experience.",
    icon: "code",
    price: 1499,
    featured: true,
    features: ["Responsive Design", "SEO Optimization", "Fast Loading Speed"]
  },
  {
    id: "serv2",
    title: "UI/UX Design",
    description: "Professional interface design that enhances user engagement and satisfaction. We create intuitive, aesthetically pleasing designs that convert visitors.",
    icon: "layout",
    price: 999,
    featured: true,
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
  },
  {
    id: "serv3",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android. From concept to deployment, we handle the entire development process.",
    icon: "smartphone",
    price: 2499,
    featured: true,
    features: ["iOS & Android Apps", "Cross-platform Development", "App Store Submission"]
  },
  {
    id: "serv4",
    title: "E-commerce Solutions",
    description: "Complete online store setup with secure payment gateways, product management, and order processing systems.",
    icon: "shopping-cart",
    price: 1999,
    featured: false,
    features: ["Secure Payments", "Inventory Management", "Shopping Cart"]
  }
];

const defaultFooterContent: FooterContent = {
  logo: "YourName",
  description: "Creating beautiful digital experiences that drive results and help businesses grow.",
  contactEmail: "contact@example.com",
  contactPhone: "+1 (123) 456-7890",
  address: "123 Web Street, Digital City, 10001",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  },
  menuItems: [
    { title: "Home", url: "/" },
    { title: "Services", url: "/services" },
    { title: "Portfolio", url: "/portfolio" },
    { title: "Contact", url: "/contact" }
  ],
  copyrightText: "© 2023 YourName. All rights reserved."
};

const defaultContactPageContent: ContactPageContent = {
  title: "Get in Touch",
  subtitle: "Have a project in mind or just want to say hello? I'd love to hear from you!",
  contactInfo: {
    email: "contact@example.com",
    phone: "+1 (123) 456-7890",
    address: "123 Web Street, Digital City, 10001"
  },
  mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.216086753767!2d-74.00589448432352!3d40.71277704471201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1662046450305!5m2!1sen!2sus"
};

const defaultReviewsSection: ReviewsSection = {
  title: "Client Testimonials",
  subtitle: "See what our clients have to say about our work",
  reviews: [
    {
      id: "rev1",
      name: "Emily Johnson",
      company: "Fashion Boutique",
      text: "Working with this team was a game-changer for our online presence. The website they designed perfectly captures our brand identity and has significantly increased our sales.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: "rev2",
      name: "Mark Wilson",
      company: "Tech Startup",
      text: "The mobile app they developed for us is impressive! The user experience is seamless, and they delivered the project on time and within budget.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: "rev3",
      name: "Sophia Chen",
      company: "Restaurant Chain",
      text: "Our website redesign exceeded expectations. Not only does it look amazing, but it's also significantly faster and more user-friendly than our previous site.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/64.jpg"
    }
  ]
};

const defaultSeoSettings: SEOSettings = {
  siteTitle: "Your Professional Portfolio",
  siteDescription: "Professional web developer specializing in modern websites and applications",
  keywords: ["web development", "web design", "ui/ux", "mobile apps", "portfolio"],
  ogImage: "https://example.com/og-image.jpg",
  favicon: "/favicon.ico"
};

// Create a provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up state using the default values
  const [heroSection, setHeroSection] = useState<HeroSection>(defaultHeroSection);
  const [aboutSection, setAboutSection] = useState<AboutSection>(defaultAboutSection);
  const [headerContent, setHeaderContent] = useState<HeaderContent>(defaultHeaderContent);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [footerContent, setFooterContent] = useState<FooterContent>(defaultFooterContent);
  const [contactPageContent, setContactPageContent] = useState<ContactPageContent>(defaultContactPageContent);
  const [reviewsSection, setReviewsSection] = useState<ReviewsSection>(defaultReviewsSection);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(defaultSeoSettings);
  
  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about section
        const aboutData = await fetchContentSection('about');
        if (aboutData) {
          setAboutSection(aboutData as AboutSection);
        }
        
        // Add other sections as needed
        // const heroData = await fetchContentSection('hero');
        // if (heroData) {
        //   setHeroSection(heroData as HeroSection);
        // }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Update functions
  const updateHeroSection = async (data: HeroSection) => {
    setHeroSection(data);
    try {
      await updateContentSection('hero', data);
      toast.success('Hero section updated successfully');
    } catch (error) {
      toast.error('Failed to update Hero section');
      console.error(error);
    }
  };
  
  const updateAboutSection = async (data: AboutSection) => {
    setAboutSection(data);
    try {
      await updateContentSection('about', data);
      toast.success('About section updated successfully');
    } catch (error) {
      toast.error('Failed to update About section');
      console.error(error);
    }
  };
  
  const updateHeaderContent = (data: HeaderContent) => {
    setHeaderContent(data);
  };
  
  const updateFooterContent = (data: FooterContent) => {
    setFooterContent(data);
  };
  
  const updateContactPageContent = (data: ContactPageContent) => {
    setContactPageContent(data);
  };
  
  const updateReviewsSection = (data: ReviewsSection) => {
    setReviewsSection(data);
  };
  
  const updateSeoSettings = (settings: SEOSettings) => {
    setSeoSettings(settings);
  };
  
  // CRUD functions for services
  const addService = (service: Omit<Service, "id">) => {
    const newService = {
      ...service,
      id: generateId(),
    };
    setServices(prev => [...prev, newService]);
  };
  
  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...service } : item
      )
    );
  };
  
  const deleteService = (id: string) => {
    setServices(prev => prev.filter(item => item.id !== id));
  };
  
  // CRUD functions for projects
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: generateId(),
    };
    setProjects(prev => [...prev, newProject]);
  };
  
  const updateProject = (id: string, project: Partial<Project>) => {
    setProjects(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...project } : item
      )
    );
  };
  
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
  };
  
  // CRUD functions for messages
  const addMessage = (message: Omit<Message, "id" | "date" | "createdAt" | "read">, id?: string) => {
    const now = new Date();
    const newMessage = {
      ...message,
      id: id || generateId(),
      date: now.toISOString().split('T')[0],
      createdAt: now.toISOString(),
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
  };
  
  const updateMessage = (id: string, message: Partial<Message>) => {
    setMessages(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...message } : item
      )
    );
  };
  
  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(item => item.id !== id));
  };
  
  const markMessageAsRead = (id: string) => {
    updateMessage(id, { read: true });
  };
  
  // Create the context value object
  const contextValue: DataContextType = {
    heroSection,
    updateHeroSection,
    aboutSection,
    updateAboutSection,
    headerContent,
    updateHeaderContent,
    messages,
    setMessages,
    addMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
    projects,
    setProjects,
    addProject,
    updateProject,
    deleteProject,
    services,
    setServices,
    addService,
    updateService,
    deleteService,
    footerContent,
    updateFooterContent,
    contactPageContent,
    updateContactPageContent,
    reviewsSection,
    updateReviewsSection,
    seoSettings,
    updateSeoSettings,
    isLoading,
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
