
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, User, Lock, Upload } from 'lucide-react';

interface AdminProfile {
  name: string;
  email: string;
  bio: string;
  role: string;
  avatar: string;
  linkedIn: string;
  github: string;
  behance: string;
  phone: string;
  location: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileSettings = () => {
  // Initialize profile state from localStorage or with default values
  const [profile, setProfile] = useState<AdminProfile>(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Admin User',
      email: 'admin@example.com',
      bio: 'Web Developer and Designer',
      role: 'Administrator',
      avatar: '',
      linkedIn: 'https://linkedin.com',
      github: 'https://github.com',
      behance: 'https://behance.com',
      phone: '+1 (123) 456-7890',
      location: 'City, Country'
    };
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // In a real app, you would send this data to the server
      localStorage.setItem('adminProfile', JSON.stringify(profile));
      localStorage.setItem('adminName', profile.name);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating your profile');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      setIsProcessing(false);
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsProcessing(false);
      return;
    }
    
    try {
      // In a real app, you would verify the current password and update with the new one
      toast.success('Password updated successfully');
      
      // Clear form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('An error occurred while updating your password');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Set admin name in localStorage when profile loads or changes
  useEffect(() => {
    localStorage.setItem('adminName', profile.name);
  }, [profile.name]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
            <User className="mr-2 h-4 w-4" /> Profile Information
          </TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
            <Lock className="mr-2 h-4 w-4" /> Change Password
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-32 h-32 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl uppercase">
                        {profile.avatar ? (
                          <img 
                            src={profile.avatar} 
                            alt={profile.name} 
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=' + profile.name.charAt(0);
                            }} 
                          />
                        ) : (
                          profile.name.charAt(0)
                        )}
                      </div>
                      
                      <div className="space-y-2 w-full">
                        <Label htmlFor="avatar">Profile Picture URL</Label>
                        <Input
                          id="avatar"
                          name="avatar"
                          value={profile.avatar}
                          onChange={handleProfileChange}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profile.name}
                          onChange={handleProfileChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          name="role"
                          value={profile.role}
                          onChange={handleProfileChange}
                          placeholder="Your role"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profile.phone}
                          onChange={handleProfileChange}
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profile.location}
                        onChange={handleProfileChange}
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleProfileChange}
                        placeholder="Brief description about yourself"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedIn">LinkedIn</Label>
                      <Input
                        id="linkedIn"
                        name="linkedIn"
                        value={profile.linkedIn}
                        onChange={handleProfileChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        value={profile.github}
                        onChange={handleProfileChange}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="behance">Behance</Label>
                      <Input
                        id="behance"
                        name="behance"
                        value={profile.behance}
                        onChange={handleProfileChange}
                        placeholder="https://behance.net/username"
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit" disabled={isProcessing} className="w-full md:w-auto">
                  {isProcessing ? 'Saving...' : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-xl">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" disabled={isProcessing} className="w-full md:w-auto">
                  {isProcessing ? 'Updating...' : (
                    <>
                      <Save size={16} className="mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
