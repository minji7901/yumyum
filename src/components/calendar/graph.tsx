'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const chartData = [
  { browser: '탄수화물', visitors: 275, fill: 'var(--color-탄수화물)' },
  { browser: '단백질', visitors: 200, fill: 'var(--color-단백질)' },
  { browser: '지방', visitors: 187, fill: 'var(--color-지방)' },
  { browser: '당류', visitors: 173, fill: 'var(--color-당류)' },
  { browser: '나트륨', visitors: 90, fill: 'var(--color-나트륨)' }
];

const chartConfig = {
  visitors: {
    label: 'Visitors'
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
                dataKey="browser"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />
              <XAxis dataKey="visitors" type="number" hide/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="visitors" layout="vertical" radius={5} />
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
