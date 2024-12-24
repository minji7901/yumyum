'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { calculateTodayTotals } from '@/utils/calendar/graph';

const data = [
  {
    "amount": 1,
    "AMT_NUM1": "128",
    "AMT_NUM3": "2.98",
    "AMT_NUM4": "3.98",
    "AMT_NUM7": "20.05",
    "AMT_NUM8": "0.73",
    "AMT_NUM14": "243",
    "FOOD_NM_KR": "비빔밥_약초",
    "NUTRI_AMOUNT_SERVING": "400g"
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
    "NUTRI_AMOUNT_SERVING": "100g"
  }
];

const calculateData = calculateTodayTotals(data);

console.log('calculateData', calculateData);


const chartData = [
  { nutrient: '탄수화물', intakeRatio: 275, fill: 'var(--color-탄수화물)' },
  { nutrient: '단백질', intakeRatio: 200, fill: 'var(--color-단백질)' },
  { nutrient: '지방', intakeRatio: 187, fill: 'var(--color-지방)' },
  { nutrient: '당류', intakeRatio: 173, fill: 'var(--color-당류)' },
  { nutrient: '나트륨', intakeRatio: 90, fill: 'var(--color-나트륨)' }
];

const chartConfig = {
  intakeRatio: {
    label: '권장량 대비 섭취율 '
  },
  탄수화물: {
    label: '탄수화물',
    color: 'hsl(var(--chart-1))'
  },
  단백질: {
    label: '단백질',
    color: 'hsl(var(--chart-2))'
  },
  지방: {
    label: '지방',
    color: 'hsl(var(--chart-3))'
  },
  당류: {
    label: '당류',
    color: 'hsl(var(--chart-4))'
  },
  나트륨: {
    label: '나트륨',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

export function Graph() {
  return (
    <div className="w-full flex flex-col justify-center items-center border-[1px] rounded-xl border-softly py-14 px-28">
      <h1 className="text-2xl text-[#333333] font-bold mb-8">지난 30일간 섭취한 영양소</h1>
      <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>하루 평균 칼로리</CardTitle>
          <CardDescription>00 kcal</CardDescription>
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
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
