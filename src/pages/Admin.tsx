import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Package, Mail, TrendingUp, Trash2, Eye, Activity, Plus, X, Settings, BarChart3,
  Upload, Gift, Send, FileText, Image, Archive, Ban, UserCheck,
  DollarSign, Search, Edit
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export function Admin() {
  const { 
    darkMode, user, users, projects, contacts, offers, uploadedFiles,
    deleteUser, blockUser, unblockUser, deleteProject, addProject,
    updateContactStatus, updatePurchaseStatus, addOffer, deleteOffer,
    uploadFile, deleteUploadedFile, sendProjectToUsers
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProject, setShowAddProject] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showSendProject, setShowSendProject] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sendMessage, setSendMessage] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [showUserDetail, setShowUserDetail] = useState<string | null>(null);
  
  const [newProject, setNewProject] = useState({
    name: '', description: '', price: '', image: '', liveLink: '', category: '', features: ''
  });
  
  const [newFile, setNewFile] = useState({
    projectName: '', description: '', fileName: '', fileType: 'zip', fileSize: '', downloadUrl: '', message: ''
  });
  
  const [newOffer, setNewOffer] = useState({
    title: '', description: '', discountPercent: '', validTill: '', targetUsers: [] as string[], isActive: true
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    { label: 'Total Users', value: users.filter(u => u.role !== 'admin').length, icon: Users, color: 'from-violet-500 to-indigo-500', change: '+12%' },
    { label: 'Total Projects', value: projects.length, icon: Package, color: 'from-green-500 to-emerald-500', change: '+5%' },
    { label: 'Contact Requests', value: contacts.length, icon: Mail, color: 'from-yellow-500 to-orange-500', change: '+8%' },
    { label: 'Total Revenue', value: `₹${users.reduce((acc, u) => acc + u.purchases.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0), 0).toLocaleString()}`, icon: TrendingUp, color: 'from-pink-500 to-rose-500', change: '+23%' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'projects', label: 'Project Upload', icon: Package },
    { id: 'files', label: 'File Upload', icon: Upload },
    { id: 'offers', label: 'Offer Upload', icon: Gift },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'activity', label: 'Activity Log', icon: Activity },
  ];

  const handleAddProject = () => {
    if (!newProject.name || !newProject.price) {
      toast.error('Please fill required fields');
      return;
    }
    addProject({
      name: newProject.name,
      description: newProject.description,
      price: Number(newProject.price),
      image: newProject.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      liveLink: newProject.liveLink || '#',
      category: newProject.category || 'General',
      features: newProject.features.split(',').map(f => f.trim()).filter(f => f)
    });
    toast.success('Project added successfully!');
    setShowAddProject(false);
    setNewProject({ name: '', description: '', price: '', image: '', liveLink: '', category: '', features: '' });
  };

  const handleUploadFile = () => {
    if (!newFile.projectName || !newFile.fileName) {
      toast.error('Please fill required fields');
      return;
    }
    uploadFile({
      projectName: newFile.projectName,
      description: newFile.description,
      fileName: newFile.fileName,
      fileType: newFile.fileType,
      fileSize: newFile.fileSize || 'Unknown',
      downloadUrl: newFile.downloadUrl || '#',
      assignedUsers: [],
      message: newFile.message
    });
    toast.success('File uploaded successfully!');
    setShowUploadFile(false);
    setNewFile({ projectName: '', description: '', fileName: '', fileType: 'zip', fileSize: '', downloadUrl: '', message: '' });
  };

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.discountPercent) {
      toast.error('Please fill required fields');
      return;
    }
    addOffer({
      title: newOffer.title,
      description: newOffer.description,
      discountPercent: Number(newOffer.discountPercent),
      validTill: newOffer.validTill,
      targetUsers: newOffer.targetUsers,
      isActive: newOffer.isActive
    });
    toast.success('Offer created successfully!');
    setShowAddOffer(false);
    setNewOffer({ title: '', description: '', discountPercent: '', validTill: '', targetUsers: [], isActive: true });
  };

  const handleSendProject = () => {
    if (!selectedFile || selectedUsers.length === 0) {
      toast.error('Please select file and users');
      return;
    }
    sendProjectToUsers(selectedFile, selectedUsers, sendMessage);
    toast.success(`Project sent to ${selectedUsers.length} user(s)!`);
    setShowSendProject(false);
    setSelectedFile(null);
    setSelectedUsers([]);
    setSendMessage('');
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    const nonAdminUsers = users.filter(u => u.role !== 'admin').map(u => u.id);
    setSelectedUsers(selectedUsers.length === nonAdminUsers.length ? [] : nonAdminUsers);
  };

  const allActivities = users.flatMap(u => 
    u.activities.map(a => ({ ...a, userName: u.name, userEmail: u.email, userId: u.id }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const allPurchases = users.flatMap(u =>
    u.purchases.map(p => ({ ...p, userName: u.name, userEmail: u.email, userId: u.id }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredUsers = users.filter(u => 
    u.role !== 'admin' && 
    (u.name.toLowerCase().includes(searchUser.toLowerCase()) || 
     u.email.toLowerCase().includes(searchUser.toLowerCase()))
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'zip': return Archive;
      case 'pdf': return FileText;
      case 'docx': return FileText;
      case 'image': return Image;
      default: return FileText;
    }
  };

  const selectedUserDetail = users.find(u => u.id === showUserDetail);

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Google AdSense Banner */}
      <div className={`w-full py-2 text-center text-xs ${darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* AdSense Placeholder - pub-xxxxxxxxxx */}
          <div className={`h-16 rounded-lg flex items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
            Google AdSense Banner - pub-xxxxxxxxxx
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🛡️ Admin Panel
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your platform, users, projects, and monitor all activity
            </p>
            <p className={`text-sm mt-1 ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}>
              Logged in as: admin@webproject.com
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'}`}>
              <Settings className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
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
                  <span className="text-sm text-green-500 font-semibold">{stat.change}</span>
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
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Recent Users */}
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Users
                  </h2>
                  <button
                    onClick={() => setActiveTab('users')}
                    className="text-sm text-violet-500 hover:text-violet-400 font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {users.filter(u => u.role !== 'admin').slice(0, 5).map((u) => (
                    <div key={u.id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{u.name}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {u.isBlocked && (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">Blocked</span>
                        )}
                        <span className={`text-xs px-3 py-1.5 rounded-full ${u.purchases.length > 0 ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                          {u.purchases.length} purchases
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h2>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className="text-sm text-violet-500 hover:text-violet-400 font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {allActivities.slice(0, 6).map((activity) => (
                    <div key={activity.id} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activity.userName} • {activity.details || 'No details'}
                      </p>
                    </div>
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
                    onClick={() => setActiveTab('payments')}
                    className="text-sm text-violet-500 hover:text-violet-400 font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                        <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>User</th>
                        <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Project</th>
                        <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
                        <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPurchases.slice(0, 5).map((purchase) => (
                        <tr key={purchase.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                          <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{purchase.userName}</td>
                          <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{purchase.projectName}</td>
                          <td className={`py-4 px-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{purchase.amount.toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                              purchase.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                              purchase.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-red-500/20 text-red-500'
                            }`}>
                              {purchase.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  👥 User Management
                </h2>
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className={`pl-12 pr-4 py-3 rounded-xl border-2 w-full md:w-80 ${
                      darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    } focus:border-violet-500 focus:outline-none`}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>User</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Purchases</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Joined</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className={`border-b ${darkMode ? 'border-gray-800 hover:bg-gray-800/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{u.name}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            u.isBlocked ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                          }`}>
                            {u.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className={`py-4 px-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {u.purchases.length}
                        </td>
                        <td className={`py-4 px-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ₹{u.purchases.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                        </td>
                        <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowUserDetail(u.id)}
                              className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-blue-500" />
                            </button>
                            <button
                              onClick={() => {
                                if (u.isBlocked) {
                                  unblockUser(u.id);
                                  toast.success('User unblocked');
                                } else {
                                  blockUser(u.id);
                                  toast.success('User blocked');
                                }
                              }}
                              className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                              title={u.isBlocked ? 'Unblock' : 'Block'}
                            >
                              {u.isBlocked ? <UserCheck className="w-4 h-4 text-green-500" /> : <Ban className="w-4 h-4 text-orange-500" />}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this user?')) {
                                  deleteUser(u.id);
                                  toast.success('User deleted');
                                }
                              }}
                              className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No users found
                </div>
              )}
            </motion.div>
          )}

          {/* Project Upload Tab */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📦 Project Management
                </h2>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add New Project
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className={`rounded-2xl overflow-hidden card-3d-subtle ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <img src={project.image} alt={project.name} className="w-full h-44 object-cover" />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>
                          {project.category}
                        </span>
                        <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ₹{project.price.toLocaleString()}
                        </span>
                      </div>
                      <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
                      <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{project.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toast.success('Edit feature coming soon!')}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                        >
                          <Edit className="w-4 h-4 inline mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this project?')) {
                              deleteProject(project.id);
                              toast.success('Project deleted');
                            }
                          }}
                          className="py-2.5 px-4 rounded-xl text-sm bg-red-500/20 text-red-500 hover:bg-red-500/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* File Upload Tab */}
          {activeTab === 'files' && (
            <motion.div
              key="files"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    📁 File Upload & Distribution
                  </h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Upload project files (ZIP, PDF, DOCX, Images) and send to users
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUploadFile(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    <Upload className="w-5 h-5" />
                    Upload File
                  </button>
                  <button
                    onClick={() => setShowSendProject(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    Send to Users
                  </button>
                </div>
              </div>

              {uploadedFiles.length === 0 ? (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No files uploaded yet</p>
                  <p className="text-sm">Upload project files to distribute to users</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uploadedFiles.map((file) => {
                    const FileIcon = getFileIcon(file.fileType);
                    return (
                      <div key={file.id} className={`p-5 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            file.fileType === 'zip' ? 'bg-purple-500/20 text-purple-500' :
                            file.fileType === 'pdf' ? 'bg-red-500/20 text-red-500' :
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            <FileIcon className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{file.projectName}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{file.fileName}</p>
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{file.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {file.fileSize} • {file.fileType.toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            Sent to {file.assignedUsers.length} users
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedFile(file.id);
                              setShowSendProject(true);
                            }}
                            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          >
                            <Send className="w-4 h-4 inline mr-1" /> Send
                          </button>
                          <button
                            onClick={() => {
                              deleteUploadedFile(file.id);
                              toast.success('File deleted');
                            }}
                            className="py-2.5 px-4 rounded-xl bg-red-500/20 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Offer Upload Tab */}
          {activeTab === 'offers' && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    🎁 Offer Management
                  </h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Create special offers for specific users or all users
                  </p>
                </div>
                <button
                  onClick={() => setShowAddOffer(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Create Offer
                </button>
              </div>

              {offers.length === 0 ? (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Gift className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No offers created yet</p>
                  <p className="text-sm">Create special offers for your users</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.map((offer) => (
                    <div key={offer.id} className={`p-5 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-3xl font-bold text-green-500`}>
                          {offer.discountPercent}% OFF
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          offer.isActive ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                        }`}>
                          {offer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{offer.title}</h3>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{offer.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Valid till: {new Date(offer.validTill).toLocaleDateString()}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {offer.targetUsers.length === 0 ? 'All Users' : `${offer.targetUsers.length} Users`}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          deleteOffer(offer.id);
                          toast.success('Offer deleted');
                        }}
                        className="w-full py-2.5 rounded-xl text-sm bg-red-500/20 text-red-500"
                      >
                        Delete Offer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📧 Contact Submissions
              </h2>

              {contacts.length === 0 ? (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No contact submissions yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className={`p-5 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {contact.email} • {contact.mobile}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            contact.status === 'new' ? 'bg-green-500/20 text-green-500' :
                            contact.status === 'read' ? 'bg-blue-500/20 text-blue-500' :
                            'bg-gray-500/20 text-gray-500'
                          }`}>
                            {contact.status}
                          </span>
                          <select
                            value={contact.status}
                            onChange={(e) => updateContactStatus(contact.id, e.target.value as 'new' | 'read' | 'responded')}
                            className={`px-3 py-2 rounded-xl text-sm ${
                              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="responded">Responded</option>
                          </select>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{contact.message}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(contact.date).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}
            >
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                💳 Payment Management
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>User</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Project</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Method</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPurchases.map((purchase) => (
                      <tr key={purchase.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                        <td className={`py-4 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{purchase.userName}</td>
                        <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{purchase.projectName}</td>
                        <td className={`py-4 px-4 font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{purchase.amount.toLocaleString()}</td>
                        <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{purchase.paymentMethod || 'UPI'}</td>
                        <td className={`py-4 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(purchase.date).toLocaleDateString()}</td>
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
                          <select
                            value={purchase.status}
                            onChange={(e) => {
                              updatePurchaseStatus(purchase.userId, purchase.id, e.target.value as 'pending' | 'completed' | 'failed');
                              toast.success('Status updated');
                            }}
                            className={`px-3 py-2 rounded-xl text-sm ${
                              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {allPurchases.length === 0 && (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No purchases yet
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
                📊 Activity Log (phpMyAdmin Style)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>#</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Timestamp</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>User</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Action</th>
                      <th className={`text-left py-4 px-4 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allActivities.map((activity, idx) => (
                      <tr key={activity.id} className={`border-b ${darkMode ? 'border-gray-800 hover:bg-gray-800/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <td className={`py-3 px-4 font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{idx + 1}</td>
                        <td className={`py-3 px-4 font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {new Date(activity.timestamp).toLocaleString()}
                        </td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.userName}</td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.userEmail}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded text-xs font-mono ${
                            activity.action.includes('Login') ? 'bg-green-500/20 text-green-500' :
                            activity.action.includes('Purchase') ? 'bg-violet-500/20 text-violet-500' :
                            activity.action.includes('Logout') ? 'bg-red-500/20 text-red-500' :
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            {activity.action}
                          </span>
                        </td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.details || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {allActivities.length === 0 && (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No activity recorded
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Project</h3>
              <button onClick={() => setShowAddProject(false)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Name *</label>
                <input type="text" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="E-Commerce Pro" />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="Project description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price (₹) *</label>
                  <input type="number" value={newProject.price} onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                    placeholder="19999" />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                  <input type="text" value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                    placeholder="E-Commerce" />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Image URL</label>
                <input type="url" value={newProject.image} onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="https://..." />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Live Demo URL</label>
                <input type="url" value={newProject.liveLink} onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="https://..." />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Features (comma separated)</label>
                <input type="text" value={newProject.features} onChange={(e) => setNewProject({ ...newProject, features: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="Feature 1, Feature 2, Feature 3" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddProject(false)} className={`flex-1 py-3.5 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  Cancel
                </button>
                <button onClick={handleAddProject} className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold">
                  Add Project
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Upload File Modal */}
      {showUploadFile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upload Project File</h3>
              <button onClick={() => setShowUploadFile(false)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Name *</label>
                <input type="text" value={newFile.projectName} onChange={(e) => setNewFile({ ...newFile, projectName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="E-Commerce Website" />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea value={newFile.description} onChange={(e) => setNewFile({ ...newFile, description: e.target.value })} rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="File description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>File Name *</label>
                  <input type="text" value={newFile.fileName} onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                    placeholder="project.zip" />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>File Type</label>
                  <select value={newFile.fileType} onChange={(e) => setNewFile({ ...newFile, fileType: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}>
                    <option value="zip">ZIP Archive</option>
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word Document</option>
                    <option value="image">Image</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>File Size</label>
                  <input type="text" value={newFile.fileSize} onChange={(e) => setNewFile({ ...newFile, fileSize: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                    placeholder="15 MB" />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Download URL</label>
                  <input type="url" value={newFile.downloadUrl} onChange={(e) => setNewFile({ ...newFile, downloadUrl: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                    placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message for Users</label>
                <textarea value={newFile.message} onChange={(e) => setNewFile({ ...newFile, message: e.target.value })} rows={2}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="Message to include with file..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowUploadFile(false)} className={`flex-1 py-3.5 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  Cancel
                </button>
                <button onClick={handleUploadFile} className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold">
                  Upload File
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Send Project Modal */}
      {showSendProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Send Project to Users</h3>
              <button onClick={() => setShowSendProject(false)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Select File */}
              <div>
                <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select File *</label>
                <div className="grid grid-cols-2 gap-3">
                  {uploadedFiles.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedFile === file.id
                          ? 'bg-violet-500/20 border-2 border-violet-500'
                          : darkMode ? 'bg-gray-800 border-2 border-gray-700' : 'bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{file.projectName}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{file.fileName}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Users */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Users *</label>
                  <button
                    onClick={selectAllUsers}
                    className="text-sm text-violet-500 hover:text-violet-400 font-medium"
                  >
                    {selectedUsers.length === users.filter(u => u.role !== 'admin').length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 border-2 rounded-xl p-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
                  {users.filter(u => u.role !== 'admin').map((u) => (
                    <label
                      key={u.id}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        selectedUsers.includes(u.id)
                          ? 'bg-violet-500/20'
                          : darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(u.id)}
                        onChange={() => toggleUserSelection(u.id)}
                        className="w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      />
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{u.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {selectedUsers.length} user(s) selected
                </p>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message (Optional)</label>
                <textarea
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="Add a message for the users..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowSendProject(false)} className={`flex-1 py-3.5 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  Cancel
                </button>
                <button onClick={handleSendProject} className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send to {selectedUsers.length} User(s)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Offer Modal */}
      {showAddOffer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create New Offer</h3>
              <button onClick={() => setShowAddOffer(false)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Offer Title *</label>
                <input type="text" value={newOffer.title} onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="Summer Sale" />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea value={newOffer.description} onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })} rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                  placeholder="Offer description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Discount % *</label>
                  <input type="number" value={newOffer.discountPercent} onChange={(e) => setNewOffer({ ...newOffer, discountPercent: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`}
                    placeholder="20" />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Valid Till</label>
                  <input type="date" value={newOffer.validTill} onChange={(e) => setNewOffer({ ...newOffer, validTill: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} focus:border-violet-500 focus:outline-none`} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target Users</label>
                  <button
                    onClick={() => {
                      const allUserIds = users.filter(u => u.role !== 'admin').map(u => u.id);
                      setNewOffer({ ...newOffer, targetUsers: newOffer.targetUsers.length === allUserIds.length ? [] : allUserIds });
                    }}
                    className="text-sm text-violet-500 font-medium"
                  >
                    {newOffer.targetUsers.length === users.filter(u => u.role !== 'admin').length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {users.filter(u => u.role !== 'admin').map((u) => (
                    <label key={u.id} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <input
                        type="checkbox"
                        checked={newOffer.targetUsers.includes(u.id)}
                        onChange={() => {
                          setNewOffer({
                            ...newOffer,
                            targetUsers: newOffer.targetUsers.includes(u.id)
                              ? newOffer.targetUsers.filter(id => id !== u.id)
                              : [...newOffer.targetUsers, u.id]
                          });
                        }}
                        className="w-4 h-4 rounded"
                      />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{u.name} ({u.email})</span>
                    </label>
                  ))}
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Leave empty to apply to all users
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddOffer(false)} className={`flex-1 py-3.5 rounded-xl font-semibold ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  Cancel
                </button>
                <button onClick={handleAddOffer} className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold">
                  Create Offer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserDetail && selectedUserDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Details</h3>
              <button onClick={() => setShowUserDetail(null)} className={`p-2 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className={`p-5 rounded-2xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                  {selectedUserDetail.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUserDetail.name}</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedUserDetail.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedUserDetail.isBlocked ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                    }`}>
                      {selectedUserDetail.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Joined: {new Date(selectedUserDetail.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase History */}
            <div className="mb-6">
              <h5 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Purchase History ({selectedUserDetail.purchases.length})</h5>
              {selectedUserDetail.purchases.length === 0 ? (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No purchases yet</p>
              ) : (
                <div className="space-y-2">
                  {selectedUserDetail.purchases.map((p) => (
                    <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{p.projectName}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(p.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{p.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          p.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                          p.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Log */}
            <div>
              <h5 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Activity Log ({selectedUserDetail.activities.length})</h5>
              {selectedUserDetail.activities.length === 0 ? (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No activity yet</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedUserDetail.activities.slice().reverse().map((a) => (
                    <div key={a.id} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{a.action}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {new Date(a.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {a.details && <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{a.details}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

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
