'use client';

import { useState, useEffect } from 'react';
import useRecommend from '@/hooks/useRecommend';
import MealPlanData from '@/components/todaysmeal/types/MealPlanData';
import { calculateCalories } from '@/lib/calculateCalories';
import ProgressLoadingAnimation from '../todaysmeal-lottie/ProgressLoadingAnimation';
import ResultAnimation from '../todaysmeal-lottie/ResultAnimation';
import FoodNutrition from '@/types/FoodNutrition';
import FoodDetails from '../foodDetails/FoodDetails';
import Recommend from '../types/Recommend';
// import { useRouter } from 'next/navigation';
import NutritionRecommendation from '../types/NutritionRecommendation';

interface Step7RecommendationProps {
  data: MealPlanData;
}

const Step7Recommendation = ({ data }: Step7RecommendationProps) => {
  const [selectedFood, setSelectedFood] = useState<FoodNutrition | null>(null); // 선택된 요리 상세 정보 상태 관리
  const [recommendations, setRecommendations] = useState<Recommend | null>(null);
  // const router = useRouter();
  const { goal, height, weight, gender, age, activity, preferredFoods } = data;

  // 활동 대사량 및 탄단지 비율 계산
  // result 안에는 지금 추천 calories 있고, macros 반환하는데 carbs, protein, fat 있음.
  // 그리고 각각에는 grams, percentage 있음.
  const result = calculateCalories({ height, weight, age, gender, activity, goal }) as NutritionRecommendation;
  // 이 step까지 왔으면 result에 필요한 정보가 없을 수가 없음(이미 앞 step에서 받았기 때문에)... 즉, string 반환 못함...
  // 해서 as로 NutritionRecommendation 타입 명시해줌 

  // 추천 식단 데이터 가져오기
  const {
    recommendations: fetchedRecommendations,
    isPending,
    isError
  } = useRecommend(preferredFoods || {}, result.calories);

  // 추천 식단을 로컬 상태에 저장
  useEffect(() => {
    if (!recommendations && fetchedRecommendations) {
      setRecommendations(fetchedRecommendations);
    }
  }, [fetchedRecommendations, recommendations]);

  const handleFoodClick = (food: FoodNutrition | null) => {
    if (food) {
      setSelectedFood(food);
    }
  };

  const closeFoodDetails = () => {
    setSelectedFood(null);
  };

  const handleReset = () => {
    // 추천 데이터를 초기 상태(null)로 리셋(리렌더링이 되면서 자동 생성)
    setRecommendations(null);
  };

  if (isPending) {
    return (
      <div className="w-2/3 flex flex-col justify-center items-center gap-5 min-h-screen">
        <ProgressLoadingAnimation></ProgressLoadingAnimation>
        {/* lottie 애니메이션 활용함 */}
        <div className="font-bold text-primary text-2xl">건강하고 맛있는 밥상 차리는 중....</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 min-h-screen">
        데이터를 가져오는 데 실패했습니다.<br></br>
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      <div className="w-full text-center mb-3">
        <div className="text-2xl font-bold text-center mb-4">오늘은 이렇게 먹어보는거 어때요??</div>
        <div className="text-sm font-medium text-gray-500 mb-10 leading-6">
          앞에서 입력해주신 정보들을 기반으로 하루 권장 칼로리 및 탄단지량이 나왔습니다.
          <br />
          해당 추천 식단은 권장 칼로리를 기반으로 짜여졌습니다.
          <br />
          정확한 음식의 상세 정보를 확인하고 싶으시면, 해당 음식을 클릭해주세요.
          <br /> 홈 페이지로 돌아가고 싶으시면 아래에{' '}
          <span className="text-hover font-semibold">&apos;홈으로&apos;</span> 버튼을 눌러주세요.
          {/* 따옴표도 &apos; 이렇게 안쓰면 빌드 시 에러나네요... */}
          <br /> 진단받은 결과로 다시 식단을 추천받고 싶으시면 아래에{' '}
          <span className="text-hover font-semibold">&apos;재생성&apos;</span> 버튼을 눌러주세요. (새로고침 시 만들어진
          모든 식단은 사라지고 처음 페이지로 이동합니다.)
        </div>
      </div>
      <ResultAnimation></ResultAnimation>

      {/* 추천 식단 */}
      <div className="max-w-xl lg:max-w-2xl mx-auto mt-8">
        <div className="text-lg md:text-2xl font-bold mb-6 text-center border-b-4 border-yellow-500 inline-block">
          🍴 추천 식단
        </div>
        <ul className="space-y-6">
          {recommendations &&
            Object.entries(recommendations).map(([meal, combinations]) => {
              const totalCalories =
                (combinations[0]?.mains?.reduce((sum, main) => sum + Number(main.enerc), 0) || 0) +
                (combinations[0]?.sides?.reduce((sum, side) => sum + Number(side.enerc), 0) || 0);

              return (
                <li key={meal} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <div className="text-base md:text-lg font-semibold text-gray-800 mb-6">
                    🥗 {meal} <span className="text-sm text-gray-500">({totalCalories} kcal)</span>
                  </div>
                  {combinations[0]?.mains && combinations[0].mains.length > 0 ? (
                    <div className="mb-4">
                      <div className="text-gray-700 font-medium mb-2">메인 메뉴:</div>
                      <ul className="space-y-2">
                        {combinations[0].mains.map((main, index) => (
                          <li
                            key={index}
                            className="p-3 cursor-pointer bg-white hover:bg-yellow-50 rounded-lg shadow-sm"
                            onClick={() => handleFoodClick(main)}
                          >
                            <span className="text-gray-700">{main.foodNm}</span>
                            <span className="text-sm text-gray-500 ml-2">({main.enerc} kcal)</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-sm text-red-500">메인 메뉴가 없습니다.</div>
                  )}
                  {combinations[0]?.sides && combinations[0].sides.length > 0 ? (
                    <div className="mt-4">
                      <div className="text-gray-700 font-medium mb-2">사이드 메뉴:</div>
                      <ul className="space-y-2">
                        {combinations[0].sides.map((side, index) => (
                          <li
                            key={index}
                            className="p-3 cursor-pointer bg-white hover:bg-yellow-50 rounded-lg shadow-sm"
                            onClick={() => handleFoodClick(side)}
                          >
                            <span className="text-gray-700">{side.foodNm}</span>
                            <span className="text-sm text-gray-500 ml-2">({side.enerc} kcal)</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-sm text-red-500">사이드 메뉴가 없습니다.</div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>

      {/* 칼로리 및 탄단지 비율 */}
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="w-full md:w-3/4 lg:w-2/3 bg-gray-100 text-center p-5 text-base md:text-xl rounded-lg shadow-md">
          <div className="mb-5 text-lg md:text-2xl border-b-4 border-primary inline-block">
            <strong>하루 섭취 권장 칼로리:</strong> {result.calories} kcal
          </div>
          <div className="mb-2 text-sm md:text-lg">
            <strong>하루 섭취 권장 탄수화물:</strong> {result.macros.carbs.grams}g
          </div>
          <div className="mb-2 text-sm md:text-lg">
            <strong>하루 섭취 권장 단백질:</strong> {result.macros.protein.grams}g
          </div>
          <div className="mb-2 text-sm md:text-lg">
            <strong>하루 섭취 권장 지방:</strong> {result.macros.fat.grams}g
          </div>
        </div>
      </div>

      
      {/* 버튼 그룹 */}
      {/* <div className="flex justify-center gap-4 mt-8"> */}
        {/* 재생성 버튼 */}
        {/* <button
          onClick={handleReset}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          재생성
        </button> */}

        {/* 홈으로 버튼 */}
        {/* <button
          onClick={() => router.push('/')} // router를 사용하여 홈으로 이동
          className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-center"
        >
          홈으로
        </button>
      </div> */}


      {/* 상세 정보 모달 */}
      {selectedFood && <FoodDetails food={selectedFood} onClose={closeFoodDetails} />}
    </div>
  );
};

export default Step7Recommendation;
