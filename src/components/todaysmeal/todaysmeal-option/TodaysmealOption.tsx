'use client';

import React from 'react';

interface TodaysmealOptionProps {
  label: string; // 표시할 텍스트
  isSelected: boolean; // 선택 여부
  onClick: () => void;
  className?: string; // 혹시나 추가로 필요한 스타일을 위해...
}

const TodaysmealOption = ({ label, isSelected, onClick, className = 'w-full px-6 py-3' }: TodaysmealOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-medium border-2 rounded-full text-center  transition-all duration-300 ${
        isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-800 border-primary'
      } hover:bg-primary hover:text-white ${className}`}
    >
      {label}
    </button>
  );
};

export default TodaysmealOption;
