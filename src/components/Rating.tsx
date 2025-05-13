
import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  max?: number;
}

export const Rating = ({ value = 0, onChange, readOnly = false, max = 5 }: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const handleClick = (selectedValue: number) => {
    if (!readOnly && onChange) {
      onChange(selectedValue);
    }
  };
  
  const handleMouseEnter = (hoveredValue: number) => {
    if (!readOnly) {
      setHoverValue(hoveredValue);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };
  
  const getStarColor = (starPosition: number) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    
    if (starPosition <= displayValue) {
      return "text-yellow-400 fill-yellow-400";
    }
    
    return "text-gray-300";
  };
  
  return (
    <div className="flex">
      {[...Array(max)].map((_, index) => {
        const starPosition = index + 1;
        
        return (
          <button
            key={index}
            type="button"
            className={`${getStarColor(starPosition)} focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => handleClick(starPosition)}
            onMouseEnter={() => handleMouseEnter(starPosition)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
          >
            <Star className="w-5 h-5" strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
};
