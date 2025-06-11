
import { useState } from 'react';
import { 
  PlusCircle, Edit, Trash2, Image, X, 
  Save, Plus, Search, Eye, ExternalLink 
} from 'lucide-react';
import { useData, Project } from '../../../context/DataContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ProjectsManagerProps {
  searchQuery: string;
}

const ProjectsManager = ({ searchQuery }: ProjectsManagerProps) => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [projectForm, setProjectForm] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    image: '',
    technologies: [] as string[],
    link: ''
  });

  // Technology input
  const [techInput, setTechInput] = useState('');

  // Filter projects based on search query
  const filteredProjects = searchQuery 
    ? projects.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : projects;

  const openModal = (mode: 'add' | 'edit', project?: Project) => {
    setModalMode(mode);
    
    if (mode === 'edit' && project) {
      setCurrentProject(project);
      setProjectForm({
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        technologies: [...project.technologies],
        link: project.link || ''
      });
    } else {
      setCurrentProject(null);
      setProjectForm({
        id: '',
        title: '',
        category: '',
        description: '',
        image: '',
        technologies: [],
        link: ''
      });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTechInput('');
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  // Technology handlers
  const addTechnology = () => {
    if (techInput && !projectForm.technologies.includes(techInput)) {
      setProjectForm(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form
    if (!projectForm.title || !projectForm.category || !projectForm.description) {
      toast.error('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      console.log("Submitting project form:", projectForm);
      
      if (modalMode === 'add') {
        // Create new project
        console.log("Creating new project...");
        await addProject({
          title: projectForm.title,
          category: projectForm.category,
          description: projectForm.description,
          image: projectForm.image,
          technologies: projectForm.technologies,
          link: projectForm.link,
        });
        console.log("Project creation completed");
      } else {
        // Update existing project
        console.log("Updating existing project...");
        await updateProject(projectForm.id, {
          title: projectForm.title,
          category: projectForm.category,
          description: projectForm.description,
          image: projectForm.image,
          technologies: projectForm.technologies,
          link: projectForm.link,
        });
        console.log("Project update completed");
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        console.log("Deleting project:", id);
        await deleteProject(id);
        console.log("Project deletion completed");
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Button 
          onClick={() => openModal('add')}
          className="gap-2"
        >
          <PlusCircle size={16} />
          <span>Add Project</span>
        </Button>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="h-48 bg-gray-200 relative flex items-center justify-center overflow-hidden"
              style={project.image ? { backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {!project.image && (
                <Image size={32} className="text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => openModal('edit', project)}
                  className="p-2 bg-white rounded-full text-gray-800 hover:bg-blue-100"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 bg-white rounded-full text-gray-800 hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-gray-800 hover:bg-green-100"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <Badge variant="outline">{project.category}</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No projects found</p>
          <Button
            variant="outline"
            onClick={() => openModal('add')}
            className="mt-4"
          >
            Add Your First Project
          </Button>
        </div>
      )}

      {/* Add/Edit Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{modalMode === 'add' ? 'Add New Project' : 'Edit Project'}</DialogTitle>
            <DialogDescription>
              {modalMode === 'add' 
                ? 'Add a new project to your portfolio' 
                : 'Make changes to your project here'
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Project Title<span className="text-red-500">*</span></label>
              <Input
                id="title"
                name="title"
                value={projectForm.title}
                onChange={handleProjectChange}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category<span className="text-red-500">*</span></label>
              <Input
                id="category"
                name="category"
                value={projectForm.category}
                onChange={handleProjectChange}
                placeholder="e.g., Web Development, UI/UX, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL</label>
              <Input
                id="image"
                name="image"
                value={projectForm.image}
                onChange={handleProjectChange}
                placeholder="Enter image URL"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description<span className="text-red-500">*</span></label>
              <Textarea
                id="description"
                name="description"
                value={projectForm.description}
                onChange={handleProjectChange}
                placeholder="Describe your project"
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="link" className="text-sm font-medium">Project Link</label>
              <Input
                id="link"
                name="link"
                value={projectForm.link}
                onChange={handleProjectChange}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies</label>
              <div className="flex">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add a technology"
                  className="rounded-r-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={addTechnology}
                  className="rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {projectForm.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X 
                      size={12} 
                      className="cursor-pointer" 
                      onClick={() => removeTechnology(tech)}
                    />
                  </Badge>
                ))}
                {projectForm.technologies.length === 0 && (
                  <span className="text-sm text-gray-500 italic">No technologies added yet</span>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? 'Saving...' : (
                  <>
                    <Save size={16} className="mr-2" />
                    {modalMode === 'add' ? 'Add Project' : 'Save Changes'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsManager;
