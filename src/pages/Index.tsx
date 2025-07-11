
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-primary/10"></div>
        </div>
        <p className="mt-6 text-muted-foreground text-lg">Loading your experience...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <Hero /> 
      
      {/* About Section */}
      <section id="about" className="section bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="glass-card p-8 floating-element">
                <ResponsiveImage 
                  src={aboutSection.image} 
                  alt="About"
                  aspectRatio={1/1}
                  className="rounded-lg transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="absolute -z-10 -top-6 -left-6 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-xl"></div>
            </div>
            <div className="space-y-6">
              <h2 className="section-title gradient-text">{aboutSection.title}</h2>
              <div className="space-y-4">
                {aboutSection.description.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {aboutSection.skills.map((skill, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors">
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
      <section id="services" className="section bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">My Services</h2>
            <p className="section-subtitle text-lg">
              I offer a variety of services to help businesses establish an effective online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="card-hover">
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  price={service.price}
                  featured={service.featured}
                  features={service.features || []}  
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/services')}
              className="btn-primary text-lg px-8 py-4"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio" className="section bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Featured Projects</h2>
            <p className="section-subtitle text-lg">
              Take a look at some of my recent projects and the results they've achieved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card-hover">
                <PortfolioItem
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  description={project.description}
                  technologies={project.technologies}
                  link={project.link}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/portfolio')}
              className="btn-primary text-lg px-8 py-4"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <ReviewsSection />
      
      {/* Contact Section */}
      <section id="contact" className="section bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title gradient-text">Get In Touch</h2>
            <p className="section-subtitle text-lg">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glass-card">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Me</h3>
                <ContactForm />
              </div>
              
              <div className="space-y-8">
                <div className="glass-card">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>
                  {contactPageContent && (
                    <div className="space-y-4">
                      <p className="flex items-start gap-4">
                        <span className="font-medium text-primary min-w-[80px]">Email:</span>
                        <a href={`mailto:${contactPageContent.contactInfo.email}`} className="text-primary hover:text-primary/80 transition-colors">
                          {contactPageContent.contactInfo.email}
                        </a>
                      </p>
                      <p className="flex items-start gap-4">
                        <span className="font-medium text-primary min-w-[80px]">Phone:</span>
                        <a href={`tel:${contactPageContent.contactInfo.phone}`} className="text-primary hover:text-primary/80 transition-colors">
                          {contactPageContent.contactInfo.phone}
                        </a>
                      </p>
                      <p className="flex items-start gap-4">
                        <span className="font-medium text-primary min-w-[80px]">Address:</span>
                        <span className="text-muted-foreground">{contactPageContent.contactInfo.address}</span>
                      </p>
                    </div>
                  )}
                </div>
                
                {contactPageContent && contactPageContent.mapLocation && (
                  <div className="glass-card">
                    <h3 className="text-2xl font-semibold mb-6 text-foreground">Location</h3>
                    <div className="h-64 rounded-lg overflow-hidden shadow-medium">
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
