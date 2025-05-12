
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our data
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
  price: number;
  features: string[];
  highlighted?: boolean;
  icon?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  ctaButton: string;
  ctaLink: string;
  secondaryButton: string;
  secondaryLink: string;
  backgroundImage: string;
}

export interface AboutSection {
  title: string;
  description: string[];
  image: string;
  skills: string[];
}

export interface FooterContent {
  copyrightText: string;
  quickLinks: {
    title: string;
    url: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface HeaderContent {
  logo: string;
  menuItems: {
    title: string;
    url: string;
  }[];
}

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogImage: string;
  favicon: string;
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

interface DataContextType {
  // Project related state and functions
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Service related state and functions
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Message related state and functions
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, "id" | "date" | "read">) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  
  // Website content related state and functions
  heroSection: HeroSection;
  setHeroSection: React.Dispatch<React.SetStateAction<HeroSection>>;
  updateHeroSection: (data: Partial<HeroSection>) => void;
  
  aboutSection: AboutSection;
  setAboutSection: React.Dispatch<React.SetStateAction<AboutSection>>;
  updateAboutSection: (data: Partial<AboutSection>) => void;
  
  footerContent: FooterContent;
  setFooterContent: React.Dispatch<React.SetStateAction<FooterContent>>;
  updateFooterContent: (data: Partial<FooterContent>) => void;
  
  headerContent: HeaderContent;
  setHeaderContent: React.Dispatch<React.SetStateAction<HeaderContent>>;
  updateHeaderContent: (data: Partial<HeaderContent>) => void;
  
  seoSettings: SeoSettings;
  setSeoSettings: React.Dispatch<React.SetStateAction<SeoSettings>>;
  updateSeoSettings: (data: Partial<SeoSettings>) => void;
  
  contactPageContent: ContactPageContent;
  setContactPageContent: React.Dispatch<React.SetStateAction<ContactPageContent>>;
  updateContactPageContent: (data: Partial<ContactPageContent>) => void;
  
  // General functions
  clearData: () => void;
  resetToInitialData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample initial data
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A fully-featured e-commerce platform with product management, cart functionality, and secure checkout integration.',
    image: 'https://images.unsplash.com/photo-1561997968-aa846c2bf255?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: '2',
    title: 'Finance Dashboard UI',
    category: 'UI/UX Design',
    description: 'A modern and intuitive dashboard design for a financial services company, focusing on data visualization and user experience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    technologies: ['Figma', 'Adobe XD', 'Photoshop']
  },
  {
    id: '3',
    title: 'Travel Booking App',
    category: 'Mobile Development',
    description: 'A cross-platform mobile application for booking travel accommodations with real-time availability and secure payment processing.',
    image: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    technologies: ['React Native', 'Firebase', 'Google Maps API']
  }
];

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom websites built with the latest technologies to boost your online presence.',
    price: 1499,
    features: ['Responsive Design', 'SEO Optimization', 'Content Management System', 'Contact Form Integration', 'Google Analytics Setup'],
    icon: 'code'
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'User-centered design solutions to enhance user experience and engagement.',
    price: 1299,
    features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Design System Creation'],
    highlighted: true,
    icon: 'layout'
  },
  {
    id: '3',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    price: 2499,
    features: ['Cross-Platform Development', 'Native App Development', 'App Store Submission', 'Ongoing Maintenance', 'Performance Optimization'],
    icon: 'smartphone'
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    subject: 'Website Project Inquiry',
    message: "I'm interested in your web development services for my new business. Can we schedule a call to discuss the details?",
    date: '2023-05-10',
    read: false
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    subject: 'Logo Design Project',
    message: "Hello, I need a new logo for my startup. I like your portfolio and would like to discuss working together.",
    date: '2023-05-08',
    read: true
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    subject: 'Mobile App Development',
    message: "We're looking for a developer to create a mobile app for our business. What's your availability in the coming months?",
    date: '2023-05-05',
    read: true
  }
];

const initialHeroSection: HeroSection = {
  title: "Creative Solutions for Your Digital Presence",
  subtitle: "Expert web development and design services to help your business grow online",
  ctaButton: "View My Work",
  ctaLink: "/portfolio",
  secondaryButton: "Contact Me",
  secondaryLink: "/contact",
  backgroundImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
};

const initialAboutSection: AboutSection = {
  title: "About Me",
  description: [
    "As a passionate professional with over 5 years of experience, I specialize in creating digital solutions that help businesses grow and thrive in the online world.",
    "My approach combines technical expertise with creative thinking to deliver results that exceed client expectations. I believe in building long-term relationships and providing exceptional value with every project."
  ],
  image: "https://images.unsplash.com/photo-1585076641399-5c06d1b3365f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  skills: ["Web Development", "UI/UX Design", "Mobile Development", "SEO Optimization"]
};

const initialFooterContent: FooterContent = {
  copyrightText: "© 2023 Portfolio. All rights reserved.",
  quickLinks: [
    { title: "Home", url: "/" },
    { title: "Services", url: "/services" },
    { title: "Portfolio", url: "/portfolio" },
    { title: "Contact", url: "/contact" }
  ],
  contactInfo: {
    email: "contact@example.com",
    phone: "+1 (123) 456-7890",
    address: "123 Main St, City, Country"
  },
  socialLinks: [
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { platform: "GitHub", url: "https://github.com", icon: "github" }
  ]
};

const initialHeaderContent: HeaderContent = {
  logo: "Portfolio",
  menuItems: [
    { title: "Home", url: "/" },
    { title: "Services", url: "/services" },
    { title: "Portfolio", url: "/portfolio" },
    { title: "Contact", url: "/contact" },
    { title: "Admin", url: "/admin-login" }
  ]
};

const initialSeoSettings: SeoSettings = {
  siteTitle: "Professional Portfolio & Services",
  siteDescription: "Expert web development, design and digital services to help your business grow online",
  keywords: ["web development", "UI/UX design", "portfolio", "services", "digital solutions"],
  ogImage: "/og-image.jpg",
  favicon: "/favicon.ico"
};

const initialContactPageContent: ContactPageContent = {
  title: "Get In Touch",
  subtitle: "Have a project in mind? Let's discuss how I can help bring your ideas to life.",
  contactInfo: {
    email: "contact@example.com",
    phone: "+1 (123) 456-7890",
    address: "123 Main St, City, Country"
  },
  mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215288354323!2d-73.98778868459314!3d40.757978942830474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f07d5da561%3A0x61f6aa300ba8339d!2sGrand%20Central%20Terminal!5e0!3m2!1sen!2sus!4v1654883745021!5m2!1sen!2sus"
};

// Create a provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with data from localStorage or fallback to initial data
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });
  
  const [services, setServices] = useState<Service[]>(() => {
    const savedServices = localStorage.getItem('services');
    return savedServices ? JSON.parse(savedServices) : initialServices;
  });
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });

  // Website content sections
  const [heroSection, setHeroSection] = useState<HeroSection>(() => {
    const saved = localStorage.getItem('heroSection');
    return saved ? JSON.parse(saved) : initialHeroSection;
  });

  const [aboutSection, setAboutSection] = useState<AboutSection>(() => {
    const saved = localStorage.getItem('aboutSection');
    return saved ? JSON.parse(saved) : initialAboutSection;
  });

  const [footerContent, setFooterContent] = useState<FooterContent>(() => {
    const saved = localStorage.getItem('footerContent');
    return saved ? JSON.parse(saved) : initialFooterContent;
  });

  const [headerContent, setHeaderContent] = useState<HeaderContent>(() => {
    const saved = localStorage.getItem('headerContent');
    return saved ? JSON.parse(saved) : initialHeaderContent;
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    const saved = localStorage.getItem('seoSettings');
    return saved ? JSON.parse(saved) : initialSeoSettings;
  });

  const [contactPageContent, setContactPageContent] = useState<ContactPageContent>(() => {
    const saved = localStorage.getItem('contactPageContent');
    return saved ? JSON.parse(saved) : initialContactPageContent;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);
  
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('heroSection', JSON.stringify(heroSection));
  }, [heroSection]);

  useEffect(() => {
    localStorage.setItem('aboutSection', JSON.stringify(aboutSection));
  }, [aboutSection]);

  useEffect(() => {
    localStorage.setItem('footerContent', JSON.stringify(footerContent));
  }, [footerContent]);

  useEffect(() => {
    localStorage.setItem('headerContent', JSON.stringify(headerContent));
  }, [headerContent]);

  useEffect(() => {
    localStorage.setItem('seoSettings', JSON.stringify(seoSettings));
  }, [seoSettings]);

  useEffect(() => {
    localStorage.setItem('contactPageContent', JSON.stringify(contactPageContent));
  }, [contactPageContent]);

  // Generate a unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
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
      prev.map(item => item.id === id ? { ...item, ...project } : item)
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
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
      prev.map(item => item.id === id ? { ...item, ...service } : item)
    );
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(item => item.id !== id));
  };

  // CRUD functions for messages
  const addMessage = (message: Omit<Message, "id" | "date" | "read">) => {
    const newMessage = {
      ...message,
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      read: false,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const updateMessage = (id: string, message: Partial<Message>) => {
    setMessages(prev => 
      prev.map(item => item.id === id ? { ...item, ...message } : item)
    );
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(item => item.id !== id));
  };

  const markMessageAsRead = (id: string) => {
    updateMessage(id, { read: true });
  };
  
  // Update functions for website content sections
  const updateHeroSection = (data: Partial<HeroSection>) => {
    setHeroSection(prev => ({ ...prev, ...data }));
  };

  const updateAboutSection = (data: Partial<AboutSection>) => {
    setAboutSection(prev => ({ ...prev, ...data }));
  };

  const updateFooterContent = (data: Partial<FooterContent>) => {
    setFooterContent(prev => ({ ...prev, ...data }));
  };

  const updateHeaderContent = (data: Partial<HeaderContent>) => {
    setHeaderContent(prev => ({ ...prev, ...data }));
  };

  const updateSeoSettings = (data: Partial<SeoSettings>) => {
    setSeoSettings(prev => ({ ...prev, ...data }));
  };

  const updateContactPageContent = (data: Partial<ContactPageContent>) => {
    setContactPageContent(prev => ({ ...prev, ...data }));
  };
  
  // Function to clear all data
  const clearData = () => {
    setProjects([]);
    setServices([]);
    setMessages([]);
    setHeroSection(initialHeroSection);
    setAboutSection(initialAboutSection);
    setFooterContent(initialFooterContent);
    setHeaderContent(initialHeaderContent);
    setSeoSettings(initialSeoSettings);
    setContactPageContent(initialContactPageContent);
    
    localStorage.removeItem('projects');
    localStorage.removeItem('services');
    localStorage.removeItem('messages');
    localStorage.removeItem('heroSection');
    localStorage.removeItem('aboutSection');
    localStorage.removeItem('footerContent');
    localStorage.removeItem('headerContent');
    localStorage.removeItem('seoSettings');
    localStorage.removeItem('contactPageContent');
  };
  
  // Function to reset to initial data
  const resetToInitialData = () => {
    setProjects(initialProjects);
    setServices(initialServices);
    setMessages(initialMessages);
    setHeroSection(initialHeroSection);
    setAboutSection(initialAboutSection);
    setFooterContent(initialFooterContent);
    setHeaderContent(initialHeaderContent);
    setSeoSettings(initialSeoSettings);
    setContactPageContent(initialContactPageContent);
    
    localStorage.setItem('projects', JSON.stringify(initialProjects));
    localStorage.setItem('services', JSON.stringify(initialServices));
    localStorage.setItem('messages', JSON.stringify(initialMessages));
    localStorage.setItem('heroSection', JSON.stringify(initialHeroSection));
    localStorage.setItem('aboutSection', JSON.stringify(initialAboutSection));
    localStorage.setItem('footerContent', JSON.stringify(initialFooterContent));
    localStorage.setItem('headerContent', JSON.stringify(initialHeaderContent));
    localStorage.setItem('seoSettings', JSON.stringify(initialSeoSettings));
    localStorage.setItem('contactPageContent', JSON.stringify(initialContactPageContent));
  };

  return (
    <DataContext.Provider value={{
      projects,
      services,
      messages,
      setProjects,
      setServices,
      setMessages,
      addProject,
      updateProject,
      deleteProject,
      addService,
      updateService,
      deleteService,
      addMessage,
      updateMessage,
      deleteMessage,
      markMessageAsRead,
      clearData,
      resetToInitialData,
      heroSection,
      setHeroSection,
      updateHeroSection,
      aboutSection,
      setAboutSection,
      updateAboutSection,
      footerContent,
      setFooterContent,
      updateFooterContent,
      headerContent,
      setHeaderContent,
      updateHeaderContent,
      seoSettings,
      setSeoSettings,
      updateSeoSettings,
      contactPageContent,
      setContactPageContent,
      updateContactPageContent
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
