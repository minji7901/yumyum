import { NutrientsJson } from '@/types/NutrientsJson';

interface CalculateNewNutrientsParams {
  totalCalories: number;
  totalNutritions: NutrientsJson;
  nutritions: NutrientsJson;
  consumedAmount: number;
  calorie: number;
  mode: 'delete' | 'update';
}

export const calculateNewNutrients = ({
  totalCalories,
  totalNutritions,
  nutritions,
  calorie,
  consumedAmount,
  mode
}: CalculateNewNutrientsParams) => {
  let calculatedCalories = null;
  const nutrientsInfoEntries = Object.entries(nutritions) as [keyof NutrientsJson, number][];

  // 바뀐 total nutrition과 total carlories를 계산한다.
  if (mode === 'delete') {
    calculatedCalories = totalCalories - calorie * consumedAmount;
    nutrientsInfoEntries.forEach(([nutrient, amount]) => {
      totalNutritions[nutrient] -= amount * consumedAmount;
    });
  }
  if (mode === 'update') {
    calculatedCalories = totalCalories + calorie * consumedAmount;
    nutrientsInfoEntries.forEach(([nutrient, amount]) => {
      totalNutritions[nutrient] += amount * consumedAmount;
    });
  }
  return { calculatedCalories, calculatedNutrients: totalNutritions };
};
