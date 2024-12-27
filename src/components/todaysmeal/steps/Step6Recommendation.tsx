'use client';

import React from 'react';
import MealPlanData from '@/types/MealPlanData';
import { calculateCalories } from '@/lib/calculateCalories'; // 활동대사량 계산 함수 가져오기

interface Step6RecommendationProps {
  data: MealPlanData;
}

const Step6Recommendation = ({ data }: Step6RecommendationProps) => {
  const { goal, meals, height, weight, gender, age, activity } = data;

  // calculateCalories 함수를 사용하여 결과 계산
  const result = calculateCalories({ height, weight, age, gender, activity, goal });

  return (
    <div className="w-full text-center">
      <div className="text-2xl font-bold mt-10 mb-6">추천 식단</div>
      
      {typeof result === 'string' ? (
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <p className="text-red-600 font-bold">{result}</p>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="text-xl font-bold">추천 칼로리 및 탄단지 비율</div>
          <p className="text-3xl font-bold text-primary">{result.calories} kcal</p>
          <div className="text-left mt-4">
            <p>
              <strong>탄수화물:</strong> {result.macros.carbs.grams}g ({result.macros.carbs.percentage}%)
            </p>
            <p>
              <strong>단백질:</strong> {result.macros.protein.grams}g ({result.macros.protein.percentage}%)
            </p>
            <p>
              <strong>지방:</strong> {result.macros.fat.grams}g ({result.macros.fat.percentage}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step6Recommendation;
