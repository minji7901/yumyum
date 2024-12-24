'use client';

import React from 'react';
import useFunnel from '@/components/todaysmeal/useFunnel';
// import ProgressIndicator from '@/components/todaysmeal/progress/ProgressIndicator';
import Step0Start from '@/components/todaysmeal/steps/Step0Start';
import Step1Goal from '@/components/todaysmeal/steps/Step1Goal';

const MealPlanner = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel('시작');

  const steps = ['시작', '목표']; 
  // TODO: 다른 steps 만들기...

  const handlePrev = () => {
    const prevIndex = steps.indexOf(currentStep) - 1;
    if (prevIndex >= 0) prev(steps[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = steps.indexOf(currentStep) + 1;
    if (nextIndex < steps.length) next(steps[nextIndex]);
  };

  return (
    <div className="flex justify-center items-center flex-col bg-white shadow-lg rounded-lg max-w-[1200px] mx-auto border-primary border-2 h-auto p-6">
      <Funnel>
        <Step name="시작">
          <Step0Start onNext={() => next('목표')} />
        </Step>
        <Step name="목표">
          <Step1Goal
            onNext={(goal) => {
              // console.log('Goal:', goal);
              handleNext();
            }}
            onPrev={handlePrev}
          />
        </Step>
      </Funnel>
    </div>
  );
};

export default MealPlanner;
