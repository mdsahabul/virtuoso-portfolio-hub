import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-foreground text-background">
      <div className="container-custom section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold gradient-text">Sahabul.</h3>
            <p className="text-background/80 leading-relaxed">
              Providing high-quality services and exceptional results for all your needs. 
              Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-3 bg-background/10 hover:bg-background/20 rounded-lg transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="p-3 bg-background/10 hover:bg-background/20 rounded-lg transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="p-3 bg-background/10 hover:bg-background/20 rounded-lg transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-background">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-background/80 hover:text-background transition-colors inline-flex items-center group">
                  <span>Web Development</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-background/80 hover:text-background transition-colors inline-flex items-center group">
                  <span>UI/UX Design</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-background/80 hover:text-background transition-colors inline-flex items-center group">
                  <span>Mobile Development</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-background/80 hover:text-background transition-colors inline-flex items-center group">
                  <span>Consulting</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-background">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-background/10 rounded-lg">
                  <Mail size={16} />
                </div>
                <a href="mailto:contact@example.com" className="text-background/80 hover:text-background transition-colors">
                  contact@example.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-background/10 rounded-lg">
                  <Phone size={16} />
                </div>
                <a href="tel:+11234567890" className="text-background/80 hover:text-background transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex space-x-3">
                <div className="p-2 bg-background/10 rounded-lg mt-1 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="text-background/80">
                  123 Portfolio Street, Design District, 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © {currentYear} Sahabul Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;