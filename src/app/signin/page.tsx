import SignForm from '@/components/sign/SignForm';
import SocialLogin from '@/components/sign/SocialLogin';

const Signin = () => {
  return (
    <div className="h-[calc(100vh-166px)] flex flex-col justify-center md:h-[calc(100vh-142px)]">
      <h1 className="common-title">로그인</h1>
      <div className="md:max-w-[500px] md:w-full md:mx-auto border border-softly rounded-xl p-[30px] mx-5 shadow-md">
        <SignForm isLoginMode={true} />
        <SocialLogin />
      </div>
    </div>
  );
};

export default Signin;
