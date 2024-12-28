import useAuthStore from '@/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//import useGetNewNutrientInfo from './useGetNewNutrientInfo';
//import { deleteTagAndUpdateCalendar } from '@/utils/calendar/fetchCalendarData';

interface DeleteFoodTagParams {
  year: number;
  month: number;
  day: number;
  tagId: string;
}
const useAddFoodTag = ({ year, month, day }: DeleteFoodTagParams) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  //업데이트는 태그를 사용할 수 없다.
  //함수 분리하자
  //const { newTotalCalories, newNutrientInfo } = useGetNewNutrientInfo({ year, month, day, mode: 'delete' });

  const { mutate } = useMutation({
    mutationFn: async () => {
      
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
