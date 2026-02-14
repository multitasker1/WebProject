import { useEffect } from 'react';

const NativeAd = () => {
  useEffect(() => {
    // Native Ad Script - Works on all devices
    const script = document.createElement('script');
    script.src = 'https://pl28680604.effectivegatecpm.com/c1a690d6abda3d5eec6a20f85fb32f6e/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    const container = document.getElementById('container-c1a690d6abda3d5eec6a20f85fb32f6e');
    if (container && !container.hasChildNodes()) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="my-6 w-full px-4">
      <div 
        id="container-c1a690d6abda3d5eec6a20f85fb32f6e" 
        className="w-full max-w-4xl mx-auto min-h-[100px]"
      >
        {/* Native ad loads here - Responsive on all devices */}
      </div>
    </div>
  );
};

export default NativeAd;
