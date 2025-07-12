import { supabase } from './client';

export interface UserRole {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  assigned_by: string | null;
  created_at: string;
  updated_at: string;
}

export const userRolesService = {
  // Get all user roles
  async getUserRoles() {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as UserRole[];
  },

  // Add a new user role
  async addUserRole(email: string, role: 'admin' | 'moderator', assignedBy: string) {
    const { data, error } = await supabase
      .from('user_roles')
      .insert([{
        email,
        role,
        assigned_by: assignedBy
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as UserRole;
  },

  // Update user role
  async updateUserRole(id: string, role: 'admin' | 'moderator') {
    const { data, error } = await supabase
      .from('user_roles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserRole;
  },

  // Delete user role
  async deleteUserRole(id: string) {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Check if user has admin access
  async checkUserRole(email: string) {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data?.role || null;
  }
};