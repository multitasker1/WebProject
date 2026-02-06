import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, Zap, Shield, Users, Star, CheckCircle, TrendingUp, Award, Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { TopBannerAd, InArticleAd, BeforeFooterAd, BetweenCardsAd, RectangleAd } from '../components/AdSense';

export function Home() {
  const { darkMode, projects } = useApp();

  const features = [
    { icon: Code2, title: 'Custom Development', description: 'Tailored solutions built from scratch to match your unique business requirements and goals.' },
    { icon: Palette, title: 'Modern Design', description: 'Stunning UI/UX designs that captivate users and create memorable digital experiences.' },
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized performance for instant loading and seamless user interactions.' },
    { icon: Shield, title: 'Secure & Reliable', description: 'Enterprise-grade security to protect your data and ensure business continuity.' },
  ];

  const stats = [
    { value: '150+', label: 'Projects Delivered', icon: TrendingUp },
    { value: '98%', label: 'Client Satisfaction', icon: Star },
    { value: '50+', label: 'Happy Clients', icon: Users },
    { value: '5+', label: 'Years Experience', icon: Award },
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Startup Founder', text: 'WebProject transformed our online presence completely. The team delivered beyond expectations!', rating: 5 },
    { name: 'Priya Sharma', role: 'E-commerce Owner', text: 'Professional, timely, and creative. Our sales increased by 40% after the website redesign.', rating: 5 },
    { name: 'Amit Patel', role: 'Business Director', text: 'Best investment for our business. The website is fast, beautiful, and converts visitors to customers.', rating: 5 },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-violet-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob-delayed" />
          <div className="absolute bottom-1/4 left-1/2 w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30 mb-8"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
              <span className="text-sm md:text-base font-semibold text-violet-400">🚀 Trusted by 50+ Businesses in India</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              We Build
              <span className="block mt-2 md:mt-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Transform your vision into stunning, high-performance websites that drive growth and deliver exceptional user experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center items-center pt-6">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base md:text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300"
                >
                  Explore Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 font-bold text-base md:text-lg rounded-2xl border-2 transition-all duration-300 ${
                    darkMode 
                      ? 'border-gray-700 text-white hover:border-violet-500 hover:bg-violet-500/10' 
                      : 'border-gray-300 text-gray-900 hover:border-violet-500 hover:bg-violet-50'
                  }`}
                >
                  Get Free Quote
                </Link>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-12 md:pt-16">
              {['Google Partner', 'ISO Certified', 'SSL Secured'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center gap-3 text-base font-medium ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <TopBannerAd />

      {/* Features Section */}
      <section className={`py-24 md:py-32 lg:py-40 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20 lg:mb-24"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              Why Choose Us
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Features That Set Us Apart
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We combine cutting-edge technology with creative excellence to deliver outstanding digital solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`card-3d p-8 md:p-10 lg:p-12 rounded-3xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50' 
                    : 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100'
                }`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-violet-500/30">
                  <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold mb-5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Article Ad */}
      <InArticleAd />

      {/* Stats Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-95" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Between Cards Ad */}
      <BetweenCardsAd />

      {/* Featured Projects */}
      <section className={`py-24 md:py-32 lg:py-40 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20 lg:mb-24"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              Our Portfolio
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Projects
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore our latest work and see how we help businesses thrive online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`card-3d group rounded-3xl overflow-hidden transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100'
                }`}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-5 right-5">
                    <span className="px-4 py-2 bg-violet-600 text-white text-sm font-bold rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h3 className={`text-xl md:text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  <p className={`text-base leading-relaxed mb-6 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-violet-600">₹{project.price.toLocaleString()}</span>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-violet-500 font-bold hover:text-violet-600 transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 md:mt-20"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sidebar & Rectangle Ad Layout */}
      <section className={`py-16 md:py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <InArticleAd />
            </div>
            <div className="lg:col-span-1">
              <RectangleAd />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-24 md:py-32 lg:py-40 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20 lg:mb-24"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              Testimonials
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`card-3d p-8 md:p-10 rounded-3xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white shadow-xl shadow-gray-200/50 border border-gray-100'
                }`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className={`text-base md:text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10" />
        
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-violet-500/30">
              <Globe className="w-10 h-10 text-white" />
            </div>
            
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to Start Your Project?
            </h2>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Let's build something amazing together. Get a free quote and take the first step towards your digital success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className={`inline-flex items-center justify-center gap-3 px-10 py-5 font-bold text-lg rounded-2xl border-2 transition-all duration-300 ${
                  darkMode 
                    ? 'border-gray-700 text-white hover:border-violet-500' 
                    : 'border-gray-300 text-gray-900 hover:border-violet-500'
                }`}
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before Footer Ad */}
      <BeforeFooterAd />
    </div>
  );
}
