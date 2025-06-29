import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  // State to track if user selects Tiruvallur area for free delivery
  const [isTiruvallur, setIsTiruvallur] = useState(false);

  // Calculate shipping cost: free if cartTotal >= 200 or area checkbox is checked
  const shippingCost = isTiruvallur || cartTotal >= 200 ? 0 : 50;
  const totalWithShipping = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/#products')}
            className="flex items-center text-green-700 hover:text-green-800 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>

          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate('/#products')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/#products')}
          className="flex items-center text-green-700 hover:text-green-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedWeight}`} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name} ({item.selectedWeight})
                    </h3>
                    <p className="text-gray-600 mb-2">₹{item.price}</p>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedWeight, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedWeight, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedWeight)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Mandatory free-delivery banner for orders ≥ ₹200 */}
              <div className="mb-4 p-3 bg-green-100 text-green-800 font-medium rounded-lg text-center">
                🎉 Free Delivery on Orders Above ₹200 🎉
              </div>

              {/* Area checkbox for additional free delivery */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="tiruvallur"
                  checked={isTiruvallur}
                  onChange={() => setIsTiruvallur(prev => !prev)}
                  className="h-5 w-5 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="tiruvallur" className="ml-3 text-gray-700 font-medium">
                  Free Delivery for Tiruvallur Residents
                </label>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{totalWithShipping}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/payment')}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
