import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = Tables<'users'>;
interface AuthStore {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const supabase = createClient();

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isLogin: false,
      setUser: (user) => set({ user, isLogin: !!user }),

      logout: () => {
        set({ user: null, isLogin: false });

        localStorage.removeItem('supabase.auth.token');
        document.cookie = 'supabase.auth.token=; Max-Age=0'; 
        supabase.auth.signOut();
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

export default useAuthStore;
