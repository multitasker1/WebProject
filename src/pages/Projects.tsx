import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3X3, List, Eye, ShoppingCart, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { TopBannerAd, InArticleAd, BeforeFooterAd, BetweenCardsAd, RectangleAd } from '../components/AdSense';

export function Projects() {
  const { darkMode, projects } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'E-Commerce', 'Portfolio', 'Business', 'Blog', 'Landing Page'];

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return b.price - a.price;
      return 0;
    });

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
              🎨 Our Portfolio
            </span>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Explore Our
              <span className="block mt-3 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Web Projects
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Browse our collection of professionally designed and developed websites. Ready to launch or customize.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <TopBannerAd />

      {/* Filters & Search */}
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 md:p-8 lg:p-10 rounded-3xl ${darkMode ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white shadow-xl border border-gray-100'}`}
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-14 pr-6 py-4 md:py-5 rounded-2xl text-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:border-violet-500' 
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-violet-500'
                  } focus:outline-none focus:ring-2 focus:ring-violet-500/30`}
                />
              </div>

              {/* Sort */}
              <div className="relative w-full lg:w-auto">
                <Filter className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full lg:w-auto pl-14 pr-8 py-4 md:py-5 rounded-2xl text-lg appearance-none cursor-pointer transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700/50 border border-gray-600 text-white focus:border-violet-500' 
                      : 'bg-gray-50 border border-gray-200 text-gray-900 focus:border-violet-500'
                  } focus:outline-none focus:ring-2 focus:ring-violet-500/30`}
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* View Mode */}
              <div className={`flex gap-3 p-2 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg' 
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 md:p-4 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg' 
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 md:gap-4 mt-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 md:px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                      : darkMode 
                        ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Results Count */}
          <div className="mb-10">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing <span className="font-bold text-violet-600">{filteredProjects.length}</span> projects
            </p>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
              >
                {filteredProjects.map((project, index) => (
                  <>
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -12 }}
                      className={`card-3d group rounded-3xl overflow-hidden transition-all duration-500 ${
                        darkMode 
                          ? 'bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/50' 
                          : 'bg-white shadow-xl border border-gray-100 hover:border-violet-300'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-5 left-5">
                          <span className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 text-sm font-bold rounded-full shadow-lg">
                            {project.category}
                          </span>
                        </div>

                        {/* Views */}
                        <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                          <Eye className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-medium">{Math.floor(Math.random() * 500) + 100}</span>
                        </div>

                        {/* Overlay Buttons */}
                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                          <Link
                            to={`/projects/${project.id}`}
                            className="p-4 bg-white rounded-2xl text-gray-900 hover:bg-violet-600 hover:text-white transition-all duration-300 shadow-xl"
                          >
                            <Eye className="w-6 h-6" />
                          </Link>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-white rounded-2xl text-gray-900 hover:bg-violet-600 hover:text-white transition-all duration-300 shadow-xl"
                          >
                            <ExternalLink className="w-6 h-6" />
                          </a>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10">
                        <h3 className={`text-xl md:text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.name}
                        </h3>
                        <p className={`text-base leading-relaxed mb-6 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {project.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            (4.0)
                          </span>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Starting at</span>
                            <div className="text-2xl md:text-3xl font-bold text-violet-600">
                              ₹{project.price.toLocaleString()}
                            </div>
                          </div>
                          <Link
                            to={`/projects/${project.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Buy
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Insert Ad after every 3rd project */}
                    {(index + 1) % 3 === 0 && index !== filteredProjects.length - 1 && (
                      <div key={`ad-${index}`} className="md:col-span-2 lg:col-span-3">
                        <BetweenCardsAd />
                      </div>
                    )}
                  </>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {filteredProjects.map((project, index) => (
                  <>
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 8 }}
                      className={`card-3d group flex flex-col md:flex-row gap-8 p-8 rounded-3xl transition-all duration-500 ${
                        darkMode 
                          ? 'bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/50' 
                          : 'bg-white shadow-xl border border-gray-100 hover:border-violet-300'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative w-full md:w-80 h-56 md:h-48 rounded-2xl overflow-hidden flex-shrink-0">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-white/90 text-sm font-bold rounded-full shadow">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {project.name}
                          </h3>
                          <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {Math.floor(Math.random() * 500) + 100} views
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-3xl font-bold text-violet-600">
                            ₹{project.price.toLocaleString()}
                          </div>
                          <div className="flex gap-4">
                            <Link
                              to={`/projects/${project.id}`}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              View Details
                              <ArrowRight className="w-5 h-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Insert Ad after every 3rd project */}
                    {(index + 1) % 3 === 0 && index !== filteredProjects.length - 1 && (
                      <InArticleAd key={`ad-${index}`} />
                    )}
                  </>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No Projects Found
              </h3>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Sidebar Ad Section */}
      <section className="py-10 md:py-12">
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

      {/* Before Footer Ad */}
      <BeforeFooterAd />
    </div>
  );
}
