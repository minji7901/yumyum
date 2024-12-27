import { SumNutrients } from "@/utils/calendar/graph";
import React from "react";

interface GraphExplainProps {
  ratioData: SumNutrients;
}

// 평균값 및 상태 계산 함수
const getStatus = ( value: number, name : string ) => {
  if (value < 70) {
    return { color: "#E8C468", message: `하루에 필요한 ${name}이 매우 부족합니다. 더 많은 ${name}을 식단에 추가해 보세요!` };
  } else if (70 <= value && value < 90) {
    return { color: "#E8C468", message: `${name}이 다소 부족해요.` };
  } else if(90 <= value && value < 110){
    return { color: "#65AC53", message: `적정량의 ${name}을 섭취하고 있어요 😃` };
  } else if(110 <= value && value < 130){
    return { color: "#E76E50", message: `${name}이 다소 많아요.` };
  }else{
    return { color: "#E76E50", message: `하루에 너무 많은 ${name}을 섭취하고 있어요! 조금 줄이는 것을 추천합니다.` };
  }
};

export const GraphExplain: React.FC<GraphExplainProps> = ({ ratioData }) => {
  // 상태 계산
  const carbStatus = getStatus(ratioData?.carb, "탄수화물");
  const proteinStatus = getStatus(ratioData?.protein, "단백질");
  const fatStatus = getStatus(ratioData?.fat, "지방");

  return (
    <>
      <div className="w-full bg-[#ECF9E3] rounded-2xl p-8">
        <div className="flex flex-col items-start space-y-6 pl-[6%]">
          {/* 탄수화물 */}
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: carbStatus.color }}></div>
            <span>{carbStatus.message}</span>
          </div>
          {/* 단백질 */}
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: proteinStatus.color }}></div>
            <span>{proteinStatus.message}</span>
          </div>
          {/* 지방 */}
          <div className="flex items-center space-x-2">
            <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: fatStatus.color }}></div>
            <span>{fatStatus.message}</span>
          </div>
        </div>
      </div>
    </>
  );
};
