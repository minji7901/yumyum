import SignForm from '@/components/sign/SignForm';

const Signup = () => {
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-142px)]">
      <h1 className="common-title">회원가입</h1>
      <div className="max-w-[500px] w-full mx-auto border border-softly rounded-xl p-[30px] shadow-md">
        <SignForm isLoginMode={false} />
      </div>
    </div>
  );
};

export default Signup;
