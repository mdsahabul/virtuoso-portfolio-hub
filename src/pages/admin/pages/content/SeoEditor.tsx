
import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SeoEditor = () => {
  const { seoSettings, updateSeoSettings } = useData();
  const [formData, setFormData] = useState({ ...seoSettings });
  const [isProcessing, setIsProcessing] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    } else if (keywordInput.trim() && formData.keywords.includes(keywordInput.trim())) {
      toast.error('Keyword already exists');
    }
  };
  
  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      updateSeoSettings(formData);
      toast.success('SEO settings updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating SEO settings');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">SEO Settings</h3>
        <p className="text-sm text-gray-500 mt-1">
          Optimize your website for search engines
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              name="siteTitle"
              value={formData.siteTitle}
              onChange={handleInputChange}
              placeholder="Enter site title"
            />
            <p className="text-xs text-gray-500">
              The title that appears in search engine results and browser tabs
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Meta Description</Label>
            <Textarea
              id="siteDescription"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleInputChange}
              placeholder="Enter site description"
              rows={3}
            />
            <p className="text-xs text-gray-500">
              A short description of your site (150-160 characters recommended)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Keywords</Label>
            <div className="flex flex-wrap gap-1 mb-2">
              {formData.keywords.map((keyword, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                  {keyword}
                  <X 
                    size={12} 
                    className="cursor-pointer" 
                    onClick={() => removeKeyword(keyword)}
                  />
                </Badge>
              ))}
              {formData.keywords.length === 0 && (
                <span className="text-sm text-gray-500 italic">No keywords added yet</span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Add a keyword"
                className="flex-grow"
              />
              <Button
                type="button"
                onClick={addKeyword}
              >
                <Plus size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Keywords help search engines understand your content
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ogImage">Open Graph Image URL</Label>
            <Input
              id="ogImage"
              name="ogImage"
              value={formData.ogImage}
              onChange={handleInputChange}
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500">
              This image appears when your site is shared on social media
            </p>
            {formData.ogImage && (
              <div className="mt-2 h-40 overflow-hidden rounded-md">
                <img 
                  src={formData.ogImage} 
                  alt="OG Image preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                  }} 
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="favicon">Favicon URL</Label>
            <Input
              id="favicon"
              name="favicon"
              value={formData.favicon}
              onChange={handleInputChange}
              placeholder="/favicon.ico"
            />
            <p className="text-xs text-gray-500">
              The small icon that appears in browser tabs
            </p>
          </div>
          
          <Button type="submit" disabled={isProcessing} className="w-full md:w-auto mt-4">
            {isProcessing ? 'Saving...' : (
              <>
                <Save size={16} className="mr-2" />
                Save SEO Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SeoEditor;
