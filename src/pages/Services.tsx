
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, Layout, TrendingUp, Zap, Users, Clock, Award } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';

// Map service titles to icons for display
const serviceIcons: Record<string, any> = {
  'Web Development': Monitor,
  'UI/UX Design': Layout,
  'Mobile Development': Smartphone,
  'Digital Marketing': TrendingUp,
  'SEO Optimization': Zap,
};

const Services = () => {
  const navigate = useNavigate();
  const { services } = useData();
  
  const handleServiceAction = (serviceTitle: string) => {
    toast.success(`Service "${serviceTitle}" selected! Redirecting to contact page...`);
    setTimeout(() => navigate('/contact'), 1500);
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section pt-16 pb-12 bg-blue-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional solutions tailored to your needs. Browse my services and find the 
            perfect match for your project requirements.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              // Determine which icon to use based on service title
              let IconComponent = serviceIcons[service.title] || TrendingUp;
              
              return (
                <ServiceCard
                  key={service.id}
                  icon={IconComponent}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  features={service.features}
                  cta="Choose Plan"
                  highlighted={service.highlighted}
                  onAction={() => handleServiceAction(service.title)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I deliver high-quality solutions with a focus on collaboration, 
              transparency, and results that exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Fast Delivery', description: 'Projects completed efficiently without sacrificing quality.' },
              { icon: Users, title: 'Client-Focused', description: 'Your needs and goals are at the center of everything I do.' },
              { icon: Clock, title: '24/7 Support', description: 'Responsive assistance whenever you need help or have questions.' },
              { icon: Award, title: 'Quality Work', description: 'Attention to detail ensures exceptional results every time.' }
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="inline-flex p-3 rounded-lg bg-blue-100 text-blue-700 mb-6">
                    <FeatureIcon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A streamlined approach that delivers results efficiently and effectively.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your requirements and project goals through in-depth consultation.' },
              { step: '02', title: 'Planning', description: 'Developing a comprehensive strategy and roadmap for your project.' },
              { step: '03', title: 'Execution', description: 'Bringing your vision to life with expert implementation and regular updates.' },
              { step: '04', title: 'Delivery', description: 'Finalizing the project with thorough testing and your complete satisfaction.' }
            ].map((process, index) => (
              <div key={index} className="relative flex-1">
                <div className="card relative z-10">
                  <div className="text-4xl font-bold text-blue-200 mb-4">{process.step}</div>
                  <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
                
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/4 -right-4 w-8 border-t-2 border-dashed border-gray-300 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section bg-blue-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl text-blue-300 mb-6">"</div>
            <p className="text-xl md:text-2xl font-light mb-8">
              Working with this developer was a game-changer for our business. 
              The attention to detail, technical expertise, and commitment to our project's 
              success exceeded our expectations. I highly recommend these services!
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                <span className="font-bold">JD</span>
              </div>
              <div className="text-left">
                <h4 className="font-bold">Jane Doe</h4>
                <p className="text-blue-300">CEO, Tech Innovations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact me today to discuss your project needs and how I can help bring your ideas to life.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
};

export default Services;
