'use client';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FoodList from './FoodList';

const SearchSection = () => {
  const [keyword, setKeyword] = useState<string>('');

  /* 검색 */
  const handleSubmit = (value: string) => {
    setKeyword(value);
  };

  return (
    <div className="flex flex-col gap-5 m-5">
      <SearchBar handleSubmit={handleSubmit} />
      <FoodList keyword={keyword} />
    </div>
  );
};

export default SearchSection;
