'use client';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

interface SearchBarProps {
  handleSubmit: (value: string) => void;
}

const SearchBar = ({ handleSubmit }: SearchBarProps) => {
  const [input, setInput] = useState<string>('');

  /* 입력 값 변경 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  /* 검색 */
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(input);
    }
  };

  return (
    <input
      className="border-2 border-black"
      type="text"
      value={input}
      onChange={handleChange}
      onKeyDown={handleEnter}
    />
  );
};

export default SearchBar;
