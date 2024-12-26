'use client';
import { IoIosArrowBack } from 'react-icons/io';
interface PreviousButtonProps {
  onClick: () => void;
}

const PreviousButton = ({ onClick }: PreviousButtonProps) => {
  return (
    <button
      className="bg-gray-500 text-white w-1/3 rounded-md p-4 flex items-center justify-center space-x-2"
      onClick={onClick}
    >
      <IoIosArrowBack className="text-lg" />
      <span className="hidden sm:inline">이전으로</span>
    </button>
  );
};

export default PreviousButton;
