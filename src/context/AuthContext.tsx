import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  photo?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  googleLogin: () => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - Check against stored users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        // Log activity
        logActivity(userWithoutPassword.id, 'login', 'User logged in');
        return true;
      }
      
      // Check for default admin
      if (email === 'admin@webproject.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@webproject.com',
          name: 'Admin',
          role: 'admin',
          createdAt: new Date().toISOString()
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        logActivity(adminUser.id, 'login', 'Admin logged in');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user exists
      if (users.find((u: any) => u.email === email)) {
        return false;
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        password, // In production, this should be hashed
        name,
        role: 'user' as const,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      logActivity(newUser.id, 'signup', 'User signed up');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const googleLogin = async (): Promise<boolean> => {
    try {
      // Simulate Google OAuth - In production, use Google OAuth SDK
      const googleUser: User = {
        id: `google-${Date.now()}`,
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'user',
        photo: 'https://ui-avatars.com/api/?name=Google+User',
        createdAt: new Date().toISOString()
      };
      
      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
      logActivity(googleUser.id, 'google_login', 'User logged in with Google');
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };

  const logout = () => {
    if (user) {
      logActivity(user.id, 'logout', 'User logged out');
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const logActivity = (userId: string, action: string, description: string) => {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.push({
      id: `activity-${Date.now()}`,
      userId,
      action,
      description,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        googleLogin,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
