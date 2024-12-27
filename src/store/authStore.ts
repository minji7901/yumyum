import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = Tables<'users'>;
interface AuthStore {
  user: User | null;
  isLogin: boolean;
  setUser: () => Promise<void>;
  logout: () => void;
}

const supabase = createClient();

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      isLogin: false,
      setUser: async () => {
        try {
          const {
            data: { session }
          } = await supabase.auth.getSession();

          if (session) {
            const { data: userData, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.error(error.message);
              set({ user: null, isLogin: false });
              return;
            }

            set({ user: userData, isLogin: true });
          } else {
            set({ user: null, isLogin: false });
          }
        } catch (error) {
          console.error(error);
          set({ user: null, isLogin: false });
        }
      },

      logout: () => set({ user: null, isLogin: false })
    }),
    {
      name: 'auth-storage'
    }
  )
);

export default useAuthStore;
