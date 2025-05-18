
import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, Image, Home, User, Contact, LinkIcon, 
  LayoutIcon, Settings, MessageSquare 
} from 'lucide-react';
import HeroEditor from './content/HeroEditor';
import AboutEditor from './content/AboutEditor';
import FooterEditor from './content/FooterEditor';
import HeaderEditor from './content/HeaderEditor';
import SeoEditor from './content/SeoEditor';
import ContactPageEditor from './content/ContactPageEditor';
import ReviewsEditor from './content/ReviewsEditor';

const ContentManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin-dashboard/content/${value}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Content Management</h2>
        
        <Tabs defaultValue="hero" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-blue-900/30">
            <TabsTrigger value="hero" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Home className="mr-2 h-4 w-4" /> Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <User className="mr-2 h-4 w-4" /> About
            </TabsTrigger>
            <TabsTrigger value="header" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <LinkIcon className="mr-2 h-4 w-4" /> Header
            </TabsTrigger>
            <TabsTrigger value="footer" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <LayoutIcon className="mr-2 h-4 w-4" /> Footer
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Contact className="mr-2 h-4 w-4" /> Contact
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <MessageSquare className="mr-2 h-4 w-4" /> Reviews
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Settings className="mr-2 h-4 w-4" /> SEO
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/30 p-6 rounded-lg shadow-md">
        <Routes>
          <Route path="/" element={<HeroEditor />} />
          <Route path="/hero" element={<HeroEditor />} />
          <Route path="/about" element={<AboutEditor />} />
          <Route path="/header" element={<HeaderEditor />} />
          <Route path="/footer" element={<FooterEditor />} />
          <Route path="/contact" element={<ContactPageEditor />} />
          <Route path="/reviews" element={<ReviewsEditor />} />
          <Route path="/seo" element={<SeoEditor />} />
        </Routes>
      </div>
    </div>
  );
};

export default ContentManager;
