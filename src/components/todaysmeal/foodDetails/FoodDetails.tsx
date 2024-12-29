'use client';
import React from 'react';
import FoodNutrition from '@/types/FoodNutrition';

interface FoodDetailsProps {
  food: FoodNutrition | null; // 선택된 음식 데이터
  onClose: () => void; // 닫기 버튼 핸들러
}

const FoodDetails = ({ food, onClose }: FoodDetailsProps) => {
  if (!food) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center px-4"
      onClick={handleOutsideClick}
    >
      <div
        className="flex flex-col justify-center items-center bg-white rounded-lg p-6 shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl sm:text-2xl font-bold mb-4">{food.foodNm}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>에너지:</strong> {food.enerc} kcal
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>단백질:</strong> {food.prot} g
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>지방:</strong> {food.fatce} g
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>탄수화물:</strong> {food.chocdf} g
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>식이섬유:</strong> {food.fibtg} g
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>칼슘:</strong> {food.ca} mg
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>철:</strong> {food.fe} mg
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>나트륨:</strong> {food.nat} mg
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>비타민 C:</strong> {food.vitc} mg
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <strong>콜레스테롤:</strong> {food.chole} mg
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition-all"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;
