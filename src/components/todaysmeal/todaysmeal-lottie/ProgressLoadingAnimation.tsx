'use client';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });
import lottieJson from '../../../../public/lottie/Lottie-loading.json';

const ProgressLoadingAnimation = () => {
  return (
    <div>
      <Lottie loop animationData={lottieJson} play />
    </div>
  );
};

export default ProgressLoadingAnimation;
