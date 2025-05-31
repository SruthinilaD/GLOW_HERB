import React, { useState } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Use first weight as default
    const defaultWeight = Object.keys(product.weights)[0];
    addToCart(product, defaultWeight, 1);
  };

  return (
    <div 
      className="w-full sm:w-64 md:w-80 bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative h-90 sm:h-90 md:h-90 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}

        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <button 
            className="bg-white text-green-700 rounded-full p-3 transform hover:scale-110 transition-transform duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-green-700 font-medium">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;