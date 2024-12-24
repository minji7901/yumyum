import React from 'react';

interface PreviousButtonProps{
  onClick: () => void;
};

const PreviousButton = ({ onClick }: PreviousButtonProps) => {
  return (
    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClick}>
      이전으로
    </button>
  );
};

export default PreviousButton;
