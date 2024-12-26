import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import { useLoginContext } from '@/context/LoginProvider';

type User = Tables<'users'>;

export const useUser = () => {
  const { login } = useLoginContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  const getUser = async () => {
    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data } = await supabase.from('users').select('*').eq('id', session.user.id).single();
        setUser(data);
        login();
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        getUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    getUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [login]);

  return { user, loading };
};
