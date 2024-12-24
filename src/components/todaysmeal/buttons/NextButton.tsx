import React from 'react';

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
};

const NextButton = ({ onClick, disabled = false }: NextButtonProps) => {
  return (
    <button className="common-btn text-white px-4 py-2 rounded" onClick={onClick} disabled={disabled}>
      다음으로
    </button>
  );
};

export default NextButton;
