import MealPlanData from '@/types/MealPlanData';
import NutritionRecommendation from '@/types/NutritionRecommendation';

export const calculateCalories = (data: MealPlanData): NutritionRecommendation | string => {
  const { height, weight, age, gender, activity, goal } = data;

  if (!height || !weight || !age || !gender || !activity || !goal) {
    return '에러 - 정보 부족';
  }

  // 기초 대사량 계산
  /* 해리스-베네딕트 방정식으로 사용하려고 했는데 검색을 추가적으로 더더 해본 결과 미핀 세이트 젤 방정식이 더 정확하다고 해서
  미핀 세인트 젤 방정식을 기반으로 계산함.
  */
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // 활동대사량 계산
  let activityMultiplier = 1.2;
  if (activity.includes('가벼운 운동')) activityMultiplier = 1.375;
  else if (activity.includes('보통 이상의 활동')) activityMultiplier = 1.55;
  else if (activity.includes('적극적인 활동')) activityMultiplier = 1.725;
  else if (activity.includes('운동선수')) activityMultiplier = 1.9;

  const activityCalories = bmr * activityMultiplier;

  // 목표에 따른 칼로리 조정
  /*
  칼로리 조정 요소(adjusmentFactor)를 둬서 체중 목표별 칼로리 조정 요소 값을 넣어줌. 나중에 추천 칼로리를 산출하기 위해 활동대사량 칼로리에 곱해서 사용할 예정.
  */
  let adjustmentFactor = 0;
  switch (goal) {
    case '확실한 체중 감량':
      adjustmentFactor = -0.2; // -20%
      break;
    case '적당한 체중 감량':
      adjustmentFactor = -0.1; // -10%
      break;
    case '체중 유지':
      adjustmentFactor = 0; // 0%
      break;
    case '적당한 체중 증량':
      adjustmentFactor = 0.1; // +10%
      break;
    case '확실한 체중 증량':
      adjustmentFactor = 0.2; // +20%
      break;
    default:
      return '잘못된 목표 입력';
  }

  // 추천 칼로리량 = 전체 활동대사량에 adjustmentFactor만큼 증감된 칼로리를 고려해 추천 칼로리량 산출(소수점 버림)
  const recommendedCalories = Math.round(activityCalories * (1 + adjustmentFactor));

  // 탄단지 비율 추천 (기본: 탄수화물 50%, 단백질 30%, 지방 20%)
  /*
  macronutrients(탄단지)를 보통 carbs 50, protein 30, fat 20으로 비율 추천함.

  근데, 감량 할 때는 보통 프로틴을 증가하고, 탄수화물을 줄임. 
  증량은 지방을 조금 증가시키고, 프로틴을 조금 감소함.
  */
  let macrosPercentage = { carbs: 50, protein: 30, fat: 20 };

  if (goal.includes('감량')) {
    macrosPercentage = { carbs: 40, protein: 40, fat: 20 };
  } else if (goal.includes('증량')) {
    macrosPercentage = { carbs: 50, protein: 25, fat: 25 };
  }

  // g 단위 계산 - 사용하려는 api의 탄단지 정보가 g으로 표시됨
  // 하루에 3끼를 먹는 가정하에 추천하는 것임으로 각각 3으로 나눔
  const carbsGrams = Math.round((recommendedCalories * (macrosPercentage.carbs / 100)) / 4 / 3);
  const proteinGrams = Math.round((recommendedCalories * (macrosPercentage.protein / 100)) / 4 / 3);
  const fatGrams = Math.round((recommendedCalories * (macrosPercentage.fat / 100)) / 9 / 3);

  return {
    calories: recommendedCalories,
    macros: {
      carbs: { grams: carbsGrams, percentage: macrosPercentage.carbs },
      protein: { grams: proteinGrams, percentage: macrosPercentage.protein },
      fat: { grams: fatGrams, percentage: macrosPercentage.fat }
    }
  };
};
