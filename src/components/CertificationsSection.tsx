import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { certificationsService, Certification } from '@/integrations/supabase/certificationsService';

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await certificationsService.getAll();
        setCertifications(data);
      } catch (error) {
        console.error('Failed to fetch certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading certifications...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null;
  }

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section className="section bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title gradient-text">Certifications</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((certification) => (
            <Card key={certification.id} className="glass-card card-hover">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  {certification.organization_logo_url ? (
                    <img 
                      src={certification.organization_logo_url} 
                      alt={`${certification.issuing_organization} logo`}
                      className="h-8 w-8 object-contain rounded flex-shrink-0"
                    />
                  ) : (
                    <Award className="h-8 w-8 text-primary flex-shrink-0" />
                  )}
                  {certification.expiry_date && (
                    <Badge 
                      variant={isExpired(certification.expiry_date) ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {isExpired(certification.expiry_date) ? "Expired" : "Valid"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{certification.name}</CardTitle>
                <p className="text-sm text-primary font-medium">{certification.issuing_organization}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {certification.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {certification.description}
                  </p>
                )}
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Issued: {new Date(certification.issue_date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  {certification.expiry_date && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Expires: {new Date(certification.expiry_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                  
                  {certification.credential_id && (
                    <p className="text-xs text-muted-foreground">
                      ID: {certification.credential_id}
                    </p>
                  )}
                </div>
                
                {certification.credential_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(certification.credential_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;