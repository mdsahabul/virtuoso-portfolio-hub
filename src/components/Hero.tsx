
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { heroSection } = useData();

  return (
    <section 
      className="relative min-h-[75vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('${heroSection.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container-custom relative z-10 text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto md:ml-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            {heroSection.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {heroSection.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to={heroSection.ctaLink} className="btn-primary">
              {heroSection.ctaButton}
            </Link>
            <Link to={heroSection.secondaryLink} className="btn-secondary">
              {heroSection.secondaryButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
