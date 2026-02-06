import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { TopBannerAd, InArticleAd, BeforeFooterAd } from '../components/AdSense';

export function Contact() {
  const { darkMode, addContact, logActivity } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact(formData);
    logActivity('Contact Form Submitted', `Name: ${formData.name}, Email: ${formData.email}`);
    setSubmitted(true);
    setFormData({ name: '', email: '', mobile: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { 
      icon: Mail, 
      title: 'Email Us', 
      value: 'contact@webproject.com',
      link: 'mailto:contact@webproject.com',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Phone, 
      title: 'Call Us', 
      value: '+91 789-522-7827',
      link: 'tel:+917895227827',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: MapPin, 
      title: 'Location', 
      value: 'India',
      link: '#',
      color: 'from-violet-500 to-purple-500'
    },
    { 
      icon: Clock, 
      title: 'Working Hours', 
      value: 'Mon - Sat: 9AM - 8PM',
      link: '#',
      color: 'from-orange-500 to-red-500'
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to build a website?',
      answer: 'The timeline depends on the complexity of the project. A simple static website takes 3-5 days, while complex web applications can take 2-4 weeks. We always discuss timelines upfront and stick to them.'
    },
    {
      question: 'What is your payment process?',
      answer: 'We accept UPI payments (PhonePe, Paytm, Google Pay). Typically, we require 50% advance to start the project and 50% on completion. For larger projects, we can discuss milestone-based payments.'
    },
    {
      question: 'Do you provide post-launch support?',
      answer: 'Yes! All our plans include free support ranging from 1 month to 12 months depending on the package. After that, we offer monthly maintenance plans starting at ₹1,500.'
    },
    {
      question: 'Can you redesign my existing website?',
      answer: 'Absolutely! We specialize in website redesigns. We\'ll analyze your current site, understand your goals, and create a modern, responsive design that improves user experience and conversions.'
    },
    {
      question: 'Do you offer SEO services?',
      answer: 'Yes, SEO optimization is included in most of our packages. We also offer an SEO Booster add-on package for advanced optimization including keyword research, on-page SEO, and performance improvements.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern technologies including React, Next.js, Node.js, PHP, MySQL, MongoDB, Tailwind CSS, and more. We choose the best tech stack based on your project requirements.'
    },
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
              📞 Get In Touch
            </span>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Let's Build Something
              <span className="block mt-3 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind? Let's discuss how we can help your business grow with a stunning website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <TopBannerAd />

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`card-3d text-center p-8 md:p-10 rounded-3xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/50' 
                    : 'bg-white shadow-xl border border-gray-100 hover:border-violet-300'
                }`}
              >
                <div className={`w-18 h-18 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                  <info.icon className="w-9 h-9 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {info.title}
                </h3>
                <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {info.value}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className={`py-16 md:py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
                  ✉️ Send Message
                </span>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Get Your Free Quote
                </h2>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fill out the form below and we'll get back to you within 24 hours with a custom proposal.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-12 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center"
                >
                  <CheckCircle className="w-20 h-20 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-lg opacity-90">
                    Thank you for reaching out. We'll contact you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className={`block text-base font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-6 py-5 rounded-2xl text-lg transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-800 border border-gray-700 text-white focus:border-violet-500' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                        } focus:outline-none focus:ring-2 focus:ring-violet-500/30`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className={`block text-base font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-6 py-5 rounded-2xl text-lg transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-800 border border-gray-700 text-white focus:border-violet-500' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                        } focus:outline-none focus:ring-2 focus:ring-violet-500/30`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-base font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className={`w-full px-6 py-5 rounded-2xl text-lg transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gray-800 border border-gray-700 text-white focus:border-violet-500' 
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      } focus:outline-none focus:ring-2 focus:ring-violet-500/30`}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className={`block text-base font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Message / Requirements *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full px-6 py-5 rounded-2xl text-lg transition-all duration-300 resize-none ${
                        darkMode 
                          ? 'bg-gray-800 border border-gray-700 text-white focus:border-violet-500' 
                          : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                      } focus:outline-none focus:ring-2 focus:ring-violet-500/30`}
                      placeholder="Tell us about your project, requirements, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-2xl transition-all duration-300"
                  >
                    <Send className="w-6 h-6" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {/* Why Contact Us */}
              <div className={`p-10 rounded-3xl ${darkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-gray-50 border border-gray-100'}`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Why Work With Us?
                  </h3>
                </div>
                
                <ul className="space-y-5">
                  {[
                    'Free consultation & project analysis',
                    'Custom solutions tailored to your needs',
                    'On-time delivery guaranteed',
                    '24/7 support during development',
                    'Post-launch maintenance included',
                    'Competitive & transparent pricing'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time */}
              <div className={`p-10 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white`}>
                <div className="flex items-center gap-4 mb-6">
                  <Clock className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-bold">Quick Response</h3>
                    <p className="text-white/80 text-lg">We reply within 24 hours</p>
                  </div>
                </div>
                <p className="text-lg text-white/90 leading-relaxed">
                  Our team is always ready to help. Send your query and we'll get back to you with a detailed proposal as soon as possible.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* In-Article Ad */}
      <InArticleAd />

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/10 text-violet-500 font-bold text-sm tracking-wider uppercase mb-6">
              ❓ FAQ
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Find answers to common questions about our services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full flex items-center justify-between p-8 text-left transition-all duration-300 ${
                    openFaq === index 
                      ? darkMode ? 'bg-gray-800' : 'bg-gray-50' 
                      : ''
                  }`}
                >
                  <span className={`text-lg md:text-xl font-bold pr-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    openFaq === index 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' 
                      : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-8 pb-8`}
                  >
                    <p className={`text-base md:text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
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
