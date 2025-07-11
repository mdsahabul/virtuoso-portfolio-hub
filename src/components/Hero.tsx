
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl floating-element"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl floating-element" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-xl floating-element" style={{ animationDelay: '4s' }}></div>
      
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-fade-in">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to={ctaLink} className="btn-primary text-lg px-8 py-4 shadow-glow">
              {ctaButton}
            </Link>
            <Link to={secondaryLink} className="btn-secondary text-lg px-8 py-4">
              {secondaryButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
