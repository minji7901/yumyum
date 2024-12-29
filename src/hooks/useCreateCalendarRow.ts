import useAddFoodTag, { AddFoodTagParams } from '@/hooks/useAddFoodTag';
import useAuthStore from '@/store/authStore';
import { createCalendarRow, createFirstTag, createTagAndUpdateCalendar } from '@/utils/calendar/fetchCalendarData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DateType extends AddFoodTagParams {
  year: number;
  month: number;
  day: number;
}
const useCreateCalendarRow = ({ year, month, day, foodTagData, consumedAmount }: DateType) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = (user?.id) ? user.id : '';

  const { mutate } = useMutation({
    mutationFn: async () => {
      createFirstTag({ userId, year, month, day, foodTagData, amount: consumedAmount });
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`tags-${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`monthlyData-${year}-${month}-${userId}`] });
    }
  });

  return mutate;
};

export default useCreateCalendarRow;
