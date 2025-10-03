import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './EditDesignLoading.scss';

const EditDesignLoading = ({ isVisible, onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [visibleShoes, setVisibleShoes] = useState(3);
  const [carouselOffset, setCarouselOffset] = useState(0);

  // Initialize animation
  useEffect(() => {
    if (isVisible) {
      setShowContent(true);
      setGlobalProgress(0);
      setVisibleShoes(3);
      setCarouselOffset(0);
    }
  }, [isVisible]);

  // Main animation controller
  useEffect(() => {
    if (!isVisible || !showContent) return;

    const interval = setInterval(() => {
      setGlobalProgress(prev => {
        const newProgress = prev + 1; // Increment by 1% each interval
        
        // Reveal 4th shoe at 30%
        if (newProgress >= 30 && visibleShoes === 3) {
          setVisibleShoes(4);
          setCarouselOffset(-120); // Slide left to show 4th shoe
        }
        
        // Reveal 5th shoe at 60%
        if (newProgress >= 60 && visibleShoes === 4) {
          setVisibleShoes(5);
          setCarouselOffset(-240); // Slide left to show 5th shoe
        }
        
        // Complete when reaching 100%
        if (newProgress >= 100) {
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 500); // Small delay to show completion
          return 100;
        }
        
        return newProgress;
      });
    }, 80); // 80ms interval for smooth progression (100% in ~8 seconds)

    return () => {
      clearInterval(interval);
    };
  }, [isVisible, showContent, visibleShoes, onComplete]);

  if (!isVisible) return null;
  return (
    <div className={`edit-design-loading ${showContent ? 'fade-in' : 'fade-out'}`}>
      {/* Header Navigation */}
      <Navbar />
      
      {/* Main Content Section */}
      <div className="loading-content">
        {/* Main Heading */}
        <h1 className="loading-title">EDIT YOUR DESIGN</h1>
        
        {/* Loading Spinner with Text */}
        <div className="loading-section">
          <div className="loading-spinner">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="60"
                strokeDashoffset="15"
              />
            </svg>
          </div>
          <span className="loading-text">Generating Designs</span>
        </div>

        {/* Coat Carousel - Inside main content, under "editing the design" */}
        <div className="shoe-carousel">
          <div 
            className="carousel-container"
            style={{ 
              transform: `translateX(${carouselOffset}px)`,
              transition: 'transform 0.8s ease-in-out'
            }}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className={`shoe-item ${index >= visibleShoes ? 'hidden' : ''}`}
                style={{ left: `${(index - 1) * 240}px` }}
              >
                {/* Coat Silhouette SVG - Your Custom Design */}
                <div className="shoe-silhouette">
                  <svg width="220" height="100" viewBox="0 0 512 512">
                    {/* Main coat body */}
                    <path fill="#000000" d="M397.048,355.591l-8.124-268.085c-0.312-10.298-6.569-19.48-16.039-23.539L326.62,44.138H185.378l-46.034,19.91c-9.596,4.002-15.961,13.248-16.276,23.64l-8.118,267.903c-0.115,3.788,2.201,7.228,5.756,8.545l36.434,13.502l-6.583,125.071c-0.266,5.05,3.757,9.291,8.815,9.291h193.254c5.057,0,9.081-4.241,8.815-9.291l-6.583-125.071l36.434-13.502C394.847,362.818,397.163,359.379,397.048,355.591z"/>
                    <path fill="#000000" d="M238.344,512V219.293c0-8.207,2.879-16.207,8.12-22.526l9.495-11.467l-9.466-16.255l-13.632,16.462c-7.844,9.483-12.172,21.483-12.172,33.784V512H238.344z"/>
                    <path fill="#000000" d="M315.939,68.295l15.098-5.033c2.613-0.871,4.061-3.606,3.367-6.272C330.815,43.224,308.964,0,264.83,0c-2.84,0-14.819,0-17.656,0c-44.14,0-65.995,43.223-69.583,56.99c-0.695,2.666,0.753,5.4,3.367,6.272l15.098,5.033c3.516,1.172,4.953,5.365,2.899,8.448l-11.449,17.172c-1.263,1.895-1.141,4.393,0.301,6.155l68.193,85.31l68.156-85.305c1.46-1.763,1.59-4.275,0.32-6.179l-11.435-17.152C310.985,73.66,312.424,69.465,315.939,68.295z"/>
                    <path fill="#000000" d="M167.723,176.552v-45.209c0-10.691-3.881-21.02-10.921-29.065l-27.23-31.119c-3.923,4.521-6.316,10.306-6.505,16.53l-8.118,267.903c-0.115,3.788,2.201,7.228,5.756,8.545l36.434,13.502L167.723,176.552z"/>
                    <path fill="#000000" d="M220.689,26.483v28.945c0,10.056,1.718,20.036,5.08,29.513l26.908,73.683c1.132,3.1,5.515,3.1,6.647,0l26.908-73.683c3.361-9.476,5.08-19.458,5.08-29.514V26.483C291.311,11.857,279.455,0,264.829,0h-17.655C232.546,0,220.689,11.857,220.689,26.483z"/>
                    <path fill="#000000" d="M157.14,377.636l10.583-201.085v-35.31c0-4.875-3.953-8.828-8.828-8.828s-8.828,3.953-8.828,8.828v34.846l-10.27,195.124L157.14,377.636z"/>
                    <path fill="#000000" d="M120.706,364.136l36.434,13.502l2.184-41.497l-43.3-15.985l-1.074,35.435C114.836,359.379,117.152,362.818,120.706,364.136z"/>
                    <polygon fill="#000000" points="159.325,336.139 141.982,329.738 139.799,371.211 157.14,377.636 "/>
                    <path fill="#000000" d="M201.775,330.905c-2.508-4.181-7.923-5.543-12.113-3.026l-30.879,18.528l-1.119,21.261l41.085-24.651C202.931,340.509,204.284,335.086,201.775,330.905z"/>
                    <path fill="#000000" d="M344.277,176.552v-45.209c0-10.691,3.881-21.02,10.921-29.065l27.23-31.119c3.923,4.521,6.316,10.306,6.505,16.53l8.118,267.903c0.115,3.788-2.201,7.228-5.756,8.545l-36.434,13.502L344.277,176.552z"/>
                    <path fill="#000000" d="M354.86,377.636l-10.583-201.085v-35.31c0-4.875,3.953-8.828,8.828-8.828c4.875,0,8.828,3.953,8.828,8.828v34.846l10.27,195.124L354.86,377.636z"/>
                    <path fill="#000000" d="M391.294,364.136l-36.434,13.502l-2.184-41.497l43.3-15.985l1.074,35.435C397.164,359.379,394.848,362.818,391.294,364.136z"/>
                    <polygon fill="#000000" points="352.675,336.139 370.018,329.738 372.201,371.211 354.86,377.636 "/>
                    <path fill="#000000" d="M310.225,330.905c2.508-4.181,7.923-5.543,12.113-3.026l30.879,18.528l1.119,21.261l-41.085-24.651C309.069,340.509,307.716,335.086,310.225,330.905z"/>
                    <g>
                      <circle fill="#000000" cx="264.828" cy="256" r="8.828"/>
                      <circle fill="#000000" cx="264.828" cy="361.931" r="8.828"/>
                      <circle fill="#000000" cx="264.828" cy="308.966" r="8.828"/>
                    </g>
                    <path fill="#000000" d="M264.826,0h-17.655c-14.626,0-26.483,11.857-26.483,26.483h70.621C291.309,11.857,279.453,0,264.826,0z"/>
                    
                    {/* Animated fill */}
                    <defs>
                      <clipPath id={`coat-clip-${index}`}>
                        <path d="M397.048,355.591l-8.124-268.085c-0.312-10.298-6.569-19.48-16.039-23.539L326.62,44.138H185.378l-46.034,19.91c-9.596,4.002-15.961,13.248-16.276,23.64l-8.118,267.903c-0.115,3.788,2.201,7.228,5.756,8.545l36.434,13.502l-6.583,125.071c-0.266,5.05,3.757,9.291,8.815,9.291h193.254c5.057,0,9.081-4.241,8.815-9.291l-6.583-125.071l36.434-13.502C394.847,362.818,397.163,359.379,397.048,355.591z"/>
                      </clipPath>
                    </defs>
                    <rect
                      x="0"
                      y={512 - (globalProgress / 100) * 512}
                      width="512"
                      height={(globalProgress / 100) * 512}
                      fill="#000000"
                      clipPath={`url(#coat-clip-${index})`}
                      className="coat-fill"
                    />
                  </svg>
                  
                  {/* Percentage Overlay */}
                  <div className="percentage-overlay">
                    {globalProgress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDesignLoading;
