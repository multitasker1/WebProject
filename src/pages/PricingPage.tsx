import { Check, Star, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopunderAd from '../components/ads/PopunderAd';
import NativeAd from '../components/ads/NativeAd';
import BannerAd from '../components/ads/BannerAd';

const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'BASIC',
      subtitle: 'Starter Website',
      price: '₹4,999',
      delivery: '3 Days',
      popular: false,
      features: [
        '1 Page Static Website',
        'Mobile Responsive',
        'Basic UI/UX',
        'Contact Form',
        'Basic SEO',
        '30 Days Support'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'STANDARD',
      subtitle: 'Business Website',
      price: '₹11,999',
      delivery: '7 Days',
      popular: true,
      features: [
        'Up to 5 Pages',
        'Fully Responsive',
        'Modern UI/UX',
        'Contact + WhatsApp Integration',
        'SEO Optimized Pages',
        'Performance Optimization',
        '60 Days Support'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'PROFESSIONAL',
      subtitle: 'Advanced Website',
      price: '₹18,999',
      delivery: '10-12 Days',
      popular: false,
      features: [
        'Up to 10 Pages',
        'Custom UI/UX',
        'Admin Panel',
        'Blog / Portfolio',
        'Advanced SEO',
        'Security Optimization',
        'Analytics Integration',
        '90 Days Support'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'PREMIUM',
      subtitle: 'Dynamic Web Application',
      price: '₹29,999+',
      delivery: 'As per scope',
      popular: false,
      features: [
        'Unlimited Pages',
        'Custom Dashboard',
        'User Login System',
        'Database Integration',
        'Payment Gateway',
        'API Integration',
        'High-level Security',
        '6 Months Support'
      ],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const addOnServices = [
    { name: 'SEO Booster', price: '₹3,000' },
    { name: 'Google Ads Setup', price: '₹2,000' },
    { name: 'Maintenance (Monthly)', price: '₹1,500' },
    { name: 'Speed Optimization', price: '₹2,500' },
    { name: 'Extra Page', price: '₹1,000/page' },
    { name: 'Content Writing', price: '₹500/page' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Transparent & Competitive Pricing
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include professional development and ongoing support.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all transform hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-bl-lg flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                
                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {plan.subtitle}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                  </div>
                  
                  <div className="mb-6 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      ⚡ Delivery: {plan.delivery}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/contact"
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADSTERRA BANNER AD */}
      <BannerAd />

      {/* Enterprise Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              CUSTOM ENTERPRISE
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              Custom Web Development Solutions
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div>
                <h4 className="font-semibold mb-2">Included:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Fully custom solution</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Large-scale system</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Admin + User Roles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Long-term support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Dedicated development team</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">Custom Quote</p>
                  <p className="text-blue-100">Based on requirements</p>
                </div>
              </div>
            </div>
            
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <span>Contact Us for Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Add-On Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Enhance your website with our professional add-ons
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {addOnServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADSTERRA NATIVE AD */}
      <NativeAd />

      <Footer />
      
      {/* ADSTERRA POPUNDER AD */}
      <PopunderAd />
    </div>
  );
};

export default PricingPage;
