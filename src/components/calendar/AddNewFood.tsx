'use client';

import { FormEvent, useContext, useState } from 'react';
import SearchBar from '../search/SearchBar';
import FoodList from '../search/FoodList';
import { SearchedFood, SelectedFoodInfo } from '@/types/SelectedFoodInfo';
import { SelectedDateContext } from './CalendarDateContext';

interface AddNewFoodProps {
  onModalModeSwitch: () => void;
}
interface AddFoodFormProps {
  searchedFood: SearchedFood | null;
}
const AddFoodForm = ({ searchedFood }: AddFoodFormProps) => {
  const dateContext = useContext(SelectedDateContext);
  const { selectedDate } = dateContext;
  //const { year, month, day } = selectedDate;

  const onFoodSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchedFood) {
      console.log(selectedDate);
      //const amount = e.target.selectedFoodAmount.value;
      //const foodTagData = { ...searchedFood, amount, year, month, day };
      //여기서 mutate를 사용해 db에 데이터를 추가하도록 하자.
    };
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
        />
      </div>
      <button className="m-auto common-btn px-2 py-1">추가</button>
    </form>
  );
};

const AddNewFood = ({ onModalModeSwitch }: AddNewFoodProps) => {
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
      carbs: parseInt(data.AMT_NUM7),
      sugar: parseInt(data.AMT_NUM8),
      natrium: parseInt(data.AMT_NUM14)
    };
    setSearchedFood({ servingSize, calorie, name, nutritions });
  };

  return (
    <>
      <button type="button" onClick={onModalModeSwitch} className="text-bold hover:text-primary">
        {'<<'}
      </button>
      <div className="m-auto w-[90%]">
        <SearchBar handleSubmit={handleSubmit} />
        <div className="h-[18rem] hide-scroll-y">
          <FoodList keyword={keyword} isInModal={true} onSelectFoodHandler={onSelectFoodHandler} />
        </div>
      </div>
      <div className="border-t">
        <AddFoodForm searchedFood={searchedFood} />
      </div>
    </>
  );
};

export default AddNewFood;
