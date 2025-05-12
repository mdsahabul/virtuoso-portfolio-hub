
import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AboutEditor = () => {
  const { aboutSection, updateAboutSection } = useData();
  const [formData, setFormData] = useState({ ...aboutSection });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // For handling the description paragraphs and skills
  const [descriptionInput, setDescriptionInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addDescription = () => {
    if (descriptionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        description: [...prev.description, descriptionInput.trim()]
      }));
      setDescriptionInput('');
    }
  };
  
  const removeDescription = (index: number) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index)
    }));
  };
  
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    } else if (skillInput.trim() && formData.skills.includes(skillInput.trim())) {
      toast.error('Skill already exists');
    }
  };
  
  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      updateAboutSection(formData);
      toast.success('About section updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating the about section');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">About Section</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={formData.image || 'https://via.placeholder.com/400x400?text=About+Image'} 
                  alt="About" 
                  className="rounded-lg w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Invalid+Image+URL';
                  }}
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{formData.title}</h2>
                {formData.description.map((para, i) => (
                  <p key={i} className="text-gray-600">{para}</p>
                ))}
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter section title"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Description Paragraphs</Label>
              <div className="space-y-2 mb-2">
                {formData.description.map((para, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Textarea
                      value={para}
                      readOnly
                      className="flex-grow"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDescription(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Textarea
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  placeholder="Add a new paragraph"
                  className="flex-grow"
                />
                <Button
                  type="button"
                  onClick={addDescription}
                  className="mt-auto"
                  size="sm"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
              />
              {formData.image && (
                <div className="mt-2 h-40 overflow-hidden rounded-md">
                  <img 
                    src={formData.image} 
                    alt="About preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-1 mb-2">
                {formData.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      size={12} 
                      className="cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
                {formData.skills.length === 0 && (
                  <span className="text-sm text-gray-500 italic">No skills added yet</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-grow"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                >
                  <Plus size={16} />
                </Button>
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

export default AboutEditor;
