import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
    navigate('custom-cloth');
  };

  return (
    <>
      {/* Global video background */}
      <video
        className="global-hero-video"
        src="/express/videos/hero.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="global-hero-overlay" />
      <div className="global-content">
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
    navigate('/express/');
  };

  const handleBack = () => {
    navigate('/express/');
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
    <Router basename="/express">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
          </>
        } />
        <Route path="/custom-cloth" element={
          <>
            <Navbar />
            <CustomShoePage />
          </>
        } />
        <Route path="/design" element={
          <>
            <Navbar />
            <ShoeDesignPageRoute />
          </>
        } />
        <Route path="/product/:designId" element={
          <>
            <Navbar />
            <ProductDetailPage />
          </>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
