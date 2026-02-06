import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
  purchases: Purchase[];
  activities: Activity[];
  isBlocked: boolean;
  receivedProjects: ReceivedProject[];
}

interface Purchase {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
}

interface Activity {
  id: string;
  action: string;
  timestamp: string;
  details?: string;
}

interface ReceivedProject {
  id: string;
  projectName: string;
  description: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  sentDate: string;
  message?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  liveLink: string;
  category: string;
  features: string[];
  createdAt: string;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  validTill: string;
  targetUsers: string[];
  isActive: boolean;
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'responded';
}

interface UploadedFile {
  id: string;
  projectName: string;
  description: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  uploadDate: string;
  assignedUsers: string[];
  message?: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  users: User[];
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  deleteUser: (id: string) => void;
  contacts: ContactSubmission[];
  addContact: (contact: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => void;
  updateContactStatus: (id: string, status: ContactSubmission['status']) => void;
  addPurchase: (projectId: string, projectName: string, amount: number, paymentMethod: string) => void;
  updatePurchaseStatus: (userId: string, purchaseId: string, status: Purchase['status']) => void;
  logActivity: (action: string, details?: string) => void;
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id' | 'createdAt'>) => void;
  deleteOffer: (id: string) => void;
  uploadedFiles: UploadedFile[];
  uploadFile: (file: Omit<UploadedFile, 'id' | 'uploadDate'>) => void;
  deleteUploadedFile: (id: string) => void;
  sendProjectToUsers: (fileId: string, userIds: string[], message?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Pro',
    description: 'Complete e-commerce solution with payment gateway, inventory management, and admin panel.',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    liveLink: '#preview',
    category: 'E-Commerce',
    features: ['Payment Gateway', 'Admin Panel', 'Inventory', 'Analytics'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Portfolio Elite',
    description: 'Stunning portfolio website with animations, dark mode, and contact form.',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    liveLink: '#preview',
    category: 'Portfolio',
    features: ['Animations', 'Dark Mode', 'Contact Form', 'SEO Ready'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Business Hub',
    description: 'Professional business website with blog, testimonials, and lead generation.',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    liveLink: '#preview',
    category: 'Business',
    features: ['Blog System', 'Lead Gen', 'Testimonials', 'Newsletter'],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'SaaS Dashboard',
    description: 'Modern SaaS dashboard with charts, user management, and API integration.',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    liveLink: '#preview',
    category: 'Dashboard',
    features: ['Charts', 'User Roles', 'API Ready', 'Real-time Data'],
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Restaurant Pro',
    description: 'Restaurant website with online ordering, menu management, and reservations.',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    liveLink: '#preview',
    category: 'Restaurant',
    features: ['Online Ordering', 'Menu CMS', 'Reservations', 'Reviews'],
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Education LMS',
    description: 'Learning management system with courses, quizzes, and progress tracking.',
    price: 44999,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    liveLink: '#preview',
    category: 'Education',
    features: ['Courses', 'Quizzes', 'Certificates', 'Progress Tracking'],
    createdAt: new Date().toISOString()
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@webproject.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
        purchases: [],
        activities: [],
        isBlocked: false,
        receivedProjects: []
      },
      {
        id: 'user-1',
        name: 'Demo User',
        email: 'user@demo.com',
        role: 'user',
        createdAt: new Date().toISOString(),
        purchases: [
          {
            id: 'p1',
            projectId: '1',
            projectName: 'E-Commerce Pro',
            amount: 24999,
            date: new Date().toISOString(),
            status: 'completed',
            paymentMethod: 'UPI'
          }
        ],
        activities: [
          {
            id: 'a1',
            action: 'Account Created',
            timestamp: new Date().toISOString(),
            details: 'User registered successfully'
          }
        ],
        isBlocked: false,
        receivedProjects: []
      }
    ];
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : sampleProjects;
  });

  const [contacts, setContacts] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('offers');
    return saved ? JSON.parse(saved) : [];
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
    const saved = localStorage.getItem('uploadedFiles');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Admin credentials check
    if (email === 'admin@webproject.com' && password === 'Admin@123') {
      const adminUser = users.find(u => u.email === 'admin@webproject.com');
      if (adminUser) {
        const activity: Activity = {
          id: Date.now().toString(),
          action: 'Admin Login',
          timestamp: new Date().toISOString(),
          details: 'Admin logged in successfully'
        };
        const updatedUser = { ...adminUser, activities: [...adminUser.activities, activity] };
        setUser(updatedUser);
        setUsers(users.map(u => u.id === adminUser.id ? updatedUser : u));
        return true;
      }
    }

    const foundUser = users.find(u => u.email === email);
    if (foundUser && !foundUser.isBlocked) {
      const activity: Activity = {
        id: Date.now().toString(),
        action: 'Login',
        timestamp: new Date().toISOString(),
        details: 'User logged in successfully'
      };
      const updatedUser = { ...foundUser, activities: [...foundUser.activities, activity] };
      setUser(updatedUser);
      setUsers(users.map(u => u.id === foundUser.id ? updatedUser : u));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    void _password;
    if (users.find(u => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
      purchases: [],
      activities: [{
        id: Date.now().toString(),
        action: 'Account Created',
        timestamp: new Date().toISOString(),
        details: 'New account registration'
      }],
      isBlocked: false,
      receivedProjects: []
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    if (user) {
      const activity: Activity = {
        id: Date.now().toString(),
        action: 'Logout',
        timestamp: new Date().toISOString()
      };
      setUsers(users.map(u => u.id === user.id ? { ...u, activities: [...u.activities, activity] } : u));
    }
    setUser(null);
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...projectData } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const blockUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isBlocked: true } : u));
  };

  const unblockUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isBlocked: false } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addContact = (contact: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => {
    setContacts([...contacts, {
      ...contact,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'new'
    }]);
  };

  const updateContactStatus = (id: string, status: ContactSubmission['status']) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
  };

  const addPurchase = (projectId: string, projectName: string, amount: number, paymentMethod: string) => {
    if (user) {
      const purchase: Purchase = {
        id: Date.now().toString(),
        projectId,
        projectName,
        amount,
        date: new Date().toISOString(),
        status: 'pending',
        paymentMethod
      };
      const updatedUser = { ...user, purchases: [...user.purchases, purchase] };
      setUser(updatedUser);
      setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const updatePurchaseStatus = (userId: string, purchaseId: string, status: Purchase['status']) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          purchases: u.purchases.map(p => p.id === purchaseId ? { ...p, status } : p)
        };
      }
      return u;
    }));
    if (user && user.id === userId) {
      setUser({
        ...user,
        purchases: user.purchases.map(p => p.id === purchaseId ? { ...p, status } : p)
      });
    }
  };

  const logActivity = (action: string, details?: string) => {
    if (user) {
      const activity: Activity = {
        id: Date.now().toString(),
        action,
        timestamp: new Date().toISOString(),
        details
      };
      const updatedUser = { ...user, activities: [...user.activities, activity] };
      setUser(updatedUser);
      setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const addOffer = (offer: Omit<Offer, 'id' | 'createdAt'>) => {
    const newOffer: Offer = {
      ...offer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setOffers([...offers, newOffer]);
  };

  const deleteOffer = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const uploadFile = (file: Omit<UploadedFile, 'id' | 'uploadDate'>) => {
    const newFile: UploadedFile = {
      ...file,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString()
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const deleteUploadedFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const sendProjectToUsers = (fileId: string, userIds: string[], message?: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    const receivedProject: ReceivedProject = {
      id: Date.now().toString(),
      projectName: file.projectName,
      description: file.description,
      fileName: file.fileName,
      fileType: file.fileType,
      fileSize: file.fileSize,
      downloadUrl: file.downloadUrl,
      sentDate: new Date().toISOString(),
      message
    };

    setUsers(users.map(u => {
      if (userIds.includes(u.id)) {
        return {
          ...u,
          receivedProjects: [...u.receivedProjects, receivedProject]
        };
      }
      return u;
    }));

    // Update file's assigned users
    setUploadedFiles(uploadedFiles.map(f => {
      if (f.id === fileId) {
        return { ...f, assignedUsers: [...new Set([...f.assignedUsers, ...userIds])] };
      }
      return f;
    }));

    // Update current user if they received the project
    if (user && userIds.includes(user.id)) {
      setUser({
        ...user,
        receivedProjects: [...user.receivedProjects, receivedProject]
      });
    }
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      user,
      login,
      signup,
      logout,
      isAdmin: user?.role === 'admin',
      projects,
      addProject,
      updateProject,
      deleteProject,
      users,
      blockUser,
      unblockUser,
      deleteUser,
      contacts,
      addContact,
      updateContactStatus,
      addPurchase,
      updatePurchaseStatus,
      logActivity,
      offers,
      addOffer,
      deleteOffer,
      uploadedFiles,
      uploadFile,
      deleteUploadedFile,
      sendProjectToUsers
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
