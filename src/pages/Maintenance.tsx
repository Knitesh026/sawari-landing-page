
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <DotLottieReact
          src="https://lottie.host/9e7b636a-1c8c-4587-8155-8eb2ca602684/mrufNXK8sH.lottie"
          loop
          autoplay
        />
      </div>
      <h1 className="mt-8 text-3xl font-bold text-gray-800 text-center">We're under maintenance</h1>
      <p className="mt-4 text-lg text-gray-600 text-center">
        We'll be back soon with an improved experience. Thank you for your patience!
      </p>
    </div>
  );
};

export default Maintenance;
