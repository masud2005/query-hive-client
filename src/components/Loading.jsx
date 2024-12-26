import React from 'react';
import LottieLoading from '../assets/lottie/Loading.json';
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='min-h-[calc(100vh-400px)] flex justify-center items-center'>
            {/* <span className="loading loading-spinner loading-lg"></span> */}
            <Lottie className='h-[250px] md:h-[300px]' animationData={LottieLoading} />
        </div>
    );
};

export default Loading;