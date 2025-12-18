import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import BenefitsSection from '../components/BenefitsSection';
import SolutionsSection from '../components/SolutionsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection />
            <SolutionsSection />
            <FeaturesSection />
            <BenefitsSection />
            <TestimonialsSection />
            <ContactSection />
        </>
    );
};

export default HomePage;
