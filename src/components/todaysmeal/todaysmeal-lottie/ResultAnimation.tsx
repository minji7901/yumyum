import Lottie from 'react-lottie-player';

import lottieJson from '../../../../public/lottie/Lottie-result.json';

import React from 'react';

const ResultAnimation = () => {
  return (
    <div className='flex justify-center items-center'>
      <Lottie loop animationData={lottieJson} play className='w-2/3'/>
    </div>
  );
};

export default ResultAnimation;
