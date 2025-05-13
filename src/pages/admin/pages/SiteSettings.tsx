
import { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';

interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

interface AnalyticsSettings {
  googleAnalyticsId: string;
  enableTracking: boolean;
}

interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: SocialLinks;
  analytics: AnalyticsSettings;
  appearance: AppearanceSettings;
}

const SiteSettings = () => {
  // Use default values since we don't have siteSettings in the DataContext yet
  const { seoSettings, updateSeoSettings } = useData();
  
  const defaultSettings: SiteSettings = {
    siteName: seoSettings.siteTitle || "My Website",
    siteDescription: seoSettings.siteDescription || "A professional website",
    contactEmail: "contact@example.com",
    contactPhone: "+1 (123) 456-7890",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    },
    analytics: {
      googleAnalyticsId: "",
      enableTracking: false
    },
    appearance: {
      primaryColor: "#3b82f6",
      secondaryColor: "#10b981",
      fontFamily: "Inter, sans-serif"
    }
  };
  
  const [formData, setFormData] = useState<SiteSettings>(defaultSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof SiteSettings] as object),
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update SEO settings since it's available in the context
      await updateSeoSettings({
        siteTitle: formData.siteName,
        siteDescription: formData.siteDescription,
        keywords: seoSettings.keywords,
        ogImage: seoSettings.ogImage,
        favicon: seoSettings.favicon
      });
      
      toast.success("Site settings updated successfully!");
    } catch (error) {
      console.error("Error updating site settings:", error);
      toast.error("Failed to update site settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Settings</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription"
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input 
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input 
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableTracking">Enable Analytics Tracking</Label>
                <Switch 
                  id="enableTracking"
                  name="analytics.enableTracking"
                  checked={formData.analytics.enableTracking}
                  onCheckedChange={(checked) => {
                    setFormData(prev => ({
                      ...prev,
                      analytics: {
                        ...prev.analytics,
                        enableTracking: checked
                      }
                    }))
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input 
                  id="googleAnalyticsId"
                  name="analytics.googleAnalyticsId"
                  value={formData.analytics.googleAnalyticsId}
                  onChange={handleInputChange}
                  disabled={!formData.analytics.enableTracking}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="primaryColor"
                      name="appearance.primaryColor"
                      type="color"
                      value={formData.appearance.primaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-9 p-1"
                    />
                    <Input 
                      type="text"
                      value={formData.appearance.primaryColor}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            primaryColor: e.target.value
                          }
                        }))
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="secondaryColor"
                      name="appearance.secondaryColor"
                      type="color"
                      value={formData.appearance.secondaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-9 p-1"
                    />
                    <Input 
                      type="text"
                      value={formData.appearance.secondaryColor}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          appearance: {
                            ...prev.appearance,
                            secondaryColor: e.target.value
                          }
                        }))
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Input 
                    id="fontFamily"
                    name="appearance.fontFamily"
                    value={formData.appearance.fontFamily}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
