'use client';
import { FoodType } from '@/types/Food';
import { SelectedFoodInfo } from '@/types/SelectedFoodInfo';
import { formatNutrients } from '@/utils/formatNutrients';

interface FoodItemProps {
  data: FoodType;
  isInModal: boolean;
  onSelectFoodHandler: ((selectedFood: SelectedFoodInfo) => void) | null;
}

const FoodItem = ({ data, isInModal, onSelectFoodHandler }: FoodItemProps) => {
  const amountNumericValue = parseInt(data.Z10500);
  const kcalNumericValue = Math.floor((parseInt(data.Z10500) / 100) * parseInt(data.AMT_NUM1));
  const amount = `${amountNumericValue}g`;
  const kcal = `${kcalNumericValue}kcal`;

  const foodInfo = { servingSize: amountNumericValue, calorie: kcalNumericValue, name: data.FOOD_NM_KR, data };

  return (
    <div className="flex flex-col gap-2 p-5 border-b border-primary">
      <p className="font-bold">
        {data.FOOD_NM_KR} <span className="text-sm text-gray-400">{amount}</span>
      </p>
      <p className="text-primary">{kcal}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {Object.entries(data).map(
          ([key, value]) =>
            formatNutrients(key).name && (
              <p key={key}>{`${formatNutrients(key).name} ${value}${formatNutrients(key).unit}`}</p>
            )
        )}
      </div>
      {isInModal && onSelectFoodHandler && (
        <button
          type="button"
          className="common-btn"
          onClick={() => {
            onSelectFoodHandler(foodInfo);
          }}
        >
          선택
        </button>
      )}
    </div>
  );
};

export default FoodItem;
