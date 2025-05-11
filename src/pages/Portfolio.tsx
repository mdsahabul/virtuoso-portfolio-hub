
import { useState } from 'react';
import PortfolioItem from '@/components/PortfolioItem';

// Define the portfolio item type
type PortfolioItemType = {
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
  technologies: string[];
};

const Portfolio = () => {
  // Categories for filtering
  const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile Development', 'Branding'];
  
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Portfolio items data
  const portfolioItems: PortfolioItemType[] = [
    {
      title: 'E-commerce Platform',
      category: 'Web Development',
      image: '',
      description: 'A fully-featured e-commerce platform with product management, cart functionality, and secure checkout integration.',
      link: '#',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      title: 'Finance Dashboard UI',
      category: 'UI/UX Design',
      image: '',
      description: 'A modern and intuitive dashboard design for a financial services company, focusing on data visualization and user experience.',
      link: '#',
      technologies: ['Figma', 'Adobe XD', 'Photoshop']
    },
    {
      title: 'Travel Booking App',
      category: 'Mobile Development',
      image: '',
      description: 'A cross-platform mobile application for booking travel accommodations with real-time availability and secure payment processing.',
      link: '#',
      technologies: ['React Native', 'Firebase', 'Google Maps API']
    },
    {
      title: 'Corporate Rebrand',
      category: 'Branding',
      image: '',
      description: 'A complete brand redesign for a tech company, including logo, color palette, typography, and brand guidelines.',
      link: '#',
      technologies: ['Illustrator', 'InDesign', 'After Effects']
    },
    {
      title: 'Health & Fitness Tracker',
      category: 'Mobile Development',
      image: '',
      description: 'A mobile app for tracking health metrics, workouts, and nutrition with personalized insights and goal setting.',
      link: '#',
      technologies: ['Swift', 'HealthKit', 'CoreData']
    },
    {
      title: 'Real Estate Website',
      category: 'Web Development',
      image: '',
      description: 'A comprehensive real estate platform with property listings, advanced search functionality, and agent profiles.',
      link: '#',
      technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Google Maps API']
    },
    {
      title: 'Social Media Dashboard',
      category: 'UI/UX Design',
      image: '',
      description: 'A unified dashboard for managing multiple social media accounts with analytics and content scheduling.',
      link: '#',
      technologies: ['Figma', 'Sketch', 'Principle']
    },
    {
      title: 'Eco-friendly Brand Identity',
      category: 'Branding',
      image: '',
      description: 'A sustainable brand identity for an eco-conscious product line, emphasizing environmental responsibility.',
      link: '#',
      technologies: ['Illustrator', 'Photoshop', 'Procreate']
    },
  ];
  
  // Filter portfolio items based on selected category
  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

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
                key={index}
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

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing. Contact me today to discuss your project requirements.
          </p>
          <a href="/contact" className="btn-primary">Get in Touch</a>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
