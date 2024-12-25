'use client';

const FoodUnselected = () => {
  return (
    <>
      <div>음식 태그를 클릭하시면 영양정보를 볼 수 있습니다</div>
    </>
  );
};

interface FoodInfoProps {
  selectedFoodTag: string|null;
}
const FoodInfo = ({ selectedFoodTag }: FoodInfoProps) => {
  //selectedFoodTag <-태그 데이터의 아이디
  const selectedFood = true;
  const nutritionsData = [
    { nutritionName: '탄수화물', quantity: 100 },
    { nutritionName: '단백질', quantity: 100 },
    { nutritionName: '지방', quantity: 100 },
    { nutritionName: '당류', quantity: 100 },
    { nutritionName: '나트륨', quantity: 100 }
  ];
  const testData = {
    name: '식품이름이름이름',
    calorie: 1000,
    servingSize: '100g',
    nutritions: nutritionsData,
    amount: 1
  };
  const { name, calorie, servingSize, nutritions, amount } = testData;
  const foodName = amount > 1 ? `${name} x${amount}` : name;
  return (
    <>
      {selectedFood ? (
        <>
          <div>
            <h3 className="mb-1 text-xl font-bold text-center">{foodName}</h3>
            <h4 className="text-lg font-bold text-center text-gray-400">{`${calorie * amount}kcal`}</h4>
            <h4 className="text-xs font-bold text-center text-gray-400">{`1인분 ${servingSize}`}</h4>
          </div>
          <table className="m-auto mt-3 mb-6">
            {nutritions.map(({ nutritionName, quantity }) => (
              <tr key={nutritionName}>
                <td className="text-right">{nutritionName}</td>
                <td className="px-4 text-left">{`${quantity}g`}</td>
              </tr>
            ))}
          </table>
          <button type="button" className="m-auto common-btn px-2 py-1">
            삭제
          </button>
        </>
      ) : (
        <FoodUnselected />
      )}
    </>
  );
};

interface ShowDailyMealDataProps {
  selectedFoodTag:string|null;
}
const ShowDailyMealData = ({ selectedFoodTag }: ShowDailyMealDataProps) => {
  const testData = { totalCalories: 1000 };
  const { totalCalories } = testData;
  return (
    <>
      <div className="py-6 border-b">
        <FoodInfo selectedFoodTag={selectedFoodTag} />
      </div>
      <div className="my-5 ">
        <h3 className="mb-3 text-xl font-bold text-center">N월 N일의 하루 섭취 영양</h3>
        <div className="text-3xl font-bold text-center text-[#da6b5d]">{`${totalCalories}kcal`}</div>
      </div>
    </>
  );
};

export default ShowDailyMealData;
