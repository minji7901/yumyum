'use client';
import { useSearch } from '@/hooks/useSearch';
import FoodItem from './FoodItem';
import { FoodType } from '@/types/Food';

interface FoodListProps {
  keyword: string;
}

const FoodList = ({ keyword }: FoodListProps) => {
  const { data, isPending, isError } = useSearch({ keyword });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <p>총 {data?.totalCount} 데이터</p>
      {data?.items.map((food: FoodType) => (
        <FoodItem key={food.FOOD_CD} data={food} />
      ))}
    </div>
  );
};

export default FoodList;
