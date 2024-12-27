export interface SumNutrients {
  fat: number;
  carb: number;
  sugar: number;
  natrium: number;
  protein: number;
  calories: number;
}

export const calculateTotalNutrients = (data: { total_nutritions: SumNutrients }[]): SumNutrients => {
  return data.reduce((acc, curr) => {
    const currentNutrients = curr.total_nutritions;
    // 현재 객체의 total_nutritions 내 항목을 순회하여 합산
    for (const key in currentNutrients) {
      if (currentNutrients.hasOwnProperty(key)) {
        acc[key as keyof SumNutrients] =
          (acc[key as keyof SumNutrients] || 0) + currentNutrients[key as keyof SumNutrients];
      }
    }
    return acc;
  }, {} as SumNutrients);
};

export const calculateRatioNutrients = (data: SumNutrients, days: number, height?: number, weight?: number) => {
  const calculateValue = (key: keyof SumNutrients, value: number) => {
    switch (key) {
      case 'carb': // 탄수화물(g)=몸무게 (kg)×4~6g
        return Number((value / ((weight || 65) * 5 * days) * 100).toFixed(1));
      case 'protein': // 단백질 (g)=몸무게 (kg)×0.8~1.2g
        return Number((value / ((weight || 65) * 1 * days) * 100).toFixed(1));
      case 'fat': // 지방 (g)=몸무게 (kg)×0.8~1.0g
        return Number((value / ((weight || 65) * 0.9 * days) * 100).toFixed(1));
      case 'sugar': // 당류 (g)=총 섭취 에너지의 10~20%
        return Number((value / ((weight || 65) * 30 * 0.15 * 0.25 * days) * 100).toFixed(1));
      case 'natrium': // 나트륨(mg) 2g 기준 %
        return Number((value / (2 * days) * 100).toFixed(1));
      default:
        return value;
    }
  };

  const ratioValue = Object.keys(data).reduce((result, key) => {
    const typedKey = key as keyof SumNutrients;
    result[typedKey] = calculateValue(typedKey, data[typedKey]);
    return result;
  }, {} as Record<keyof SumNutrients, number>);

  return ratioValue;
};

export const getLabelColor = (data: number) => {
  const color = 'hsl(var(--chart-2))';
  if (data > 110) {
    return 'hsl(var(--chart-1))';
  } else if (data < 90) {
    return 'hsl(var(--chart-4))';
  } else {
    return color;
  }
};
