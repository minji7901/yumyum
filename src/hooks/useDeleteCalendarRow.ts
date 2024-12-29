import useAuthStore from '@/store/authStore';
import { deleteCalendarRow } from '@/utils/calendar/fetchCalendarData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteCalendarRowParams {
  year: number;
  month: number;
  day: number;
}
const useDeleteCalendarRow = ({ year, month, day }: DeleteCalendarRowParams) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = user?.id ? user?.id : '';
  const { mutate } = useMutation({
    mutationFn: async () => {
      deleteCalendarRow({ userId, year, month, day });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`tags-${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`monthlyData-${year}-${month}-${userId}`] });
    }
  });

  return mutate;
};

export default useDeleteCalendarRow;
