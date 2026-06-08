import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import CustomizationPage from './components/CustomizationPage';
import GPSPage from './components/GPSPage';
import GPSCustomizationPage from './components/GPSCustomizationPage';
import AdminSettings from './components/AdminSettings';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <ParticleBackground />
        <div className="content-overlay">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/customize/:productId" element={<CustomizationPage />} />
              <Route path="/gps" element={<GPSPage />} />
              <Route path="/gps-customize/:productId" element={<GPSCustomizationPage />} />
              <Route path="/admin" element={<AdminSettings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;