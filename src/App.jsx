import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CarouselSection from './components/CarouselSection';
import CustomShoeResult from './components/CustomShoeResult';
import ShoeDesignPage from './components/ShoeDesignPage';
import ProductDetailPage from './components/ProductDetailPage';
import './App.scss';

// Home Page Component
function HomePage() {
  const navigate = useNavigate();

  const handleShowCustomResult = () => {
    navigate('/custom-cloth');
  };

  return (
    <>
      {/* Global video background */}
      <video
        className="global-hero-video"
        src="/videos/hero.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="global-hero-overlay" />
      <div className="global-content">
        <Navbar />
        <HeroSection onShowCustomResult={handleShowCustomResult} />
        <CarouselSection />
      </div>
    </>
  );
}

// Custom Shoe Page Component
function CustomShoePage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <CustomShoeResult onClose={handleClose} onBack={handleBack} />
  );
}

// Shoe Design Page Component
function ShoeDesignPageRoute() {
  return <ShoeDesignPage />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom-cloth" element={<CustomShoePage />} />
        <Route path="/design" element={<ShoeDesignPageRoute />} />
        <Route path="/product/:designId" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
