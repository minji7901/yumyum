'use client';
import { useSearch } from '@/hooks/useSearch';
import FoodItem from './FoodItem';
import { FoodType } from '@/types/Food';

const FoodList = () => {
  const { data, isPending, isError } = useSearch();

  if (isPending) return <div>Loading...</div>;
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
