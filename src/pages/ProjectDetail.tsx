import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, ShoppingCart, ExternalLink, Smartphone, Tablet, Monitor, QrCode, Copy, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, projects, user, addPurchase, logActivity } = useApp();
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'paytm' | 'gpay' | 'upi'>('upi');
  const [copied, setCopied] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className={`min-h-screen pt-32 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Project not found
          </h1>
          <Link to="/projects" className="text-violet-600 hover:underline mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const deviceSizes = {
    mobile: 'w-[375px]',
    tablet: 'w-[768px]',
    desktop: 'w-full'
  };

  const handleBuyClick = () => {
    if (!user) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }
    setShowPayment(true);
    logActivity('Initiated Purchase', `Project: ${project.name}`);
  };

  const handlePaymentConfirm = () => {
    addPurchase(project.id, project.name, project.price, paymentMethod);
    logActivity('Purchase Completed', `Project: ${project.name}, Amount: ₹${project.price}`);
    toast.success('Payment initiated! We will verify and deliver your project.');
    setShowPayment(false);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText('7895227827@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/projects"
          className={`inline-flex items-center gap-2 text-sm font-medium ${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Project Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                darkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-600'
              }`}>
                {project.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">4.9</span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>(28 reviews)</span>
              </div>
            </div>

            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {project.name}
            </h1>

            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.description}
            </p>

            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Features Included
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl mb-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ₹{project.price.toLocaleString()}
                </span>
                <span className={`text-lg line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  ₹{Math.round(project.price * 1.3).toLocaleString()}
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 text-sm font-medium rounded">
                  23% OFF
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuyClick}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </button>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Responsive Preview */}
      <section className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Responsive Preview
            </h2>
            <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-gray-200 dark:bg-gray-800">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-violet-600 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  previewDevice === 'tablet'
                    ? 'bg-violet-600 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Tablet className="w-4 h-4" />
                Tablet
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-violet-600 text-white shadow-lg'
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.div
              layout
              className={`${deviceSizes[previewDevice]} max-w-full transition-all duration-500`}
            >
              <div className={`rounded-2xl overflow-hidden shadow-2xl border-8 ${
                darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-300 bg-gray-300'
              }`}>
                <div className={`h-6 flex items-center justify-center gap-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <img
                  src={project.image}
                  alt="Preview"
                  className="w-full aspect-video object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-md rounded-2xl p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Complete Payment
            </h3>

            <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex justify-between mb-2">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Project</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Amount</span>
                <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ₹{project.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-500' },
                  { id: 'paytm', name: 'Paytm', color: 'bg-blue-500' },
                  { id: 'gpay', name: 'Google Pay', color: 'bg-green-500' },
                  { id: 'upi', name: 'UPI ID', color: 'bg-orange-500' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? 'border-violet-600 bg-violet-600/10'
                        : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 ${method.color} rounded-lg mb-2 mx-auto`} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {method.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32 bg-white p-2 rounded-xl">
                  <QrCode className="w-full h-full text-gray-900" />
                </div>
              </div>
              <div className="text-center">
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Or pay using UPI ID:
                </p>
                <div className="flex items-center justify-center gap-2">
                  <code className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    7895227827@upi
                  </code>
                  <button
                    onClick={copyUPI}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className={`flex-1 py-3 rounded-xl font-medium ${
                  darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentConfirm}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
              >
                I've Paid
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
