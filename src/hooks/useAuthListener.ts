import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import useAuthStore from '@/store/authStore';

const supabase = createClient();

const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data, error } = await supabase.from('users').select('nickname').eq('id', session.user.id).single();

        if (error) {
          console.error(error);
        }

        await setUser({
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at || '',
          nickname: data?.nickname || ''
        });
      } else {
        await setUser(null);
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [setUser]);
};

export default useAuthListener;
