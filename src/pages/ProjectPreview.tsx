import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Monitor, Tablet, Smartphone, ExternalLink, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlFromParams = searchParams.get('url');
  
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customUrl, setCustomUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState(urlFromParams || '');
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Get project details
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const defaultProjects = [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Full-featured online shopping platform with payment integration',
        price: '₹29,999',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
        liveLink: 'https://auraweb.infinityfreeapp.com/',
        category: 'Premium'
      },
      {
        id: '2',
        name: 'Business Portfolio',
        description: 'Professional portfolio website with modern UI/UX',
        price: '₹11,999',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        liveLink: 'https://www.apple.com',
        category: 'Standard'
      },
      {
        id: '3',
        name: 'Restaurant Website',
        description: 'Beautiful restaurant website with menu and online ordering',
        price: '₹18,999',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        liveLink: 'https://www.google.com',
        category: 'Professional'
      }
    ];

    const allProjects = projects.length > 0 ? projects : defaultProjects;
    const foundProject = allProjects.find((p: any) => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
      if (!currentUrl) {
        setCurrentUrl(foundProject.liveLink);
      }
    }
  }, [id, currentUrl]);

  const deviceSizes = {
    desktop: { width: '100%', height: '600px', icon: Monitor, label: 'Desktop' },
    tablet: { width: '768px', height: '1024px', icon: Tablet, label: 'Tablet' },
    mobile: { width: '375px', height: '667px', icon: Smartphone, label: 'Mobile' }
  };

  const handleCustomUrlCheck = () => {
    if (customUrl) {
      let url = customUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      setCurrentUrl(url);
    }
  };

  const handleBuyClick = () => {
    if (project) {
      navigate(`/contact?project=${encodeURIComponent(project.name)}&price=${encodeURIComponent(project.price)}`);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {project.price}
                </div>
                <div className="flex space-x-2">
                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Site</span>
                  </a>
                  <button
                    onClick={handleBuyClick}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom URL Checker */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Check Any Website's Responsiveness
          </h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter website URL (e.g., example.com)"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleCustomUrlCheck()}
            />
            <button
              onClick={handleCustomUrlCheck}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
            >
              Check Responsiveness
            </button>
          </div>
        </div>

        {/* Device View Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(deviceSizes).map(([key, { icon: Icon, label }]) => (
              <button
                key={key}
                onClick={() => setDeviceView(key as typeof deviceView)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
                  deviceView === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Live Preview - {deviceSizes[deviceView].label} View
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {deviceSizes[deviceView].width} × {deviceSizes[deviceView].height}
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
            <div 
              className="mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
              style={{
                width: deviceView === 'desktop' ? '100%' : deviceSizes[deviceView].width,
                height: deviceSizes[deviceView].height,
                maxWidth: '100%'
              }}
            >
              {currentUrl ? (
                <iframe
                  src={currentUrl}
                  title="Project Preview"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No URL specified</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ADSTERRA AD - Native Banner */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Advertisement</p>
          {/* INSERT ADSTERRA NATIVE AD SCRIPT HERE */}
          <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded">
            <span className="text-gray-400">Adsterra Native Ad</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPreview;
