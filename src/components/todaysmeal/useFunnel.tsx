'use client'; 

import React, { useState, ReactNode } from 'react';
// ReactNode: 렌더링 가능한 노드를 표현하는 타입 ===> children을 위한 타입을 위해 사용함.

interface StepProps {
  name: string; 
  children: ReactNode; // 각 Step 컴포넌트가 렌더링할 자식 요소
}

interface FunnelProps {
  children: ReactNode; // Funnel 컴포넌트가 렌더링할 Step 요소
}

const useFunnel = (initialStep: string) => {
  const [currentStep, setCurrentStep] = useState(initialStep); // step 상태관리

  // Step 컴포넌트(children을 받아 JSX 요소 내보내기)
  const Step = ({ children }: StepProps) => <>{children}</>;

  // Funnel 컴포넌트
  const Funnel = ({ children }: FunnelProps) => {
    // 모든 자식 요소를 배열로 일단 바꾸고 
    const steps = React.Children.toArray(children).filter(
      // 자식 요소가 유효한 React 엘리먼트이고 타입이 Step인 경우만 filter해서 steps에 넣어줌.
      (child) => React.isValidElement(child) && child.type === Step
    );

    // 현재 활성화된 Step을 그 steps에서 찾고,
    const activeStep = steps.find((child) => React.isValidElement(child) && child.props.name === currentStep);

    // 활성화된 Step이 있으면 반환하고, 없으면 null을 반환
    return activeStep || null;
  };

  // 다음 Step으로 이동하는 함수
  const next = (nextStep: string) => setCurrentStep(nextStep);

  // 이전 Step으로 이동하는 함수
  const prev = (prevStep: string) => setCurrentStep(prevStep);

  return { Funnel, Step, next, prev, currentStep };
};

export default useFunnel; 
