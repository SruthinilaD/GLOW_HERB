import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string>('30g');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(Number(id));

  // Additional product images


  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const productImages = product.images;
  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

const handleAddToCart = () => {
  addToCart(product, selectedWeight, quantity);
};

const handleBuyNow = () => {
  addToCart(product, selectedWeight, quantity);
  navigate('/payment');
};


  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT COLUMN: thumbnails + main image */}
            <div className="p-6 flex justify-center md:justify-start">
              <div className="flex">
                {/* Vertical thumbnails on desktop */}
                <div className="hidden md:flex flex-col space-y-2 mr-4">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden ${
                        selectedImage === idx ? 'ring-2 ring-green-600' : ''
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                {/* Main image */}
                <div className="relative w-full max-w-md h-[450px] overflow-hidden rounded-lg">
                  <img
                    src={productImages[selectedImage]}
                    alt={`${product.name} view ${selectedImage + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: product details */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating})
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xl font-semibold text-green-700 mb-2">
                  ₹{product.weights[selectedWeight]}
                </p>
                <div className="flex gap-4 mt-4">
                  {Object.entries(product.weights).map(([weight]) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-4 py-2 rounded-full border-2 ${
                        selectedWeight === weight
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-green-600'
                      } transition-colors duration-200`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-8">{product.description}</p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="px-4 py-2 text-gray-800">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-green-800 hover:bg-green-900 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Buy Now
                  </button>
                </div>

                <button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 px-6 rounded-lg transition-colors duration-300 border-2 border-green-600"
                >
                  Proceed to Cart
                </button>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Product Details
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 100% Natural Ingredients</li>
                  <li>• Chemical Free</li>
                  <li>• Cruelty Free</li>
                  <li>• Made in India</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
