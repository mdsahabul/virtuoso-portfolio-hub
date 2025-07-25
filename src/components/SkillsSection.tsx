import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { skillsService, Skill } from '@/integrations/supabase/skillsService';

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillsService.getAll();
        setSkills(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Skills</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading skills...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return null;
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="section bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My technical skills and areas of expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <Card key={category} className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl gradient-text">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-foreground">{skill.name}</h4>
                      <div className="flex items-center gap-2">
                        {skill.years_experience && (
                          <Badge variant="secondary" className="text-xs">
                            {skill.years_experience}+ years
                          </Badge>
                        )}
                        {skill.proficiency_level && (
                          <Badge variant="outline" className="text-xs">
                            {skill.proficiency_level}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    {skill.proficiency_level && (
                      <Progress 
                        value={skill.proficiency_level} 
                        className="h-2"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;