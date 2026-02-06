import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

// Your Real Google AdSense Publisher ID
const ADSENSE_PUB_ID = 'pub-7233890075921654';
const ADSENSE_CLIENT = `ca-${ADSENSE_PUB_ID}`;

interface AdSenseProps {
  slot?: 'top-banner' | 'bottom-banner' | 'sidebar' | 'in-article' | 'leaderboard' | 'rectangle' | 'before-footer' | 'between-cards';
  className?: string;
  responsive?: boolean;
  adSlotId?: string;
}

export function AdSense({ slot = 'top-banner', className = '', responsive = true, adSlotId = '' }: AdSenseProps) {
  const { darkMode } = useApp();
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  // Size configurations for different ad slots
  const slotConfig: Record<string, { height: string; label: string; mobileHeight?: string; icon: string; format: string }> = {
    'top-banner': { height: 'h-[100px]', mobileHeight: 'h-[70px]', label: 'Top Banner Ad (728x90)', icon: '📢', format: 'horizontal' },
    'bottom-banner': { height: 'h-[100px]', mobileHeight: 'h-[70px]', label: 'Bottom Banner Ad (728x90)', icon: '📢', format: 'horizontal' },
    'sidebar': { height: 'h-[280px]', mobileHeight: 'h-[220px]', label: 'Sidebar Ad (300x250)', icon: '📊', format: 'rectangle' },
    'in-article': { height: 'h-[150px]', mobileHeight: 'h-[120px]', label: 'In-Article Ad', icon: '📰', format: 'fluid' },
    'leaderboard': { height: 'h-[100px]', mobileHeight: 'h-[60px]', label: 'Leaderboard Ad (970x90)', icon: '🏆', format: 'horizontal' },
    'rectangle': { height: 'h-[280px]', mobileHeight: 'h-[220px]', label: 'Rectangle Ad (336x280)', icon: '⬜', format: 'rectangle' },
    'before-footer': { height: 'h-[120px]', mobileHeight: 'h-[90px]', label: 'Before Footer Ad', icon: '📍', format: 'horizontal' },
    'between-cards': { height: 'h-[130px]', mobileHeight: 'h-[100px]', label: 'Between Cards Ad', icon: '🎯', format: 'fluid' }
  };

  const config = slotConfig[slot];

  // Initialize AdSense when component mounts
  useEffect(() => {
    if (!isAdLoaded.current && adRef.current) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        isAdLoaded.current = true;
      } catch (error) {
        console.log('AdSense initialization:', error);
      }
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`w-full overflow-hidden my-8 md:my-10 lg:my-12 ${className}`}
    >
      {/* AdSense Container */}
      <div 
        className={`
          w-full rounded-2xl transition-all duration-300
          ${responsive ? `${config.mobileHeight || config.height} md:${config.height}` : config.height}
          flex items-center justify-center relative overflow-hidden
          ${darkMode 
            ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 border border-gray-700/40' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200/60'
          }
          shadow-lg shadow-black/5
        `}
        style={{ minHeight: '60px' }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl ${darkMode ? 'bg-purple-600/20' : 'bg-purple-400/20'}`} />
          <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl ${darkMode ? 'bg-indigo-600/20' : 'bg-indigo-400/20'}`} />
        </div>

        {/* Real AdSense Code - Will show when approved */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            height: '100%',
            minHeight: '60px'
          }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={adSlotId || slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Placeholder shown until ads load */}
        <div className="text-center px-6 py-4 relative z-10 absolute inset-0 flex items-center justify-center">
          {/* Ad Unit Info - Desktop */}
          <div className="hidden sm:block text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <p className={`text-sm font-bold tracking-wide ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ADVERTISEMENT
              </p>
            </div>
            <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {config.label}
            </p>
            <p className={`text-[11px] font-mono mt-2 px-4 py-1.5 rounded-full inline-block ${darkMode ? 'bg-gray-800/60 text-purple-400' : 'bg-gray-100 text-purple-600'}`}>
              Google AdSense • ca-{ADSENSE_PUB_ID}
            </p>
          </div>
          
          {/* Compact version for mobile */}
          <div className="sm:hidden text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-lg">{config.icon}</span>
              <p className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                AD
              </p>
            </div>
            <p className={`text-[10px] font-mono ${darkMode ? 'text-purple-400/70' : 'text-purple-500/70'}`}>
              {ADSENSE_PUB_ID}
            </p>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 shimmer opacity-10" />
      </div>
    </motion.div>
  );
}

// Pre-configured AdSense components for easy use
export function TopBannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      <AdSense slot="top-banner" adSlotId="top-banner-001" />
    </div>
  );
}

export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdSense slot="sidebar" adSlotId="sidebar-001" />
    </div>
  );
}

export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      <AdSense slot="in-article" adSlotId="in-article-001" />
    </div>
  );
}

export function BeforeFooterAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      <AdSense slot="before-footer" adSlotId="before-footer-001" />
    </div>
  );
}

export function RectangleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdSense slot="rectangle" adSlotId="rectangle-001" />
    </div>
  );
}

export function BetweenCardsAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      <AdSense slot="between-cards" adSlotId="between-cards-001" />
    </div>
  );
}

export function LeaderboardAd({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      <AdSense slot="leaderboard" adSlotId="leaderboard-001" />
    </div>
  );
}

// Wrapper component for multiple ads in a container
export function AdSenseContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ad-container space-y-8 md:space-y-10 ${className}`}>
      {children}
    </div>
  );
}
