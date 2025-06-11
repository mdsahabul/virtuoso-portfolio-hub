
import { supabase } from './client';
import { Project } from '../../types/appTypes';
import { toast } from 'sonner';

export interface DbProject {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  technologies: string[] | null;
  live_url: string | null;
  repo_url: string | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export function mapDbProjectToProject(dbProject: DbProject): Project {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description || '',
    category: dbProject.category || '',
    image: dbProject.image_url || '',
    technologies: dbProject.technologies || [],
    link: dbProject.live_url || undefined
  };
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data.map(mapDbProjectToProject);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    return [];
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        description: project.description,
        category: project.category,
        image_url: project.image,
        technologies: project.technologies,
        live_url: project.link,
        featured: false
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      return null;
    }

    toast.success('Project created successfully');
    return mapDbProjectToProject(data);
  } catch (err) {
    console.error('Failed to create project:', err);
    toast.error('An unexpected error occurred');
    return null;
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .update({
        title: updates.title,
        description: updates.description,
        category: updates.category,
        image_url: updates.image,
        technologies: updates.technologies,
        live_url: updates.link
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      return false;
    }

    toast.success('Project updated successfully');
    return true;
  } catch (err) {
    console.error('Failed to update project:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      return false;
    }

    toast.success('Project deleted successfully');
    return true;
  } catch (err) {
    console.error('Failed to delete project:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
}
