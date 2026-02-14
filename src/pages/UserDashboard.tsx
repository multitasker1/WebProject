import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Activity, Settings, Clock, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PWAInstall from '../components/PWAInstall';
import BannerAd from '../components/ads/BannerAd';
import NativeAd from '../components/ads/NativeAd';
import { useAuth } from '../context/AuthContext';
import { getDeliveryTimeline } from '../services/paymentService';

const UserDashboard = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const allActivities = JSON.parse(localStorage.getItem('activities') || '[]');
      const userActivities = allActivities.filter((a: any) => a.userId === user.id);
      setActivities(userActivities.slice(-10));
      
      const allPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
      const userPurchases = allPurchases.filter((p: any) => p.userId === user.id);
      setPurchases(userPurchases);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your projects and account settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{purchases.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Purchases</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{activities.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Activities</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{user?.role}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Account Type</p>
          </div>

          <Link 
            to="/profile"
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">Settings</p>
            <p className="text-sm text-white/80">Manage Profile</p>
          </Link>
        </div>

        {/* PWA Install Section */}
        <div className="mb-8">
          <PWAInstall />
        </div>

        {/* Adsterra Native Ad - Top */}
        <NativeAd />

        {/* Adsterra Banner Ad - After Stats */}
        <BannerAd className="my-8" />

        {/* Recent Activities */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Activities
            </h2>
            
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No recent activities
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Purchase History & Delivery Timeline
            </h2>
            
            {purchases.length > 0 ? (
              <div className="space-y-4">
                {purchases.map((purchase) => {
                  const timeline = getDeliveryTimeline(purchase.timestamp, purchase.deliveryDate);
                  return (
                    <div 
                      key={purchase.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {purchase.projectName}
                        </h3>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                          {purchase.amount}
                        </span>
                      </div>
                      
                      {/* Delivery Timeline */}
                      <div className="mb-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {timeline.isCompleted ? 'Completed' : `${timeline.remainingDays} days remaining`}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {timeline.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              timeline.isCompleted ? 'bg-green-600' : 'bg-blue-600'
                            }`}
                            style={{ width: `${timeline.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Expected Delivery: {timeline.expectedDelivery}
                        </p>
                        {timeline.isCompleted && (
                          <button className="mt-2 flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                            <Download className="w-4 h-4" />
                            <span>Download Files</span>
                          </button>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Payment ID: {purchase.paymentId}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Ordered: {new Date(purchase.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No purchases yet
                </p>
                <Link
                  to="/projects"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Adsterra Native Ad - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NativeAd />
      </div>

      {/* Adsterra Banner Ad - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BannerAd />
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
