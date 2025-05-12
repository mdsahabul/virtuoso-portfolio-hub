
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, FileText, Mail, Settings, LogOut, X, 
  Grid, Package, MessageSquare, BarChart, Palette
} from 'lucide-react';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  unreadMessagesCount: number;
}

const AdminSidebar = ({ isSidebarOpen, toggleSidebar, unreadMessagesCount }: AdminSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin-login';
  };

  const menuItems = [
    { id: '', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: Grid },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'content', label: 'Content', icon: Palette },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Site Settings', icon: Settings }
  ];

  return (
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
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPath === item.id || (item.id === '' && currentPath === 'admin-dashboard');
            
            return (
              <Link
                key={item.id}
                to={`/admin-dashboard${item.id ? `/${item.id}` : ''}`}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md transition-colors
                  ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-white hover:bg-blue-700/50 px-4 py-3 rounded-md transition-colors mt-4"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
