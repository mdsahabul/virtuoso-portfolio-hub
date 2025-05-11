
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
            Professional Portfolio
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-800 leading-tight">
            Hi, I'm <span className="text-blue-500">Your Name</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-xl">
            I'm a passionate professional with expertise in web development, design, and digital marketing. 
            Let's work together to bring your vision to life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="btn-primary flex items-center gap-2">
              View Services <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Me
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-3xl font-bold text-blue-700">5+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-700">100+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-700">50+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
        
        {/* Image/Profile */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in">
          <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
            <div className="bg-blue-100 w-72 h-80 md:w-96 md:h-[450px] flex items-center justify-center">
              <div className="text-blue-500 text-xl font-medium">Your Profile Image</div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-10 -left-5 w-20 h-20 bg-accent-orange rounded-lg -rotate-12"></div>
          <div className="absolute -bottom-8 right-10 w-24 h-24 bg-blue-500 rounded-full"></div>
          <div className="absolute top-1/2 right-0 w-12 h-12 bg-accent-purple rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
