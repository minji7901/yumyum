import MealPlanner from '@/components/todaysmeal/MealPlanner';

const Page = () => {
  return (
    <div className="min-h-screen">
      {/* TODO: 나중에 헤더 완성되면 위치 다시 고려하기 */}
      <div className="max-w-[1200px] mx-auto py-30">
        {/* TODO: 나중에 닉네임 supabase에서 가져와서 바꾸기 */}
        <h1 className="common-title">오구오구님을 위한 오늘의 식단</h1>
        <MealPlanner />
      </div>
    </div>
  );
};

export default Page;
