import { FoodType } from './Food';

export interface SelectedFoodInfo {
  servingSize: number;
  calorie: number;
  name: string;
  data: FoodType;
}

export interface SearchedFood extends Omit<SelectedFoodInfo, 'data'> {
  nutritions: {
    protein: number;
    fat: number;
    carbs: number;
    sugar: number;
    natrium: number;
  };
}
