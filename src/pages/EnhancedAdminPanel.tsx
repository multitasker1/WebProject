import { useState, useEffect, useRef } from 'react';
import { Users, Activity, ShoppingBag, Plus, Trash2, Ban, Upload, MessageSquare, Send, Image as ImageIcon, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PWAInstall from '../components/PWAInstall';
import FileUploadModal from '../components/FileUploadModal';
import { getDeliveryTimeline } from '../services/paymentService';

const EnhancedAdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'activities' | 'projects' | 'contacts' | 'purchases' | 'uploads'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [uploads, setUploads] = useState<any[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    imageFile: null as File | null,
    liveLink: '',
    category: 'Featured',
    featured: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
    setActivities(JSON.parse(localStorage.getItem('activities') || '[]'));
    setProjects(JSON.parse(localStorage.getItem('projects') || '[]'));
    setContacts(JSON.parse(localStorage.getItem('contacts') || '[]'));
    setPurchases(JSON.parse(localStorage.getItem('purchases') || '[]'));
    setUploads(JSON.parse(localStorage.getItem('fileUploads') || '[]'));
    setChatMessages(JSON.parse(localStorage.getItem('chatMessages') || '[]'));
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const blockUser = (userId: string) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, blocked: !u.blocked } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setNewProject({
        ...newProject,
        imageFile: file,
        image: imageUrl
      });
    }
  };

  const addProject = () => {
    if (!newProject.name || !newProject.price || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    const project = {
      id: `project-${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      price: newProject.price,
      image: newProject.image || 'https://via.placeholder.com/500x300?text=Project+Image',
      liveLink: newProject.liveLink,
      category: newProject.category,
      featured: newProject.featured,
      createdAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Reset form
    setShowProjectForm(false);
    setNewProject({
      name: '',
      description: '',
      price: '',
      image: '',
      imageFile: null,
      liveLink: '',
      category: 'Featured',
      featured: true
    });
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message = {
      id: `msg-${Date.now()}`,
      contactId: selectedContact.id,
      sender: 'admin',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...chatMessages, message];
    setChatMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const getContactMessages = (contactId: string) => {
    return chatMessages.filter(m => m.contactId === contactId);
  };

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Total Activities', value: activities.length, icon: Activity, color: 'bg-purple-500' },
    { label: 'Total Projects', value: projects.length, icon: Upload, color: 'bg-green-500' },
    { label: 'Total Purchases', value: purchases.length, icon: ShoppingBag, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive system management and control
          </p>
        </div>

        {/* PWA Install Section */}
        <div className="mb-8">
          <PWAInstall />
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}</div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
            {[
              { key: 'users', label: 'Users', count: users.length },
              { key: 'activities', label: 'Activities', count: activities.length },
              { key: 'projects', label: 'Projects', count: projects.length },
              { key: 'contacts', label: 'Messages', count: contacts.length },
              { key: 'purchases', label: 'Purchases', count: purchases.length },
              { key: 'uploads', label: 'File Uploads', count: uploads.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-shrink-0 px-6 py-4 font-medium transition whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.blocked ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {user.blocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowFileUploadModal(true);
                              }}
                              className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded transition"
                              title="Upload Files"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => blockUser(user.id)}
                              className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded transition"
                              title={user.blocked ? 'Unblock' : 'Block'}
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="space-y-4">
                {activities.slice(-30).reverse().map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            User ID: {activity.userId}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Tab with Image Upload */}
            {activeTab === 'projects' && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => setShowProjectForm(!showProjectForm)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {showProjectForm && (
                  <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Add New Project
                    </h3>
                    
                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => imageInputRef.current?.click()}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          <ImageIcon className="w-5 h-5" />
                          <span>Choose Image</span>
                        </button>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                        {newProject.image && (
                          <div className="relative w-32 h-32">
                            <img
                              src={newProject.image}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Name *"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Price (e.g., ₹29,999) *"
                        value={newProject.price}
                        onChange={(e) => setNewProject({...newProject, price: e.target.value})}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Live Project Link"
                        value={newProject.liveLink}
                        onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                      />
                      <textarea
                        placeholder="Description *"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white md:col-span-2"
                        rows={3}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Show on Homepage & Slider
                        </span>
                      </label>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={addProject}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Save Project
                      </button>
                      <button
                        onClick={() => setShowProjectForm(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                      {project.image && (
                        <img src={project.image} alt={project.name} className="w-full h-40 object-cover" />
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{project.description}</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{project.price}</p>
                        {project.featured && (
                          <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab with Chat */}
            {activeTab === 'contacts' && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Contacts List */}
                <div className="md:col-span-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Messages</h3>
                  <div className="space-y-2">
                    {contacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`w-full text-left p-3 rounded-lg transition ${
                          selectedContact?.id === contact.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <p className="font-medium truncate">{contact.name}</p>
                        <p className="text-xs truncate opacity-75">{contact.email}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {new Date(contact.timestamp).toLocaleDateString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="md:col-span-2">
                  {selectedContact ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col h-[600px]">
                      {/* Chat Header */}
                      <div className="bg-blue-600 text-white p-4">
                        <h3 className="font-semibold">{selectedContact.name}</h3>
                        <p className="text-sm opacity-90">{selectedContact.email}</p>
                        <p className="text-xs opacity-75 mt-1">Mobile: {selectedContact.mobile}</p>
                      </div>

                      {/* Original Message */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Original Request:</p>
                        <p className="text-sm text-gray-900 dark:text-white">{selectedContact.message}</p>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {getContactMessages(selectedContact.id).map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs px-4 py-2 rounded-lg ${
                                msg.sender === 'admin'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs opacity-75 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your reply..."
                            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                          />
                          <button
                            onClick={sendMessage}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-12 text-center h-[600px] flex items-center justify-center">
                      <div>
                        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-300">
                          Select a contact to view conversation
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Purchases Tab with Timeline */}
            {activeTab === 'purchases' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Payment ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Timeline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {purchases.map((purchase) => {
                      const timeline = getDeliveryTimeline(purchase.timestamp, purchase.deliveryDate);
                      return (
                        <tr key={purchase.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-mono">{purchase.paymentId}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{purchase.userId}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{purchase.projectName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">{purchase.amount}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-900 dark:text-white">
                                  {timeline.remainingDays} days remaining
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${timeline.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Due: {timeline.expectedDelivery}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => {
                                const user = users.find(u => u.id === purchase.userId);
                                if (user) {
                                  setSelectedUser({ ...user, projectId: purchase.projectId });
                                  setShowFileUploadModal(true);
                                }
                              }}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Upload Files</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* File Uploads Tab */}
            {activeTab === 'uploads' && (
              <div className="space-y-4">
                {uploads.reverse().map((upload) => (
                  <div key={upload.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Files for: {upload.userName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          User ID: {upload.userId}
                        </p>
                        {upload.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {upload.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(upload.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {upload.files.map((file: any, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                          <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      {showFileUploadModal && selectedUser && (
        <FileUploadModal
          isOpen={showFileUploadModal}
          onClose={() => {
            setShowFileUploadModal(false);
            setSelectedUser(null);
            loadData();
          }}
          userId={selectedUser.id}
          userName={selectedUser.name}
          projectId={selectedUser.projectId}
        />
      )}

      <Footer />
    </div>
  );
};

export default EnhancedAdminPanel;
