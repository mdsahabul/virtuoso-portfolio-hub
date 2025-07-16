import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Certification = Tables<'certifications'>;
export type CertificationInsert = TablesInsert<'certifications'>;
export type CertificationUpdate = TablesUpdate<'certifications'>;

export const certificationsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('issue_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(certification: CertificationInsert) {
    const { data, error } = await supabase
      .from('certifications')
      .insert(certification)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: CertificationUpdate) {
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};