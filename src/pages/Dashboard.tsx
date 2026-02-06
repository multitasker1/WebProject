import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { 
  ShoppingBag, Clock, User, Settings, CreditCard, ChevronRight, Package, TrendingUp, Activity,
  Download, FileText, Archive, Image, FolderOpen, Check, Eye
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export function Dashboard() {
  const { darkMode, user, logout } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    { label: 'Total Purchases', value: user.purchases.length, icon: ShoppingBag, color: 'from-violet-500 to-indigo-500' },
    { label: 'Completed', value: user.purchases.filter(p => p.status === 'completed').length, icon: Check, color: 'from-green-500 to-emerald-500' },
    { label: 'Pending', value: user.purchases.filter(p => p.status === 'pending').length, icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: 'Total Spent', value: `₹${user.purchases.reduce((acc, p) => acc + p.amount, 0).toLocaleString()}`, icon: CreditCard, color: 'from-pink-500 to-rose-500' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'purchases', label: 'My Purchases', icon: ShoppingBag },
    { id: 'projects', label: 'My Projects', icon: FolderOpen },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'zip': return Archive;
      case 'pdf': return FileText;
      case 'image': return Image;
      default: return FileText;
    }
  };

  const handleDownload = (url: string, fileName: string) => {
    // In production, this would trigger actual file download
    toast.success(`Downloading ${fileName}...`);
    // For demo, open in new tab
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Google AdSense Banner */}
      <div className={`w-full py-2 text-center text-xs ${darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`h-16 rounded-lg flex items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
            Google AdSense Banner - pub-xxxxxxxxxx
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-violet-500/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome back, {user.name}! 👋
              </h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.email}
              </p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/projects"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
            >
              Browse Projects
            </Link>
            <button
              onClick={logout}
              className={`px-6 py-3 rounded-xl font-semibold ${
                darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100 shadow-md'
              }`}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl card-3d-subtle ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm mb-2 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className={`flex gap-2 p-2 rounded-2xl mb-8 overflow-x-auto hide-scrollbar ${darkMode ? 'bg-gray-900' : 'bg-white shadow-md'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                  : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Quick Menu */}
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Menu
                </h2>
                <div className="space-y-3">
                  {tabs.slice(1).map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                        darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          darkMode ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                          <item.icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        </div>
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Purchases */}
              <div className={`lg:col-span-2 p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Purchases
                  </h2>
                  <button
                    onClick={() => setActiveTab('purchases')}
                    className="text-sm text-violet-500 hover:text-violet-400 font-medium"
                  >
                    View All →
                  </button>
                </div>

                {user.purchases.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No purchases yet
                    </p>
                    <Link
                      to="/projects"
                      className="text-violet-600 hover:text-violet-500 font-semibold"
                    >
                      Browse Projects →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.purchases.slice(0, 4).map((purchase) => (
                      <div
                        key={purchase.id}
                        className={`flex items-center justify-between p-5 rounded-xl ${
                          darkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center`}>
                            <Package className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {purchase.projectName}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {new Date(purchase.date).toLocaleDateString()} • {purchase.paymentMethod || 'UPI'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            ₹{purchase.amount.toLocaleString()}
                          </p>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            purchase.status === 'completed' 
                              ? 'bg-green-500/20 text-green-500' 
                              : purchase.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}>
                            {purchase.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* My Purchases Tab */}
          {activeTab === 'purchases' && (
            <motion.div
              key="purchases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🛒 My Purchases
              </h2>

              {user.purchases.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className={`w-20 h-20 mx-auto mb-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    No purchases yet
                  </h3>
                  <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Start exploring our projects and make your first purchase
                  </p>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    <Package className="w-5 h-5" />
                    Browse Projects
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                        <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Project</th>
                        <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
                        <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payment Method</th>
                        <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                        <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                        <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.purchases.map((purchase) => (
                        <tr key={purchase.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {purchase.projectName}
                              </span>
                            </div>
                          </td>
                          <td className={`py-4 px-4 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            ₹{purchase.amount.toLocaleString()}
                          </td>
                          <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {purchase.paymentMethod || 'UPI'}
                          </td>
                          <td className={`py-4 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {new Date(purchase.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                              purchase.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                              purchase.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-red-500/20 text-red-500'
                            }`}>
                              {purchase.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Link
                              to={`/projects/${purchase.projectId}`}
                              className="p-2.5 rounded-xl inline-flex items-center gap-2 text-sm font-medium bg-violet-500/20 text-violet-500 hover:bg-violet-500/30"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* My Projects Tab (Received Files) */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📁 My Projects
              </h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Project files sent by admin. Download your purchased projects here.
              </p>

              {user.receivedProjects.length === 0 ? (
                <div className="text-center py-16">
                  <FolderOpen className={`w-20 h-20 mx-auto mb-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    No project files yet
                  </h3>
                  <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    After purchase, admin will send your project files here
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.receivedProjects.map((project) => {
                    const FileIcon = getFileIcon(project.fileType);
                    return (
                      <div key={project.id} className={`p-5 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            project.fileType === 'zip' ? 'bg-purple-500/20 text-purple-500' :
                            project.fileType === 'pdf' ? 'bg-red-500/20 text-red-500' :
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            <FileIcon className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.projectName}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{project.fileName}</p>
                          </div>
                        </div>
                        
                        {project.description && (
                          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {project.description}
                          </p>
                        )}

                        {project.message && (
                          <div className={`p-3 rounded-xl mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin Message:</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.message}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {project.fileSize} • {project.fileType.toUpperCase()}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(project.sentDate).toLocaleDateString()}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDownload(project.downloadUrl, project.fileName)}
                          className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
                        >
                          <Download className="w-5 h-5" />
                          Download File
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📊 Activity Log
              </h2>

              {user.activities.length === 0 ? (
                <p className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No activity recorded yet
                </p>
              ) : (
                <div className="space-y-4">
                  {user.activities.slice().reverse().map((activity) => (
                    <div
                      key={activity.id}
                      className={`flex items-start gap-4 p-5 rounded-xl ${
                        darkMode ? 'bg-gray-800' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activity.action.includes('Login') ? 'bg-green-500/20' :
                        activity.action.includes('Purchase') ? 'bg-violet-500/20' :
                        activity.action.includes('Logout') ? 'bg-red-500/20' :
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <Activity className={`w-5 h-5 ${
                          activity.action.includes('Login') ? 'text-green-500' :
                          activity.action.includes('Purchase') ? 'text-violet-500' :
                          activity.action.includes('Logout') ? 'text-red-500' :
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {activity.action}
                          </h3>
                          <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {activity.details && (
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ⚙️ Profile Settings
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <div className="flex items-center gap-3">
                    <div className={`flex-1 px-5 py-4 rounded-xl font-medium ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      {user.name}
                    </div>
                    <button className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <User className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <div className={`px-5 py-4 rounded-xl font-medium ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {user.email}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Account Type
                  </label>
                  <div className={`px-5 py-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <span className={`capitalize font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.role}</span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Member Since
                  </label>
                  <div className={`px-5 py-4 rounded-xl font-medium ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Google AdSense Bottom Banner */}
      <div className={`w-full py-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`h-24 rounded-lg flex items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-300 text-gray-400'}`}>
            Google AdSense Banner - pub-xxxxxxxxxx
          </div>
        </div>
      </div>
    </div>
  );
}
