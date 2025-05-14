
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import PortfolioItem from '../components/PortfolioItem';
import Footer from '../components/Footer';
import ReviewsSection from '../components/ReviewsSection';
import { useData } from '../context/DataContext';

const Index = () => {
  const navigate = useNavigate();
  const { services, projects, heroSection, aboutSection } = useData();

  // Filter featured services for the homepage
  const featuredServices = services.filter(service => service.featured);
  
  // Filter featured projects for the homepage (showing only the first 3)
  const featuredProjects = projects.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <Hero /> {/* Using the Hero component without props will use the context data */}
      
      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={aboutSection.image} 
                alt="About" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">{aboutSection.title}</h2>
              {aboutSection.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutSection.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I offer a variety of services to help businesses establish an effective online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                price={service.price}
                featured={service.featured}
                features={service.features || []}  
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/services')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at some of my recent projects and the results they've achieved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <PortfolioItem
                key={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
                description={project.description}
                technologies={project.technologies}
                link={project.link}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/portfolio')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <ReviewsSection />
      
      <Footer />
    </div>
  );
};

export default Index;
