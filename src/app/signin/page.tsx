import SignForm from '@/components/sign/SignForm';

const Signin = () => {
  return (
    <div>
      <h1 className="common-title">로그인</h1>
      <SignForm isLogin={true} />
    </div>
  );
};

export default Signin;
