interface FormattedNutrientsType {
  [key: string]: {
    name: string;
    unit: string;
  };
}

export const FORMATTED_NUTRIENTS: FormattedNutrientsType = {
  AMT_NUM3: { name: '단백질', unit: 'g' },
  AMT_NUM4: { name: '지방', unit: 'g' },
  AMT_NUM7: { name: '탄수화물', unit: 'g' },
  AMT_NUM8: { name: '당류', unit: 'g' },
  AMT_NUM14: { name: '나트륨', unit: 'mg' }
};
