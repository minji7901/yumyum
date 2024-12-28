'use client';

import { IoIosArrowForward } from 'react-icons/io';

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const NextButton = ({ onClick, disabled = false }: NextButtonProps) => {
  return (
    <button
      type="submit" // 엔터치면 next버튼이 실행됨(버튼 타입 sumbit)
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
