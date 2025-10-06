import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CarouselSection from './components/CarouselSection';
import CustomShoeResult from './components/CustomShoeResult';
import ShoeDesignPage from './components/ShoeDesignPage';
import ProductDetailPage from './components/ProductDetailPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(auth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} 
        />
        <Route element={<ProtectedRoute />}>
          <Route 
            path="/" 
            element={
              <>
                <Navbar onLogout={handleLogout} />
                <HomePage />
              </>
            } 
          />
          <Route 
            path="/custom-cloth" 
            element={
              <>
                <Navbar onLogout={handleLogout} />
                <CustomShoePage />
              </>
            } 
          />
          <Route 
            path="/design" 
            element={
              <>
                <Navbar onLogout={handleLogout} />
                <ShoeDesignPageRoute />
              </>
            } 
          />
          <Route 
            path="/product/:designId" 
            element={
              <>
                <Navbar onLogout={handleLogout} />
                <ProductDetailPage />
              </>
            } 
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
