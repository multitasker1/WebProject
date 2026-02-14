import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Code, Zap, Shield, Sparkles, Eye, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopunderAd from '../components/ads/PopunderAd';
import NativeAd from '../components/ads/NativeAd';
import BannerAd from '../components/ads/BannerAd';

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const featured = projects.filter((p: any) => p.featured).slice(0, 3);
    setFeaturedProjects(featured);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Professional Web Development in India
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Your Dream
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              From stunning static websites to powerful dynamic web applications. 
              We deliver international-quality solutions tailored for the Indian market.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/pricing"
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span>View Pricing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
        
        {/* ADSTERRA BANNER AD - Placement 1: Below Hero */}
        <BannerAd />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose WebProject?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Professional services with cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Modern Technology
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with latest web technologies - React, PHP, MySQL, and modern frameworks
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick turnaround time from 3 days to 2 weeks depending on project complexity
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enterprise-grade security with CSRF, XSS protection and encrypted data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADSTERRA NATIVE AD - Placement 2: Between Sections */}
      <NativeAd />

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Check out our latest professional web projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {project.price}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={`/project/${project.id}`}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </Link>
                      <Link
                        to="/projects"
                        className="flex-1 flex items-center justify-center space-x-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a custom quote for your web development needs
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <span>Contact Us Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ADSTERRA BANNER AD - Placement 3: Before Footer */}
      <BannerAd />

      <Footer />
      
      {/* ADSTERRA POPUNDER SCRIPT - Loads on page visit */}
      <PopunderAd />
    </div>
  );
};

export default HomePage;
