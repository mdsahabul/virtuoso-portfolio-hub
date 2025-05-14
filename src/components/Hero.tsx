
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import { HeroSection } from "../types/appTypes";

// Define the props interface for the Hero component
interface HeroProps {
  // If no props are passed, we'll use the data from context
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaButton?: string;
  ctaLink?: string;
  secondaryButton?: string;
  secondaryLink?: string;
}

const Hero = (props: HeroProps) => {
  const { heroSection } = useData();
  
  // Use props if provided, otherwise fall back to context data
  const title = props.title || heroSection.title;
  const subtitle = props.subtitle || heroSection.subtitle;
  const backgroundImage = props.backgroundImage || heroSection.backgroundImage;
  const ctaButton = props.ctaButton || heroSection.ctaButton;
  const ctaLink = props.ctaLink || heroSection.ctaLink;
  const secondaryButton = props.secondaryButton || heroSection.secondaryButton;
  const secondaryLink = props.secondaryLink || heroSection.secondaryLink;

  return (
    <section 
      className="relative min-h-[75vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container-custom relative z-10 text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto md:ml-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to={ctaLink} className="btn-primary">
              {ctaButton}
            </Link>
            <Link to={secondaryLink} className="btn-secondary">
              {secondaryButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
