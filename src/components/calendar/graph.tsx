'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { calculateRatioNutrients, calculateTotalNutrients, getLabelColor, SumNutrients } from '@/utils/calendar/graph';
import { useGraph } from '@/hooks/useGraph';
import { GraphExplain } from './GraphExplain';
import Loading from '@/app/loading';
import { useEffect, useState } from 'react';

export const Graph = () => {
  const { data, isPending, isError } = useGraph();
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [ratioData, setRatioData] = useState<SumNutrients | null>(null);
  const days: number = data?.length || 0;

  // 선택한 날짜의 입력한 데이터가 있는지 확인
  const isEmptyData = Array.isArray(data) && data.length === 0;

  // 데이터가 있을 때 계산
  const totalData = data && !isEmptyData ? calculateTotalNutrients(data) : null;

  // 차트 데이터 생성
  const chartData = ratioData
    ? [
        { nutrient: 'carb', intakeRatio: ratioData.carb, fill: 'var(--color-carb)' },
        { nutrient: 'protein', intakeRatio: ratioData.protein, fill: 'var(--color-protein)' },
        { nutrient: 'fat', intakeRatio: ratioData.fat, fill: 'var(--color-fat)' },
        { nutrient: 'sugar', intakeRatio: ratioData.sugar, fill: 'var(--color-sugar)' },
        { nutrient: 'natrium', intakeRatio: ratioData.natrium, fill: 'var(--color-natrium)' }
      ]
    : [];

  const chartConfig: Record<string, { label: string; color?: string }> = {
    intakeRatio: {
      label: '권장량 대비 섭취율(%) '
    },
    carb: {
      label: '탄수화물',
      color: 'hsl(var(--chart-1))'
    },
    protein: {
      label: '단백질',
      color: 'hsl(var(--chart-2))'
    },
    fat: {
      label: '지방',
      color: 'hsl(var(--chart-3))'
    },
    sugar: {
      label: '당류',
      color: 'hsl(var(--chart-4))'
    },
    natrium: {
      label: '나트륨',
      color: 'hsl(var(--chart-5))'
    }
  } satisfies ChartConfig;

  // 키와 몸무게 변경 시 비율 데이터 업데이트
  useEffect(() => {
    if (totalData) {
      const updatedRatioData = calculateRatioNutrients(
        totalData,
        days,
        height ? Number(height) : undefined,
        weight ? Number(weight) : undefined
      );
      setRatioData(updatedRatioData);
    }
  }, [height, weight, days]);

  if (ratioData) {
    Object.keys(chartConfig).forEach((key) => {
      if (key !== 'intakeRatio') {
        const typedKey = key as keyof SumNutrients;
        const configItem = chartConfig[key] as { label: string; color: string };
        configItem.color = getLabelColor(ratioData[typedKey]);
      }
    });
  }

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="w-full flex flex-col justify-center items-center border-[1px] rounded-xl border-softly py-8 px-6 my-14 bg-[#f8f9fa] text-[#333] text-center">
        <h2 className="text-xl font-semibold mb-4">오류 발생</h2>
        <p>그래프 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  if (isEmptyData) {
    return (
      <div className="w-full flex flex-col justify-center items-center border-[1px] rounded-xl border-softly py-14 px-28 my-14">
        <div className="text-lg text-[#666666]">달력에 식단 데이터를 추가해 보세요.</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center border-[1px] rounded-xl border-softly py-14 px-40 my-14">
      <h1 className="text-2xl text-[#333333] font-bold mb-8">지난 30일간 기록한 영양소</h1>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>하루 평균 칼로리</CardTitle>
            <CardDescription>{ratioData?.calories} kcal</CardDescription>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 50,
                  right: 50
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
                <XAxis dataKey="intakeRatio" type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="intakeRatio" layout="vertical" radius={5} barSize={65} />
              </BarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm px-20">
            <div className="flex gap-2 font-medium leading-none mb-10">
              <span className="p-2 bg-[#E8C468]" /> 미달
              <span className="p-2 ml-2 bg-[#65AC53]" /> 적정
              <span className="p-2 ml-2 bg-[#E76E50]" /> 초과
            </div>

            {/** 설명란 */}
            <GraphExplain ratioData={ratioData as SumNutrients}/>

            <div className="flex flex-col w-full">
              <div className="flex w-full justify-center space-x-4 p-4">
                <div className="flex flex-col md:flex-row items-center w-1/2 space-y-2 sm:space-y-0">
                  <label htmlFor="height" className="sm:mr-2 w-full sm:w-auto text-center sm:text-left">
                    키 (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="px-2 py-2 border rounded-lg w-full sm:w-[70%]"
                    min="60"
                    max="300"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center w-1/2 space-y-2 sm:space-y-0">
                  <label htmlFor="weight" className="sm:mr-2 w-full sm:w-auto text-center sm:text-left">
                    몸무게 (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="px-2 py-2 border rounded-lg w-full sm:w-[70%]"
                    min="30"
                    max="500"
                  />
                </div>
                {/* <button onClick={handleSubmit} className="common-btn px-4 py-2">
                  등록
                </button> */}
              </div>
              <div className="w-full flex justify-center">
                <span className="text-xs text-gray-400">
                  ※ 키와 몸무게를 입력하지 않은 경우, 평균값을 기준으로 계산합니다.
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
