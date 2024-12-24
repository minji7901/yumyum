import SignForm from '@/components/sign/SignForm';

const Signup = () => {
  return (
    <div>
      <h1 className="common-title">회원가입</h1>
      <SignForm isLogin={false} />
    </div>
  );
};

export default Signup;
