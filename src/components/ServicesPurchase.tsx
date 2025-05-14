
import { useState } from 'react';
import { Service } from '@/context/DataContext';
import { PaymentSystem } from '@/components/PaymentSystem';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';

interface ServicesPurchaseProps {
  service: Service;
}

export const ServicesPurchase = ({ service }: ServicesPurchaseProps) => {
  const [purchased, setPurchased] = useState(false);
  
  const handlePaymentSuccess = () => {
    setPurchased(true);
    
    // Reset purchased status after 5 seconds
    setTimeout(() => {
      setPurchased(false);
    }, 5000);
  };
  
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="text-lg font-bold">${service.price.toFixed(2)}</div>
      
      {purchased ? (
        <Button variant="outline" className="bg-green-50 text-green-600 border-green-200" disabled>
          <Check className="mr-2 h-4 w-4" />
          Purchased
        </Button>
      ) : (
        <PaymentSystem 
          serviceName={service.title}
          amount={service.price}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
