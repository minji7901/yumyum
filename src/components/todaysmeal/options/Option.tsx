import React from 'react';

interface OptionProps {
  label: string; // 표시할 텍스트
  isSelected: boolean; // 선택 여부
  onClick: () => void;
  className?: string; // 혹시나 추가로 필요한 스타일을 위해...
}

const Option = ({ label, isSelected, onClick, className = '' }: OptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full border-2 rounded-full px-4 py-3 text-center font-medium transition-all duration-300 ${
        isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-800 border-primary'
      } hover:bg-primary hover:text-white ${className}`}
    >
      {label}
    </button>
  );
};

export default Option;
