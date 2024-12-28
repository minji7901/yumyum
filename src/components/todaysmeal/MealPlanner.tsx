'use client';

import React, { useState } from 'react';
import useFunnel from '@/hooks/ui/useFunnel';
import ProgressIndicator from '@/components/todaysmeal/progress/ProgressIndicator';
import Step0Start from '@/components/todaysmeal/steps/Step0Start';
import Step1Goal from '@/components/todaysmeal/steps/Step1Goal';
import Step2Meal from '@/components/todaysmeal/steps/Step2Meal';
import Step3HeightWeight from '@/components/todaysmeal/steps/Step3HeightWeight';
import Step4GenderAge from '@/components/todaysmeal/steps/Step4GenderAge';
import Step5Activity from '@/components/todaysmeal/steps/Step5Activity';
import Step6PreferredFood from './steps/Step6PreferredFood';
import Step7Recommendation from '@/components/todaysmeal/steps/Step7Recommendation';
import MealPlanData from './types/MealPlanData';

const MealPlanner = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel('시작');
  const [mealPlanData, setMealPlanData] = useState<MealPlanData>({}); //받은 데이터 관리용

  const steps = ['시작', '목표', '끼니', '키와체중', '성별과나이', '활동량', '음식선호', '추천식단'];

  const handleNext = (data: Partial<MealPlanData>, nextStep: string) => {
    setMealPlanData((prev) => ({ ...prev, ...data }));
    console.log(mealPlanData);
    next(nextStep);
  };

  const handlePrev = (prevStep: string) => {
    prev(prevStep);
  };

  return (
    <div className="flex justify-center items-center flex-col bg-white shadow-lg rounded-lg max-w-[1200px] mx-auto border-primary border-2 h-auto p-6">
      {currentStep !== '시작' && currentStep !== '추천식단' && (
        <ProgressIndicator steps={steps} currentStepIndex={steps.indexOf(currentStep)} />
      )}

      <Funnel>
        {/* Step 0: 시작 */}
        <Step name="시작">
          <Step0Start onNext={() => next('목표')} />
          {/* 받는 데이터가 없음 */}
        </Step>

        {/* Step 1: 목표 */}
        <Step name="목표">
          <Step1Goal
            goalData={mealPlanData.goal}
            onNext={(goal) => handleNext({ goal }, '끼니')}
            onPrev={() => handlePrev('시작')}
          />
        </Step>

        {/* Step 2: 끼니 */}
        <Step name="끼니">
          <Step2Meal
            mealData={mealPlanData.meals}
            onNext={(meals) => handleNext({ meals }, '키와체중')}
            onPrev={() => handlePrev('목표')}
          />
        </Step>

        {/* Step 3: 키와체중 */}
        <Step name="키와체중">
          <Step3HeightWeight
            heightData={mealPlanData.height}
            weightData={mealPlanData.weight}
            onNext={(data) => handleNext(data, '성별과나이')}
            onPrev={() => handlePrev('끼니')}
          />
        </Step>

        {/* Step 4: 성별과나이 */}
        <Step name="성별과나이">
          <Step4GenderAge
            genderData={mealPlanData.gender}
            ageData={mealPlanData.age}
            onNext={(data) => handleNext(data, '활동량')}
            onPrev={() => handlePrev('키와체중')}
          />
        </Step>

        {/* Step 5: 활동량 */}
        <Step name="활동량">
          <Step5Activity
            activityData={mealPlanData.activity}
            onNext={(activity) => handleNext({ activity }, '음식선호')}
            onPrev={() => handlePrev('성별과나이')}
          />
        </Step>

        {/* Step 6: 음식 선호 */}
        <Step name="음식선호">
          <Step6PreferredFood
            mealData={mealPlanData.meals}
            onNext={(preferredFoods) => handleNext({ preferredFoods }, '추천식단')}
            onPrev={() => handlePrev('활동량')}
          />
        </Step>

        {/* Step 7: 추천식단 */}
        <Step name="추천식단">
          <Step7Recommendation data={mealPlanData} />
        </Step>
      </Funnel>
    </div>
  );
};

export default MealPlanner;
