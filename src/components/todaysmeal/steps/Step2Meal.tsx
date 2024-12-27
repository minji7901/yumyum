'use client';

import React, { useState } from 'react';
import NextButton from '../buttons/NextButton';
import PreviousButton from '../buttons/PreviousButton';
import TodaysmealOption from '../todaysmeal_option/TodaysmealOption';

interface Step2MealProps {
  data?: string[];
  onNext: (selectedMeals: string[]) => void;
  onPrev: () => void;
}

const Step2Meal = ({ onNext, onPrev, data }: Step2MealProps) => {
  const meals = ['아침', '점심', '저녁'];

  const [selectedMeals, setSelectedMeals] = useState<string[]>(data ?? []); // 복수 선택 상태관리

  const handleMealToggle = (meal: string) => {
    setSelectedMeals((prev) => (prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]));
    // 선택한 게 이미 선택 리스트에 있으면 빼버리고, 없으면 추가
  };

  const handleNextClick = () => {
    onNext(selectedMeals); // 선택된 끼니를 전달
  };

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      <div className="w-full text-center mb-6">
        <div className="text-2xl font-bold text-center mb-4">추천받고 싶은 끼니를 알려주세요. (복수 선택 가능)</div>
        <div className="text-sm font-medium text-gray-500 mb-10">
          식단은 하루에 3끼로 나눠진 칼로리 기반으로 추천해드립니다.
        </div>

        {/* 끼니 옵션 */}
        <div className="w-full flex flex-col space-y-4">
          {meals.map((meal) => (
            <TodaysmealOption
              key={meal}
              label={meal}
              isSelected={selectedMeals.includes(meal)}
              onClick={() => handleMealToggle(meal)}
            />
          ))}
        </div>

        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between w-full mt-10">
          <PreviousButton onClick={onPrev} />
          <NextButton onClick={handleNextClick} disabled={selectedMeals.length === 0} />
        </div>
      </div>
    </div>
  );
};

export default Step2Meal;
