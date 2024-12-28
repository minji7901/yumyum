import SignForm from '@/components/sign/SignForm';
import SocialLogin from '@/components/sign/SocialLogin';

const Signin = () => {
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-142px)]">
      <h1 className="common-title">로그인</h1>
      <div className="max-w-[500px] w-full mx-auto border border-softly rounded-xl p-[30px] shadow-md">
        <SignForm isLoginMode={true} />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Signin;
