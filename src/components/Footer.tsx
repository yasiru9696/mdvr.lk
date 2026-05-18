import React from 'react';
import { Facebook, X, Linkedin, Instagram } from 'lucide-react';
import geoidImg from '/img/geoid.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 pt-8 pb-4">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-5">
          <div>
            <a href="#" className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-500 to-black-500 flex items-center justify-center">
                <img src={geoidImg} alt="Geoid Logo" className="h-10 w-auto" />
              </div>
              <span className="text-white font-semibold text-xl">MobileDVR.lk</span>
            </a>
            <p className="text-gray-400 mb-4">
              Leading provider of advanced mobile digital video recording solutions for fleet security and management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-colors">
                <X size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Solutions</h3>
            <ul className="space-y-0.5">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Public Transit</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Commercial Fleets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Emergency Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">School Transportation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-0.5">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">News & Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Partners</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-0.5">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">System Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Maintenance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Training Resources</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Mobile DVR.lk  All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;