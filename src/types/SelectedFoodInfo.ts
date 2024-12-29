import { FoodType } from './Food';

export interface SelectedFoodInfo {
  servingSize: string;
  calorie: number;
  name: string;
  data: FoodType;
}

export interface SearchedFood extends Omit<SelectedFoodInfo, 'data'> {
  nutritions: {
    protein: number;
    fat: number;
    carb: number;
    sugar: number;
    natrium: number;
    calories: number;
  };
}

export interface FoodTagDataType extends SearchedFood {
  amount: number;
  year: number;
  month: number;
  day: number;
}