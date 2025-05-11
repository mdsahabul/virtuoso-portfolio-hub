
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
            <p className="text-blue-100 mb-6">
              Providing high-quality services and exceptional results for all your needs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-blue-100 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-200" />
                <a href="mailto:contact@example.com" className="text-blue-100 hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-200" />
                <a href="tel:+11234567890" className="text-blue-100 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex space-x-3">
                <MapPin size={16} className="text-blue-200 mt-1 flex-shrink-0" />
                <span className="text-blue-100">
                  123 Portfolio Street, Design District, 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8 text-center">
          <p className="text-blue-200">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
