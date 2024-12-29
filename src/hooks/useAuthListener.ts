'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import useAuthStore from '@/store/authStore';

const supabase = createClient();

const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Supabase Auth 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {

      if (session) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('id, email, nickname, created_at')
          .eq('id', session.user.id)
          .single();

        if (error || !userData) {
          console.error('사용자 데이터 조회 실패:', error);
          return;
        }

        // 상태 업데이트
        setUser({
          id: userData.id,
          email: userData.email,
          nickname: userData.nickname || '',
          created_at: userData.created_at || ''
        });
      } else {
        // 로그아웃 상태 처리
        setUser(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setUser]);
};

export default useAuthListener;
