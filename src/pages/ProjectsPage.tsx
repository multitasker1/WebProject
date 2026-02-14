import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, ShoppingCart, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopunderAd from '../components/ads/PopunderAd';
import NativeAd from '../components/ads/NativeAd';
import BannerAd from '../components/ads/BannerAd';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(savedProjects);
  }, []);

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

  // Combine user-created projects with default projects
  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  const handleBuyClick = (project: any) => {
    // Redirect to contact page with project details in URL
    navigate(`/contact?project=${encodeURIComponent(project.name)}&price=${encodeURIComponent(project.price)}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our Live
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects Marketplace
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Browse our collection of professional live web projects. Preview, test responsiveness, and purchase ready-made solutions.
          </p>
        </div>
      </section>

      {/* ADSTERRA NATIVE AD - After Hero */}
      <NativeAd />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
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
                    {project.category || 'Featured'}
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
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {project.price}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      to={`/project/${project.id}?url=${encodeURIComponent(project.liveLink)}`}
                      className="flex items-center justify-center space-x-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      title="Responsive Preview"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Preview</span>
                    </Link>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                      title="Open Live Site"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Open</span>
                    </a>
                    <button 
                      onClick={() => handleBuyClick(project)}
                      className="flex items-center justify-center space-x-1 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition text-sm"
                      title="Purchase Project"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADSTERRA BANNER AD */}
      <BannerAd />

      <Footer />
      
      {/* ADSTERRA POPUNDER AD */}
      <PopunderAd />
    </div>
  );
};

export default ProjectsPage;
