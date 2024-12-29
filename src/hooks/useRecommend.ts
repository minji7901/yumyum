import { useQueries } from '@tanstack/react-query';
import fetchNutritionData from '@/utils/todaysmeal/nutritionApi';
import FoodNutrition from '@/types/FoodNutrition';
import { SelectedFoods } from '@/components/todaysmeal/types/MealPlanData';
import Recommend from '@/components/todaysmeal/types/Recommend';

const useRecommend = (preferredFoods: SelectedFoods, recommendedCalories: number) => {
  const mealKeys = Object.keys(preferredFoods); //meal 키들만 모음. 즉, 아침, 점심, 저녁

  // 끼니별 기준 칼로리 계산 (하루 추천 칼로리를 3으로 나눔)
  const mealCalories = recommendedCalories / 3;

  // main과 side 요청 생성
  const queries = mealKeys.flatMap((meal, index) => [
    {
      queryKey: ['mainNutritionData', preferredFoods[meal].main],
      queryFn: () => fetchNutritionData(preferredFoods[meal].main ?? '01', index + 1) // 기본: 밥류
    },
    {
      queryKey: ['sideNutritionData', preferredFoods[meal].side],
      queryFn: () => fetchNutritionData(preferredFoods[meal].side ?? '15') // 기본: 김치류
    }
  ]);
  // 같은 음식 종류를 선택했을 떄, 아침, 점심, 저녁 메뉴가 달라야하니까 page별로 나눠서 추천하게함. (page는 1 부터 시작하니까 index + 1로 설정함, side 메뉴는 보통 데이터 개수가 적어서 그냥 1로 고정함)

  const results = useQueries({ queries });
  // console.log("result", results);
  // console.log("result", results[0].data);
  /*
    result의 0, 2, 4=> main이고, 1, 3, 5 side임...
    각각 20개씩 정보 들어옴..(route.ts에서 내가 이미 설정한 값...)
  */

  const isPending = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isPending || isError) {
    return { recommendations: null, isPending, isError };
  }

  // 랜덤 인덱스를 생성하는 함수
  const generateRandomIndexes = (length: number, maxItems: number): number[] => {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < Math.min(length, maxItems)) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes;
  };

  // 중복 제거 함수(api 결과보면 같은 음식명이 너무 많아서 중복 음식명을 없애는 함수 만들었음)
  const removeDuplicates = (data: FoodNutrition[]) => {
    const uniqueMap = new Map<string, FoodNutrition>();
    data.forEach((item) => {
      if (!uniqueMap.has(item.foodNm)) {
        uniqueMap.set(item.foodNm, item);
      }
    });
    return Array.from(uniqueMap.values());
  };
  // 그럼에도 불구하고, 비슷한 음식명이 많아서 랜덤 숫자를 이용해서 음식 추가할 예정

  // 끼니별 조합 생성
  const recommendations = mealKeys.reduce((acc, meal, index) => {
    const mainData = removeDuplicates((results[index * 2]?.data as FoodNutrition[]) || []); // main (index 짝수들)
    const sideData = removeDuplicates((results[index * 2 + 1]?.data as FoodNutrition[]) || []); // side (index 홀수들)
    // tanstack query로 받아온 result 값에 타입을 as 사용해서 확실히 FoodNutrition[]으로 명시해줌.

    // console.log('메인', mainData);
    // console.log('사이드', sideData);

    // 조합 배열 생성
    const combinations = mainData.map((main: FoodNutrition) => {
      const selectedMains: FoodNutrition[] = [main];
      const sides: FoodNutrition[] = [];
      let totalCalories = Number(main.enerc); //일단 메인 칼로리 넣고,

      // 랜덤 인덱스 생성
      const randomMainIndexes = generateRandomIndexes(mainData.length, 3); // 메인 메뉴 최대 3개
      const randomSideIndexes = generateRandomIndexes(sideData.length, sideData.length); // 사이드 메뉴 전체 사용 가능

      // 추가 메인 메뉴 포함
      for (const randomIndex of randomMainIndexes) {
        const extraMain = mainData[randomIndex];
        if (
          totalCalories + Number(extraMain.enerc) <= mealCalories && // 칼로리 조건
          selectedMains.length < 3 // 메인 메뉴 최대 3개까지만 추가 가능.
        ) {
          totalCalories += Number(extraMain.enerc);
          selectedMains.push(extraMain);
        }
      }

      // 사이드 메뉴 여러개
      for (const randomIndex of randomSideIndexes) {
        const side = sideData[randomIndex];
        if (mealCalories - (totalCalories + Number(side.enerc)) > 100) {
          //사이드 포함 총 칼로리가 권장 칼로리 +- 100을을 넘지 않게함.
          totalCalories += Number(side.enerc);
          sides.push(side); // 사이드 넣어주기....
        }
      }

      return {
        mains: selectedMains, // 메인 메뉴 배열
        sides,
        totalCalories
      };
    });

    acc[meal] = combinations;
    // reduce로 mealkeys에 따라 만든 조합배열 넣어주기.
    /*
      {
        "아침": [
          { main: [{},{}], sides: [{},{},{}], totalCalories:  },
          { main: [{},{}], sides: [], totalCalories:}
        ],
          점심.... 저녁... 이런 식으로 들어옴.
      }
    */

    return acc;
  }, {} as Recommend);
  //initial value는 빈 객체인데, typescript때문에 as로 타입 추가해줌....

  // console.log('추천:', recommendations);

  return { recommendations, isPending, isError };
};

export default useRecommend;
