import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-white border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
