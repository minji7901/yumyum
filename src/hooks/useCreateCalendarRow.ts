import useAuthStore from "@/store/authStore";
import { createCalendarRow } from "@/utils/calendar/fetchCalendarData"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface DateType {
  year: number;
  month: number;
  day: number;
}
const useCreateCalendarRow = ({ year, month, day }: DateType) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore((state) => state);
  const userId = user?.id;

  const { mutate } = useMutation({
    mutationFn: () => {
      return createCalendarRow({ userId, year, month, day });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${year}-${month}-${day}-${userId}`] });
    }
  });
  
  return mutate;
};

export default useCreateCalendarRow