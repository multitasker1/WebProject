import { useEffect } from 'react';

interface ResponsiveBannerAdProps {
  className?: string;
}

const ResponsiveBannerAd = ({ className = '' }: ResponsiveBannerAdProps) => {
  useEffect(() => {
    // Banner Ad Configuration
    (window as any).atOptions = {
      'key': '434ce64f269e1eb13bd566a25bf782a5',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    // Banner Ad Script
    const script = document.createElement('script');
    script.src = 'https://www.highperformanceformat.com/434ce64f269e1eb13bd566a25bf782a5/invoke.js';
    script.async = true;

    const container = document.getElementById('responsive-banner-ad-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`my-6 w-full ${className}`}>
      {/* Desktop Banner */}
      <div className="hidden md:flex justify-center overflow-x-auto">
        <div id="responsive-banner-ad-container" className="min-w-[728px] h-[90px]">
          {/* Banner ad loads here */}
        </div>
      </div>
      
      {/* Mobile - Show native ad instead */}
      <div className="md:hidden flex justify-center">
        <div id="container-c1a690d6abda3d5eec6a20f85fb32f6e" className="w-full"></div>
      </div>
    </div>
  );
};

export default ResponsiveBannerAd;
