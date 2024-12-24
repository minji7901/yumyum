export const calculateTodayTotals = (data) => {
  const totals = data.reduce((sum, item) => {
    const amount = item.amount || 1; // 입력 수

    // 숫자 속성들의 합을 계산
    Object.keys(item).forEach((key) => {
      if (key !== 'foodNm' && key !== 'foodSize' && key !== 'amount') { // 해당 항목들은 계산에서 제외
        const value = parseFloat(item[key]) || 0;
        sum[key] = (sum[key] || 0) + value * amount;
      }
    });

    return sum;
  }, {}); // 초기값을 빈 배열로

  return totals;
};
