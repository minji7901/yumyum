'use client';

import { IoIosArrowForward } from 'react-icons/io';

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const NextButton = ({ onClick, disabled = false }: NextButtonProps) => {
  return (
    <button
      className="common-btn inline-flex justify-center items-center w-1/3 py-3 p-4 space-x-2"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="hidden sm:inline">다음으로</span>
      <IoIosArrowForward className="text-lg" />
    </button>
  );
};

export default NextButton;
