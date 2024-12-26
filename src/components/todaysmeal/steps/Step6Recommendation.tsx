'use client';

import React from 'react';
import PreviousButton from '../buttons/PreviousButton';

interface Step6RecommendationProps {
  data: {
    goal?: string;
    meals?: string[];
    height?: number;
    weight?: number;
    gender?: string;
    age?: number;
    activity?: string;
  };
  onPrev: () => void;
}

const Step6Recommendation = ({ data, onPrev }: Step6RecommendationProps) => {
  const { goal, meals, height, weight, gender, age, activity } = data;

  // 로직
  const calculateCalories = () => {
    if (!height || !weight || !age || !gender || !activity) return '정보 부족';

    let bmr: number;

    if (gender === 'male') {
      bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
    } else {
      bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }

    let activityMultiplier = 1.2; // 기본값 (활동 거의 없음)
    if (activity.includes('가벼운 운동')) activityMultiplier = 1.375;
    else if (activity.includes('보통 이상의 활동')) activityMultiplier = 1.55;
    else if (activity.includes('적극적인 활동')) activityMultiplier = 1.725;
    else if (activity.includes('운동선수')) activityMultiplier = 1.9;

    return Math.round(bmr * activityMultiplier);
  };

  const recommendedCalories = calculateCalories(); //지금은 활동대사량

  // (결과 잘 나오는지 확인을 위한 테스트용)
  // TODO: 나중에 api에서 추천 칼로리에 맞게 식단 추천(운동량을 고려한 총 대사량을 구했는데 이것을 기준으로 goal에 따라 추가적인 로직 작성해야함.)

  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-bold mb-6">요약 및 추천 칼로리</h2>
      <div className="text-left space-y-4 mb-6">
        <p>
          <strong>목표:</strong> {goal || '선택 안됨'}
        </p>
        <p>
          <strong>끼니:</strong> {meals?.join(', ') || '선택 안됨'}
        </p>
        <p>
          <strong>키:</strong> {height || '-'} cm
        </p>
        <p>
          <strong>체중:</strong> {weight || '-'} kg
        </p>
        <p>
          <strong>성별:</strong> {gender === 'male' ? '남성' : '여성'}
        </p>
        <p>
          <strong>나이:</strong> {age || '-'} 세
        </p>
        <p>
          <strong>활동량:</strong> {activity || '선택 안됨'}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">활동대사량</h3>
        <p className="text-3xl font-bold text-primary">{recommendedCalories} kcal</p>
      </div>
      <PreviousButton onClick={onPrev}></PreviousButton>
    </div>
  );
};

export default Step6Recommendation;
