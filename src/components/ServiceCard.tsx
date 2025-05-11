
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
  onAction?: () => void;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  price, 
  features, 
  cta, 
  highlighted = false,
  onAction
}: ServiceCardProps) => {
  return (
    <div 
      className={`
        card relative overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg
        ${highlighted ? 'border-2 border-blue-500' : ''}
      `}
    >
      {highlighted && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1">
          POPULAR
        </div>
      )}
      
      <div className="mb-6">
        <div className={`inline-flex p-3 rounded-lg ${highlighted ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}>
          <Icon size={28} />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-500"> / project</span>
      </div>
      
      <ul className="space-y-2 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onAction}
        className={`
          w-full text-center py-3 px-6 rounded-md font-medium transition-colors
          ${highlighted ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'}
        `}
      >
        {cta}
      </button>
    </div>
  );
};

export default ServiceCard;
