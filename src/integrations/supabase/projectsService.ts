
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
    console.log("Fetching projects from Supabase...");
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    console.log("Projects data from Supabase:", data);
    return data.map(mapDbProjectToProject);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    return [];
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    console.log("Creating project in Supabase:", project);
    
    const insertData = {
      title: project.title,
      description: project.description || null,
      category: project.category || null,
      image_url: project.image || null,
      technologies: project.technologies && project.technologies.length > 0 ? project.technologies : null,
      live_url: project.link || null,
      featured: false
    };
    
    console.log("Insert data:", insertData);

    const { data, error } = await supabase
      .from('projects')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      toast.error(`Failed to create project: ${error.message}`);
      return null;
    }

    console.log("Project created successfully:", data);
    toast.success('Project created successfully');
    return mapDbProjectToProject(data);
  } catch (err) {
    console.error('Failed to create project:', err);
    toast.error('An unexpected error occurred while creating project');
    return null;
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
  try {
    console.log("Updating project in Supabase:", id, updates);
    
    const updateData = {
      ...(updates.title && { title: updates.title }),
      ...(updates.description !== undefined && { description: updates.description || null }),
      ...(updates.category !== undefined && { category: updates.category || null }),
      ...(updates.image !== undefined && { image_url: updates.image || null }),
      ...(updates.technologies !== undefined && { technologies: updates.technologies && updates.technologies.length > 0 ? updates.technologies : null }),
      ...(updates.link !== undefined && { live_url: updates.link || null })
    };

    const { error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      toast.error(`Failed to update project: ${error.message}`);
      return false;
    }

    console.log("Project updated successfully");
    toast.success('Project updated successfully');
    return true;
  } catch (err) {
    console.error('Failed to update project:', err);
    toast.error('An unexpected error occurred while updating project');
    return false;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    console.log("Deleting project from Supabase:", id);
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      toast.error(`Failed to delete project: ${error.message}`);
      return false;
    }

    console.log("Project deleted successfully");
    toast.success('Project deleted successfully');
    return true;
  } catch (err) {
    console.error('Failed to delete project:', err);
    toast.error('An unexpected error occurred while deleting project');
    return false;
  }
}
