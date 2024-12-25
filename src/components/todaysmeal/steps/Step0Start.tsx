'use client';

import Image from 'next/image';

interface Step0StartProps {
  onNext: () => void;
}

const Step0Start = ({ onNext }: Step0StartProps) => {
  return (
    <div className="relative w-full h-auto flex flex-col justify-center items-center overflow-hidden px-4 py-10">
      {/* 제목 및 설명 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-black mb-4">오늘은 뭘 먹을까?</h1>
        <h3 className="text-lg text-gray-600">
          나의 식단 관리의 궁긍적인 목표와 기초/활동 대사량을 기반으로 맞춤 식단을 추천해 드려요.
        </h3>
      </div>

      {/* TODO: 나중에 이미지를 배경으로 두던가해서 디자인 좀 전체적으로 개선 필요 */}

      {/* 이미지 요소 */}
      <div className="flex justify-center mb-8">
        <Image
          src="/todaysmeal/mealplanner_main.webp"
          alt="meal planner 이미지"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
          priority
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="common-btn px-32 py-4 text-lg rounded-lg shadow-lg hover:bg-hover hover:scale-105 transition-all duration-300"
        >
          오늘의 식단 추천받기
        </button>
      </div>
    </div>
  );
};

export default Step0Start;