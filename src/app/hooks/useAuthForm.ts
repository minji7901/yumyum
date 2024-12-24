import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// 로그인/회원가입 스키마 정의
const signinSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자리여야 합니다.')
});

const signupSchema = signinSchema
  .extend({
    confirmPassword: z.string().min(6, '비밀번호 확인은 최소 6자리여야 합니다.'),
    nickname: z.string().nonempty('닉네임을 입력해 주세요.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });

interface UseSignFormProps {
  isLogin: boolean;
  onSuccess: () => void;
}

const useSignForm = ({ isLogin, onSuccess }: UseSignFormProps) => {
  const schema = isLogin ? signinSchema : signupSchema;
  const router = useRouter();

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
    try {
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
      onSuccess();
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit
  };
};

export default useSignForm;
