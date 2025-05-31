import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const navigate = useNavigate();
  
  return (
    <section id="products" className="py-12 md:py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-800 mb-4">
            Our Bestsellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Discover our most loved products, crafted with organic ingredients and pure botanical extracts to nourish your skin naturally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
         
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;