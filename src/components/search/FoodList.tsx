'use client';
import { useSearch } from '@/hooks/useSearch';
import FoodItem from './FoodItem';
import { FoodType } from '@/types/Food';

interface FoodListProps {
  keyword: string;
}

const FoodList = ({ keyword }: FoodListProps) => {
  const { data, isPending, isError } = useSearch({ keyword });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) return <div>Error...</div>;

  return (
    <div>
      {data?.items.map((food: FoodType) => (
        <FoodItem key={food.FOOD_CD} data={food} />
      ))}
    </div>
  );
};

export default FoodList;
