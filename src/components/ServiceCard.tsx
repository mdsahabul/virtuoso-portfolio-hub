
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Code, Layout, Smartphone, TrendingUp, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  featured: boolean;
  features?: string[];
}

const ServiceCard = ({ id, title, description, icon, price, featured, features }: ServiceCardProps) => {
  const navigate = useNavigate();

  const getIconComponent = () => {
    switch (icon) {
      case 'code':
        return <Code size={40} />;
      case 'layout':
        return <Layout size={40} />;
      case 'smartphone':
        return <Smartphone size={40} />;
      case 'trend':
        return <TrendingUp size={40} />;
      case 'shopping-cart':
        return <ShoppingCart size={40} />;
      default:
        return <Code size={40} />;
    }
  };

  return (
    <Card className={`h-full flex flex-col ${featured ? 'border-blue-500 border-2' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={`text-blue-500 p-3 rounded-lg bg-blue-50`}>
            {getIconComponent()}
          </div>
          {featured && (
            <Badge>Featured</Badge>
          )}
        </div>
        <h3 className="text-xl font-bold mt-4">{title}</h3>
        <p className="text-2xl font-semibold text-blue-600">${price}</p>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{description}</p>
        {features && features.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Features:</h4>
            <ul className="space-y-1">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => navigate(`/services/${id}`)}
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
