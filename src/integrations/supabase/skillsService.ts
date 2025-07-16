import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Skill = Tables<'skills'>;
export type SkillInsert = TablesInsert<'skills'>;
export type SkillUpdate = TablesUpdate<'skills'>;

export const skillsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(skill: SkillInsert) {
    const { data, error } = await supabase
      .from('skills')
      .insert(skill)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: SkillUpdate) {
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};