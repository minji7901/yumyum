import { AddFoodTagParams } from '@/hooks/useAddFoodTag';
import useAuthStore from '@/store/authStore';
import { createFirstTag } from '@/utils/calendar/fetchCalendarData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateCalendarRow = ({ foodTagData, consumedAmount }: AddFoodTagParams) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = user?.id ? user.id : '';
  const { year, month, day } = foodTagData;

  const { mutate } = useMutation({
    mutationFn: async () => {
      createFirstTag({ userId, year, month, day, foodTagData, amount: consumedAmount });
      return;
    },
    onSuccess: () => {
      console.log('success!', `tags-${year}-${month}-${day}-${userId}`);
      queryClient.invalidateQueries({ queryKey: [`${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`tags-${year}-${month}-${day}-${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`monthlyData-${year}-${month}-${userId}`] });
    }
  });

  return mutate;
};

export default useCreateCalendarRow;
