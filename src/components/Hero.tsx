import React from 'react';
import heroBg from '../assets/hero bg pic.png'

const Hero: React.FC = () => {
  return (
    <div className="relative h-[90vh] md:h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "center",
      }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Natural Beauty, <br />
          <span className="text-green-400">Pure Radiance</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl px-4">
          Discover the power of nature with our handcrafted skincare products made from pure, organic ingredients.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto px-4">
          <a href="#products" className="w-full sm:w-auto"> 
            <button className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </a>
          <a href="#about" className="w-full sm:w-auto"> 
          <button className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-green-800 transition-colors duration-300">
            Learn More
          </button>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-white rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;