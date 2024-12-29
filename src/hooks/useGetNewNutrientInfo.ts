import { useEffect, useState } from 'react';
import useFetchDailyFoodConsumption from './useFetchDailyFoodConsumption';
import { NutrientsJson } from '@/types/NutrientsJson';
import { calculateNewNutrients } from '@/utils/calendar/calculateNewNutrient';

type mode = 'delete' | 'update';
interface GetNewNutrientInfoParams {
  year: number;
  month: number;
  day: number;
  mode: mode;
  consumedAmount: number;
  nutritions: NutrientsJson;
  calorie: number;
}
const useGetNewNutrientInfo = ({
  year,
  month,
  day,
  nutritions,
  calorie,
  consumedAmount,
  mode
}: GetNewNutrientInfoParams) => {
  const [newTotalCalories, setNewTotalCalories] = useState<number | null>(null);
  const [newNutrientInfo, setNewNutrientInfo] = useState<NutrientsJson | null>(null);

  // 하루 섭취 영양 정보, 태그 영양 정보 가져오기
  const { data: foodConsumption } = useFetchDailyFoodConsumption({ year, month, day });

  useEffect(() => {
    if (foodConsumption) {
      const { total_calories: totalCalories, total_nutritions: totalNutritions } = foodConsumption;
      const totalNutrients = { ...(totalNutritions as NutrientsJson) };
      const nutrientsInfo = { ...(nutritions as NutrientsJson) };
      console.log( 'before calculation', totalNutrients, nutrientsInfo);

      const { calculatedCalories, calculatedNutrients } = calculateNewNutrients({
        totalCalories,
        totalNutritions: totalNutrients,
        nutritions: nutrientsInfo,
        calorie,
        consumedAmount,
        mode
      });
      console.log('after calculation', calculatedCalories, calculatedNutrients);

      setNewTotalCalories(calculatedCalories);
      setNewNutrientInfo(calculatedNutrients);
    }
  }, [foodConsumption]);
  return { newTotalCalories, newNutrientInfo };
};

export default useGetNewNutrientInfo;
