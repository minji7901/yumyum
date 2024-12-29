import FoodNutrition from '@/types/FoodNutrition';

interface RecommendationItem {
  mains: FoodNutrition[]; // 메인 메뉴 배열
  sides: FoodNutrition[]; // 사이드 메뉴 배열
  totalCalories: number; // 총 칼로리
}

interface Recommend {
  [key: string]: RecommendationItem[]; // 키는 string, 값은 RecommendationItem 배열
}

export default Recommend;
