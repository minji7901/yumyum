import SignForm from '@/components/sign/SignForm';

const Signin = () => {
  return (
    <div className="flex flex-col justify-center h-[calc(100vh-142px)]">
      <h1 className="common-title">로그인</h1>
      <SignForm isLoginMode={true} />
    </div>
  );
};

export default Signin;
