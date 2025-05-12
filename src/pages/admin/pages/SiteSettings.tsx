
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RefreshCw, Save, AlertTriangle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useData } from '../../../context/DataContext';

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
}

const SiteSettings = () => {
  const { resetToInitialData, clearData } = useData();
  
  // Initialize settings from localStorage or with default values
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      siteName: 'Portfolio Website',
      siteDescription: 'Professional portfolio website showcasing my work and services',
      contactEmail: 'contact@example.com',
      socialLinks: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        behance: 'https://behance.com'
      },
      analytics: {
        googleAnalyticsId: ''
      }
    };
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // In a real app, you would send this data to the server
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      
      toast.success('Site settings updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating site settings');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleResetData = () => {
    try {
      resetToInitialData();
      toast.success('All data has been reset to defaults');
      setIsResetDialogOpen(false);
    } catch (error) {
      toast.error('An error occurred during reset');
      console.error(error);
    }
  };
  
  const handleClearData = () => {
    try {
      clearData();
      toast.success('All data has been cleared');
      setIsClearDialogOpen(false);
    } catch (error) {
      toast.error('An error occurred during data clearing');
      console.error(error);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Site Settings</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
            General
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
            Data Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleSettingsChange}
                      placeholder="Your site name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleSettingsChange}
                      placeholder="Brief description of your site"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={handleSettingsChange}
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.twitter">Twitter</Label>
                      <Input
                        id="socialLinks.twitter"
                        name="socialLinks.twitter"
                        value={settings.socialLinks.twitter}
                        onChange={handleSettingsChange}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
                      <Input
                        id="socialLinks.linkedin"
                        name="socialLinks.linkedin"
                        value={settings.socialLinks.linkedin}
                        onChange={handleSettingsChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.github">GitHub</Label>
                      <Input
                        id="socialLinks.github"
                        name="socialLinks.github"
                        value={settings.socialLinks.github}
                        onChange={handleSettingsChange}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks.behance">Behance</Label>
                      <Input
                        id="socialLinks.behance"
                        name="socialLinks.behance"
                        value={settings.socialLinks.behance}
                        onChange={handleSettingsChange}
                        placeholder="https://behance.net/username"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Analytics</h3>
                  <div className="space-y-2">
                    <Label htmlFor="analytics.googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="analytics.googleAnalyticsId"
                      name="analytics.googleAnalyticsId"
                      value={settings.analytics.googleAnalyticsId}
                      onChange={handleSettingsChange}
                      placeholder="UA-XXXXX-X or G-XXXXXXXX"
                    />
                    <p className="text-sm text-gray-500">
                      Enter your Google Analytics tracking ID to enable website analytics
                    </p>
                  </div>
                </div>
                
                <Button type="submit" disabled={isProcessing} className="w-full md:w-auto">
                  {isProcessing ? 'Saving...' : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        The actions below will affect all your website data. Please proceed with caution.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Reset to Default Data</h3>
                    <p className="text-gray-600">
                      This will reset all your content to the initial demo data. This is useful if you want to start fresh but keep the demo content.
                    </p>
                    <Button 
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setIsResetDialogOpen(true)}
                    >
                      <RefreshCw size={16} />
                      Reset to Default Data
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Clear All Data</h3>
                    <p className="text-gray-600">
                      This will remove all content from your website. Use this if you want to start completely fresh.
                    </p>
                    <Button 
                      variant="destructive"
                      className="w-full gap-2"
                      onClick={() => setIsClearDialogOpen(true)}
                    >
                      <AlertTriangle size={16} />
                      Clear All Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Reset Data Confirmation Dialog */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all your content to the initial demo data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetData}>
              Reset Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Clear Data Confirmation Dialog */}
      <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove ALL content from your website. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleClearData}>
              Delete All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SiteSettings;
