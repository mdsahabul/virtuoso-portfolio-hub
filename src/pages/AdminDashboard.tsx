import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Home, User, FileText, Mail, Settings, LogOut, Menu, X, 
  Grid, PlusCircle, Edit, Trash2, Image, Package, MessageSquare,
  BarChart, RefreshCw, Search
} from 'lucide-react';
import { useData } from '../context/DataContext';

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
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // CRUD Functions
  const handleAdd = (type: string) => {
    setCurrentItem({ type });
    setShowAddModal(true);
  };
  
  const handleEdit = (type: string, item: any) => {
    setCurrentItem({ ...item, type });
    setShowEditModal(true);
  };
  
  const handleDelete = (type: string, id: string) => {
    setIsUpdating(true);
    
    setTimeout(() => {
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
      setIsUpdating(false);
    }, 500);
  };
  
  const handleMarkAsRead = (id: string) => {
    markMessageAsRead(id);
    toast.success('Message marked as read');
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
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'analytics', label: 'Analytics', icon: BarChart },
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings }
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
                Admin User
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                A
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
                  { label: 'Total Orders', value: '26', icon: FileText, color: 'bg-purple-500' }
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
                    { label: 'Add Project', icon: PlusCircle, color: 'bg-blue-500', action: () => handleAdd('project') },
                    { label: 'Add Service', icon: PlusCircle, color: 'bg-green-500', action: () => handleAdd('service') },
                    { label: 'View Messages', icon: Mail, color: 'bg-yellow-500', action: () => setActiveTab('messages') },
                    { label: 'Edit Profile', icon: User, color: 'bg-purple-500', action: () => setActiveTab('profile') }
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
              
              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New message received from Sarah Johnson', time: '10 minutes ago' },
                    { action: 'Project "E-commerce Platform" updated', time: '1 hour ago' },
                    { action: 'New service "SEO Optimization" added', time: '3 hours ago' },
                    { action: 'Order #1082 completed', time: 'Yesterday' }
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                      <p>{activity.action}</p>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <button 
                  onClick={() => handleAdd('project')} 
                  className="btn-primary flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add Project</span>
                </button>
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
                                onClick={() => handleEdit('project', project)} 
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete('project', project.id)} 
                                className="text-red-600 hover:text-red-800"
                                disabled={isUpdating}
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
                <button 
                  onClick={() => handleAdd('service')} 
                  className="btn-primary flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Add Service</span>
                </button>
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
                            <div className="font-medium text-gray-900">{service.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">${service.price}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{service.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEdit('service', service)} 
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete('service', service.id)} 
                                className="text-red-600 hover:text-red-800"
                                disabled={isUpdating}
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
              <h2 className="text-2xl font-bold">Messages</h2>
              
              {/* Messages List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="divide-y divide-gray-200">
                  {filteredMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`p-4 hover:bg-gray-50 ${message.read ? '' : 'bg-blue-50'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{message.subject}</h3>
                            {!message.read && (
                              <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">From: {message.name} ({message.email})</p>
                          <p className="text-sm text-gray-800 mt-2">{message.message}</p>
                        </div>
                        <div className="text-xs text-gray-500">{message.date}</div>
                      </div>
                      <div className="flex justify-end mt-3 space-x-2">
                        {!message.read && (
                          <button 
                            onClick={() => handleMarkAsRead(message.id)} 
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete('message', message.id)} 
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                          disabled={isUpdating}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredMessages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No messages found</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Other tabs */}
          {(activeTab === 'profile' || activeTab === 'settings' || activeTab === 'analytics') && (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h2>
              <p className="text-gray-600">
                This section would contain {activeTab} management functionality in a complete application.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Modal would be implemented here */}
      {/* In a complete implementation, we would add form modals for adding/editing projects, services, etc. */}
    </div>
  );
};

export default AdminDashboard;
