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

  /* 입력 값 초기화 */
  const handleReset = () => {
    setInput('');
    handleSubmit('');
  };

  /* 검색 */
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(input);
    }
  };

  return (
    <div className="relative">
      <input
        className="w-full border-2 border-primary rounded-full px-5 py-2 focus:outline-none"
        type="text"
        placeholder="음식명을 입력해 주세요."
        value={input}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      {input && (
        <p className="absolute top-2 right-5 cursor-pointer" onClick={handleReset}>
          ✖
        </p>
      )}
    </div>
  );
};

export default SearchBar;
