
import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Image, Home, User, Contact, LinkIcon, Footer, Settings } from 'lucide-react';
import HeroEditor from './content/HeroEditor';
import AboutEditor from './content/AboutEditor';
import FooterEditor from './content/FooterEditor';
import HeaderEditor from './content/HeaderEditor';
import SeoEditor from './content/SeoEditor';
import ContactPageEditor from './content/ContactPageEditor';

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
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-transparent">
            <TabsTrigger value="hero" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <Home className="mr-2 h-4 w-4" /> Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <User className="mr-2 h-4 w-4" /> About
            </TabsTrigger>
            <TabsTrigger value="header" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <LinkIcon className="mr-2 h-4 w-4" /> Header
            </TabsTrigger>
            <TabsTrigger value="footer" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <Footer className="mr-2 h-4 w-4" /> Footer
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <Contact className="mr-2 h-4 w-4" /> Contact
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
              <Settings className="mr-2 h-4 w-4" /> SEO
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Routes>
          <Route path="/" element={<HeroEditor />} />
          <Route path="/hero" element={<HeroEditor />} />
          <Route path="/about" element={<AboutEditor />} />
          <Route path="/header" element={<HeaderEditor />} />
          <Route path="/footer" element={<FooterEditor />} />
          <Route path="/contact" element={<ContactPageEditor />} />
          <Route path="/seo" element={<SeoEditor />} />
        </Routes>
      </div>
    </div>
  );
};

export default ContentManager;
