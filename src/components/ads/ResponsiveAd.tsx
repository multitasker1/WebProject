import { useEffect } from 'react';

interface ResponsiveAdProps {
  type?: 'banner' | 'native';
  className?: string;
}

const ResponsiveAd = ({ type = 'banner', className = '' }: ResponsiveAdProps) => {
  useEffect(() => {
    if (type === 'banner') {
      // Banner Ad - Responsive
      (window as any).atOptions = {
        'key': '434ce64f269e1eb13bd566a25bf782a5',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      const script = document.createElement('script');
      script.src = 'https://www.highperformanceformat.com/434ce64f269e1eb13bd566a25bf782a5/invoke.js';
      script.async = true;

      const container = document.getElementById('responsive-banner-ad');
      if (container && !container.querySelector('script')) {
        container.appendChild(script);
      }

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [type]);

  if (type === 'native') {
    return (
      <div className={`w-full px-2 sm:px-4 my-4 ${className}`}>
        <div className="mx-auto max-w-4xl">
          <script 
            async 
            data-cfasync="false" 
            src="https://pl28680604.effectivegatecpm.com/c1a690d6abda3d5eec6a20f85fb32f6e/invoke.js"
          />
          <div id="container-c1a690d6abda3d5eec6a20f85fb32f6e" className="min-h-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center px-2 sm:px-4 my-4 ${className}`}>
      <div 
        id="responsive-banner-ad" 
        className="w-full max-w-[728px] mx-auto overflow-hidden"
        style={{
          minHeight: '90px',
          maxWidth: '100vw'
        }}
      >
        {/* Responsive banner ad loads here */}
      </div>
    </div>
  );
};

export default ResponsiveAd;
