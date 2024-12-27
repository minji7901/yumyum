'use client';

import React from 'react';

interface TodaysmealOptionProps {
  label: string; // 표시할 텍스트
  isSelected: boolean; // 선택 여부
  onClick: () => void;
  className?: string; // 혹시나 추가로 필요한 스타일을 위해...
}

const TodaysmealOption = ({ label, isSelected, onClick, className = '' }: TodaysmealOptionProps) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault(); // 기본 동작 방지(useForm으로 부터 오는 것)
        onClick();
      }}
      className={`w-full border-2 rounded-full px-6 py-3 text-center font-medium transition-all duration-300 ${
        isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-800 border-primary'
      } hover:bg-primary hover:text-white ${className}`}
    >
      {label}
    </button>
  );
};

export default TodaysmealOption;

/*
UI 라고 생각해 -> 빼는 경우도 있고

네이밍이 더 중요해 -> 훅 폴더더
*/
