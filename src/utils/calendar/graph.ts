interface Nutrients {
  amount: number; // 섭취량 (1인분 수)
  AMT_NUM1: string; // 칼로리
  AMT_NUM3: string; // 탄수화물
  AMT_NUM4: string; // 단백질
  AMT_NUM7: string; // 지방
  AMT_NUM8: string; // 당류
  AMT_NUM14: string; // 나트륨
  FOOD_NM_KR: string; // 음식 이름
  Z10500: string; // 1인분 기준량(g)
}

interface SumNutrients {
  AMT_NUM1: number;
  AMT_NUM3: number;
  AMT_NUM4: number;
  AMT_NUM7: number;
  AMT_NUM8: number;
  AMT_NUM14: number;
}

export const calculateTotalNutrients = (data : Nutrients[]) => {
  const total = data.reduce((sum, item) => {
    // 1인분 기준량 (g) 가져오기
    const servingSize = parseFloat(item.Z10500) || 100;
    const amount = item.amount || 1;

    // 실제 섭취량 (g)
    const consumedWeight = servingSize * amount;

    // 각 영양소를 계산
    Object.keys(item).forEach((key) => {
      if (key.startsWith('AMT_NUM')) {
        const nutrientPer100g = parseFloat(item[key as keyof Nutrients] as string ) || 0;
        const totalNutrient = (nutrientPer100g / 100) * consumedWeight;

        // 기존 값과 합산
        sum[key as keyof Nutrients] = (sum[key] || 0) + totalNutrient;
      }
    });
    return sum;
  }, {} as Record<string, number>);
  return total;
};

export const calculateRatioNutrients = (data : SumNutrients) => {
  const calculateValue = (key : keyof SumNutrients, value : number) => {
    switch (key) {
      case 'AMT_NUM1': // 칼로리는 그대로 반환
        return value;
      case 'AMT_NUM3': // 탄수화물 300g 기준 %
        return Number(((value / 300) * 100).toFixed(1));
      case 'AMT_NUM4': // 단백질 55g 기준 %
        return Number(((value / 55) * 100).toFixed(1));
      case 'AMT_NUM7': // 지방 50g 기준 %
        return Number(((value / 50) * 100).toFixed(1));
      case 'AMT_NUM8': // 당류 75g 기준 %
        return Number(((value / 75) * 100).toFixed(1));
      case 'AMT_NUM14': // 나트륨(mg) 2000mg 기준 %
        return Number(((value / 2000) * 100).toFixed(1));
      default:
        return value;
    }
  };

  const ratioValue = Object.keys(data).reduce((result, key) => {
    const typedKey = key as keyof SumNutrients;
    result[typedKey] = calculateValue(typedKey, data[typedKey]);
    return result;
  }, {} as Record<string, number>);

  return ratioValue;
};

export const getLabelColor = (data : number) => {
  const color = 'hsl(var(--chart-2))';
  if (data > 100) {
    return 'hsl(var(--chart-1))';
  } else if (data < 70) {
    return 'hsl(var(--chart-4))';
  } else {
    return color;
  }
};
