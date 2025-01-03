'use client';

import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import SearchBar from '../search/SearchBar';
import FoodList from '../search/FoodList';
import { SearchedFood, SelectedFoodInfo } from '@/types/SelectedFoodInfo';
import { SelectedDateContext } from './CalendarDateContext';
import useCreateCalendarRow from '@/hooks/useCreateCalendarRow';
import useAddFoodTag from '@/hooks/useAddFoodTag';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

interface AddFoodFormProps {
  searchedFood: SearchedFood | null;
  howManyTags: number;
  setHowManyTags: (num: number) => void;
}

const AddFoodForm = ({ searchedFood, howManyTags, setHowManyTags }: AddFoodFormProps) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const { year, month, day } = selectedDate;
  
  const [consumedAmount, setConsumedAmount] = useState<number>(1);
  const searchedFoodDefault = {
    nutritions: {
      protein: 0,
      fat: 0,
      carb: 0,
      sugar: 0,
      natrium: 0,
      calories: 0
    },
    servingSize: '',
    calorie: 0,
    name: ''
  };
  const searchedFoodObj = searchedFood ? searchedFood : searchedFoodDefault;
  const foodTagData = { ...searchedFoodObj, amount: consumedAmount, year, month, day };

  //mutate 생성
  const createFirstTag = useCreateCalendarRow({ foodTagData, consumedAmount });
  const addFoodTag = useAddFoodTag({ foodTagData, consumedAmount });

  //amount 값 업데이트
  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    setConsumedAmount(amount);
  };

  const onFoodSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchedFood) {
      if (howManyTags === 0) {
        // 기존에 존재하는 태그가 없다면 캘린더 생성, 새로운 태그 생성
        createFirstTag();
        setHowManyTags(howManyTags + 1);
        return;
      }
      // 기존에 존재하는 태그가 있다면 새로운 태그만 생성
      addFoodTag();
      setHowManyTags(howManyTags + 1);
    }
  };
  return (
    <form
      className="mt-5 m-auto my-5 flex justify-between"
      onSubmit={(e) => {
        onFoodSubmit(e);
      }}
    >
      <div className="m-auto w-3/5 flex justify-between items-center">
        <label htmlFor="selectedFoodAmount" className="text-xl font-bold text-center">
          {searchedFood ? searchedFood.name : '식품을 선택해주세요'}
        </label>
        <span> x </span>
        <input
          type="number"
          min={1}
          max={30}
          name="selectedFoodAmount"
          id="selectedFoodAmount"
          defaultValue="1"
          className="w-[3rem] h-[2rem] text-center border-2 border-gray-400 rounded"
          onChange={(e) => {
            onAmountChange(e);
          }}
        />
      </div>
      <button className="m-auto common-btn px-2 py-1">추가</button>
    </form>
  );
};

interface AddNewFoodProps {
  onModalModeSwitch: () => void;
  howManyTags: number;
  setHowManyTags: (num:number)=>void;
}
const AddNewFood = ({ onModalModeSwitch, howManyTags, setHowManyTags }: AddNewFoodProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchedFood, setSearchedFood] = useState<SearchedFood | null>(null);

  /* 검색 */
  const handleSubmit = (value: string) => {
    setKeyword(value);
  };

  /* 음식 선택 */
  const onSelectFoodHandler = (foodInfo: SelectedFoodInfo) => {
    const { servingSize, calorie, name, data } = foodInfo;
    const nutritions = {
      protein: parseInt(data.AMT_NUM3),
      fat: parseInt(data.AMT_NUM4),
      carb: parseInt(data.AMT_NUM7),
      sugar: parseInt(data.AMT_NUM8),
      natrium: parseInt(data.AMT_NUM14),
      calories: calorie
    };
    setSearchedFood({ servingSize, calorie, name, nutritions });
  };

  return (
    <>
      <button type="button" onClick={onModalModeSwitch} className="text-bold hover:text-primary">
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <div className="m-auto w-[90%]">
        <SearchBar handleSubmit={handleSubmit} />
        <div className="h-[14.5rem] hide-scroll-y">
          <FoodList keyword={keyword} isInModal={true} onSelectFoodHandler={onSelectFoodHandler} />
        </div>
      </div>
      <div className="border-t">
        <AddFoodForm searchedFood={searchedFood} howManyTags={howManyTags} setHowManyTags={setHowManyTags} />
      </div>
    </>
  );
};

export default AddNewFood;
