
import { RefreshCw, Search, Menu } from 'lucide-react';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AdminHeader = ({ toggleSidebar, isSidebarOpen, searchQuery, setSearchQuery }: AdminHeaderProps) => {
  const adminName = localStorage.getItem('adminName') || 'Admin User';
  
  return (
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
            Admin Dashboard
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
            {adminName}
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {adminName.charAt(0)}
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="relative px-4 pb-4 md:hidden">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <Search size={18} className="absolute left-7 top-2.5 text-gray-400" />
      </div>
    </header>
  );
};

export default AdminHeader;
