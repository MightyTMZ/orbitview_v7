import { create } from 'zustand';
import { BACKEND } from '@/lib/constants';

interface User {
  first_name: string;
  // Add other user fields as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BACKEND}/api/users/me/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const userData = await response.json();
      localStorage.setItem('orbitview_access_token', token);
      
      set({
        isAuthenticated: true,
        user: userData,
        token,
        isLoading: false,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
      localStorage.removeItem('orbitview_access_token');
    }
  },

  logout: () => {
    localStorage.removeItem('orbitview_access_token');
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('orbitview_access_token');
    if (!token) {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
      });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BACKEND}/api/users/me/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const userData = await response.json();
      set({
        isAuthenticated: true,
        user: userData,
        token,
        isLoading: false,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      });
      localStorage.removeItem('orbitview_access_token');
    }
  },
})); 