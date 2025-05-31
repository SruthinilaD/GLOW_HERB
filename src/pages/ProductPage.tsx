// src/pages/ProductPage.tsx

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
      {/* Outer container with reduced vertical padding */}
      <div className="container mx-auto px-4 py-4">
        {/* ─── Back to Products Button (slightly less bottom margin) ─── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-800 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        {/* White card wrapper with reduced padding */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Use flex-col on mobile, flex-row on md+; gap reduced to 4 */}
          <div className="flex flex-col md:flex-row gap-4">
            {/*** ─────── LEFT COLUMN: IMAGES ─────── ***/}
            {/* Changed md:w-[60%] → md:w-1/2 to remove extra blank space on desktop */}
            <div className="w-full md:w-1/2 p-4 flex flex-col">
              {/* ===== MOBILE: Main image first (shown only < md) ===== */}
              <div className="md:hidden w-full h-[250px] rounded-lg overflow-hidden mb-1 flex items-center justify-center">
                <img
                  src={productImages[selectedImage]}
                  alt={`${product.name} view ${selectedImage + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* ===== MOBILE: Thumbnail strip below main image (shown only < md) ===== */}
              <div className="flex md:hidden space-x-1 overflow-x-auto pb-1">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
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

              {/* ===== DESKTOP: Vertical thumbnails + main image side-by-side (shown ≥ md) ===== */}
              <div className="hidden md:flex flex-row w-full">
                {/* Vertical thumbnails */}
                <div className="flex flex-col space-y-1 mr-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden ${
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
                <div className="relative w-full max-w-md h-[400px] overflow-hidden rounded-lg">
                  <img
                    src={productImages[selectedImage]}
                    alt={`${product.name} view ${selectedImage + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/*** ─────── RIGHT COLUMN: PRODUCT DETAILS ─────── ***/}
            {/* Changed md:w-1/3 → md:w-1/2 to remove extra blank space on desktop */}
            <div className="w-full md:w-1/2 p-4 flex flex-col">
              {/* Product Title (smaller bottom margin) */}
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h1>

              {/* Rating Stars (slightly reduced bottom margin) */}
              <div className="flex items-center mb-2">
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
                <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
              </div>

              {/* Price + Weight Selector (reduced bottom margin) */}
              <div className="mb-4">
                <p className="text-xl font-semibold text-green-700 mb-1">
                  ₹{product.weights[selectedWeight]}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Object.entries(product.weights).map(([weight]) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-3 py-1 rounded-full border-2 text-sm ${
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

              {/* Description (reduced bottom margin) */}
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Quantity Selector (reduced bottom margin) */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <Minus className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="px-3 py-1 text-gray-800">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <Plus className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart / Buy Now / Proceed to Cart Buttons (condensed spacing) */}
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="text-sm">Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="bg-green-800 hover:bg-green-900 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                  >
                    Buy Now
                  </button>
                </div>

                <button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300 border-2 border-green-600 text-sm"
                >
                  Proceed to Cart
                </button>
              </div>

              {/* Optional: Additional Details Section (reduced top margin) */}
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                  Product Details
                </h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• 100% Natural Ingredients</li>
                  <li>• Chemical Free</li>
                  <li>• Cruelty Free</li>
                  <li>• Made in India</li>
                </ul>
              </div>
            </div>
          </div> {/* end flex container */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
