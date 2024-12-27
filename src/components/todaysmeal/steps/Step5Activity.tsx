'use client';

import React, { useState } from 'react';
import NextButton from '../buttons/NextButton';
import PreviousButton from '../buttons/PreviousButton';
import TodaysmealOption from '../todaysmeal_option/TodaysmealOption';

interface Step5ActivityProps {
  activityData?: string;
  onNext: (activityLevel: string) => void;
  onPrev: () => void;
}

const Step5Activity = ({ onNext, onPrev, activityData }: Step5ActivityProps) => {
  const activities = [
    '활동이 거의 없고, 운동을 하지 않는다',
    '가벼운 운동 (일주일 기준 1~3회 정도)',
    '보통 이상의 활동 (일주일 기준 3~5회 정도)',
    '적극적인 활동 & 큰 활동 (일주일 기준 6~7회)',
    '운동선수 & 강도 높은 운동을 한다'
  ];

  const [selectedActivity, setSelectedActivity] = useState<string | null>(activityData ?? null); //선택한 활동 옵션 상태 관리

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity);
  };

  const handleNextClick = () => {
    if (selectedActivity) {
      onNext(selectedActivity);
    }
  };

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      <div className="w-full text-center mb-6">
        <div className="text-2xl font-bold text-center mb-4">하루 활동량을 알려주세요.</div>
        <div className="text-sm font-medium text-gray-500 mb-10">
          운동량에 따른 활동 대사량 산출을 위한 정보가 필요합니다.
        </div>

        {/* 활동량 옵션 */}
        <div className="w-full flex flex-col space-y-4">
          {activities.map((activity) => (
            <TodaysmealOption
              key={activity}
              label={activity}
              isSelected={selectedActivity === activity}
              onClick={() => handleActivitySelect(activity)}
            />
          ))}
        </div>

        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between w-full mt-10">
          <PreviousButton onClick={onPrev} />
          <NextButton onClick={handleNextClick} disabled={!selectedActivity} />
        </div>
      </div>
    </div>
  );
};

export default Step5Activity;
