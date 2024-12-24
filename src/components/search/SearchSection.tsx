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
    <>
      <SearchBar handleSubmit={handleSubmit} />
      <FoodList keyword={keyword} />
    </>
  );
};

export default SearchSection;
