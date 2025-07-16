import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Experience = Tables<'experiences'>;
export type ExperienceInsert = TablesInsert<'experiences'>;
export type ExperienceUpdate = TablesUpdate<'experiences'>;

export const experiencesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(experience: ExperienceInsert) {
    const { data, error } = await supabase
      .from('experiences')
      .insert(experience)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: ExperienceUpdate) {
    const { data, error } = await supabase
      .from('experiences')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};