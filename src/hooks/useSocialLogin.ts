import { createClient } from '@/utils/supabase/client';

const useSocialLogin = () => {
  const supabase = createClient();
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('에러', error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('에러', error);
    }
  };
  return { handleGoogleLogin, handleGithubLogin };
};

export default useSocialLogin;
