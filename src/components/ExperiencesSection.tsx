import { useState, useEffect } from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { experiencesService, Experience } from '@/integrations/supabase/experiencesService';

const ExperiencesSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experiencesService.getAll();
        setExperiences(data);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Experience</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading experience...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My professional journey and work experience
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((experience, index) => (
            <Card key={experience.id} className="relative">
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-px bg-border" />
              )}
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-2 relative z-10" />
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{experience.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {experience.company}
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {experience.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(experience.start_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })} - {experience.is_current ? 'Present' : new Date(experience.end_date!).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="ml-7">
                {experience.description && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {experience.description}
                  </p>
                )}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;