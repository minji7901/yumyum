import useAuthStore from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGetNewNutrientInfo from './useGetNewNutrientInfo';
import { createTagAndUpdateCalendar } from '@/utils/calendar/fetchCalendarData';
import { FoodTagDataType } from '@/types/SelectedFoodInfo';


interface getCalendarIdQueryData {
  [dataName: string]: string;
}
interface DeleteFoodTagParams {
  foodTagData: FoodTagDataType | null;
  consumedAmount: number | null;
}
const useAddFoodTag = ({
  foodTagData,
  consumedAmount
}: DeleteFoodTagParams) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;
  const { year, month, day, nutritions, calorie } = foodTagData;
  const { id: calendarId } = queryClient.getQueryData([`${year}-${month}-${day}-${userId}`]) as getCalendarIdQueryData;
 
  const { newTotalCalories, newNutrientInfo } = useGetNewNutrientInfo({
    year,
    month,
    day,
    nutritions,
    calorie,
    consumedAmount,
    mode: 'update'
  });

//year, month, day, nutritions, calorie, name, servingSize;

  const { mutate } = useMutation({
    mutationFn: async () => {
      createTagAndUpdateCalendar({
        calendarId,
        userId,
        foodTagData,
        newTotalCalories,
        newNutrientInfo,
        amount: consumedAmount
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`tags-${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`monthlyData-${year}-${month}-${userId}`] });
    }
  });

  return mutate;
};

export default useAddFoodTag;
