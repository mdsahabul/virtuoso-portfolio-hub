
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../context/DataContext';

const Services = () => {
  const { services } = useData();
  const [filter, setFilter] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(services.map(service => service.icon)));
  
  // Filter services based on selected category
  const filteredServices = filter 
    ? services.filter(service => service.icon === filter) 
    : services;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Services</h1>
            <p className="text-xl text-gray-600">
              I offer a range of digital services to help your business grow and succeed online.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(null)}
            >
              All Services
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                price={service.price}
                featured={service.featured}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No services found in this category.</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => setFilter(null)}
              >
                Show All Services
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-8">
              Let's discuss your needs and create a custom solution that helps you achieve your goals.
            </p>
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
