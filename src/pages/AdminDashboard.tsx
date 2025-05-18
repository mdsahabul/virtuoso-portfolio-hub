
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminSidebar from './admin/components/AdminSidebar';
import AdminHeader from './admin/components/AdminHeader';
import DashboardHome from './admin/pages/DashboardHome';
import ProjectsManager from './admin/pages/ProjectsManager';
import ServicesManager from './admin/pages/ServicesManager';
import MessagesManager from './admin/pages/MessagesManager';
import ContentManager from './admin/pages/ContentManager';
import ProfileSettings from './admin/pages/ProfileSettings';
import SiteSettings from './admin/pages/SiteSettings';
import { useData } from '../context/DataContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use our central data store
  const { messages } = useData();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    
    // For development purposes, auto-authenticate
    if (!token) {
      const devToken = 'dev-token-' + Date.now();
      localStorage.setItem('adminToken', devToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-900/10 flex">
      <AdminSidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        unreadMessagesCount={messages.filter(m => !m.read).length} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="p-4 md:p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/projects" element={<ProjectsManager searchQuery={searchQuery} />} />
            <Route path="/services" element={<ServicesManager searchQuery={searchQuery} />} />
            <Route path="/messages" element={<MessagesManager searchQuery={searchQuery} />} />
            <Route path="/content/*" element={<ContentManager />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/settings" element={<SiteSettings />} />
            <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
