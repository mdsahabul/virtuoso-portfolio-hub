import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ThemeToggle';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  // Navigation links - added admin link
  const navLinks = [{
    path: '/',
    label: 'Home'
  }, {
    path: '/services',
    label: 'Services'
  }, {
    path: '/portfolio',
    label: 'Portfolio'
  }, {
    path: '/contact',
    label: 'Contact'
  }, {
    path: '/admin-dashboard',
    label: 'Admin'
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-medium' : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">Sahabul.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link, i) => <Link key={i} to={link.path} className={`text-base font-medium transition-all duration-300 hover:text-primary relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:rounded-full ${isCurrentPath(link.path) ? 'text-primary after:w-full' : 'text-foreground after:w-0 hover:after:w-full'}`}>
                  {link.label}
                </Link>)}
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} className="text-foreground" /> : <Menu size={24} className="text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden mt-4 p-4 bg-card rounded-lg border border-border shadow-large animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => <Link key={i} to={link.path} className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${isCurrentPath(link.path) ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted'}`} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>)}
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;