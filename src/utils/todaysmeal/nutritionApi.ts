import FoodNutrition from '@/types/FoodNutrition';

export default async function fetchNutritionData(foodLv3Cd: string, pageNo: number = 1): Promise<FoodNutrition[]> {
  const url = `/api/todaysmeal?foodLv3Cd=${foodLv3Cd}&pageNo=${pageNo}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }

  const data: FoodNutrition[] = await response.json();
  return data;
}
