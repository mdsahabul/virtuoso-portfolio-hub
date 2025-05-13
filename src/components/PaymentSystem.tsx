
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentSystemProps {
  serviceName: string;
  amount: number;
  onSuccess?: () => void;
}

export const PaymentSystem = ({ serviceName, amount, onSuccess }: PaymentSystemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };
  
  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digitsOnly.length > 2) {
      return `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2, 4)}`;
    }
    
    return digitsOnly;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 3-4 characters
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCvc(value);
  };
  
  const validateForm = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('Please enter a valid card number');
      return false;
    }
    
    if (!cardName) {
      toast.error('Please enter the name on card');
      return false;
    }
    
    if (!expiry || expiry.length < 5) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    if (!cvc || cvc.length < 3) {
      toast.error('Please enter a valid CVC');
      return false;
    }
    
    return true;
  };
  
  const processPayment = () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Reset form after successful payment
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvc('');
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          setPaymentSuccess(false);
          setIsOpen(false);
          onSuccess();
        }, 2000);
      } else {
        setTimeout(() => {
          setPaymentSuccess(false);
          setIsOpen(false);
        }, 2000);
      }
    }, 2000);
  };
  
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Pay ${amount.toFixed(2)}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          {paymentSuccess ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Payment Successful!</h2>
              <p className="mt-2 text-gray-600">
                Thank you for your payment for {serviceName}.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Secure Payment</DialogTitle>
                <DialogDescription>
                  Complete your payment for {serviceName}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold">${amount.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="font-mono"
                    maxLength={19}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className="font-mono"
                      maxLength={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={handleCvcChange}
                      className="font-mono"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={processPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
