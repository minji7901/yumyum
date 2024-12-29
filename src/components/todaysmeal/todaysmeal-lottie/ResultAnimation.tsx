'use client';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });
import lottieJson from '../../../../public/lottie/Lottie-result.json';

const ResultAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie loop animationData={lottieJson} play className="w-2/3" />
    </div>
  );
};

export default ResultAnimation;
