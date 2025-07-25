import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Award, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { skillsService, Skill, SkillInsert } from '@/integrations/supabase/skillsService';
import { certificationsService, Certification, CertificationInsert } from '@/integrations/supabase/certificationsService';

const SkillsCertificationsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const { toast } = useToast();

  const [skillFormData, setSkillFormData] = useState<SkillInsert>({
    name: '',
    category: '',
    proficiency_level: 1,
    years_experience: 0
  });

  const [certFormData, setCertFormData] = useState<CertificationInsert>({
    name: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
    description: ''
  });

  const skillCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Frameworks'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [skillsData, certificationsData] = await Promise.all([
        skillsService.getAll(),
        certificationsService.getAll()
      ]);
      setSkills(skillsData);
      setCertifications(certificationsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Skills handlers
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillsService.update(editingSkill.id, skillFormData);
        toast({ title: "Success", description: "Skill updated successfully" });
      } else {
        await skillsService.create(skillFormData);
        toast({ title: "Success", description: "Skill created successfully" });
      }
      
      setIsSkillDialogOpen(false);
      resetSkillForm();
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save skill",
        variant: "destructive",
      });
    }
  };

  const handleSkillDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsService.delete(id);
        toast({ title: "Success", description: "Skill deleted successfully" });
        fetchData();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete skill",
          variant: "destructive",
        });
      }
    }
  };

  const handleSkillEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      category: skill.category,
      proficiency_level: skill.proficiency_level || 1,
      years_experience: skill.years_experience || 0
    });
    setIsSkillDialogOpen(true);
  };

  const resetSkillForm = () => {
    setSkillFormData({
      name: '',
      category: '',
      proficiency_level: 1,
      years_experience: 0
    });
    setEditingSkill(null);
  };

  // Certifications handlers
  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Clean the form data to handle empty dates properly
      const cleanedData = {
        ...certFormData,
        expiry_date: certFormData.expiry_date || null,
        credential_id: certFormData.credential_id || null,
        credential_url: certFormData.credential_url || null,
        description: certFormData.description || null
      };

      if (editingCertification) {
        await certificationsService.update(editingCertification.id, cleanedData);
        toast({ title: "Success", description: "Certification updated successfully" });
      } else {
        await certificationsService.create(cleanedData);
        toast({ title: "Success", description: "Certification created successfully" });
      }
      
      setIsCertDialogOpen(false);
      resetCertForm();
      fetchData();
    } catch (error) {
      console.error('Certification save error:', error);
      toast({
        title: "Error",
        description: "Failed to save certification",
        variant: "destructive",
      });
    }
  };

  const handleCertDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this certification?')) {
      try {
        await certificationsService.delete(id);
        toast({ title: "Success", description: "Certification deleted successfully" });
        fetchData();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete certification",
          variant: "destructive",
        });
      }
    }
  };

  const handleCertEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setCertFormData({
      name: certification.name,
      issuing_organization: certification.issuing_organization,
      issue_date: certification.issue_date,
      expiry_date: certification.expiry_date || '',
      credential_id: certification.credential_id || '',
      credential_url: certification.credential_url || '',
      description: certification.description || ''
    });
    setIsCertDialogOpen(true);
  };

  const resetCertForm = () => {
    setCertFormData({
      name: '',
      issuing_organization: '',
      issue_date: '',
      expiry_date: '',
      credential_id: '',
      credential_url: '',
      description: ''
    });
    setEditingCertification(null);
  };

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Skills & Certifications Manager</h1>
      
      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetSkillForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSkill ? 'Edit Skill' : 'Add Skill'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSkillSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="skill-name">Name</Label>
                    <Input
                      id="skill-name"
                      value={skillFormData.name}
                      onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="skill-category">Category</Label>
                    <Select
                      value={skillFormData.category}
                      onValueChange={(value) => setSkillFormData({ ...skillFormData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="proficiency">Proficiency Level (1-5)</Label>
                    <Select
                      value={skillFormData.proficiency_level?.toString()}
                      onValueChange={(value) => setSkillFormData({ ...skillFormData, proficiency_level: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((level) => (
                          <SelectItem key={level} value={level.toString()}>
                            {level} - {['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'][level - 1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="years">Years of Experience</Label>
                    <Input
                      id="years"
                      type="number"
                      min="0"
                      value={skillFormData.years_experience || 0}
                      onChange={(e) => setSkillFormData({ ...skillFormData, years_experience: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsSkillDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSkill ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {Object.entries(skills.reduce((acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill);
              return acc;
            }, {} as Record<string, Skill[]>)).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{skill.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">{renderStars(skill.proficiency_level || 1)}</div>
                            <span className="text-sm text-muted-foreground">
                              {skill.years_experience} years
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSkillEdit(skill)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSkillDelete(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Certifications</h2>
            <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetCertForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingCertification ? 'Edit Certification' : 'Add Certification'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCertSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cert-name">Certification Name</Label>
                    <Input
                      id="cert-name"
                      value={certFormData.name}
                      onChange={(e) => setCertFormData({ ...certFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="issuing-org">Issuing Organization</Label>
                    <Input
                      id="issuing-org"
                      value={certFormData.issuing_organization}
                      onChange={(e) => setCertFormData({ ...certFormData, issuing_organization: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="issue-date">Issue Date</Label>
                      <Input
                        id="issue-date"
                        type="date"
                        value={certFormData.issue_date}
                        onChange={(e) => setCertFormData({ ...certFormData, issue_date: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry-date">Expiry Date (Optional)</Label>
                      <Input
                        id="expiry-date"
                        type="date"
                        value={certFormData.expiry_date}
                        onChange={(e) => setCertFormData({ ...certFormData, expiry_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="credential-id">Credential ID</Label>
                    <Input
                      id="credential-id"
                      value={certFormData.credential_id}
                      onChange={(e) => setCertFormData({ ...certFormData, credential_id: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="credential-url">Credential URL</Label>
                    <Input
                      id="credential-url"
                      type="url"
                      value={certFormData.credential_url}
                      onChange={(e) => setCertFormData({ ...certFormData, credential_url: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cert-description">Description</Label>
                    <Textarea
                      id="cert-description"
                      value={certFormData.description}
                      onChange={(e) => setCertFormData({ ...certFormData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCertDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingCertification ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {certifications.map((certification) => (
              <Card key={certification.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        {certification.name}
                      </CardTitle>
                      <p className="text-muted-foreground">{certification.issuing_organization}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCertEdit(certification)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCertDelete(certification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Issued: {new Date(certification.issue_date).toLocaleDateString()}
                        {certification.expiry_date && (
                          <> • Expires: {new Date(certification.expiry_date).toLocaleDateString()}</>
                        )}
                      </p>
                      {certification.credential_id && (
                        <p className="text-sm text-muted-foreground mt-1">
                          ID: {certification.credential_id}
                        </p>
                      )}
                      {certification.description && (
                        <p className="text-sm mt-2">{certification.description}</p>
                      )}
                    </div>
                    {certification.credential_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={certification.credential_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsCertificationsManager;