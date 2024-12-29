import SearchSection from '@/components/search/SearchSection';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';

const Home = () => { 
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
        <Image
          src="/img/home/home_main.svg"
          alt="home main image"
          layout="fill" // 이미지를 부모 요소에 맞게 채움
          objectFit="cover" // 이미지를 화면에 꽉 차게 유지
          priority // 첫 화면에 바로 로드되도록 설정
        />

        <div className="absolute top-40 flex flex-col gap-4 m-10 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          <div className="flex flex-wrap">
            <p className="text-5xl text-white font-bold mt-2">오늘의 한 끼,&nbsp;</p>
            <p className="text-5xl text-white font-bold mt-2">내일의 건강을 위해</p>
          </div>
          <div className="flex flex-wrap">
            <p className="text-xl text-white font-bold">맛있는 한 끼가 쌓이면,&nbsp;</p>
            <p className="text-xl text-white font-bold">더 나은 내일이 시작됩니다!</p>
          </div>
          <div className="flex flex-wrap">
            <p className="text-xl text-white font-bold">추천 식단과 영양 성분 분석을 통해&nbsp;</p>
            <p className="text-xl text-white font-bold">건강한 삶을 계획하고 기록해 보세요.</p>
          </div>
        </div>

        <div className="absolute bottom-10 w-screen flex flex-col items-center gap-4">
          <p className="text-xl text-primary font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
            다양한 음식들의 영양 성분을 확인해보세요!
          </p>
          <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full border-2 border-primary animate-bounce">
            <FaArrowDown className="text-xl text-primary" />
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
      <h1 className="common-title">식품 검색</h1>
      <SearchSection />
    </>
  );
};

export default Home;
