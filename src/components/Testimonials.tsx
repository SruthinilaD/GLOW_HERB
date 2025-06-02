import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <section id="testimonials" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from people who have made Reen Naturals a part of their daily routine.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[430px] md:h-[250px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 flex flex-col md:flex-row items-center p-6 bg-white rounded-xl shadow-md ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-4 text-green-600">
                    <Quote className="h-8 w-8 rotate-180" />
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 bg-white rounded-full p-2 shadow-md focus:outline-none z-10 hover:bg-green-50 transition-colors duration-300"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-green-700" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 bg-white rounded-full p-2 shadow-md focus:outline-none z-10 hover:bg-green-50 transition-colors duration-300"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-green-700" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-green-600 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;