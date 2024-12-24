import { useForm, SubmitHandler } from 'react-hook-form';
import { FormState } from '@/types/auth';

const useAuthForm = (isLoginMode: boolean, onSuccess: () => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormState>({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const apiUrl = isLoginMode ? '/api/signin' : '/api/signup';

    if (!data.email || !data.password || (!isLoginMode && !data.nickname)) {
      alert('모두 입력해 주세요');
      return;
    }

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

    alert(isLoginMode ? '로그인 성공' : '회원가입 성공');
    onSuccess();
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    reset
  };
};

export default useAuthForm;
