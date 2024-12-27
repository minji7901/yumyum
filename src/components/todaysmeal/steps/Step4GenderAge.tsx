'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import NextButton from '../buttons/NextButton';
import PreviousButton from '../buttons/PreviousButton';
import TodaysmealOption from '../todaysmeal_option/TodaysmealOption';

interface Step4GenderAgeProps {
  genderData?: string;
  ageData?: number;
  onNext: (data: { gender: string; age: number }) => void;
  onPrev: () => void;
}

type FormData = {
  age: number;
};

const Step4GenderAge = ({ onNext, onPrev, genderData, ageData }: Step4GenderAgeProps) => {
  const [gender, setGender] = useState<string | null>(genderData ?? null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      age: ageData || undefined
    },
    mode: 'onChange'
  });

  const age = useWatch({ control, name: 'age' });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (gender) {
      onNext({ gender, age: data.age });
    }
  };

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center">
        <div className="text-2xl font-bold text-center mb-4">성별과 나이를 입력하세요.</div>
        <div className="text-sm font-medium text-gray-500 mb-10">
          기초 대사량 산출을 위해 사용자의 성별과 나이 정보가 필요합니다.
        </div>

        {/* 성별 옵션 */}
        <div className="flex justify-around w-full mb-4 gap-10">
          <TodaysmealOption
            label="남성"
            isSelected={gender === 'male'}
            onClick={() => setGender('male')}
            className="w-1/3"
          />
          <TodaysmealOption
            label="여성"
            isSelected={gender === 'female'}
            onClick={() => setGender('female')}
            className="w-1/3"
          />
        </div>

        {/* 나이 입력 */}
        <div className="flex flex-col w-full mt-10">
          <label htmlFor="age" className="text-left text-lg font-semibold mb-2">
            나이 (세)
          </label>
          <input
            type="number"
            placeholder="나이를 입력해주세요"
            min={10}
            max={130}
            {...register('age', {
              required: '나이를 입력해주세요.',
              min: { value: 10, message: '나이는 10세 이상이어야 합니다.' },
              max: { value: 130, message: '나이는 130세 이하여야 합니다.' }
            })}
            className="border-2 rounded-md px-4 py-3 text-center w-full border-primary"
          />
          {age?.toString().length > 0 && errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between w-full mt-10">
          <PreviousButton onClick={onPrev} />
          <NextButton
            onClick={handleSubmit(onSubmit)}
            disabled={!gender || !age} // 성별과 나이가 모두 있어야 활성화
          />
        </div>
      </form>
    </div>
  );
};

export default Step4GenderAge;
