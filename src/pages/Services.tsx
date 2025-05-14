
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../context/DataContext';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

const Services = () => {
  const { services } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = searchQuery
    ? services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services;

  // Sort services to show featured ones first
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Services Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Professional solutions tailored to meet your business needs and drive results.
          </p>
        </div>
      </section>
      
      {/* Services List Section */}
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="max-w-xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.length > 0 ? (
                sortedServices.map((service) => (
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
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No services found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
