
import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Eye } from 'lucide-react';

const ContactPageEditor = () => {
  const { contactPageContent, updateContactPageContent } = useData();
  const [formData, setFormData] = useState({
    title: contactPageContent.title,
    subtitle: contactPageContent.subtitle,
    contactInfo: {
      email: contactPageContent.contactInfo.email,
      phone: contactPageContent.contactInfo.phone,
      address: contactPageContent.contactInfo.address
    },
    mapLocation: contactPageContent.mapLocation
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      updateContactPageContent(formData);
      toast.success('Contact page content updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating the contact page');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Contact Page Content</h3>
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">{formData.title}</h2>
                <p className="text-gray-600">{formData.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Contact Form</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input placeholder="Your name" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input placeholder="Your email" />
                      </div>
                      <div>
                        <Label>Message</Label>
                        <Textarea placeholder="Your message" rows={5} />
                      </div>
                      <Button>Send Message</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-2">
                      <p><strong>Email:</strong> {formData.contactInfo.email}</p>
                      <p><strong>Phone:</strong> {formData.contactInfo.phone}</p>
                      <p><strong>Address:</strong> {formData.contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                    <div className="rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
                      {formData.mapLocation ? (
                        <iframe 
                          src={formData.mapLocation} 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={false} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps"
                        />
                      ) : (
                        <span className="text-gray-500">Map Location Not Set</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Page Subtitle</Label>
              <Textarea
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter subtitle text"
                rows={2}
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactInfo.email">Email</Label>
                  <Input
                    id="contactInfo.email"
                    name="contactInfo.email"
                    value={formData.contactInfo.email}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactInfo.phone">Phone</Label>
                  <Input
                    id="contactInfo.phone"
                    name="contactInfo.phone"
                    value={formData.contactInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactInfo.address">Address</Label>
                <Input
                  id="contactInfo.address"
                  name="contactInfo.address"
                  value={formData.contactInfo.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, Country"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mapLocation">Google Maps Embed URL</Label>
              <Textarea
                id="mapLocation"
                name="mapLocation"
                value={formData.mapLocation}
                onChange={handleInputChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                rows={3}
              />
              <p className="text-xs text-gray-500">
                Paste the embed URL from Google Maps (iframe src attribute)
              </p>
              
              {formData.mapLocation && (
                <div className="mt-4 rounded-lg overflow-hidden h-64">
                  <iframe 
                    src={formData.mapLocation} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  />
                </div>
              )}
            </div>
            
            <Button type="submit" disabled={isProcessing} className="w-full md:w-auto">
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

export default ContactPageEditor;
