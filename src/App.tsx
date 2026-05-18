import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import SolutionsSection from './components/SolutionsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="content-overlay">
        <Navbar />
        <main>
          <HeroSection />
          <SolutionsSection />
          <FeaturesSection />
          <BenefitsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;