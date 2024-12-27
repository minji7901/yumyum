'use client';
import { useSearch } from '@/hooks/useSearch';
import FoodItem from './FoodItem';
import { FoodType } from '@/types/Food';
import { useEffect, useRef } from 'react';

interface FoodListProps {
  keyword: string;
}

const FoodList = ({ keyword }: FoodListProps) => {
  const observerRef = useRef(null);

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

  return (
    <div>
      {/* 검색어를 입력했고 데이터도 존재하는 경우 */}
      {data &&
        data.pages.map(
          (page) => page.data && page.data.map((food: FoodType) => <FoodItem key={food.FOOD_CD} data={food} />)
        )}

      {/* 검색어를 입력했지만 데이터가 존재하지 않는 경우 */}
      {data &&
        data.pages.map(
          (page, index) =>
            !page.data && (
              <div key={index} className="flex flex-col items-center justify-center h-40">
                <p>찾으시는 음식 데이터가 존재하지 않습니다.</p>
              </div>
            )
        )}

      {/* 검색어를 입력하지 않은 경우 */}
      {!data && (
        <div className="flex flex-col items-center justify-center h-40">
          <p>다양한 음식들의 영양 성분을 확인해보세요!</p>
        </div>
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
