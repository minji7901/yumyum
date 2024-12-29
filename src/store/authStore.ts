import { Tables } from '@/types/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = Tables<'users'>;
interface AuthStore {
  user: User | null;
  isLogin: boolean;
  logOut: () => void;
  setUser: (user: User | null) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isLogin: false,
      logOut: () => {
        set({ user: null, isLogin: false });
        localStorage.removeItem('auth-storage');
      },
      setUser: (user) => set({ user, isLogin: !!user })
    }),
    {
      name: 'auth-storage'
    }
  )
);

export default useAuthStore;
