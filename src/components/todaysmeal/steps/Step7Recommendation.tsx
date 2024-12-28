'use client';

import React from 'react';
import useRecommend from '@/hooks/useRecommend';
import MealPlanData from '@/components/todaysmeal/types/MealPlanData';
import { calculateCalories } from '@/lib/calculateCalories';

interface Step7RecommendationProps {
  data: MealPlanData;
}

const Step7Recommendation = ({ data }: Step7RecommendationProps) => {
  const { goal, height, weight, gender, age, activity, preferredFoods } = data;

  // 활동 대사량 및 탄단지 비율 계산
  const result = calculateCalories({ height, weight, age, gender, activity, goal });

  // 추천 식단 데이터 가져오기
  const { recommendations, isPending, isError } = useRecommend(preferredFoods || {});

  if (isPending) {
    return <div className="text-center">데이터를 불러오는 중...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">데이터를 가져오는 데 실패했습니다.</div>;
  }

  return (
    <div>
      <div className="text-2xl font-bold mb-6">추천 식단</div>

      {/* 칼로리 및 탄단지 비율 */}
      {typeof result === 'string' ? (
        <p>{result}</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div>
            <strong>하루 섭취 추천 칼로리:</strong> {result.calories} kcal
          </div>
          <div>
            <strong>하루 섭취 추천 탄수화물:</strong> {result.macros.carbs.grams}g
          </div>
          <div>
            <strong>하루 섭취 추천 단백질:</strong> {result.macros.protein.grams}g
          </div>
          <div>
            <strong>하루 섭취 추천 지방:</strong> {result.macros.fat.grams}g
          </div>
        </div>
      )}

      {/* 추천 식단 */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">추천 음식</h3>
        <ul>
          {recommendations?.map((recommendation, index) => (
            <li key={index} className="mb-4">
              <div>
                <strong>{recommendation.meal}</strong>
              </div>
              {recommendation.main ? (
                <div>
                  <span>
                    메인 요리: {recommendation.main.foodNm} - {recommendation.main.enerc} kcal
                  </span>
                </div>
              ) : (
                <span>메인 요리가 없습니다.</span>
              )}
              {recommendation.side ? (
                <div>
                  <span>
                    사이드 요리: {recommendation.side.foodNm} - {recommendation.side.enerc} kcal
                  </span>
                </div>
              ) : (
                <span>사이드 요리가 없습니다.</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Step7Recommendation;
