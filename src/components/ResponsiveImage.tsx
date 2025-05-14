
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  className?: string;
}

const ResponsiveImage = ({ 
  src, 
  alt, 
  aspectRatio = 16 / 9,
  className = ""
}: ResponsiveImageProps) => {
  return (
    <div className="overflow-hidden rounded-md">
      <AspectRatio ratio={aspectRatio} className="bg-gray-100">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all hover:scale-105 ${className}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Image+Not+Found';
          }}
        />
      </AspectRatio>
    </div>
  );
};

export default ResponsiveImage;
