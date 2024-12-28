import { useEffect, useState } from 'react';
import useFetchDailyFoodConsumption from './useFetchDailyFoodConsumption';
import useFetchFoodTagData from './useFetchFoodTagData';
import { NutrientsJson } from '@/types/NutrientsJson';

type mode = 'delete' | 'update';
interface GetNewNutrientInfoParams {
  year: number;
  month: number;
  day: number;
  tagId: string;
  mode: mode;
}
const useGetNewNutrientInfo = ({ year, month, day, tagId, mode }: GetNewNutrientInfoParams) => {
  const [newTotalCalories, setNewTotalCalories] = useState<number | null>(null);
  const [newNutrientInfo, setNewNutrientInfo] = useState<NutrientsJson|null>(null);

  // 하루 섭취 영양 정보, 태그 영양 정보 가져오기
  const { data: foodConsumption } = useFetchDailyFoodConsumption({ year, month, day });
  const { data: tagData } = useFetchFoodTagData(tagId);

  useEffect(() => {
    if (foodConsumption && tagData) {
      const { total_calories: totalCalories, total_nutritions: totalNutritions } = foodConsumption;
      const { nutritions, calorie } = tagData;
      
      let newTotalCalories = null;
      const nutrientsInfo = { ...(nutritions as NutrientsJson) };
      const totalNutrients = { ...(totalNutritions as NutrientsJson) };
      const nutrientsInfoEntries = Object.entries(nutrientsInfo) as [keyof NutrientsJson, number][];
      
      // 바뀐 total nutrition과 total carlories를 계산한다.
      if(mode==='delete') {
        newTotalCalories = totalCalories - calorie;
        nutrientsInfoEntries.forEach(([nutrient, amount]) => {
          totalNutrients[nutrient] -= amount;
        });
      }
      if(mode==='update') {
        newTotalCalories = totalCalories + calorie;
        nutrientsInfoEntries.forEach(([nutrient, amount]) => {
          totalNutrients[nutrient] += amount;
        });
      }

      setNewTotalCalories(newTotalCalories);
      setNewNutrientInfo(totalNutrients);
    }
  }, [foodConsumption, tagData]);

  return { newTotalCalories, newNutrientInfo };
};

export default useGetNewNutrientInfo;
