'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { calculateRatioNutrients, calculateTotalNutrients, getLabelColor } from '@/utils/calendar/graph';

const data = [
  {
    "amount": 1,
    "AMT_NUM1": "128", // 칼로리
    "AMT_NUM3": "2.98", // 탄수화물 300g
    "AMT_NUM4": "3.98", // 단백질 55g
    "AMT_NUM7": "20.05", // 지방 50g
    "AMT_NUM8": "0.73", // 당류 75g
    "AMT_NUM14": "243", // 나트륨(mg) 2000mg
    "FOOD_NM_KR": "비빔밥_약초",
    "Z10500": "400"
  },
  {
    "amount": 2,
    "AMT_NUM1": "165",
    "AMT_NUM3": "3.66",
    "AMT_NUM4": "1.58",
    "AMT_NUM7": "34.11",
    "AMT_NUM8": "0.21",
    "AMT_NUM14": "343",
    "FOOD_NM_KR": "삼각김밥_고추장불고기",
    "Z10500": "100"
  }
];

const totalData = calculateTotalNutrients(data);
const ratioData = calculateRatioNutrients(totalData);
console.log('totalData', totalData);
console.log('ratioData', ratioData);



const chartData = [
  { nutrient: 'AMT_NUM3', intakeRatio: ratioData.AMT_NUM3, fill: 'var(--color-AMT_NUM3)' },
  { nutrient: 'AMT_NUM4', intakeRatio: ratioData.AMT_NUM4, fill: 'var(--color-AMT_NUM4)' },
  { nutrient: 'AMT_NUM7', intakeRatio: ratioData.AMT_NUM7, fill: 'var(--color-AMT_NUM7)' },
  { nutrient: 'AMT_NUM8', intakeRatio: ratioData.AMT_NUM8, fill: 'var(--color-AMT_NUM8)' },
  { nutrient: 'AMT_NUM14', intakeRatio: ratioData.AMT_NUM14, fill: 'var(--color-AMT_NUM14)' }
];

const chartConfig = {
  intakeRatio: {
    label: '권장량 대비 섭취율(%) '
  },
  AMT_NUM3: {
    label: '탄수화물',
    color: 'hsl(var(--chart-1))'
  },
  AMT_NUM4: {
    label: '단백질',
    color: 'hsl(var(--chart-2))'
  },
  AMT_NUM7: {
    label: '지방',
    color: 'hsl(var(--chart-3))'
  },
  AMT_NUM8: {
    label: '당류',
    color: 'hsl(var(--chart-4))'
  },
  AMT_NUM14: {
    label: '나트륨',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

// 색상 값 동적으로 업데이트
Object.keys(chartConfig).forEach((key) => {
  if (key !== 'intakeRatio') { // intakeRatio는 색상 값을 제외하고 업데이트
    chartConfig[key].color = getLabelColor(ratioData[key]); 
  }
});

export function Graph() {
  return (
    <div className="w-full flex flex-col justify-center items-center border-[1px] rounded-xl border-softly py-14 px-28">
      <h1 className="text-2xl text-[#333333] font-bold mb-8">지난 30일간 섭취한 영양소</h1>
      <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>하루 평균 칼로리 </CardTitle>
          <CardDescription>{ratioData.AMT_NUM1} kcal</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 50,
                right: 50,
              }}
            >
              <YAxis
                dataKey="nutrient"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />
              <XAxis dataKey="intakeRatio" type="number" hide/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="intakeRatio" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <span className=" p-2 bg-[#E8C468]"/> 미달
            <span className=" p-2 bg-[#2A9D90]"/> 적정
            <span className=" p-2 bg-[#E76E50]"/> 초과
          </div>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
