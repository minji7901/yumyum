export const formatNutrients = (nutrient: string) => {
  switch (nutrient) {
    case 'AMT_NUM3':
      return { name: '단백질', unit: 'g' };
    case 'AMT_NUM4':
      return { name: '지방', unit: 'g' };
    case 'AMT_NUM7':
      return { name: '탄수화물', unit: 'g' };
    case 'AMT_NUM8':
      return { name: '당류', unit: 'g' };
    case 'AMT_NUM14':
      return { name: '나트륨', unit: 'mg' };
    default:
      return { name: '', unit: '' };
  }
};
