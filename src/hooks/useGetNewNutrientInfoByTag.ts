import { useEffect, useState } from 'react';
import useFetchDailyFoodConsumption from './useFetchDailyFoodConsumption';
import useFetchFoodTagData from './useFetchFoodTagData';
import { NutrientsJson } from '@/types/NutrientsJson';
import { calculateNewNutrients } from '@/utils/calendar/calculateNewNutrient';

type mode = 'delete' | 'update';
interface GetNewNutrientInfoParams {
  year: number;
  month: number;
  day: number;
  tagId: string;
  mode: mode;
  consumedAmount: number;
}
const useGetNewNutrientInfoByTag = ({ year, month, day, tagId, consumedAmount, mode }: GetNewNutrientInfoParams) => {
  const [newTotalCalories, setNewTotalCalories] = useState<number | null>(null);
  const [newNutrientInfo, setNewNutrientInfo] = useState<NutrientsJson | null>(null);

  // 하루 섭취 영양 정보, 태그 영양 정보 가져오기
  const { data: foodConsumption } = useFetchDailyFoodConsumption({ year, month, day });
  const { data: tagData } = useFetchFoodTagData(tagId);

  useEffect(() => {
    if (foodConsumption && tagData) {
      const { total_calories: totalCalories, total_nutritions: totalNutritions } = foodConsumption;
      const { nutritions, calorie } = tagData;
      const totalNutrients = { ...(totalNutritions as NutrientsJson) };
      const nutrientsInfo = { ...(nutritions as NutrientsJson) };

      const { calculatedCalories, calculatedNutrients } = calculateNewNutrients({
        totalCalories,
        totalNutritions: totalNutrients,
        nutritions: nutrientsInfo,
        calorie,
        consumedAmount,
        mode
      });

      setNewTotalCalories(calculatedCalories);
      setNewNutrientInfo(calculatedNutrients);
    }
  }, [foodConsumption, tagData]);

  return { newTotalCalories, newNutrientInfo };
};

export default useGetNewNutrientInfoByTag;
