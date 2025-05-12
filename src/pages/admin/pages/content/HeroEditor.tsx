
import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye } from 'lucide-react';

const HeroEditor = () => {
  const { heroSection, updateHeroSection } = useData();
  const [formData, setFormData] = useState({ ...heroSection });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      updateHeroSection(formData);
      toast.success('Hero section updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating the hero section');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Hero Section</h3>
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
        <Card className="overflow-hidden">
          <div 
            className="h-96 relative flex items-center"
            style={{
              backgroundImage: `url('${formData.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="container relative z-10 text-white p-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {formData.title}
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                  {formData.subtitle}
                </p>
                <div className="flex gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
                    {formData.ctaButton}
                  </button>
                  <button className="border-2 border-white text-white px-6 py-2 rounded-md">
                    {formData.secondaryButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter hero title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter subtitle text"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaButton">Primary Button Text</Label>
                <Input
                  id="ctaButton"
                  name="ctaButton"
                  value={formData.ctaButton}
                  onChange={handleInputChange}
                  placeholder="Primary button text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ctaLink">Primary Button Link</Label>
                <Input
                  id="ctaLink"
                  name="ctaLink"
                  value={formData.ctaLink}
                  onChange={handleInputChange}
                  placeholder="/your-link"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="secondaryButton">Secondary Button Text</Label>
                <Input
                  id="secondaryButton"
                  name="secondaryButton"
                  value={formData.secondaryButton}
                  onChange={handleInputChange}
                  placeholder="Secondary button text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryLink">Secondary Button Link</Label>
                <Input
                  id="secondaryLink"
                  name="secondaryLink"
                  value={formData.secondaryLink}
                  onChange={handleInputChange}
                  placeholder="/your-link"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                name="backgroundImage"
                value={formData.backgroundImage}
                onChange={handleInputChange}
                placeholder="https://..."
              />
              {formData.backgroundImage && (
                <div className="mt-2 h-40 overflow-hidden rounded-md">
                  <img 
                    src={formData.backgroundImage} 
                    alt="Background preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                    }} 
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

export default HeroEditor;
