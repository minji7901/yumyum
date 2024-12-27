'use client';

import Link from 'next/link';
import InputField from './InputField';
import useSignForm from '@/hooks/useSignForm';
import { useRouter } from 'next/navigation';

interface SignFormProps {
  isLoginMode: boolean;
}

const SignForm = ({ isLoginMode }: SignFormProps) => {
  const router = useRouter();

  const onSuccess = () => {
    if (isLoginMode) {
      router.push('/'); // 로그인시 홈으로 이동
    } else {
      router.push('/signin'); // 회원가입시 로그인으로 이동
    }
  };

  const { register, handleSubmit, errors, isValid, onSubmit } = useSignForm({ isLoginMode, onSuccess });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[450px] mx-auto border border-softly rounded-xl p-[30px] shadow-md"
    >
      <InputField
        id="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        register={register}
        error={errors.email?.message}
      />
      <InputField
        id="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register}
        error={errors.password?.message}
      />

      {/* 회원가입일 경우에만 보여짐 */}
      {!isLoginMode && (
        <>
          <InputField
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            register={register}
            error={errors.confirmPassword?.message}
          />
          <InputField
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            register={register}
            error={errors.nickname?.message}
          />
        </>
      )}

      <button
        type="submit"
        className={`font-bold rounded-md py-2 w-full mt-5 ${
          !isValid ? 'bg-softly cursor-not-allowed' : 'bg-primary text-white'
        }`}
        disabled={!isValid}
      >
        {isLoginMode ? '로그인' : '회원가입'}
      </button>

      <p className="flex items-center justify-center gap-2 mt-5 text-gray-400">
        {isLoginMode ? '계정이 없으신가요?' : '계정이 있으신가요?'}
        <Link href={isLoginMode ? '/signup' : '/signin'} className="text-primary hover:underline">
          {isLoginMode ? '회원가입 하러가기' : '로그인 하러가기'}
        </Link>
      </p>
    </form>
  );
};

export default SignForm;
