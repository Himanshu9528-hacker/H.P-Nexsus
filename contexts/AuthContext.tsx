
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Reel } from '../types';
import { MOCK_POSTS, MOCK_REELS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  posts: Post[];
  reels: Reel[];
  addPost: (post: Post) => void;
  addReel: (reel: Reel) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('hp_nexus_user');
    const savedPosts = localStorage.getItem('hp_nexus_posts');
    const savedReels = localStorage.getItem('hp_nexus_reels');

    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { localStorage.removeItem('hp_nexus_user'); }
    }
    
    // Merge mocks with saved content
    if (savedPosts) {
      try { 
        const parsed = JSON.parse(savedPosts);
        setPosts([...parsed, ...MOCK_POSTS]); 
      } catch (e) { setPosts(MOCK_POSTS); }
    } else {
      setPosts(MOCK_POSTS);
    }

    if (savedReels) {
      try { 
        const parsed = JSON.parse(savedReels);
        setReels([...parsed, ...MOCK_REELS]); 
      } catch (e) { setReels(MOCK_REELS); }
    } else {
      setReels(MOCK_REELS);
    }
    
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('hp_nexus_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hp_nexus_user');
    window.location.hash = '#/auth';
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      localStorage.setItem('hp_nexus_user', JSON.stringify(newUser));
    }
  };

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
    // Store only latest user posts in local storage to avoid quota limits
    try {
      const userPosts = [post, ...posts.filter(p => p.id.startsWith('p_'))].slice(0, 10);
      localStorage.setItem('hp_nexus_posts', JSON.stringify(userPosts));
    } catch (e) {
      console.warn("Storage full, post kept in session memory.");
    }
  };

  const addReel = (reel: Reel) => {
    setReels(prev => [reel, ...prev]);
    try {
      const userReels = [reel, ...reels.filter(r => r.id.startsWith('r_'))].slice(0, 5);
      localStorage.setItem('hp_nexus_reels', JSON.stringify(userReels));
    } catch (e) {
      console.warn("Storage full, reel kept in session memory.");
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, updateUser, isAuthenticated: !!user,
      posts, reels, addPost, addReel 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
