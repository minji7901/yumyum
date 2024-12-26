import SignForm from '@/components/sign/SignForm';

const Signup = () => {
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-142px)]">
      <h1 className="common-title">회원가입</h1>
      <SignForm isLoginMode={false} />
    </div>
  );
};

export default Signup;
