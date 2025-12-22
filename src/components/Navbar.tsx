import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import geoidImg from '/img/mobile-dvr-logo.png';

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  // { name: 'Products', href: '/products' }, // Hidden from nav - accessible via direct URL only
  { name: 'Solutions', href: '#solutions' },
  { name: 'Features', href: '#features' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Insights', href: '#Insights' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHashLink = (href: string) => href.startsWith('#');

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'transparent-header' : 'bg-transparent'
        }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-12 w-12 flex items-center justify-center">
            <img src={geoidImg} alt="Mobile DVR Solutions Logo" className="h-12 w-12 object-contain" />
          </div>
          <span className="text-white font-semibold text-4xl">MobileDVR</span>
          <span className="text-gray-300 font-rajdhani font-bold text-4xl">.lk</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            isHashLink(item.href) ? (
              <a
                key={item.name}
                href={item.href}
                className="nav-link"
                onClick={(e) => handleHashLinkClick(e, item.href)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            )
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => handleHashLinkClick(e, '#contact')}
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-900 animate-slide-down">
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              isHashLink(item.href) ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg py-2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    handleHashLinkClick(e, item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-lg py-2 text-white/80 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="#contact"
              className="btn btn-primary w-full text-center"
              onClick={(e) => {
                handleHashLinkClick(e, '#contact');
                setIsOpen(false);
              }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;