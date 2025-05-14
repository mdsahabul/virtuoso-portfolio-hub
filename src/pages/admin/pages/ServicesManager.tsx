
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '../../../components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '../../../components/ui/card';
import { useData, Service } from '../../../context/DataContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../../components/ui/alert-dialog';

interface FormValues {
  title: string;
  description: string;
  icon: string;
  price: string;
  featured: boolean;
  features: string;
}

const ServicesManager = ({ searchQuery }: { searchQuery: string }) => {
  const { services, addService, updateService, deleteService } = useData();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>();
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = services.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [searchQuery, services]);
  
  const handleAdd = (data: FormValues) => {
    // Convert features from comma-separated string to array
    const featuresArray = data.features
      ? data.features.split(',').map(feature => feature.trim())
      : [];
      
    addService({
      title: data.title,
      description: data.description,
      icon: data.icon,
      price: parseFloat(data.price),
      featured: data.featured,
      features: featuresArray
    });
    
    // Close dialog and reset form
    setIsAddDialogOpen(false);
    reset();
  };
  
  const handleEdit = (data: FormValues) => {
    if (!currentService) return;
    
    // Convert features from comma-separated string to array
    const featuresArray = data.features
      ? data.features.split(',').map(feature => feature.trim())
      : [];
    
    updateService(currentService.id, {
      title: data.title,
      description: data.description,
      icon: data.icon,
      price: parseFloat(data.price),
      featured: data.featured,
      features: featuresArray
    });
    
    // Close dialog and reset
    setIsEditDialogOpen(false);
    setCurrentService(null);
    reset();
  };
  
  const handleDelete = () => {
    if (!currentService) return;
    
    deleteService(currentService.id);
    
    // Close dialog and reset
    setIsDeleteDialogOpen(false);
    setCurrentService(null);
  };
  
  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    
    // Populate form fields
    setValue('title', service.title);
    setValue('description', service.description);
    setValue('icon', service.icon);
    setValue('price', service.price.toString());
    setValue('featured', service.featured);
    setValue('features', service.features ? service.features.join(', ') : '');
    
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Services Management</CardTitle>
            <CardDescription>
              Manage the services you offer to clients.
            </CardDescription>
          </div>
          <Button onClick={() => {
            reset(); // Reset form
            setIsAddDialogOpen(true);
          }}>
            Add New Service
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>${service.price.toFixed(2)}</TableCell>
                    <TableCell>{service.featured ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(service)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(service)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    {searchQuery ? 'No services match your search.' : 'No services found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAdd)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g. Web Development"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                {...register('description', { required: 'Description is required' })}
                placeholder="Describe the service you offer..."
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name</Label>
              <Input 
                id="icon"
                {...register('icon', { required: 'Icon is required' })}
                placeholder="e.g. code, layout, settings"
              />
              <p className="text-xs text-gray-500">Use icon names from Lucide React (e.g., code, layout, settings)</p>
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price"
                type="number"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                })}
                placeholder="1000"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Textarea 
                id="features"
                {...register('features')}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
              <p className="text-xs text-gray-500">Enter features separated by commas</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="featured" {...register('featured')} />
              <Label htmlFor="featured">Featured Service</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Service
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-icon">Icon Name</Label>
              <Input 
                id="edit-icon"
                {...register('icon', { required: 'Icon is required' })}
              />
              <p className="text-xs text-gray-500">Use icon names from Lucide React</p>
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input 
                id="edit-price"
                type="number"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                })}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-features">Features</Label>
              <Textarea 
                id="edit-features"
                {...register('features')}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
              <p className="text-xs text-gray-500">Enter features separated by commas</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="edit-featured" {...register('featured')} />
              <Label htmlFor="edit-featured">Featured Service</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete the service "{currentService?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesManager;
