
import { useState } from 'react';
import { 
  PlusCircle, Edit, Trash2, X, Save, Plus,
  Code, Layout, Smartphone, TrendingUp
} from 'lucide-react';
import { useData, Service } from '../../../context/DataContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ServicesManagerProps {
  searchQuery: string;
}

const ServicesManager = ({ searchQuery }: ServicesManagerProps) => {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [serviceForm, setServiceForm] = useState({
    id: '',
    title: '',
    description: '',
    price: 0,
    features: [] as string[],
    featured: false,
    icon: 'code'
  });

  // Feature input
  const [featureInput, setFeatureInput] = useState('');

  // Filter services based on search query
  const filteredServices = searchQuery 
    ? services.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.features && s.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : services;

  const openModal = (mode: 'add' | 'edit', service?: Service) => {
    setModalMode(mode);
    
    if (mode === 'edit' && service) {
      setCurrentService(service);
      setServiceForm({
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        features: service.features || [],
        featured: service.featured,
        icon: service.icon || 'code'
      });
    } else {
      setCurrentService(null);
      setServiceForm({
        id: '',
        title: '',
        description: '',
        price: 0,
        features: [],
        featured: false,
        icon: 'code'
      });
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFeatureInput('');
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setServiceForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (
        name === 'price' ? parseFloat(value) || 0 : value
      )
    }));
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setServiceForm(prev => ({
      ...prev,
      featured: checked
    }));
  };

  // Handle icon selection
  const handleIconSelect = (icon: string) => {
    setServiceForm(prev => ({
      ...prev,
      icon
    }));
  };

  // Feature handlers
  const addFeature = () => {
    if (featureInput && !serviceForm.features.includes(featureInput)) {
      setServiceForm(prev => ({
        ...prev,
        features: [...prev.features, featureInput]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setServiceForm(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form
    if (!serviceForm.title || !serviceForm.description) {
      toast.error('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    try {
      if (modalMode === 'add') {
        // Create new service
        addService({
          title: serviceForm.title,
          description: serviceForm.description,
          price: serviceForm.price,
          featured: serviceForm.featured,
          icon: serviceForm.icon,
          features: serviceForm.features,
        });
        toast.success('Service added successfully');
      } else {
        // Update existing service
        updateService(serviceForm.id, {
          title: serviceForm.title,
          description: serviceForm.description,
          price: serviceForm.price,
          featured: serviceForm.featured,
          icon: serviceForm.icon,
          features: serviceForm.features,
        });
        toast.success('Service updated successfully');
      }
      
      closeModal();
    } catch (error) {
      toast.error('An error occurred while saving the service');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        deleteService(id);
        toast.success('Service deleted successfully');
      } catch (error) {
        toast.error('An error occurred while deleting the service');
        console.error(error);
      }
    }
  };

  // Get icon component based on icon string
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={40} />;
      case 'layout':
        return <Layout size={40} />;
      case 'smartphone':
        return <Smartphone size={40} />;
      case 'trend':
        return <TrendingUp size={40} />;
      default:
        return <Code size={40} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Button 
          onClick={() => openModal('add')}
          className="gap-2"
        >
          <PlusCircle size={16} />
          <span>Add Service</span>
        </Button>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <Card key={service.id} className={`${service.featured ? 'border-blue-500 border-2' : ''}`}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className={`text-blue-500 p-3 rounded-lg bg-blue-50`}>
                  {getIconComponent(service.icon || 'code')}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openModal('edit', service)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-4">{service.title}</h3>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-blue-600">${service.price}</p>
                {service.featured && (
                  <Badge className="ml-2">Featured</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium">Features:</h4>
                <ul className="space-y-1">
                  {service.features && service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => openModal('edit', service)}>
                Edit Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No services found</p>
          <Button
            variant="outline"
            onClick={() => openModal('add')}
            className="mt-4"
          >
            Add Your First Service
          </Button>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{modalMode === 'add' ? 'Add New Service' : 'Edit Service'}</DialogTitle>
            <DialogDescription>
              {modalMode === 'add' 
                ? 'Add a new service to your offerings' 
                : 'Make changes to your service here'
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Service Title<span className="text-red-500">*</span></label>
              <Input
                id="title"
                name="title"
                value={serviceForm.title}
                onChange={handleServiceChange}
                placeholder="Enter service title"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description<span className="text-red-500">*</span></label>
              <Textarea
                id="description"
                name="description"
                value={serviceForm.description}
                onChange={handleServiceChange}
                placeholder="Describe your service"
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">Price ($)<span className="text-red-500">*</span></label>
              <Input
                id="price"
                name="price"
                type="number"
                value={serviceForm.price.toString()}
                onChange={handleServiceChange}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Icon</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'code', component: <Code size={24} /> },
                  { name: 'layout', component: <Layout size={24} /> },
                  { name: 'smartphone', component: <Smartphone size={24} /> },
                  { name: 'trend', component: <TrendingUp size={24} /> }
                ].map((icon) => (
                  <div 
                    key={icon.name}
                    className={`p-3 rounded-md cursor-pointer border-2 ${serviceForm.icon === icon.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => handleIconSelect(icon.name)}
                  >
                    <div className="text-blue-600">
                      {icon.component}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Service</Label>
                <Switch
                  id="featured"
                  checked={serviceForm.featured}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
              <p className="text-sm text-gray-500">Featured services will be highlighted on the services page</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Features</label>
              <div className="flex">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  className="rounded-r-none"
                />
                <Button 
                  type="button" 
                  onClick={addFeature}
                  className="rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {serviceForm.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <X 
                      size={12} 
                      className="cursor-pointer" 
                      onClick={() => removeFeature(feature)}
                    />
                  </Badge>
                ))}
                {serviceForm.features.length === 0 && (
                  <span className="text-sm text-gray-500 italic">No features added yet</span>
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
                    {modalMode === 'add' ? 'Add Service' : 'Save Changes'}
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

export default ServicesManager;
