'use client';
import { useSearch } from '@/hooks/useSearch';
import FoodItem from './FoodItem';
import { FoodType } from '@/types/Food';
import { useEffect, useRef } from 'react';
import { SelectedFoodInfo } from '@/types/SelectedFoodInfo';

interface FoodListProps {
  keyword: string;
  isInModal?: boolean;
  onSelectFoodHandler?: (selectedFood: SelectedFoodInfo) => void;
}

const FoodList = ({ keyword, isInModal, onSelectFoodHandler }: FoodListProps) => {
  const observerRef = useRef(null);
  const isModal = isInModal ? true : false;
  const onSelectFood = onSelectFoodHandler ? onSelectFoodHandler : null;

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

  if (isPending && !!keyword) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) return <div>Error...</div>;

  /* 검색어를 입력하지 않은 경우 */
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <p>다양한 음식들의 영양 성분을 확인해보세요!</p>
      </div>
    );
  }

  /* 검색어를 입력했지만 데이터가 존재하지 않는 경우 */
  if (!data.pages[0].data) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <p>찾으시는 음식 데이터가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {data.pages.map((page) =>
        page.data.map((food: FoodType) => (
          <FoodItem key={food.FOOD_CD} data={food} isInModal={isModal} onSelectFoodHandler={onSelectFood} />
        ))
      )}

      {hasNextPage && (
        <div ref={observerRef} className="flex flex-col items-center justify-center h-40">
          <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
