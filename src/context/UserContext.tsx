import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

type User = {
  name: string;
  email: string;
  plan: string;
  planStart?: string;
  planEnd?: string;
};

type StoredUser = {
  name: string;
  email: string;
  password: string; // hashed
  plan: string;
  planStart?: string;
  planEnd?: string;
};

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePlan: (plan: string, months?: number) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  resetPassword: (email: string, newPassword: string) => Promise<string | null>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount (for session persistence)
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Save user to localStorage on change
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // Ensure admin user exists in Firestore
  useEffect(() => {
    const ensureAdmin = async () => {
      const adminEmail = 'adminbharatgym@gmail.com';
      const adminPassword = hash('Gurcharan123');
      const adminRef = doc(db, 'users', adminEmail);
      const adminSnap = await getDoc(adminRef);
      if (!adminSnap.exists()) {
        await setDoc(adminRef, {
          name: 'Admin',
          email: adminEmail,
          password: adminPassword,
          plan: '',
          planStart: '',
          planEnd: '',
        });
      }
    };
    ensureAdmin();
  }, []);

  // Hash password (simple base64 for demo; use real hash in production)
  const hash = (str: string) => btoa(str);

  // Register new user
  const register = async (name: string, email: string, password: string): Promise<string | null> => {
    if (email === 'adminbharatgym@gmail.com') {
      return 'This email is reserved for admin.';
    }
    const userRef = doc(db, 'users', email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return 'Email already registered.';
    }
    const newUser: StoredUser = { name, email, password: hash(password), plan: '', planStart: '', planEnd: '' };
    await setDoc(userRef, newUser);
    return null;
  };

  // Login user
  const login = async (email: string, password: string): Promise<boolean> => {
    const userRef = doc(db, 'users', email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data() as StoredUser;
      if (data.password === hash(password)) {
        setUser({ name: data.name, email: data.email, plan: data.plan, planStart: data.planStart, planEnd: data.planEnd });
        return true;
      }
    }
    return false;
  };

  // Reset password
  const resetPassword = async (email: string, newPassword: string): Promise<string | null> => {
    const userRef = doc(db, 'users', email);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return 'Email not found.';
    await updateDoc(userRef, { password: hash(newPassword) });
    if (user && user.email === email) setUser(null);
    return null;
  };

  const logout = () => setUser(null);

  const updatePlan = async (plan: string, months: number = 1) => {
    if (!user) return;
    const planStart = new Date();
    const planEnd = new Date();
    planEnd.setMonth(planEnd.getMonth() + months);
    const userRef = doc(db, 'users', user.email);
    await updateDoc(userRef, {
      plan,
      planStart: planStart.toISOString(),
      planEnd: planEnd.toISOString(),
    });
    setUser({ ...user, plan, planStart: planStart.toISOString(), planEnd: planEnd.toISOString() });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updatePlan, register, resetPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}; 