
import Hero from '@/components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Layout, Code, TrendingUp, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Index = () => {
  const navigate = useNavigate();
  const { services, projects } = useData();

  // We'll use a limited number of services and projects for the home page
  const featuredServices = services.slice(0, 4);
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-white p-6 rounded-2xl shadow-xl transform rotate-3 mb-6 max-w-md mx-auto">
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  About Image
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="section-title">About Me</h2>
              <p className="text-lg text-gray-700">
                As a passionate professional with over 5 years of experience, I specialize in creating 
                digital solutions that help businesses grow and thrive in the online world.
              </p>
              <p className="text-lg text-gray-700">
                My approach combines technical expertise with creative thinking to deliver 
                results that exceed client expectations. I believe in building long-term 
                relationships and providing exceptional value with every project.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-500">
                    <Code size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">Clean Code</h3>
                    <p className="text-sm text-gray-600">Well-structured & maintainable</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-blue-500">
                    <LineChart size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">Results Driven</h3>
                    <p className="text-sm text-gray-600">Focus on business outcomes</p>
                  </div>
                </div>
              </div>
              
              <Link to="/contact" className="btn-primary inline-block mt-4">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">My Services</h2>
          <p className="section-subtitle mx-auto">
            I offer a wide range of services to help you achieve your goals. 
            Here are some of the ways I can help your business grow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => {
              const Icons = { Monitor, Smartphone, Layout, TrendingUp };
              // Select an icon based on the service title or index
              let IconComponent;
              if (service.title.includes('Web')) {
                IconComponent = Monitor;
              } else if (service.title.includes('Mobile')) {
                IconComponent = Smartphone;
              } else if (service.title.includes('UI') || service.title.includes('UX')) {
                IconComponent = Layout;
              } else {
                IconComponent = TrendingUp;
              }

              return (
                <div key={service.id} className="card group hover:border-blue-500 border-2 border-transparent">
                  <div className="mb-6 text-blue-500 group-hover:text-white group-hover:bg-blue-500 w-16 h-16 rounded-lg flex items-center justify-center transition-colors mx-auto">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>
              );
            })}
          </div>
          
          <Link 
            to="/services" 
            className="mt-12 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group"
          >
            View All Services 
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section bg-blue-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Work</h2>
          <p className="section-subtitle mx-auto">
            Take a look at some of my recent projects that showcase my skills and expertise.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((item) => (
              <div 
                key={item.id} 
                className="card group cursor-pointer p-0 overflow-hidden"
                onClick={() => navigate('/portfolio')}
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center relative">
                  <span className="text-gray-400">Portfolio Image</span>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-blue-800/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="text-white text-center">
                      <p className="text-sm text-blue-200 uppercase tracking-wider mb-1">{item.category}</p>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/portfolio" 
            className="mt-12 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group"
          >
            View All Projects 
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing. Contact me today to discuss your project needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services" className="btn-primary bg-white text-blue-800 hover:bg-blue-50">
              Explore Services
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-blue-700">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
