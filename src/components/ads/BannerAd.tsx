import { useEffect, useState } from 'react';

interface BannerAdProps {
  className?: string;
}

const BannerAd = ({ className = '' }: BannerAdProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Banner Ad Configuration - Responsive
    const adKey = isMobile 
      ? '434ce64f269e1eb13bd566a25bf782a5' // Use same key but different container
      : '434ce64f269e1eb13bd566a25bf782a5';

    (window as any).atOptions = {
      'key': adKey,
      'format': 'iframe',
      'height': isMobile ? 50 : 90,
      'width': isMobile ? 320 : 728,
      'params': {}
    };

    // Banner Ad Script
    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;

    const containerId = isMobile ? 'banner-ad-mobile' : 'banner-ad-desktop';
    const container = document.getElementById(containerId);
    
    if (container) {
      container.innerHTML = ''; // Clear previous ads
      container.appendChild(script);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isMobile]);

  return (
    <div className={`my-6 flex justify-center w-full ${className}`}>
      {/* Mobile Banner (320x50) */}
      <div 
        id="banner-ad-mobile" 
        className="md:hidden w-[320px] h-[50px] mx-auto"
      >
        {/* Mobile banner ad loads here */}
      </div>
      
      {/* Desktop Banner (728x90) */}
      <div 
        id="banner-ad-desktop" 
        className="hidden md:block w-[728px] h-[90px] mx-auto"
      >
        {/* Desktop banner ad loads here */}
      </div>
    </div>
  );
};

export default BannerAd;
