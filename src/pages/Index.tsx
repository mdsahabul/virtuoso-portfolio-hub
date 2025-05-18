
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import PortfolioItem from '../components/PortfolioItem';
import Footer from '../components/Footer';
import ReviewsSection from '../components/ReviewsSection';
import { useData } from '../context/DataContext';
import ResponsiveImage from '../components/ResponsiveImage';
import ContactForm from '../components/ContactForm';

const Index = () => {
  const navigate = useNavigate();
  const { services, projects, heroSection, aboutSection, contactPageContent, isLoading } = useData();

  // Filter featured services for the homepage
  const featuredServices = services.filter(service => service.featured);
  
  // Filter featured projects for the homepage (showing only the first 3)
  const featuredProjects = projects.slice(0, 3);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
        <p className="mt-4 text-gray-600">Loading content...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <Hero /> 
      
      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <ResponsiveImage 
                src={aboutSection.image} 
                alt="About"
                aspectRatio={1/1}
                className="transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-700">{aboutSection.title}</h2>
              <div className="space-y-4">
                {aboutSection.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {aboutSection.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow">
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
      <section id="services" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">My Services</h2>
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
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Featured Projects</h2>
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
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <ReviewsSection />
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Contact Me</h3>
                <ContactForm />
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Contact Information</h3>
                  {contactPageContent && (
                    <div className="space-y-3">
                      <p className="flex items-start">
                        <span className="font-medium w-20">Email:</span>
                        <a href={`mailto:${contactPageContent.contactInfo.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                          {contactPageContent.contactInfo.email}
                        </a>
                      </p>
                      <p className="flex items-start">
                        <span className="font-medium w-20">Phone:</span>
                        <a href={`tel:${contactPageContent.contactInfo.phone}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                          {contactPageContent.contactInfo.phone}
                        </a>
                      </p>
                      <p className="flex items-start">
                        <span className="font-medium w-20">Address:</span>
                        <span>{contactPageContent.contactInfo.address}</span>
                      </p>
                    </div>
                  )}
                </div>
                
                {contactPageContent && contactPageContent.mapLocation && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">Location</h3>
                    <div className="h-64 rounded-lg overflow-hidden">
                      <iframe 
                        src={contactPageContent.mapLocation}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
