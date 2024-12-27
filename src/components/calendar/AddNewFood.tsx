'use client';

import { FormEvent, useState } from 'react';
import SearchBar from '../search/SearchBar';
import FoodList from '../search/FoodList';

interface AddNewFoodProps {
  onModalModeSwitch: () => void;
}

const AddFoodForm = () => {
  const onFoodSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
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
          선택한 식품 이름
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

  /* 검색 */
  const handleSubmit = (value: string) => {
    setKeyword(value);
  };

  return (
    <>
      <button type="button" onClick={onModalModeSwitch} className="text-bold hover:text-primary">
        {'<<'}
      </button>
      <div className="m-auto w-[90%]">
        <SearchBar handleSubmit={handleSubmit} />
        <div className="h-[18rem] hide-scroll-y">
          <FoodList keyword={keyword} isInModal={true} />
        </div>
      </div>
      <div className="border-t">
        <AddFoodForm />
      </div>
    </>
  );
};

export default AddNewFood;
