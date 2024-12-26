'use client';

import React, { useState } from 'react';
import useFunnel from '@/components/todaysmeal/useFunnel';
import ProgressIndicator from '@/components/todaysmeal/progress/ProgressIndicator';
import Step0Start from '@/components/todaysmeal/steps/Step0Start';
import Step1Goal from '@/components/todaysmeal/steps/Step1Goal';
import Step2Meal from '@/components/todaysmeal/steps/Step2Meal';
import Step3HeightWeight from '@/components/todaysmeal/steps/Step3HeightWeight';
import Step4GenderAge from '@/components/todaysmeal/steps/Step4GenderAge';
import Step5Activity from '@/components/todaysmeal/steps/Step5Activity';
import Step6Recommendation from '@/components/todaysmeal/steps/Step6Recommendation';

interface MealPlanData {
  goal?: string;
  meals?: string[];
  height?: number;
  weight?: number;
  gender?: string;
  age?: number;
  activity?: string;
}

const MealPlanner = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel('시작');
  const [mealPlanData, setMealPlanData] = useState<MealPlanData>({});

  const steps = ['시작', '목표', '끼니', 'BMI', '성별과나이', '활동량', '요약'];

  const handleNext = (data: Partial<MealPlanData>, nextStep: string) => {
    setMealPlanData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  return (
    <div className="flex justify-center items-center flex-col bg-white shadow-lg rounded-lg max-w-[1200px] mx-auto border-primary border-2 h-auto p-6">
      {currentStep !== '시작' && <ProgressIndicator steps={steps} currentStep={steps.indexOf(currentStep)} />}

      <Funnel>
        {/* Step 0: 시작 */}
        <Step name="시작">
          <Step0Start onNext={() => next('목표')} />
        </Step>

        {/* Step 1: 목표 */}
        <Step name="목표">
          <Step1Goal onNext={(goal) => handleNext({ goal }, '끼니')} onPrev={() => handlePrev('시작')} />
        </Step>

        {/* Step 2: 끼니 */}
        <Step name="끼니">
          <Step2Meal onNext={(meals) => handleNext({ meals }, 'BMI')} onPrev={() => handlePrev('목표')} />
        </Step>

        {/* Step 3: BMI */}
        <Step name="BMI">
          <Step3HeightWeight onNext={(data) => handleNext(data, '성별과나이')} onPrev={() => handlePrev('끼니')} />
        </Step>

        {/* Step 4: 성별과나이 */}
        <Step name="성별과나이">
          <Step4GenderAge onNext={(data) => handleNext(data, '활동량')} onPrev={() => handlePrev('BMI')} />
        </Step>

        {/* Step 5: 활동량 */}
        <Step name="활동량">
          <Step5Activity
            onNext={(activity) => handleNext({ activity }, '요약')}
            onPrev={() => handlePrev('성별과나이')}
          />
        </Step>

        {/* Step 6: 요약 */}
        <Step name="요약">
          <Step6Recommendation data={mealPlanData} onPrev={() => handlePrev('활동량')} />
        </Step>
      </Funnel>
    </div>
  );
};

export default MealPlanner;
