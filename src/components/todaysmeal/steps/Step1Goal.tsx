'use client';

import React, { useState } from 'react';
import NextButton from '../buttons/NextButton';
import PreviousButton from '../buttons/PreviousButton';
import TodaysmealOption from '../todaysmeal-option/TodaysmealOption';

interface Step1GoalProps {
  goalData?: string;
  onNext: (goal: string) => void;
  onPrev: () => void;
}

const Step1Goal = ({ onNext, onPrev, goalData }: Step1GoalProps) => {
  const goals = ['확실한 체중 감량', '적당한 체중 감량', '체중 유지', '적당한 체중 증량', '확실한 체중 증량'];

  const [selectedGoal, setSelectedGoal] = useState<string | null>(goalData ?? null); // 선택 옵션 상태관리

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal); // 선택한 목표 저장
  };

  const handleNextClick = () => {
    if (selectedGoal) {
      onNext(selectedGoal); // 선택한 목표를 전달하고 다음으로 이동.
    }
  };

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      {/* 제목 및 설명 */}
      <div className="w-full text-center mb-6">
        <div className="text-2xl font-bold text-center mb-4">목표를 알려주세요.</div>
        <div className="text-sm font-medium text-gray-500 mb-10">
          궁극적으로 이루고 싶은 체중 목표에 따라 하루 중 추천 칼로리가 달라집니다.
        </div>
        {/* 목표 옵션 목록 */}
        <div className=" w-full flex flex-col space-y-4">
          {goals.map((goal) => (
            <TodaysmealOption
              key={goal}
              label={goal}
              isSelected={selectedGoal === goal}
              onClick={() => handleGoalSelect(goal)}
            />
          ))}
        </div>

        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between w-full mt-10">
          <PreviousButton onClick={onPrev} />
          <NextButton onClick={handleNextClick} disabled={!selectedGoal} />
        </div>
      </div>
    </div>
  );
};

export default Step1Goal;
