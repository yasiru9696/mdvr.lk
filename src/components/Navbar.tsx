import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import geoidImg from '/img/geoid.png';

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Features', href: '#features' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Insights', href: '#Insights' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'transparent-header' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br primary-500 flex items-center justify-center">
            <img src={geoidImg} alt="Geoid Logo" className="h-10 w-auto" />
          </div>
          <span className="text-white font-semibold text-4xl">MobileDVR</span>
          <span className="text-gray-300 font-rajdhani font-bold text-4xl">.lk</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="nav-link"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn btn-primary"
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
              <a 
                key={item.name} 
                href={item.href} 
                className="text-lg py-2 text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="btn btn-primary w-full text-center"
              onClick={() => setIsOpen(false)}
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