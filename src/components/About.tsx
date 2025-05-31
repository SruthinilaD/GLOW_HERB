import React from 'react';
import { Leaf, Award, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3735217/pexels-photo-3735217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Natural skincare ingredients" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-lg font-semibold">100% Natural</p>
                <p className="text-sm">Plant-based formulations</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-800 mb-4">
              About Glow Herb
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At GlowHerb, we are passionate about redefining skincare with the power of natural ingredients. Founded with a vision to offer pure, handcrafted skincare, our products are made with love, care, and a deep understanding of nature’s potential. We believe in the power of tradition, combined with modern care, to bring you a glow that lasts a lifetime.            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every product is thoughtfully crafted in small batches to ensure quality and freshness. We source our ingredients from trusted local farmers who practice sustainable agriculture, supporting both communities and the environment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="flex flex-col items-center text-center p-4 border border-green-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="bg-green-50 p-3 rounded-full mb-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">100% Organic</h3>
                <p className="text-sm text-gray-600">Pure natural ingredients</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border border-green-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="bg-green-50 p-3 rounded-full mb-3">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Cruelty Free</h3>
                <p className="text-sm text-gray-600">Never tested on animals</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border border-green-100 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="bg-green-50 p-3 rounded-full mb-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Quality Assured</h3>
                <p className="text-sm text-gray-600">Rigorous testing standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;