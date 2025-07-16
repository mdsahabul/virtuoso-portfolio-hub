
import { useState } from 'react';
import PortfolioItem from '@/components/PortfolioItem';
import ExperiencesSection from '@/components/ExperiencesSection';
import { useData } from '../context/DataContext';

const Portfolio = () => {
  // Categories for filtering
  const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile Development', 'Branding'];
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Get portfolio items from our data context
  const { projects } = useData();
  
  // Filter portfolio items based on selected category
  const filteredItems = activeCategory === 'All' 
    ? projects 
    : projects.filter(item => item.category === activeCategory);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section pt-16 pb-12 bg-blue-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore my recent projects and see how I've helped clients achieve their goals with 
            creative solutions and technical expertise.
          </p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="section">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <PortfolioItem
                key={item.id}
                title={item.title}
                category={item.category}
                image={item.image}
                description={item.description}
                link={item.link}
                technologies={item.technologies}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-medium text-gray-600">No projects found in this category.</h3>
              <p className="mt-2 text-gray-500">Please check back later or try another category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here's what my clients have to say about working with me.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                role: 'CEO, Tech Solutions Inc.',
                quote: 'Working with this portfolio owner was a game-changer for our business. The web application they built exceeded our expectations and has significantly improved our workflow.'
              },
              {
                name: 'Sarah Johnson',
                role: 'Marketing Director, Brand Innovators',
                quote: 'The redesign of our brand identity was exactly what we needed. The process was smooth, and the results have been phenomenal. I highly recommend their services.'
              },
              {
                name: 'Michael Chen',
                role: 'Founder, StartUp Hub',
                quote: 'Their technical expertise and attention to detail made our mobile app development project a success. Communication was clear throughout the entire process.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-blue-500 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperiencesSection />

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing. Contact me today to discuss your project requirements.
          </p>
          <a href="/contact" className="btn-primary">Get in Touch</a>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
