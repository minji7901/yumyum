import SearchSection from '@/components/search/SearchSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Image
          src="/home/home_main.svg"
          alt="home main image"
          layout="fill" // 이미지를 부모 요소에 맞게 채움
          objectFit="cover" // 이미지를 화면에 꽉 차게 유지
          priority // 첫 화면에 바로 로드되도록 설정
        />
      </div>
      <h1 className="common-title">식품 검색</h1>
      <SearchSection />
    </>
  );
}
