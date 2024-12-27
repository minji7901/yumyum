'use client';
import { useSearch } from '@/hooks/useSearch';
import FoodItem from './FoodItem';
import { FoodType } from '@/types/Food';
import { useEffect, useRef } from 'react';

interface FoodListProps {
  keyword: string;
  isInModal?: boolean;
}

const FoodList = ({ keyword, isInModal }: FoodListProps) => {
  const observerRef = useRef(null);
  const isModal = isInModal ? true : false;

  const { data, fetchNextPage, hasNextPage, isPending, isError } = useSearch({ keyword });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

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
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.data.map((food: FoodType) => (
            <FoodItem key={food.FOOD_CD} data={food} isInModal={isModal} />
          ))}
        </div>
      ))}

      <div ref={observerRef}>
        {hasNextPage && (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;
