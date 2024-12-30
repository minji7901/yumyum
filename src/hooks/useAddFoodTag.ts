import useAuthStore from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTagAndUpdateCalendar } from '@/utils/calendar/fetchCalendarData';
import { FoodTagDataType } from '@/types/SelectedFoodInfo';

export interface AddFoodTagParams {
  foodTagData: FoodTagDataType;
  consumedAmount: number;
}
const useAddFoodTag = ({ foodTagData, consumedAmount }: AddFoodTagParams) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = (user?.id) ? user?.id : '';

  const { year, month, day } = foodTagData;

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createTagAndUpdateCalendar({
        userId,
        foodTagData,
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
