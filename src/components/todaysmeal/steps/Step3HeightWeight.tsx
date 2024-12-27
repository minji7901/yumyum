'use client';

import React from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import NextButton from '../buttons/NextButton';
import PreviousButton from '../buttons/PreviousButton';

interface Step3HeightWeightProps {
  heightData?: number;
  weightData?: number;
  onNext: (data: { height: number; weight: number }) => void;
  onPrev: () => void;
}

type FormData = {
  height: number;
  weight: number;
};

const Step3HeightWeight = ({ onNext, onPrev, heightData, weightData }: Step3HeightWeightProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      height: heightData || undefined, 
      weight: weightData || undefined 
    }
  });

  const height = useWatch({ control, name: 'height' }); // height 값 감지
  const weight = useWatch({ control, name: 'weight' }); // weight 값 감지

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onNext(data); // 유효한 데이터 전달
  };

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center">
        <h2 className="text-2xl font-bold text-center mb-6">키와 체중을 입력하세요.</h2>

        {/* 입력 필드 */}
        <div className="w-full flex flex-col space-y-6">
          {/* 키 입력 */}
          <div className="flex flex-col">
            <label htmlFor="height" className="text-left text-lg font-semibold mb-2">
              키 (cm)
            </label>
            <input
              id="height"
              type="number"
              placeholder="키를 입력해주세요."
              min={60}
              max={300}
              {...register('height', {
                required: '키를 입력해주세요.',
                min: { value: 60, message: '키는 60cm 이상이어야 합니다.' },
                max: { value: 300, message: '키는 300cm 이하여야 합니다.' }
              })}
              className="border-2 rounded-md px-4 py-3 text-center w-full border-primary"
            />
            {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
          </div>

          {/* 체중 입력 */}
          <div className="flex flex-col">
            <label htmlFor="weight" className="text-left text-lg font-semibold mb-2">
              체중 (kg)
            </label>
            <input
              id="weight"
              type="number"
              placeholder="체중을 입력해주세요."
              min={5}
              max={700}
              {...register('weight', {
                required: '체중을 입력해주세요.',
                min: { value: 5, message: '체중은 5kg 이상이어야 합니다.' },
                max: { value: 700, message: '체중은 700kg 이하여야 합니다.' }
              })}
              className="border-2 rounded-md px-4 py-3 text-center w-full  border-primary"
            />
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
          </div>
        </div>

        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between w-full mt-6">
          <PreviousButton onClick={onPrev} />
          <NextButton
            onClick={handleSubmit(onSubmit)}
            disabled={!height || !weight} // height 또는 weight가 없으면 disabled
          />
        </div>
      </form>
    </div>
  );
};

export default Step3HeightWeight;
