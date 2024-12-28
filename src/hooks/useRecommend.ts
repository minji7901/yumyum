import { useQueries } from '@tanstack/react-query';
import fetchNutritionData from '@/utils/todaysmeal/nutritionApi';
import FoodNutrition from '@/types/FoodNutrition';
import { SelectedFoods } from '@/components/todaysmeal/types/MealPlanData';

const useRecommend = (preferredFoods: SelectedFoods) => {
  const mealKeys = Object.keys(preferredFoods); //키들만 뽑아냄 (아침, 점심, 저녁)

  // main과 side를 각각의 요청으로 병렬 처리
  const queries = mealKeys.flatMap((meal) => [
    {
      queryKey: ['mainNutritionData', preferredFoods[meal].main],
      queryFn: () => fetchNutritionData(preferredFoods[meal].main ?? '01')
    },
    {
      queryKey: ['sideNutritionData', preferredFoods[meal].side],
      queryFn: () => fetchNutritionData(preferredFoods[meal].side ?? '15')
    }
  ]);
  // [{}],[{}]이런식으로 나눠진거 하나로 합치기 위해 flatMap 사용함

  const results = useQueries({ queries }); // quries:queries라서 생략

  // 로딩 상태 확인
  const isPending = results.some((result) => result.isPending);
  const isError = results.some((result) => result.isError);

  if (isPending || isError) {
    return { recommendations: null, isPending, isError };
  }

  // 데이터를 매핑하여 추천 결과 생성
  const recommendations = mealKeys.map((meal, index) => {
    const mainData = (results[index * 2]?.data as FoodNutrition[]) || [];
    const sideData = (results[index * 2 + 1]?.data as FoodNutrition[]) || [];

    return {
      meal,
      main: mainData.length > 0 ? mainData[0] : null, // 첫 번째 결과 사용
      side: sideData.length > 0 ? sideData[0] : null
    };
  });

  return { recommendations, isPending, isError };
};

export default useRecommend;
