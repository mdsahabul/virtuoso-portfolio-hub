import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Eye, Plus, X, Twitter, Linkedin, Github } from 'lucide-react';
import { FooterContent, MenuItem } from '@/types/appTypes';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Define a state interface that matches our form structure
interface FooterEditorState {
  logo: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  copyrightText: string;
  menuItems: MenuItem[];
  socialLinks: SocialLink[];
}

const FooterEditor = () => {
  const { footerContent, updateFooterContent } = useData();
  const [formData, setFormData] = useState<FooterEditorState>({
    logo: footerContent.logo,
    description: footerContent.description,
    contactEmail: footerContent.contactEmail,
    contactPhone: footerContent.contactPhone,
    address: footerContent.address,
    copyrightText: footerContent.copyrightText,
    menuItems: [...footerContent.menuItems],
    socialLinks: Object.entries(footerContent.socialLinks).map(([platform, url]) => ({
      platform,
      url,
      icon: platform.toLowerCase()
    }))
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // For adding new quick links
  const [quickLinkTitle, setQuickLinkTitle] = useState('');
  const [quickLinkUrl, setQuickLinkUrl] = useState('');
  
  // For adding new social links
  const [socialPlatform, setSocialPlatform] = useState('');
  const [socialUrl, setSocialUrl] = useState('');
  const [socialIcon, setSocialIcon] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addQuickLink = () => {
    if (quickLinkTitle.trim() && quickLinkUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        menuItems: [...prev.menuItems, { title: quickLinkTitle.trim(), url: quickLinkUrl.trim() }]
      }));
      setQuickLinkTitle('');
      setQuickLinkUrl('');
    } else {
      toast.error('Both title and URL are required for quick links');
    }
  };
  
  const removeQuickLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index)
    }));
  };
  
  const addSocialLink = () => {
    if (socialPlatform.trim() && socialUrl.trim() && socialIcon.trim()) {
      setFormData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { 
          platform: socialPlatform.trim(), 
          url: socialUrl.trim(),
          icon: socialIcon.trim()
        }]
      }));
      setSocialPlatform('');
      setSocialUrl('');
      setSocialIcon('');
    } else {
      toast.error('Platform, URL and icon are required for social links');
    }
  };
  
  const removeSocialLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };
  
  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'twitter':
        return <Twitter size={16} />;
      case 'linkedin':
        return <Linkedin size={16} />;
      case 'github':
        return <Github size={16} />;
      default:
        return iconName;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Convert the form data to match the FooterContent interface
      const socialLinksObj: Record<string, string> = {};
      formData.socialLinks.forEach(link => {
        socialLinksObj[link.platform] = link.url;
      });
      
      const updatedFooterContent: FooterContent = {
        logo: formData.logo,
        description: formData.description,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        address: formData.address,
        menuItems: formData.menuItems,
        copyrightText: formData.copyrightText,
        socialLinks: {
          facebook: socialLinksObj.facebook || footerContent.socialLinks.facebook,
          twitter: socialLinksObj.twitter || footerContent.socialLinks.twitter,
          instagram: socialLinksObj.instagram || footerContent.socialLinks.instagram,
          linkedin: socialLinksObj.linkedin || footerContent.socialLinks.linkedin
        }
      };
      
      updateFooterContent(updatedFooterContent);
      toast.success('Footer content updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating the footer');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Footer Content</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPreviewMode(!previewMode)}
          className="gap-2"
        >
          <Eye size={16} />
          {previewMode ? 'Edit Mode' : 'Preview'}
        </Button>
      </div>
      
      {previewMode ? (
        <Card>
          <CardContent className="p-6">
            <div className="bg-blue-900 text-white p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {formData.menuItems.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} className="hover:text-blue-300">{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <address className="not-italic">
                    <div className="mb-2">Email: {formData.contactEmail}</div>
                    <div className="mb-2">Phone: {formData.contactPhone}</div>
                    <div>{formData.address}</div>
                  </address>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    {formData.socialLinks.map((social, i) => (
                      <a 
                        key={i} 
                        href={social.url} 
                        className="hover:text-blue-300"
                        aria-label={social.platform}
                      >
                        {getSocialIcon(social.icon)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-blue-800 text-center">
                {formData.copyrightText}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="copyrightText">Copyright Text</Label>
              <Input
                id="copyrightText"
                name="copyrightText"
                value={formData.copyrightText}
                onChange={handleInputChange}
                placeholder="© 2023 Your Company. All rights reserved."
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, Country"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Quick Links</h4>
              <div className="space-y-2">
                {formData.menuItems.map((link, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md border">
                    <div className="grid grid-cols-2 gap-2 flex-grow">
                      <Input
                        value={link.title}
                        readOnly
                        placeholder="Title"
                      />
                      <Input
                        value={link.url}
                        readOnly
                        placeholder="URL"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuickLink(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
                <div className="space-y-2">
                  <Label htmlFor="quickLinkTitle">Link Title</Label>
                  <Input
                    id="quickLinkTitle"
                    value={quickLinkTitle}
                    onChange={(e) => setQuickLinkTitle(e.target.value)}
                    placeholder="e.g., Home, About, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quickLinkUrl">URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="quickLinkUrl"
                      value={quickLinkUrl}
                      onChange={(e) => setQuickLinkUrl(e.target.value)}
                      placeholder="e.g., /, /about, etc."
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={addQuickLink}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Social Links</h4>
              <div className="space-y-2">
                {formData.socialLinks.map((social, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md border">
                    <div className="grid grid-cols-3 gap-2 flex-grow">
                      <Input
                        value={social.platform}
                        readOnly
                        placeholder="Platform"
                      />
                      <Input
                        value={social.url}
                        readOnly
                        placeholder="URL"
                      />
                      <Input
                        value={social.icon}
                        readOnly
                        placeholder="Icon"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSocialLink(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
                <div className="space-y-2">
                  <Label htmlFor="socialPlatform">Platform</Label>
                  <Input
                    id="socialPlatform"
                    value={socialPlatform}
                    onChange={(e) => setSocialPlatform(e.target.value)}
                    placeholder="e.g., Twitter, LinkedIn"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="socialUrl">URL</Label>
                  <Input
                    id="socialUrl"
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="socialIcon">Icon Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="socialIcon"
                      value={socialIcon}
                      onChange={(e) => setSocialIcon(e.target.value)}
                      placeholder="e.g., twitter, linkedin"
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={addSocialLink}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Button type="submit" disabled={isProcessing} className="w-full md:w-auto mt-4">
              {isProcessing ? 'Saving...' : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default FooterEditor;
