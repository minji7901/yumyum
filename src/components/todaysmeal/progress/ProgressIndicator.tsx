'use client';

import React from 'react';
import { GiHotMeal } from 'react-icons/gi';

interface ProgressIndicatorProps {
  steps: string[];
  currentStepIndex: number;
}

const ProgressIndicator = ({ steps, currentStepIndex }: ProgressIndicatorProps) => {
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <div className="flex w-full max-w-4xl justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className={`flex items-center ${index === steps.length - 1 ? '' : 'flex-1'}`}>
            {/* 마지막은 사이 선 넣을 공간 없애기*/}
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl ${
                index < currentStepIndex
                  ? 'bg-hover text-white'
                  : index === currentStepIndex
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {/* index가 현재 step 보다 작은 경우 bg-hover 주고, index가 현재 step과 같은 경우 bg-primary, index가 현재 step보다 큰 경우 아직 완료되지 않은 상태임으로 회색배경줌.  */}

              {index === steps.length - 1 ? (
                <GiHotMeal size={24} className="text-black" /> // 마지막 단계는 요리 아이콘으로 대체함.
              ) : (
                index + 1 // 그 외 단계는 숫자 표시
              )}
              {/* index는 0부터 시작 됨으로 +1 */}
            </div>

            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-2 ${index < currentStepIndex ? 'bg-primary' : 'bg-gray-300'}`}></div>
            )}
            {/* 마지막은 사이 선 만들 필요 없음 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
