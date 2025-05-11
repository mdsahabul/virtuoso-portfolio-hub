
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

interface DataContextType {
  projects: Project[];
  services: Service[];
  messages: Message[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addMessage: (message: Omit<Message, "id" | "date" | "read">) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample initial data
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A fully-featured e-commerce platform with product management, cart functionality, and secure checkout integration.',
    image: '',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: '2',
    title: 'Finance Dashboard UI',
    category: 'UI/UX Design',
    description: 'A modern and intuitive dashboard design for a financial services company, focusing on data visualization and user experience.',
    image: '',
    technologies: ['Figma', 'Adobe XD', 'Photoshop']
  },
  {
    id: '3',
    title: 'Travel Booking App',
    category: 'Mobile Development',
    description: 'A cross-platform mobile application for booking travel accommodations with real-time availability and secure payment processing.',
    image: '',
    technologies: ['React Native', 'Firebase', 'Google Maps API']
  }
];

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom websites built with the latest technologies to boost your online presence.',
    price: 1499,
    features: ['Responsive Design', 'SEO Optimization', 'Content Management System', 'Contact Form Integration', 'Google Analytics Setup']
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'User-centered design solutions to enhance user experience and engagement.',
    price: 1299,
    features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Design System Creation']
  },
  {
    id: '3',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    price: 2499,
    features: ['Cross-Platform Development', 'Native App Development', 'App Store Submission', 'Ongoing Maintenance', 'Performance Optimization']
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

  // CRUD functions for projects
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
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
      id: Math.random().toString(36).substr(2, 9),
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
      id: Math.random().toString(36).substr(2, 9),
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
