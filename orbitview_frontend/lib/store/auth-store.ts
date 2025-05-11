import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,

      initialize: async () => {
        const token = localStorage.getItem('orbitview_access_token');
        if (!token) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
          });
          return;
        }

        // If we have a token, verify it and restore the session
        try {
          const response = await fetch(`${BACKEND}/api/users/me/`, {
            method: 'GET',
            headers: {
              Authorization: `JWT ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Token invalid or expired');
          }

          const userData = await response.json();
          set({
            isAuthenticated: true,
            user: userData,
            token,
            isLoading: false,
          });
        } catch (error) {
          // If token is invalid, clear everything
          localStorage.removeItem('orbitview_access_token');
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Authentication failed',
          });
        }
      },

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
        // If we're already authenticated and have a user, no need to check
        if (get().isAuthenticated && get().user) {
          return;
        }

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
            throw new Error('Token invalid or expired');
          }

          const userData = await response.json();
          set({
            isAuthenticated: true,
            user: userData,
            token,
            isLoading: false,
          });
        } catch (error) {
          localStorage.removeItem('orbitview_access_token');
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Authentication failed',
          });
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      partialize: (state) => ({ 
        // Only persist these fields
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 