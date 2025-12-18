import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
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
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;