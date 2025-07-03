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
import { 
  fetchAboutSection, 
  fetchHeroSection, 
  fetchHeaderContent,
  fetchFooterContent,
  fetchContactPageContent,
  fetchReviewsSection,
  fetchSeoSettings,
  updateContentSection 
} from '../integrations/supabase/contentService';
import { 
  fetchServices,
  createService as createServiceInDb,
  updateService as updateServiceInDb,
  deleteService as deleteServiceInDb
} from '../integrations/supabase/servicesService';
import {
  fetchProjects,
  createProject as createProjectInDb,
  updateProject as updateProjectInDb,
  deleteProject as deleteProjectInDb
} from '../integrations/supabase/projectsService';
import {
  fetchMessages,
  updateMessage as updateMessageInDb,
  deleteMessage as deleteMessageInDb
} from '../integrations/supabase/messagesService';
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
  addService: (service: Omit<Service, "id">) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  
  // Project related state and functions
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Message related state and functions
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addMessage: (message: Omit<Message, "id" | "date" | "createdAt" | "read">, id?: string) => Promise<void>;
  updateMessage: (id: string, message: Partial<Message>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
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
        setIsLoading(true);
        console.log("Starting data fetch from Supabase...");
        
        // Fetch content sections first
        console.log("Fetching content sections...");
        const [aboutData, heroData, headerData, footerData, contactData, reviewsData, seoData] = await Promise.allSettled([
          fetchAboutSection(),
          fetchHeroSection(),
          fetchHeaderContent(),
          fetchFooterContent(),
          fetchContactPageContent(),
          fetchReviewsSection(),
          fetchSeoSettings()
        ]);
        
        // Update content sections if successful
        if (aboutData.status === 'fulfilled' && aboutData.value) {
          setAboutSection(aboutData.value);
        }
        if (heroData.status === 'fulfilled' && heroData.value) {
          setHeroSection(heroData.value);
        }
        if (headerData.status === 'fulfilled' && headerData.value) {
          setHeaderContent(headerData.value);
        }
        if (footerData.status === 'fulfilled' && footerData.value) {
          setFooterContent(footerData.value);
        }
        if (contactData.status === 'fulfilled' && contactData.value) {
          setContactPageContent(contactData.value);
        }
        if (reviewsData.status === 'fulfilled' && reviewsData.value) {
          setReviewsSection(reviewsData.value);
        }
        if (seoData.status === 'fulfilled' && seoData.value) {
          setSeoSettings(seoData.value);
        }

        // Fetch dynamic data
        console.log("Fetching dynamic data...");
        const [servicesData, projectsData, messagesData] = await Promise.allSettled([
          fetchServices(),
          fetchProjects(),
          fetchMessages()
        ]);

        if (servicesData.status === 'fulfilled') {
          console.log("Services fetched successfully:", servicesData.value);
          setServices(servicesData.value);
        } else {
          console.error("Failed to fetch services:", servicesData.reason);
        }

        if (projectsData.status === 'fulfilled') {
          console.log("Projects fetched successfully:", projectsData.value);
          setProjects(projectsData.value);
        } else {
          console.error("Failed to fetch projects:", projectsData.reason);
        }

        if (messagesData.status === 'fulfilled') {
          console.log("Messages fetched successfully:", messagesData.value);
          setMessages(messagesData.value);
        } else {
          console.error("Failed to fetch messages:", messagesData.reason);
        }
        
        console.log("Data fetch completed successfully");
      } catch (error) {
        console.error('Critical error during data fetch:', error);
        toast.error('Failed to load application data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Update functions for content sections
  const updateHeroSection = async (data: HeroSection) => {
    try {
      setHeroSection(data);
      await updateContentSection('hero', data);
    } catch (error) {
      console.error('Failed to update Hero section', error);
    }
  };
  
  const updateAboutSection = async (data: AboutSection) => {
    try {
      setAboutSection(data);
      await updateContentSection('about', data);
    } catch (error) {
      console.error('Failed to update About section', error);
    }
  };
  
  const updateHeaderContent = async (data: HeaderContent) => {
    try {
      setHeaderContent(data);
      await updateContentSection('header', data);
    } catch (error) {
      console.error('Failed to update Header content', error);
      toast.error('Failed to update header content');
    }
  };
  
  const updateFooterContent = async (data: FooterContent) => {
    try {
      setFooterContent(data);
      await updateContentSection('footer', data);
    } catch (error) {
      console.error('Failed to update Footer content', error);
      toast.error('Failed to update footer content');
    }
  };
  
  const updateContactPageContent = async (data: ContactPageContent) => {
    try {
      setContactPageContent(data);
      await updateContentSection('contact', data);
    } catch (error) {
      console.error('Failed to update Contact page content', error);
      toast.error('Failed to update contact page content');
    }
  };
  
  const updateReviewsSection = async (data: ReviewsSection) => {
    try {
      setReviewsSection(data);
      await updateContentSection('reviews', data);
    } catch (error) {
      console.error('Failed to update Reviews section', error);
      toast.error('Failed to update reviews section');
    }
  };
  
  const updateSeoSettings = async (settings: SEOSettings) => {
    try {
      setSeoSettings(settings);
      await updateContentSection('seo', settings);
    } catch (error) {
      console.error('Failed to update SEO settings', error);
      toast.error('Failed to update SEO settings');
    }
  };
  
  // CRUD functions for services with enhanced error handling
  const addService = async (service: Omit<Service, "id">) => {
    try {
      console.log("DataContext: Creating service:", service);
      const newService = await createServiceInDb(service);
      if (newService) {
        console.log("DataContext: Service created successfully:", newService);
        setServices(prev => [newService, ...prev]);
      } else {
        throw new Error('Service creation returned null');
      }
    } catch (error) {
      console.error('DataContext: Error in addService:', error);
      throw error; // Re-throw to let the UI handle it
    }
  };
  
  const updateService = async (id: string, service: Partial<Service>) => {
    try {
      console.log("DataContext: Updating service:", id, service);
      const success = await updateServiceInDb(id, service);
      if (success) {
        setServices(prev => 
          prev.map(item => 
            item.id === id ? { ...item, ...service } : item
          )
        );
        console.log("DataContext: Service updated successfully");
      } else {
        throw new Error('Service update failed');
      }
    } catch (error) {
      console.error('DataContext: Error in updateService:', error);
      throw error;
    }
  };
  
  const deleteService = async (id: string) => {
    try {
      console.log("DataContext: Deleting service:", id);
      const success = await deleteServiceInDb(id);
      if (success) {
        setServices(prev => prev.filter(item => item.id !== id));
        console.log("DataContext: Service deleted successfully");
      } else {
        throw new Error('Service deletion failed');
      }
    } catch (error) {
      console.error('DataContext: Error in deleteService:', error);
      throw error;
    }
  };
  
  // CRUD functions for projects with enhanced error handling
  const addProject = async (project: Omit<Project, "id">) => {
    try {
      console.log("DataContext: Creating project:", project);
      const newProject = await createProjectInDb(project);
      if (newProject) {
        console.log("DataContext: Project created successfully:", newProject);
        setProjects(prev => [newProject, ...prev]);
      } else {
        throw new Error('Project creation returned null');
      }
    } catch (error) {
      console.error('DataContext: Error in addProject:', error);
      throw error;
    }
  };
  
  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      console.log("DataContext: Updating project:", id, project);
      const success = await updateProjectInDb(id, project);
      if (success) {
        setProjects(prev => 
          prev.map(item => 
            item.id === id ? { ...item, ...project } : item
          )
        );
        console.log("DataContext: Project updated successfully");
      } else {
        throw new Error('Project update failed');
      }
    } catch (error) {
      console.error('DataContext: Error in updateProject:', error);
      throw error;
    }
  };
  
  const deleteProject = async (id: string) => {
    try {
      console.log("DataContext: Deleting project:", id);
      const success = await deleteProjectInDb(id);
      if (success) {
        setProjects(prev => prev.filter(item => item.id !== id));
        console.log("DataContext: Project deleted successfully");
      } else {
        throw new Error('Project deletion failed');
      }
    } catch (error) {
      console.error('DataContext: Error in deleteProject:', error);
      throw error;
    }
  };
  
  // CRUD functions for messages
  const addMessage = async (message: Omit<Message, "id" | "date" | "createdAt" | "read">, id?: string) => {
    try {
      console.log("DataContext: Creating message:", message);
      // For contact form submissions, directly insert into Supabase
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          read: false
        }])
        .select()
        .single();

      if (error) {
        console.error('DataContext: Error creating message:', error);
        toast.error('Failed to send message');
        return;
      }

      if (data) {
        const newMessage: Message = {
          id: data.id,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          read: data.read || false,
          date: new Date(data.created_at).toISOString().split('T')[0],
          createdAt: data.created_at
        };
        setMessages(prev => [newMessage, ...prev]);
        toast.success('Message sent successfully');
        console.log("DataContext: Message created successfully");
      }
    } catch (error) {
      console.error('DataContext: Error in addMessage:', error);
      toast.error('Failed to send message');
    }
  };
  
  const updateMessage = async (id: string, message: Partial<Message>) => {
    try {
      console.log("DataContext: Updating message:", id, message);
      const success = await updateMessageInDb(id, message);
      if (success) {
        setMessages(prev => 
          prev.map(item => 
            item.id === id ? { ...item, ...message } : item
          )
        );
        console.log("DataContext: Message updated successfully");
      }
    } catch (error) {
      console.error('DataContext: Error in updateMessage:', error);
    }
  };
  
  const deleteMessage = async (id: string) => {
    try {
      console.log("DataContext: Deleting message:", id);
      const success = await deleteMessageInDb(id);
      if (success) {
        setMessages(prev => prev.filter(item => item.id !== id));
        console.log("DataContext: Message deleted successfully");
      }
    } catch (error) {
      console.error('DataContext: Error in deleteMessage:', error);
    }
  };
  
  const markMessageAsRead = async (id: string) => {
    await updateMessage(id, { read: true });
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
