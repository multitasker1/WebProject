import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Youtube, Linkedin, Github, Code2, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Footer() {
  const { darkMode } = useApp();

  const socialLinks = [
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/channel/UC02d9M7WacwzYw126cTah8Q', color: 'hover:bg-red-500 hover:shadow-red-500/30' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/ashish-solanki-439b8537b/', color: 'hover:bg-blue-600 hover:shadow-blue-600/30' },
    { name: 'GitHub', icon: Github, url: 'https://github.io/mutitasker1/', color: 'hover:bg-gray-700 hover:shadow-gray-700/30' },
  ];

  const freelanceLinks = [
    { name: 'Freelancer', url: 'https://www.freelancer.com/u/ashishs957', icon: '💼', color: 'from-blue-500 to-cyan-500' },
    { name: 'Fiverr', url: '#', icon: '🎯', color: 'from-green-500 to-emerald-500' },
    { name: 'Upwork', url: '#', icon: '📊', color: 'from-teal-500 to-green-500' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Web Development',
    'Web Design',
    'E-Commerce Solutions',
    'Custom Applications',
    'SEO Optimization',
    'Maintenance & Support',
  ];

  return (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-10">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl blur-lg opacity-40" />
              </div>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Web<span className="text-violet-600">Project</span>
              </span>
            </Link>
            
            <p className={`text-base leading-relaxed mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Professional web development services in India. We create stunning, high-performance websites and web applications that drive business growth.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                    darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600 shadow-gray-200/50'
                  } ${social.color} hover:text-white`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`group flex items-center gap-3 text-base font-medium transition-all duration-300 ${
                      darkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                    }`}
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-violet-500 transition-all duration-300 rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Services
            </h3>
            <ul className="space-y-5">
              {services.map((service) => (
                <li key={service}>
                  <span className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Freelance */}
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Hire Me
            </h3>
            
            {/* Freelance Links */}
            <div className="space-y-5 mb-12">
              {freelanceLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  className={`flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 ${
                    darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className={`flex-1 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {link.name}
                  </span>
                  <ArrowUpRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <a 
                href="mailto:contact@webproject.com" 
                className={`flex items-center gap-5 text-base ${darkMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'} transition-colors`}
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-violet-500" />
                </div>
                contact@webproject.com
              </a>
              <div className={`flex items-center gap-5 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-violet-500" />
                </div>
                +91 789-522-7827
              </div>
              <div className={`flex items-center gap-5 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-violet-500" />
                </div>
                India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`relative border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className={`text-base flex items-center gap-3 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              © 2026 WebProject. Made with 
              <Heart className="w-5 h-5 text-red-500 fill-red-500" /> 
              in India
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <Link to="/privacy" className={`text-base font-medium ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={`text-base font-medium ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Terms of Service
              </Link>
              <Link to="/refund" className={`text-base font-medium ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
