'use client';

interface FoodTagBoxProps {
  modalMode: string;
  onModalModeSwitch: () => void;
  setSelectedFoodTag: (tagId:string|null) => void;
}
const FoodTagBox = ({ modalMode, onModalModeSwitch, setSelectedFoodTag }: FoodTagBoxProps) => {
  //스크롤 넣기
  const testTag = [
    { tagId: 0, foodName: '식품이름', amount: 1 },
    { tagId: 1, foodName: '식품이름이름이름이름', amount: 1 },
    { tagId: 2, foodName: '식품이름이름', amount: 1 },
    { tagId: 3, foodName: '식품이름이', amount: 2 },
    { tagId: 4, foodName: '식품이름이름이름이름이름', amount: 1 },
    { tagId: 5, foodName: '식품이름이름이름이름이름', amount: 1 },
    { tagId: 6, foodName: '식품이름이름이름이름이름', amount: 1 },
    { tagId: 7, foodName: '식품이름이름이름이름이름', amount: 1 }
  ];
  return (
    <section className="border-b">
      <div className="relative m-auto mb-4 w-4/5 h-28 border border-primary rounded-xl hide-scroll-y">
        <div className="p-4 flex flex-wrap gap-2">
          {testTag.map(({ tagId, foodName, amount }) => {
            const tagName = amount > 1 ? `${foodName} x${amount}` : foodName;
            return (
              <button
                key={tagId}
                type="button"
                className="px-2 py-0.5 border-2 border-primary rounded-lg text-sm hover:bg-[#f2faed]"
                onClick={() => {
                  setSelectedFoodTag('id');
                }}
              >
                {tagName}
              </button>
            );
          })}
        </div>
        {modalMode === 'ShowData' ? (
          <button
            onClick={onModalModeSwitch}
            type="button"
            className="absolute top-[80%] left-[95%] text-bold hover:text-primary"
          >
            <span className="fixed">+</span>
          </button>
        ) : (
          <button type="button" className="absolute top-[80%] left-[95%] text-bold hover:text-primary">
            <span className="fixed">...</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default FoodTagBox;
