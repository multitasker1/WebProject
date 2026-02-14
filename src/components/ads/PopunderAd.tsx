import { useEffect } from 'react';

const PopunderAd = () => {
  useEffect(() => {
    // Popunder Ad Script
    const script = document.createElement('script');
    script.src = 'https://pl28680505.effectivegatecpm.com/af/5f/96/af5f962c6b9c64936bc10f6208c1b3f0.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null; // Popunder ads don't need visible container
};

export default PopunderAd;
