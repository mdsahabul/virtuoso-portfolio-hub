import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, UserCheck, Shield, User } from 'lucide-react';
import { userRolesService, UserRole } from '../../../integrations/supabase/userRolesService';

interface UsersManagerProps {
  searchQuery?: string;
}

const UsersManager = ({ searchQuery = '' }: UsersManagerProps) => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    role: 'moderator' as 'admin' | 'moderator'
  });

  const currentUserEmail = 'devsahabul@gmail.com'; // Current admin user

  useEffect(() => {
    loadUserRoles();
  }, []);

  const loadUserRoles = async () => {
    try {
      const data = await userRolesService.getUserRoles();
      setUserRoles(data);
    } catch (error) {
      console.error('Error loading user roles:', error);
      toast.error('Failed to load user roles');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        await userRolesService.updateUserRole(editingUser.id, formData.role);
        toast.success('User role updated successfully');
      } else {
        await userRolesService.addUserRole(formData.email, formData.role, currentUserEmail);
        toast.success('User added successfully');
      }
      
      setIsModalOpen(false);
      setEditingUser(null);
      setFormData({ email: '', role: 'moderator' });
      loadUserRoles();
    } catch (error: any) {
      console.error('Error saving user:', error);
      toast.error(error.message || 'Failed to save user');
    }
  };

  const handleEdit = (user: UserRole) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      role: user.role
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this user\'s access?')) return;
    
    try {
      await userRolesService.deleteUserRole(id);
      toast.success('User access removed successfully');
      loadUserRoles();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to remove user access');
    }
  };

  const openModal = () => {
    setEditingUser(null);
    setFormData({ email: '', role: 'moderator' });
    setIsModalOpen(true);
  };

  // Filter users based on search query
  const filteredUsers = userRoles.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-red-500" />;
      case 'moderator':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (role) {
      case 'admin':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400`;
      case 'moderator':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage admin and moderator access to the website
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="grid gap-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'No users found matching your search.' : 'No users found. Add some users to get started.'}
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getRoleIcon(user.role)}
                    <div>
                      <h3 className="font-medium text-foreground">{user.email}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={getRoleBadge(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        {user.assigned_by && (
                          <span className="text-xs text-muted-foreground">
                            Assigned by: {user.assigned_by}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    {user.email !== currentUserEmail && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {editingUser ? 'Edit User Role' : 'Add New User'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!!editingUser}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="user@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'moderator' })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.role === 'admin' ? 'Full access to all features' : 'Limited access to content management'}
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingUser ? 'Update' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManager;