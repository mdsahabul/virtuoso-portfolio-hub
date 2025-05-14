
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ServicesPurchase } from './ServicesPurchase';
import { CheckIcon } from 'lucide-react';

// Import icons dynamically based on name
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  featured: boolean;
  features: string[];
}

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className, size = 24 }) => {
  // @ts-ignore - Lucide icons typing issue
  const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <Icon size={size} className={className} />;
};

const ServiceCard = ({ id, title, description, icon, price, featured, features }: ServiceCardProps) => {
  // Create a service object to pass to ServicesPurchase
  const service = { id, title, description, icon, price, featured, features };
  
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${featured ? 'shadow-lg border-blue-200' : ''}`}>
      <CardHeader className={`${featured ? 'bg-blue-50' : ''}`}>
        {featured && (
          <Badge variant="outline" className="absolute top-2 right-2 bg-blue-500 text-white border-0">
            Featured
          </Badge>
        )}
        <div className="flex items-center justify-center mb-4">
          <div className={`p-3 rounded-full ${featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            <DynamicIcon name={icon} size={24} />
          </div>
        </div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        {features && features.length > 0 && (
          <div className="mb-6">
            <p className="font-medium mb-2">Features:</p>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <ServicesPurchase service={service} />
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
