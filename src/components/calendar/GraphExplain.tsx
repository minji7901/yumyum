'use client';

import React from 'react';

export const GraphExplain = () => {
  return (
    <>
      <div className="w-full bg-[#ECF9E3] rounded-2xl p-8">
        <div className="flex flex-col items-start space-y-6 pl-10">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-[#E8C468] rounded-full"></div>
            <span>설명 1ddddddddddd</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-[#65AC53] rounded-full"></div>
            <span>설명 2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-[#E76E50] rounded-full"></div>
            <span>설명 3</span>
          </div>
        </div>
      </div>
    </>
  );
};
