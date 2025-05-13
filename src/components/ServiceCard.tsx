
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, Layout, Smartphone, ShoppingCart, 
  Globe, PenTool, Server, Zap 
} from "lucide-react";
import { PaymentSystem } from './PaymentSystem';
import { toast } from 'sonner';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  featured?: boolean;
}

const ServiceCard = ({ title, description, icon, price, featured }: ServiceCardProps) => {
  const getIconComponent = () => {
    switch (icon) {
      case 'code':
        return <Code size={24} />;
      case 'layout':
        return <Layout size={24} />;
      case 'smartphone':
        return <Smartphone size={24} />;
      case 'shopping-cart':
        return <ShoppingCart size={24} />;
      case 'globe':
        return <Globe size={24} />;
      case 'pen-tool':
        return <PenTool size={24} />;
      case 'server':
        return <Server size={24} />;
      default:
        return <Zap size={24} />;
    }
  };

  const handlePaymentSuccess = () => {
    toast.success(`Thank you for purchasing ${title}!`, {
      description: "You'll receive details about next steps via email.",
    });
  };

  return (
    <Card className={`h-full relative overflow-hidden ${featured ? 'border-blue-500 shadow-md' : ''}`}>
      {featured && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="mb-4 text-blue-600 bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
          {getIconComponent()}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">${price}</span>
            {featured && (
              <span className="text-sm text-gray-500">Best value</span>
            )}
          </div>
          <PaymentSystem 
            serviceName={title} 
            amount={price}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
