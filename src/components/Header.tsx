
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-700">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['/', '/services', '/portfolio', '/contact'].map((path, i) => (
            <Link 
              key={i} 
              to={path} 
              className={`text-base font-medium transition-colors hover:text-blue-500 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-blue-500 after:transition-all ${
                isCurrentPath(path) 
                  ? 'text-blue-600 after:w-full' 
                  : 'text-gray-700 after:w-0 hover:after:w-full'
              }`}
            >
              {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(1).slice(1)}
            </Link>
          ))}
          <Link to="/admin-login" className="btn-primary">
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <X size={24} className="text-blue-800" />
          ) : (
            <Menu size={24} className="text-blue-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-5 animate-fade-in">
          <div className="container-custom flex flex-col space-y-4">
            {['/', '/services', '/portfolio', '/contact'].map((path, i) => (
              <Link
                key={i}
                to={path}
                className={`text-lg font-medium py-2 ${
                  isCurrentPath(path) ? 'text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(1).slice(1)}
              </Link>
            ))}
            <Link 
              to="/admin-login" 
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
