
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Home, User, FileText, Mail, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

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
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'messages', label: 'Messages', icon: Mail },
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
        <header className="bg-white shadow">
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
              <div className="text-sm font-medium text-gray-700">
                Admin User
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Welcome to your Admin Dashboard</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Pages', value: '12' },
                  { label: 'Blog Posts', value: '24' },
                  { label: 'Portfolio Items', value: '8' },
                  { label: 'Messages', value: '18' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New message received', time: '10 minutes ago' },
                    { action: 'Portfolio item updated', time: '1 hour ago' },
                    { action: 'New service added', time: '3 hours ago' },
                    { action: 'Blog post published', time: 'Yesterday' }
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                      <p>{activity.action}</p>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-gray-600 text-sm pt-4">
                <p>This is a basic admin dashboard. In a real application, this would connect to your backend.</p>
              </div>
            </div>
          )}
          
          {activeTab !== 'dashboard' && (
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
    </div>
  );
};

export default AdminDashboard;
