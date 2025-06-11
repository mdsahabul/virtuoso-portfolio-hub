
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
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    return data.map(mapDbServiceToService);
  } catch (err) {
    console.error('Failed to fetch services:', err);
    return [];
  }
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([{
        title: service.title,
        description: service.description,
        icon_name: service.icon,
        price: service.price,
        featured: service.featured
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      toast.error('Failed to create service');
      return null;
    }

    toast.success('Service created successfully');
    return mapDbServiceToService(data);
  } catch (err) {
    console.error('Failed to create service:', err);
    toast.error('An unexpected error occurred');
    return null;
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services')
      .update({
        title: updates.title,
        description: updates.description,
        icon_name: updates.icon,
        price: updates.price,
        featured: updates.featured
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
      return false;
    }

    toast.success('Service updated successfully');
    return true;
  } catch (err) {
    console.error('Failed to update service:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
      return false;
    }

    toast.success('Service deleted successfully');
    return true;
  } catch (err) {
    console.error('Failed to delete service:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
}
