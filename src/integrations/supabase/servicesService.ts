
import { supabase } from './client';
import { Service } from '../../types/appTypes';
import { toast } from 'sonner';

export interface DbService {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  price: number | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export function mapDbServiceToService(dbService: DbService): Service {
  return {
    id: dbService.id,
    title: dbService.title,
    description: dbService.description || '',
    icon: dbService.icon_name || 'help-circle',
    price: dbService.price || 0,
    featured: dbService.featured || false,
    features: [] // Default empty array since features aren't stored in DB yet
  };
}

export async function fetchServices(): Promise<Service[]> {
  try {
    console.log("Fetching services from Supabase...");
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    console.log("Services data from Supabase:", data);
    return data.map(mapDbServiceToService);
  } catch (err) {
    console.error('Failed to fetch services:', err);
    return [];
  }
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service | null> {
  try {
    console.log("Creating service in Supabase:", service);
    
    const insertData = {
      title: service.title,
      description: service.description || null,
      icon_name: service.icon || null,
      price: service.price || 0,
      featured: service.featured || false
    };
    
    console.log("Insert data:", insertData);

    const { data, error } = await supabase
      .from('services')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      toast.error(`Failed to create service: ${error.message}`);
      return null;
    }

    console.log("Service created successfully:", data);
    toast.success('Service created successfully');
    return mapDbServiceToService(data);
  } catch (err) {
    console.error('Failed to create service:', err);
    toast.error('An unexpected error occurred while creating service');
    return null;
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<boolean> {
  try {
    console.log("Updating service in Supabase:", id, updates);
    
    const updateData = {
      ...(updates.title && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description || null }),
      ...(updates.icon !== undefined && { icon_name: updates.icon || null }),
      ...(updates.price !== undefined && { price: updates.price || 0 }),
      ...(updates.featured !== undefined && { featured: updates.featured || false })
    };

    const { error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating service:', error);
      toast.error(`Failed to update service: ${error.message}`);
      return false;
    }

    console.log("Service updated successfully");
    toast.success('Service updated successfully');
    return true;
  } catch (err) {
    console.error('Failed to update service:', err);
    toast.error('An unexpected error occurred while updating service');
    return false;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    console.log("Deleting service from Supabase:", id);
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      toast.error(`Failed to delete service: ${error.message}`);
      return false;
    }

    console.log("Service deleted successfully");
    toast.success('Service deleted successfully');
    return true;
  } catch (err) {
    console.error('Failed to delete service:', err);
    toast.error('An unexpected error occurred while deleting service');
    return false;
  }
}
