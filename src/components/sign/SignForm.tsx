'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

interface SignFormProps {
  isLogin: boolean;
}

//로그인 스키마
const signinSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자리여야 합니다.')
});

//회원가입 스키마
const signupSchema = signinSchema
  .extend({
    confirmPassword: z.string().min(6, '비밀번호 확인은 최소 6자리여야 합니다.'),
    nickname: z.string().nonempty('닉네임을 입력해 주세요.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });

const InputField = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  register: any;
  error?: string;
}) => (
  <div className="mb-5">
    <label htmlFor={id} className="font-bold">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="border-softly border rounded-md block mt-2 px-2 py-1 w-full focus:outline-primary"
      {...register(id)}
      {...rest}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

const SignForm = ({ isLogin }: SignFormProps) => {
  const schema = isLogin ? signinSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    },
    mode: 'all' // 모든 필드가 유효해야 제출 가능
  });

  const onSubmit: SubmitHandler<typeof schema._type> = async (data) => {
    const apiUrl = isLogin ? '/api/signin' : '/api/signup';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => res.json());

    if (response.errorMsg) {
      alert(response.errorMsg);
      return;
    }

    alert(isLogin ? '로그인 성공' : '회원가입 성공');
  };

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
      {!isLogin && (
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
        {isLogin ? '로그인' : '회원가입'}
      </button>
      <p className="flex items-center justify-center gap-2 mt-5 text-gray-400">
        {isLogin ? '계정이 없으신가요?' : '계정이 있으신가요?'}
        <Link href={isLogin ? '/signup' : '/signin'} className="text-primary hover:underline">
          {isLogin ? '회원가입 하러가기' : '로그인 하러가기'}
        </Link>
      </p>
    </form>
  );
};

export default SignForm;