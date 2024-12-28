export default interface MealPlanData {
  goal?: string;
  meals?: string[];
  height?: number;
  weight?: number;
  gender?: string;
  age?: number;
  activity?: string;
  preferredFoods?: SelectedFoods;
}

export interface PreferredFood {
  main?: string; // 주식 코드
  side?: string; // 부식 코드
}

export interface SelectedFoods {
  [meal: string]: PreferredFood; // 끼니별 선택된 음식 데이터
}
  