import Lottie from 'react-lottie-player';

import lottieJson from '../../../../public/lottie/Lottie-loading.json';

import React from 'react';

const ProgressLoadingAnimation = () => {
  return (
    <div>
      <Lottie loop animationData={lottieJson} play/>
    </div>
  );
};

export default ProgressLoadingAnimation;
