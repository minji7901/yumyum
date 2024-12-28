import useAuthStore from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGetNewNutrientInfo from './useGetNewNutrientInfo';
import { deleteTagAndUpdateCalendar } from '@/utils/calendar/fetchCalendarData';

interface DeleteFoodTagParams {
  year: number;
  month: number;
  day: number;
  tagId: string;
  consumedAmount: number;
}
const useDeleteFoodTag = ({ year, month, day, tagId, consumedAmount }: DeleteFoodTagParams) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  const { newTotalCalories, newNutrientInfo } = useGetNewNutrientInfo({
    year,
    month,
    day,
    tagId,
    consumedAmount,
    mode: 'delete'
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      deleteTagAndUpdateCalendar({ year, month, day, userId, tagId, newTotalCalories, newNutrientInfo });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`tags-${year}-${month}-${day}-${userId}`] });
      queryClient.removeQueries({ queryKey: [`tag-${tagId}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`monthlyData-${year}-${month}-${userId}`] });
    }
  });

  return mutate;
};

export default useDeleteFoodTag;
