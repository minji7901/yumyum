'use client';

import useSocialLogin from '@/hooks/useSocialLogin';

const SocialLogin = () => {
  const { handleGoogleLogin, handleGithubLogin } = useSocialLogin();

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 border my-3 border-softly rounded-xl w-full py-2"
      >
        <p className="max-w-7">
          <img src="/img/signin/logo_google.svg" alt="구글 로고" />
        </p>
        <strong>구글 로그인</strong>
      </button>
      <button
        type="button"
        onClick={handleGithubLogin}
        className="flex items-center justify-center gap-2 my-3 border rounded-xl w-full py-2"
      >
        <p className="max-w-7">
          <img src="/img/signin/logo_github.svg" alt="깃허브 로고" />
        </p>
        <strong>깃허브 로그인</strong>
      </button>
    </>
  );
};

export default SocialLogin;
