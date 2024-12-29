import useDeleteFoodTag from "@/hooks/useDeleteFoodTag";
import { useContext } from "react";
import { SelectedDateContext } from "./CalendarDateContext";
import { Tables } from "@/types/supabase";
import { NutrientsJson } from "@/types/NutrientsJson";

interface FoodInfoBoxProps {
  selectedFood: Tables<'consumed_foods'>;
  howManyTags: number;
}
interface NutritionNamesType {
  [name: string]: string;
}
const FoodInfoBox = ({ selectedFood, howManyTags }: FoodInfoBoxProps) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const { year, month, day } = selectedDate;
  const { id: tagId, name, amount, nutritions, serving_size: servingSize } = selectedFood;

  const deleteTag = useDeleteFoodTag({ year, month, day, tagId, consumedAmount: amount });
  const onDeleteClick = ()=>{
    deleteTag();
    if(howManyTags===1) {/*캘린더 삭제*/}
  }

  const nutritionsKRName: NutritionNamesType = {
    fat: '지방',
    carb: '탄수화물',
    sugar: '당류',
    natrium: '나트륨',
    protein: '단백질'
  };
  const nutritionInfo = { ...(nutritions as NutrientsJson) };
  const nutritionsArr = Object.entries(nutritionInfo);
  const calories = nutritionsArr.pop() ?? ['calories', 0];

  const foodName = amount > 1 ? `${name} x${amount}` : name;
  const foddCalories = calories[1] * amount;

  return (
    <>
      <div>
        <h3 className="mb-1 text-xl font-bold text-center">{foodName}</h3>
        <h4 className="text-lg font-bold text-center text-gray-400">{`${foddCalories}kcal`}</h4>
        <h4 className="text-xs font-bold text-center text-gray-400">{`1인분 ${servingSize}`}</h4>
      </div>
      <table className="m-auto mt-3 mb-6">
        <tbody>
          {nutritionsArr.map(([nutrition, quantity]) => {
            return (
              <tr key={nutrition}>
                <td className="text-right">{nutritionsKRName[nutrition]}</td>
                <td className="px-4 text-left">{`${quantity * amount}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" className="m-auto common-btn px-2 py-1 block" onClick={onDeleteClick}>
        삭제
      </button>
    </>
  );
};

export default FoodInfoBox;