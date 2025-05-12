
import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Eye, Plus, X, ArrowRightLeft } from 'lucide-react';

const HeaderEditor = () => {
  const { headerContent, updateHeaderContent } = useData();
  const [formData, setFormData] = useState({ ...headerContent });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // For adding new menu items
  const [menuItemTitle, setMenuItemTitle] = useState('');
  const [menuItemUrl, setMenuItemUrl] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addMenuItem = () => {
    if (menuItemTitle.trim() && menuItemUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        menuItems: [...prev.menuItems, { title: menuItemTitle.trim(), url: menuItemUrl.trim() }]
      }));
      setMenuItemTitle('');
      setMenuItemUrl('');
    } else {
      toast.error('Both title and URL are required');
    }
  };
  
  const removeMenuItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index)
    }));
  };

  const moveMenuItem = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === formData.menuItems.length - 1)) {
      return;
    }
    
    const newItems = [...formData.menuItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    
    setFormData(prev => ({
      ...prev,
      menuItems: newItems
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      updateHeaderContent(formData);
      toast.success('Header content updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating the header');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Header Content</h3>
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
            <div className="bg-white py-4 px-6 rounded-lg shadow-sm flex items-center justify-between">
              <div className="font-bold text-xl">{formData.logo}</div>
              <div className="hidden md:flex items-center space-x-8">
                {formData.menuItems.map((item, i) => (
                  <a key={i} href={item.url} className="text-blue-600 hover:text-blue-800 font-medium">
                    {item.title}
                  </a>
                ))}
              </div>
              <button className="md:hidden text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Text</Label>
              <Input
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="Enter logo text"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Navigation Menu Items</Label>
              <div className="space-y-2 mb-4">
                {formData.menuItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md border">
                    <div className="flex-grow grid grid-cols-2 gap-2">
                      <Input
                        value={item.title}
                        readOnly
                        placeholder="Title"
                      />
                      <Input
                        value={item.url}
                        readOnly
                        placeholder="URL"
                      />
                    </div>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveMenuItem(i, 'up')}
                        disabled={i === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveMenuItem(i, 'down')}
                        disabled={i === formData.menuItems.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMenuItem(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
                <div className="space-y-2">
                  <Label htmlFor="menuItemTitle">New Menu Item Title</Label>
                  <Input
                    id="menuItemTitle"
                    value={menuItemTitle}
                    onChange={(e) => setMenuItemTitle(e.target.value)}
                    placeholder="e.g., Home, About, etc."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="menuItemUrl">URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="menuItemUrl"
                      value={menuItemUrl}
                      onChange={(e) => setMenuItemUrl(e.target.value)}
                      placeholder="e.g., /, /about, etc."
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      onClick={addMenuItem}
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

export default HeaderEditor;
