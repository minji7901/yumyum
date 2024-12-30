import Title from '@/components/Title';
import MealPlanner from '@/components/todaysmeal/MealPlanner';
import { Metadata } from 'next';

// Metadata
export const metadata: Metadata = {
  title: '오늘의 식단 | Yumyumlog',
  description: '사용자를 위한 맞춤형 식단 추천 서비스입니다. 오늘의 식단을 확인해보세요!',
  keywords: ['식단 추천', '맞춤 식단', '건강한 식단', 'Yumyum']
};

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto py-30">
        <Title>님을 위한 오늘의 식단</Title>
        <MealPlanner />
      </div>
    </div>
  );
};

export default Page;
