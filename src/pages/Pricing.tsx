import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Clock, Headphones, Award, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { TopBannerAd, InArticleAd, BeforeFooterAd, BetweenCardsAd } from '../components/AdSense';

export function Pricing() {
  const { darkMode } = useApp();

  const plans = [
    {
      name: 'Basic',
      subtitle: 'Starter Website',
      price: '4,999',
      period: 'one-time',
      description: 'Perfect for personal websites and small businesses just getting started online.',
      features: [
        '1 Page Static Website',
        'Mobile Responsive Design',
        'Basic UI/UX Design',
        'Contact Form Integration',
        'Basic SEO Setup',
        '3 Days Delivery',
        '1 Month Free Support',
      ],
      notIncluded: [
        'Admin Panel',
        'Database Integration',
        'Payment Gateway',
      ],
      popular: false,
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Standard',
      subtitle: 'Business Website',
      price: '11,999',
      period: 'one-time',
      description: 'Ideal for growing businesses that need a professional multi-page website.',
      features: [
        'Up to 5 Pages',
        'Fully Responsive Design',
        'Modern UI/UX Design',
        'Contact + WhatsApp Integration',
        'SEO Optimized Pages',
        'Performance Optimization',
        'Social Media Integration',
        '7 Days Delivery',
        '3 Months Free Support',
      ],
      notIncluded: [
        'Admin Panel',
        'Payment Gateway',
      ],
      popular: true,
      icon: '⭐',
      color: 'from-violet-600 to-indigo-600',
    },
    {
      name: 'Professional',
      subtitle: 'Advanced Website',
      price: '18,999',
      period: 'one-time',
      description: 'For businesses requiring advanced features, blog, and custom functionality.',
      features: [
        'Up to 10 Pages',
        'Custom UI/UX Design',
        'Admin Panel',
        'Blog / Portfolio Section',
        'Advanced SEO Setup',
        'Security Optimization',
        'Speed Optimization',
        'Email Integration',
        '10-12 Days Delivery',
        '6 Months Free Support',
      ],
      notIncluded: [
        'Payment Gateway',
      ],
      popular: false,
      icon: '💎',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Premium',
      subtitle: 'Dynamic Web Application',
      price: '29,999+',
      period: 'starting from',
      description: 'Complete web application with user authentication, database, and payment integration.',
      features: [
        'Unlimited Pages',
        'Custom Dashboard',
        'User Login System',
        'Database Integration',
        'Payment Gateway Setup',
        'API Integration',
        'High-level Security',
        'Performance Optimization',
        'Email Notifications',
        'Delivery As Per Scope',
        '12 Months Free Support',
      ],
      notIncluded: [],
      popular: false,
      icon: '👑',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const enterprisePlan = {
    name: 'Enterprise',
    subtitle: 'Custom Web Development',
    description: 'Fully custom solution for large-scale systems with dedicated development and long-term support.',
    features: [
      'Fully Custom Solution',
      'Large-scale System Architecture',
      'Admin + User Role Management',
      'Custom API Development',
      'Third-party Integrations',
      'Dedicated Development Team',
      'Priority Support 24/7',
      'Long-term Maintenance',
      'Custom SLA Agreement',
    ],
    icon: '🏢',
  };

  const addons = [
    { name: 'SEO Booster Package', price: '3,000', description: 'Advanced SEO optimization for better rankings', icon: '📈' },
    { name: 'Google Ads Setup', price: '2,000', description: 'Complete Google Ads campaign setup', icon: '🎯' },
    { name: 'Monthly Maintenance', price: '1,500', description: 'Regular updates and maintenance', icon: '🔧' },
    { name: 'Speed Optimization', price: '2,500', description: 'Performance and loading optimization', icon: '⚡' },
    { name: 'Extra Page', price: '1,000', description: 'Additional page development', icon: '📄' },
    { name: 'Content Writing', price: '500', description: 'Professional content per page', icon: '✍️' },
  ];

  const guarantees = [
    { icon: Shield, title: '100% Satisfaction', description: 'Money-back guarantee if not satisfied' },
    { icon: Clock, title: 'On-time Delivery', description: 'We deliver on or before deadline' },
    { icon: Headphones, title: '24/7 Support', description: 'Round the clock assistance' },
    { icon: Award, title: 'Quality Assured', description: 'Tested and bug-free delivery' },
  ];

  return (
    <div className={`min-h-screen pt-28 pb-20 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-500 font-bold text-sm tracking-wider uppercase">
              💰 Transparent Pricing
            </span>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Simple & Affordable
              <span className="block mt-3 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Pricing Plans
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose the perfect plan for your business. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <TopBannerAd />

      {/* Pricing Cards */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative card-3d rounded-3xl overflow-hidden transition-all duration-500 ${
                  plan.popular
                    ? 'ring-4 ring-violet-500 shadow-2xl shadow-violet-500/20'
                    : darkMode
                      ? 'bg-gray-800/50 border border-gray-700/50'
                      : 'bg-white shadow-xl border border-gray-100'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-center py-3 font-bold text-sm tracking-wider">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className={`p-8 md:p-10 ${plan.popular ? 'pt-16' : ''}`}>
                  {/* Plan Icon & Name */}
                  <div className="text-center mb-8">
                    <span className="text-5xl mb-4 block">{plan.icon}</span>
                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-1">
                      <span className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                      <span className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {plan.period}
                    </p>
                  </div>

                  {/* Description */}
                  <p className={`text-base text-center leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 opacity-50">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <X className="w-4 h-4 text-gray-500" />
                        </div>
                        <span className={`text-base line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/contact"
                    className={`block w-full py-4 px-6 rounded-2xl font-bold text-center text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40'
                        : darkMode
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Article Ad */}
      <InArticleAd />

      {/* Enterprise Plan */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl overflow-hidden ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50' 
                : 'bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100'
            }`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative p-10 md:p-14 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="text-center lg:text-left">
                  <span className="text-6xl mb-6 block">{enterprisePlan.icon}</span>
                  <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {enterprisePlan.name}
                  </h3>
                  <p className="text-xl text-violet-600 font-bold mb-6">
                    {enterprisePlan.subtitle}
                  </p>
                  <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {enterprisePlan.description}
                  </p>
                  <div className="text-4xl md:text-5xl font-bold text-violet-600 mb-8">
                    Contact Us
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl transition-all duration-300"
                  >
                    Get Custom Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div>
                  <ul className="space-y-5">
                    {enterprisePlan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-5">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Between Cards Ad */}
      <BetweenCardsAd />

      {/* Add-on Services */}
      <section className={`py-16 md:py-20 lg:py-24 ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              🎯 Add-on Services
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Boost Your Website
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enhance your website with our professional add-on services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className={`card-3d p-8 md:p-10 rounded-3xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/50' 
                    : 'bg-white shadow-xl border border-gray-100 hover:border-violet-300'
                }`}
              >
                <span className="text-4xl mb-6 block">{addon.icon}</span>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {addon.name}
                </h3>
                <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {addon.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-violet-600">₹{addon.price}</span>
                  <Link
                    to="/contact"
                    className="text-violet-500 font-bold hover:text-violet-600 transition-colors"
                  >
                    Add →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              🛡️ Our Guarantees
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {guarantees.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/30">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before Footer Ad */}
      <BeforeFooterAd />
    </div>
  );
}
