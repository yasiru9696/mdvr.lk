import React from 'react';
import { ArrowRight, Shield, Truck, Database } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="container-custom pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="mb-5">
              Advanced <span className="text-primary-500">Mobile DVR</span> Solutions for Modern Fleet Security
            </h1>
            <p className="text-lg mb-8 text-white-300 max-w-xl">
              Driving here is unpredictable. Our AI-powered Mobile DVRs don't just record what happens, they actively help you prevent accidents, providing safety and peace of mind on every journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary">
                Request a Demo <ArrowRight size={18} className="inline ml-2" />
              </a>
              <a href="#solutions" className="btn btn-outline">
                Explore Solutions
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="text-primary-400" size={24} />
                <span className="text-white-300">Enhanced Security</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-secondary-400" size={24} />
                <span className="text-white-300">Fleet Management</span>
              </div>
              <div className="flex items-center gap-3">
                <Database className="text-accent-400" size={24} />
                <span className="text-white-300">Cloud Storage</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-dark-800 shadow-2xl">
              <iframe
              src="https://player.vimeo.com/video/1096149685?autoplay=1&muted=1&controls=0&loop=1&quality=720p&playsinline=1&noloop=0&loopcount=10"
                title="Vimeo video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full object-cover"
            ></iframe>

              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full inline-block mb-2">
                  Advanced AI Technology
                </span>
                <h3 className="text-white text-xl font-medium">
                  1920P UHD, Ultra-wide 170° Recording with AI-Enhanced Analytics
                </h3>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-radial from-primary-400/20 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-radial from-secondary-400/20 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;