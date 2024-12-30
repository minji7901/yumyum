'use client';

import React, { useState } from 'react';
import TodaysmealOption from '../todaysmeal-option/TodaysmealOption';
import { SelectedFoods } from '../types/MealPlanData';
import PreviousButton from '../buttons/PreviousButton';
import NextButton from '../buttons/NextButton';
interface FoodOptions {
  main: Record<string, string>;
  side: {
    [key: string]: Record<string, string>;
  };
}

// 제공된 api의 식품 대종류
/*
주식, 부식을 사용자가 선택할 수 있게 했는데 밥에 우유나, 빵에 찌개 이런 것은 어울리지 않아서
최대한 어울리는 주식과 부식의 조합을 구성함.
*/

const foodOptions: FoodOptions = {
  main: {
    '01': '밥류',
    '02': '빵 및 과자류',
    '03': '면 및 만두류',
    '04': '죽 및 스프류'
  },
  side: {
    '01': {
      '05': '국 및 탕류',
      '06': '찌개 및 전골류',
      '07': '찜류',
      '08': '구이류',
      '09': '전적 및 부침류',
      '10': '볶음류',
      '11': '조림류',
      '12': '튀김류',
      '13': '나물숙채류',
      '14': '생채무침류',
      '15': '김치류',
      '16': '젓갈류',
      '17': '장아찌절임류'
    },
    '02': {
      '19': '유제품류 및 빙과류',
      '20': '음료 및 차류',
      '22': '과일류'
    },
    '03': {
      '09': '전적 및 부침류',
      '10': '볶음류',
      '11': '조림류',
      '12': '튀김류',
      '13': '나물숙채류',
      '14': '생채무침류',
      '15': '김치류',
      '16': '젓갈류',
      '17': '장아찌절임류'
    },
    '04': {
      '09': '전적 및 부침류',
      '10': '볶음류',
      '11': '조림류',
      '12': '튀김류',
      '13': '나물숙채류',
      '14': '생채무침류',
      '15': '김치류',
      '16': '젓갈류',
      '17': '장아찌절임류'
    }
  }
};

interface Step6PreferredFoodProps {
  mealData?: string[]; // 끼니 리스트
  onNext: (preferredFoods: SelectedFoods) => void;
  onPrev: () => void;
}

const Step6PreferredFood = ({ mealData, onNext, onPrev }: Step6PreferredFoodProps) => {
  const [selectedFoods, setSelectedFoods] = useState<SelectedFoods>({});

  // 주식 선택
  const handleMainSelect = (meal: string, main: string) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [meal]: { main, side: undefined } // 주식 변경 시 부식 초기화
    }));
  };

  // 부식 선택
  const handleSideSelect = (meal: string, side: string) => {
    setSelectedFoods((prev) => ({ ...prev, [meal]: { ...prev[meal], side } }));
  };

  //  every 사용해서 모든 meal 마다 main, side 다 있는지 확인! 다 있으면 true반환할거고 이거 기준으로 버튼 disabled할지 enable하게 될지 결정함함
  const isCompleted = mealData?.every((meal) => selectedFoods[meal]?.main && selectedFoods[meal]?.side);

  const handleNextClick = () => {
    if (selectedFoods) {
      onNext(selectedFoods);
    }
  };

  return (
    <div className="relative w-2/3 h-auto flex flex-col justify-center items-center overflow-hidden py-10">
      <div className="w-full text-center mb-6">
        <div className="text-2xl font-bold text-center mb-4">
          앞서 선택하신 각 끼니에 어떤 종류의 음식을 먹고 싶은지 선택해주세요.
        </div>
        <div className="text-sm font-medium text-gray-500 mb-10">
          메인 메뉴(주식)와 사이드 메뉴(부식/반찬)를 각각 하나씩 선택해주세요.
        </div>

        {/* 끼니별 주식 옵션 */}
        {mealData?.map((meal) => (
          <div key={meal} className="mb-10 bg-green-50 p-10 rounded-xl ">
            <div className="text-lg font-semibold border-b-2 border-yellow-500 inline-block mb-10">🍚 {meal} 🍚</div>
            <div className="flex justify-center items-center flex-wrap gap-10 mt-4 rounded-md p-2 mb-10">
              {/* 배열로 바꿔서(map 이용할거임) 메인 옵션 생성*/}
              {Object.entries(foodOptions.main).map(([key, label]) => (
                <TodaysmealOption
                  key={key}
                  label={label}
                  isSelected={selectedFoods[meal]?.main === key}
                  onClick={() => handleMainSelect(meal, key)}
                  className="w-auto px-6 py-3"
                />
              ))}
            </div>

            {/* 끼니별 선택된 주식에 어울리는 부식 옵션 */}
            {/* selectedFoods[meal].main ==> 이거는 해당 끼니의 메인(주메뉴), 즉, 01, 02, 03, 04 중 하나*/}
            {/* 즉, 메인 메뉴 선택 되면 !!! 아래 사이드 메뉴 옵션 보여줌*/}
            {selectedFoods[meal]?.main && (
              <div className="mt-10">
                <div className="text-md font-medium">부식/반찬 선택</div>
                <div className="flex flex-wrap gap-4 mt-2 max-h-52 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {/* 주메뉴와 어울리는 사이드 메뉴! 위쪽에 foodOption에서 정리해놓은거 하나씩 보여줌*/}
                  {Object.entries(foodOptions.side[selectedFoods[meal].main]).map(([key, label]) => (
                    <TodaysmealOption
                      key={key}
                      label={label}
                      isSelected={selectedFoods[meal]?.side === key}
                      onClick={() => handleSideSelect(meal, key)}
                      className="w-auto px-2 py-1"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* 이전, 다음 버튼 */}
        <div className="flex justify-between w-full mt-10">
          <PreviousButton onClick={onPrev} />
          <NextButton onClick={handleNextClick} disabled={!isCompleted} />
        </div>
      </div>
    </div>
  );
};

export default Step6PreferredFood;


/*
참고: 콘솔에 찍어보면 이런 형태.

선택 
{아침: {…}, 점심: {…}}
아침: {main: '03', side: '13'}
점심: {main: '02', side: '22'}
[[Prototype]]
: 
Object

*/