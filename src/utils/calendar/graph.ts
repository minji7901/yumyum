export const calculateTotalNutrients = (data) => {
  const total =  data.reduce((sum, item) => {
    // 1인분 기준량 (g) 가져오기
    const servingSize = parseFloat(item.Z10500) || 100;
    const amount = item.amount || 1;

    // 실제 섭취량 (g)
    const consumedWeight = servingSize * amount;

    // 각 영양소를 계산
    Object.keys(item).forEach((key) => {
      if (key.startsWith("AMT_NUM")) {
        const nutrientPer100g = parseFloat(item[key]) || 0;
        const totalNutrient = (nutrientPer100g / 100) * consumedWeight;

        // 기존 값과 합산
        sum[key] = (sum[key] || 0) + totalNutrient;
      }
    });
    return sum;
  }, {});
  return total;
};

export const calculateRatioNutrients = (data) => {
  const calculateValue = (key, value) => {
    switch (key) {
      case 'AMT_NUM1': // 칼로리는 그대로 반환
        return value;
      case 'AMT_NUM3': // 탄수화물 300g
        return Number((value / 300 * 100).toFixed(1));
      case 'AMT_NUM4': // 단백질 55g
        return Number((value / 55 * 100).toFixed(1));
      case 'AMT_NUM7': // 지방 50g
        return Number((value / 50 * 100).toFixed(1));
      case 'AMT_NUM8': // 당류 75g
        return Number((value / 75 * 100).toFixed(1));
      case 'AMT_NUM14': // 나트륨(mg) 2000mg
        return Number((value / 2000 * 100).toFixed(1));
      default:
        return value;
    }
  };

  const ratioValue = Object.keys(data).reduce((result, key) => {
    result[key] = calculateValue(key, data[key]);
    return result;
  }, {});

  return ratioValue;
}

export const getLabelColor = (data) => {
  const color = 'hsl(var(--chart-2))';
  if(data > 100) {
    return 'hsl(var(--chart-1))';
  }else if( data < 70) {
    return 'hsl(var(--chart-4))';
  }else{
    return color;
  }
  
}