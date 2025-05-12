
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Home, User, FileText, Mail, Settings, LogOut, Menu, X, 
  Grid, PlusCircle, Edit, Trash2, Image, Package, MessageSquare,
  BarChart, RefreshCw, Search, Save, Linkedin, Github, Link, Calendar
} from 'lucide-react';
import { useData, Project, Service, Message } from '../context/DataContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Define modal types
type ModalType = 'add' | 'edit' | null;
type ContentType = 'project' | 'service' | 'message' | 'profile' | 'siteSettings' | null;

// Admin profile type
interface AdminProfile {
  name: string;
  email: string;
  bio: string;
  role: string;
  avatar: string;
  linkedIn: string;
  github: string;
  behance: string;
  phone: string;
  location: string;
}

// Site settings type
interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    behance: string;
  };
  analytics: {
    googleAnalyticsId: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use our central data store
  const { 
    projects, services, messages,
    addProject, updateProject, deleteProject,
    addService, updateService, deleteService,
    markMessageAsRead, deleteMessage
  } = useData();
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [contentType, setContentType] = useState<ContentType>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data states
  const [projectForm, setProjectForm] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    image: '',
    technologies: [] as string[],
    link: ''
  });

  const [serviceForm, setServiceForm] = useState({
    id: '',
    title: '',
    description: '',
    price: 0,
    features: [] as string[],
    highlighted: false,
    icon: ''
  });

  // Updated admin profile with more fields
  const [profileForm, setProfileForm] = useState<AdminProfile>({
    name: 'Md Sahabul Islam',
    email: 'contact@mdsahabul.com',
    bio: 'Professional Web Developer & UX Designer',
    role: 'Web Developer',
    avatar: '',
    linkedIn: 'https://www.linkedin.com/in/mdsahabul',
    github: 'https://github.com/mdsahabul',
    behance: 'https://www.behance.net/md_sahabul',
    phone: '+880 1700000000',
    location: 'Dhaka, Bangladesh'
  });

  // Enhanced site settings
  const [siteSettingsForm, setSettingsForm] = useState<SiteSettings>({
    siteName: 'Md Sahabul - Portfolio',
    siteDescription: 'Professional Web Developer & Designer Portfolio',
    contactEmail: 'contact@mdsahabul.com',
    socialLinks: {
      twitter: 'https://twitter.com/mdsahabul',
      linkedin: 'https://www.linkedin.com/in/mdsahabul',
      github: 'https://github.com/mdsahabul',
      behance: 'https://www.behance.net/md_sahabul'
    },
    analytics: {
      googleAnalyticsId: ''
    },
    seo: {
      metaTitle: 'Md Sahabul - Web Developer & Designer Portfolio',
      metaDescription: 'Portfolio of Md Sahabul, showcasing web development and design projects.',
      keywords: 'web developer, UX designer, portfolio, projects, services, contact'
    }
  });

  // Login credentials
  const [credentials, setCredentials] = useState({
    username: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Technology input for projects
  const [techInput, setTechInput] = useState('');
  // Feature input for services
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      toast.error('Please login to access the admin dashboard');
      navigate('/admin-login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    
    // Load saved profile and settings if available
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      try {
        setProfileForm(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Error parsing stored profile', e);
      }
    }
    
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      try {
        setSettingsForm(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error parsing stored settings', e);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Modal handlers
  const openModal = (type: ModalType, content: ContentType, item?: any) => {
    setModalType(type);
    setContentType(content);
    
    if (type === 'edit' && item) {
      setCurrentItem(item);
      
      // Set form data based on content type
      if (content === 'project') {
        setProjectForm({
          id: item.id,
          title: item.title || '',
          category: item.category || '',
          description: item.description || '',
          image: item.image || '',
          technologies: [...(item.technologies || [])],
          link: item.link || ''
        });
      } else if (content === 'service') {
        setServiceForm({
          id: item.id,
          title: item.title || '',
          description: item.description || '',
          price: item.price || 0,
          features: [...(item.features || [])],
          highlighted: item.highlighted || false,
          icon: item.icon || ''
        });
      }
    } else if (type === 'add') {
      // Reset forms for add operation
      if (content === 'project') {
        setProjectForm({
          id: '',
          title: '',
          category: '',
          description: '',
          image: '',
          technologies: [],
          link: ''
        });
      } else if (content === 'service') {
        setServiceForm({
          id: '',
          title: '',
          description: '',
          price: 0,
          features: [],
          highlighted: false,
          icon: ''
        });
      }
    }
    
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setContentType(null);
    setCurrentItem(null);
  };

  // Form handlers
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setServiceForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      price: name === 'price' ? parseFloat(value) || 0 : prev.price
    }));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettingsForm(prev => {
        if (parent === 'socialLinks') {
          return {
            ...prev,
            socialLinks: {
              ...prev.socialLinks,
              [child]: value
            }
          };
        } else if (parent === 'analytics') {
          return {
            ...prev,
            analytics: {
              ...prev.analytics,
              [child]: value
            }
          };
        } else if (parent === 'seo') {
          return {
            ...prev,
            seo: {
              ...prev.seo,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setSettingsForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Technology and feature handlers
  const addTechnology = () => {
    if (techInput && !projectForm.technologies.includes(techInput)) {
      setProjectForm(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addFeature = () => {
    if (featureInput && !serviceForm.features.includes(featureInput)) {
      setServiceForm(prev => ({
        ...prev,
        features: [...prev.features, featureInput]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setServiceForm(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // CRUD operations
  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form
    if (!projectForm.title || !projectForm.category || !projectForm.description) {
      toast.error('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      if (modalType === 'add') {
        // Create new project
        addProject({
          title: projectForm.title,
          category: projectForm.category,
          description: projectForm.description,
          image: projectForm.image,
          technologies: projectForm.technologies,
          link: projectForm.link,
        });
        toast.success('Project added successfully');
      } else {
        // Update existing project
        updateProject(projectForm.id, {
          title: projectForm.title,
          category: projectForm.category,
          description: projectForm.description,
          image: projectForm.image,
          technologies: projectForm.technologies,
          link: projectForm.link,
        });
        toast.success('Project updated successfully');
      }
      
      closeModal();
    } catch (error) {
      toast.error('Error saving project');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitService = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form
    if (!serviceForm.title || !serviceForm.description) {
      toast.error('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      if (modalType === 'add') {
        // Create new service
        addService({
          title: serviceForm.title,
          description: serviceForm.description,
          price: serviceForm.price,
          features: serviceForm.features,
          highlighted: serviceForm.highlighted,
          icon: serviceForm.icon,
        });
        toast.success('Service added successfully');
      } else {
        // Update existing service
        updateService(serviceForm.id, {
          title: serviceForm.title,
          description: serviceForm.description,
          price: serviceForm.price,
          features: serviceForm.features,
          highlighted: serviceForm.highlighted,
          icon: serviceForm.icon,
        });
        toast.success('Service updated successfully');
      }
      
      closeModal();
    } catch (error) {
      toast.error('Error saving service');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate
    if (!profileForm.name || !profileForm.email) {
      toast.error('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      // Store profile data in localStorage
      localStorage.setItem('adminProfile', JSON.stringify(profileForm));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate
    if (!credentials.currentPassword) {
      toast.error('Please enter your current password');
      setIsProcessing(false);
      return;
    }

    if (credentials.newPassword !== credentials.confirmPassword) {
      toast.error('Passwords do not match');
      setIsProcessing(false);
      return;
    }

    try {
      // For demo purposes, we just validate against 'admin'
      if (credentials.currentPassword !== 'admin') {
        toast.error('Current password is incorrect');
        setIsProcessing(false);
        return;
      }
      
      // In a real app, we would update the password in the backend
      localStorage.setItem('adminPassword', credentials.newPassword);
      toast.success('Password updated successfully');
      
      setCredentials(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Error updating password');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate
    if (!siteSettingsForm.siteName || !siteSettingsForm.contactEmail) {
      toast.error('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      // Store settings in localStorage
      localStorage.setItem('siteSettings', JSON.stringify(siteSettingsForm));
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Error updating settings');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDelete = (type: ContentType, id: string) => {
    setIsProcessing(true);
    
    try {
      if (type === 'project') {
        deleteProject(id);
        toast.success('Project deleted successfully');
      } else if (type === 'service') {
        deleteService(id);
        toast.success('Service deleted successfully');
      } else if (type === 'message') {
        deleteMessage(id);
        toast.success('Message deleted successfully');
      }
    } catch (error) {
      toast.error(`Error deleting ${type}`);
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleMarkAsRead = (id: string) => {
    try {
      markMessageAsRead(id);
      toast.success('Message marked as read');
    } catch (error) {
      toast.error('Error updating message');
      console.error(error);
    }
  };

  // Filter function based on search query
  const filterItems = (items: any[], keys: string[]) => {
    if (!searchQuery) return items;
    
    return items.filter(item => 
      keys.some(key => 
        item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Filtered lists based on search
  const filteredProjects = filterItems(projects, ['title', 'category', 'description']);
  const filteredServices = filterItems(services, ['title', 'description']);
  const filteredMessages = filterItems(messages, ['name', 'email', 'subject', 'message']);

  // Project Modal
  const renderProjectModal = () => (
    <Dialog open={modalOpen && contentType === 'project'} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{modalType === 'add' ? 'Add New Project' : 'Edit Project'}</DialogTitle>
          <DialogDescription>
            {modalType === 'add' ? 'Fill the form to add a new project to your portfolio.' : 'Update project information.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmitProject} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title*</Label>
              <Input 
                id="title"
                name="title"
                value={projectForm.title}
                onChange={handleProjectChange}
                placeholder="Enter project title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Input 
                id="category"
                name="category"
                value={projectForm.category}
                onChange={handleProjectChange}
                placeholder="E.g. Web Development, Mobile App"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea 
              id="description"
              name="description"
              value={projectForm.description}
              onChange={handleProjectChange}
              placeholder="Describe the project"
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input 
              id="image"
              name="image"
              value={projectForm.image}
              onChange={handleProjectChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <Input 
              id="link"
              name="link"
              value={projectForm.link}
              onChange={handleProjectChange}
              placeholder="https://example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Technologies</Label>
            <div className="flex items-center space-x-2">
              <Input 
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
              />
              <Button type="button" onClick={addTechnology}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {projectForm.technologies.map((tech, i) => (
                <div 
                  key={i} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1"
                >
                  <span>{tech}</span>
                  <button 
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={closeModal} disabled={isProcessing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Saving...' : modalType === 'add' ? 'Add Project' : 'Update Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Service Modal
  const renderServiceModal = () => (
    <Dialog open={modalOpen && contentType === 'service'} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{modalType === 'add' ? 'Add New Service' : 'Edit Service'}</DialogTitle>
          <DialogDescription>
            {modalType === 'add' ? 'Fill the form to add a new service to your offering.' : 'Update service information.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmitService} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title*</Label>
              <Input 
                id="title"
                name="title"
                value={serviceForm.title}
                onChange={handleServiceChange}
                placeholder="Enter service title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price"
                name="price"
                type="number"
                value={serviceForm.price.toString()}
                onChange={handleServiceChange}
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea 
              id="description"
              name="description"
              value={serviceForm.description}
              onChange={handleServiceChange}
              placeholder="Describe the service"
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input 
              id="icon"
              name="icon"
              value={serviceForm.icon}
              onChange={handleServiceChange}
              placeholder="icon-name"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="highlighted"
              name="highlighted"
              checked={serviceForm.highlighted}
              onCheckedChange={(checked) => 
                setServiceForm(prev => ({ ...prev, highlighted: checked }))
              }
            />
            <Label htmlFor="highlighted">Highlight this service</Label>
          </div>
          
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex items-center space-x-2">
              <Input 
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add feature"
              />
              <Button type="button" onClick={addFeature}>Add</Button>
            </div>
            
            <div className="flex flex-col space-y-2 mt-2">
              {serviceForm.features.map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-gray-100 p-2 rounded-md flex items-center justify-between"
                >
                  <span>{feature}</span>
                  <button 
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={closeModal} disabled={isProcessing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Saving...' : modalType === 'add' ? 'Add Service' : 'Update Service'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 bg-blue-800 text-white transition-all duration-300 lg:translate-x-0 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isSidebarOpen ? 'w-64' : 'w-0'} lg:w-64`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button 
              className="lg:hidden text-white"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'projects', label: 'Projects', icon: Grid },
              { id: 'services', label: 'Services', icon: Package },
              { id: 'messages', label: 'Sales & Messages', icon: MessageSquare },
              { id: 'analytics', label: 'Analytics', icon: BarChart },
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'settings', label: 'Site Settings', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md transition-colors
                    ${activeTab === item.id ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.id === 'messages' && messages.some(m => !m.read) && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {messages.filter(m => !m.read).length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-white hover:bg-blue-700/50 px-4 py-3 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex justify-between items-center px-4 py-4">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4 text-gray-600"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <RefreshCw size={20} className="text-gray-600" />
              </button>
              <div className="text-sm font-medium text-gray-700 hidden sm:block">
                {profileForm.name}
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {profileForm.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="p-4 md:p-6">
          {/* Mobile Search */}
          <div className="relative mb-4 md:hidden">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Welcome to your Admin Dashboard</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'Projects', value: projects.length, icon: Grid, color: 'bg-blue-500' },
                  { label: 'Services', value: services.length, icon: Package, color: 'bg-green-500' },
                  { label: 'Unread Messages', value: messages.filter(m => !m.read).length, icon: Mail, color: 'bg-yellow-500' },
                  { label: 'Total Pages', value: '4', icon: FileText, color: 'bg-purple-500' }
                ].map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                          <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} text-white p-3 rounded-lg`}>
                          <StatIcon size={20} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Add Project', icon: PlusCircle, color: 'bg-blue-500', action: () => openModal('add', 'project') },
                    { label: 'Add Service', icon: PlusCircle, color: 'bg-green-500', action: () => openModal('add', 'service') },
                    { label: 'View Messages', icon: Mail, color: 'bg-yellow-500', action: () => setActiveTab('messages') },
                    { label: 'Edit Settings', icon: Settings, color: 'bg-purple-500', action: () => setActiveTab('settings') }
                  ].map((action, index) => {
                    const ActionIcon = action.icon;
                    return (
                      <button 
                        key={index} 
                        onClick={action.action}
                        className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className={`${action.color} text-white p-3 rounded-full mb-2`}>
                          <ActionIcon size={20} />
                        </div>
                        <span className="text-sm text-center">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Social Links Preview */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Your Social Profiles</h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={profileForm.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href={profileForm.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={profileForm.behance} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                  >
                    <Link size={18} />
                    <span>Behance</span>
                  </a>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {messages.filter(m => !m.read).slice(0, 4).map((message) => (
                    <div key={message.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                      <p>New message received from {message.name}</p>
                      <button 
                        onClick={() => handleMarkAsRead(message.id)}
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Mark as read
                      </button>
                    </div>
                  ))}
                  
                  {messages.filter(m => !m.read).length === 0 && (
                    <p className="text-gray-500">No unread messages</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <Button 
                  onClick={() => openModal('add', 'project')}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add Project</span>
                </Button>
              </div>
              
              {/* Projects Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProjects.map(project => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                <Image size={16} className="text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{project.title}</div>
                                <div className="text-xs text-gray-500">{project.technologies.join(', ')}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                              {project.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{project.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('edit', 'project', project)} 
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete('project', project.id)} 
                                className="text-red-600 hover:text-red-800"
                                disabled={isProcessing}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredProjects.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No projects found</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Services Management</h2>
                <Button 
                  onClick={() => openModal('add', 'service')}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add Service</span>
                </Button>
              </div>
              
              {/* Services Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredServices.map(service => (
                        <tr key={service.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                <Package size={16} className="text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{service.title}</div>
                                <div className="text-xs text-gray-500">
                                  {service.highlighted && <span className="text-green-600">★ Featured</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ${service.price}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{service.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openModal('edit', 'service', service)} 
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete('service', service.id)} 
                                className="text-red-600 hover:text-red-800"
                                disabled={isProcessing}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No services found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Sales & Messages</h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredMessages.map(message => (
                        <tr key={message.id} className={message.read ? '' : 'bg-blue-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{message.name}</div>
                                <div className="text-xs text-gray-500">{message.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{message.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{message.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {message.read ? (
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Read</span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Unread</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {!message.read && (
                                <button 
                                  onClick={() => handleMarkAsRead(message.id)} 
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Mail size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => handleDelete('message', message.id)} 
                                className="text-red-600 hover:text-red-800"
                                disabled={isProcessing}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredMessages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No messages found</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          type="text" 
                          id="name"
                          name="name" 
                          value={profileForm.name}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          type="email" 
                          id="email"
                          name="email" 
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio"
                        name="bio" 
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input 
                          type="text" 
                          id="role"
                          name="role" 
                          value={profileForm.role}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          type="text" 
                          id="location"
                          name="location" 
                          value={profileForm.location}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          type="text" 
                          id="phone"
                          name="phone" 
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4 mt-6">Social Profiles</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="linkedIn">LinkedIn</Label>
                        <Input 
                          type="text" 
                          id="linkedIn"
                          name="linkedIn" 
                          value={profileForm.linkedIn}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input 
                          type="text" 
                          id="github"
                          name="github" 
                          value={profileForm.github}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="behance">Behance</Label>
                        <Input 
                          type="text" 
                          id="behance"
                          name="behance" 
                          value={profileForm.behance}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        type="submit" 
                        disabled={isProcessing}
                        className="flex items-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            <span>Save Profile</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
                
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                    
                    <form onSubmit={handleUpdatePassword}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input 
                            type="password" 
                            id="currentPassword"
                            name="currentPassword" 
                            value={credentials.currentPassword}
                            onChange={handleCredentialsChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            type="password" 
                            id="newPassword"
                            name="newPassword" 
                            value={credentials.newPassword}
                            onChange={handleCredentialsChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            type="password" 
                            id="confirmPassword"
                            name="confirmPassword" 
                            value={credentials.confirmPassword}
                            onChange={handleCredentialsChange}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Site Settings</h2>
              
              <form onSubmit={handleUpdateSettings} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      type="text" 
                      id="siteName"
                      name="siteName" 
                      value={siteSettingsForm.siteName}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input 
                      type="email" 
                      id="contactEmail"
                      name="contactEmail" 
                      value={siteSettingsForm.contactEmail}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription"
                    name="siteDescription" 
                    value={siteSettingsForm.siteDescription}
                    onChange={handleSettingsChange}
                    rows={3}
                  />
                </div>
                
                <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
                    <Input 
                      type="text" 
                      id="socialLinks.linkedin"
                      name="socialLinks.linkedin" 
                      value={siteSettingsForm.socialLinks.linkedin}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialLinks.github">GitHub</Label>
                    <Input 
                      type="text" 
                      id="socialLinks.github"
                      name="socialLinks.github" 
                      value={siteSettingsForm.socialLinks.github}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialLinks.twitter">Twitter</Label>
                    <Input 
                      type="text" 
                      id="socialLinks.twitter"
                      name="socialLinks.twitter" 
                      value={siteSettingsForm.socialLinks.twitter}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialLinks.behance">Behance</Label>
                    <Input 
                      type="text" 
                      id="socialLinks.behance"
                      name="socialLinks.behance" 
                      value={siteSettingsForm.socialLinks.behance}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="seo.metaTitle">Meta Title</Label>
                    <Input 
                      type="text" 
                      id="seo.metaTitle"
                      name="seo.metaTitle" 
                      value={siteSettingsForm.seo.metaTitle}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo.metaDescription">Meta Description</Label>
                    <Textarea 
                      id="seo.metaDescription"
                      name="seo.metaDescription" 
                      value={siteSettingsForm.seo.metaDescription}
                      onChange={handleSettingsChange}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo.keywords">Keywords</Label>
                    <Input 
                      type="text" 
                      id="seo.keywords"
                      name="seo.keywords" 
                      value={siteSettingsForm.seo.keywords}
                      onChange={handleSettingsChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-4">Google Analytics</h3>
                
                <div className="mb-6">
                  <Label htmlFor="analytics.googleAnalyticsId">Analytics ID</Label>
                  <Input 
                    type="text" 
                    id="analytics.googleAnalyticsId"
                    name="analytics.googleAnalyticsId" 
                    value={siteSettingsForm.analytics.googleAnalyticsId}
                    onChange={handleSettingsChange}
                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                  />
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    disabled={isProcessing}
                    className="flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save Settings</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Website Traffic</h3>
                <p className="text-center py-10 text-gray-500">Analytics features will be implemented soon.</p>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Modals */}
      {renderProjectModal()}
      {renderServiceModal()}
    </div>
  );
};

export default AdminDashboard;
