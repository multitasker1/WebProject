import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: Show manual installation instructions
      alert(
        'To install this app:\n\n' +
        'Android Chrome:\n' +
        '1. Tap the menu (⋮) in browser\n' +
        '2. Tap "Add to Home screen" or "Install App"\n' +
        '3. Follow the prompts\n\n' +
        'iOS Safari:\n' +
        '1. Tap the Share button\n' +
        '2. Tap "Add to Home Screen"\n' +
        '3. Tap "Add"'
      );
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  if (isInstalled) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
        <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
          <Download className="w-5 h-5" />
          <span className="font-medium">App Installed! ✓</span>
        </div>
        <p className="text-sm text-green-600 dark:text-green-300 mt-1">
          WebProject is installed on your device
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleInstallClick}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Download className="w-5 h-5" />
        <span>Download & Install App</span>
      </button>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        Install WebProject on your device for quick access
      </p>

      {showInstallPrompt && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-start justify-between mb-2">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Install WebProject App
            </p>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Install this app on your home screen for quick and easy access when you're on the go.
          </p>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            <p>✓ Works on Android 13, 14</p>
            <p>✓ Compatible with Oppo, Vivo, Moto, Realme, Redmi</p>
            <p>✓ No Play Store required</p>
            <p>✓ Takes less than 5MB space</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWAInstall;
