
import { Link } from 'react-router-dom';
import { 
  Grid, Package, Mail, FileText, PlusCircle, 
  Settings, Palette, Linkedin, Github, Link as LinkIcon
} from 'lucide-react';
import { useData } from '../../../context/DataContext';

const DashboardHome = () => {
  const { projects, services, messages } = useData();
  
  // Get admin profile from localStorage
  const adminProfile = localStorage.getItem('adminProfile') 
    ? JSON.parse(localStorage.getItem('adminProfile')!)
    : { 
        name: 'Admin User',
        email: 'admin@example.com',
        linkedIn: 'https://linkedin.com',
        github: 'https://github.com',
        behance: 'https://behance.com'
      };

  const unreadMessagesCount = messages.filter(m => !m.read).length;
  
  const stats = [
    { label: 'Projects', value: projects.length, icon: Grid, color: 'bg-blue-500', link: '/admin-dashboard/projects' },
    { label: 'Services', value: services.length, icon: Package, color: 'bg-green-500', link: '/admin-dashboard/services' },
    { label: 'Unread Messages', value: unreadMessagesCount, icon: Mail, color: 'bg-yellow-500', link: '/admin-dashboard/messages' },
    { label: 'Content Sections', value: '5', icon: FileText, color: 'bg-purple-500', link: '/admin-dashboard/content' }
  ];
  
  const quickActions = [
    { label: 'Add Project', icon: PlusCircle, color: 'bg-blue-500', link: '/admin-dashboard/projects' },
    { label: 'Add Service', icon: PlusCircle, color: 'bg-green-500', link: '/admin-dashboard/services' },
    { label: 'Edit Content', icon: Palette, color: 'bg-indigo-500', link: '/admin-dashboard/content' },
    { label: 'Site Settings', icon: Settings, color: 'bg-purple-500', link: '/admin-dashboard/settings' }
  ];

  // Mark a message as read
  const handleMarkAsRead = (id: string) => {
    // This functionality will be handled in the MessagesManager component
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome to your Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <Link
              to={stat.link}
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <StatIcon size={20} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`${action.color} text-white p-3 rounded-full mb-2`}>
                  <ActionIcon size={20} />
                </div>
                <span className="text-sm text-center">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Social Links Preview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Your Social Profiles</h3>
        <div className="flex flex-wrap gap-4">
          <a 
            href={adminProfile.linkedIn} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a 
            href={adminProfile.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a 
            href={adminProfile.behance} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            <LinkIcon size={18} />
            <span>Behance</span>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Unread Messages</h3>
        <div className="space-y-4">
          {messages.filter(m => !m.read).slice(0, 4).map((message) => (
            <div key={message.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
              <div className="truncate pr-4">
                <p className="font-medium">{message.name}</p>
                <p className="text-sm text-gray-500 truncate">{message.subject}</p>
              </div>
              <Link 
                to="/admin-dashboard/messages"
                className="text-sm text-blue-500 hover:text-blue-700 whitespace-nowrap"
              >
                View
              </Link>
            </div>
          ))}
          
          {messages.filter(m => !m.read).length === 0 && (
            <p className="text-gray-500">No unread messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
