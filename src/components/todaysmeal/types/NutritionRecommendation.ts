export default interface NutritionRecommendation {
  calories: number;
  macros: {
    carbs: { grams: number; percentage: number }; // 탄수화물
    protein: { grams: number; percentage: number }; // 단백질
    fat: { grams: number; percentage: number }; // 지방
  };
}