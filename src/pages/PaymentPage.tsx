// src/pages/PaymentPage.tsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Upload } from 'lucide-react';
import QR from '../assets/QR.jpg';

interface PaymentFormData {
  name: string;
  phone: string;
  email: string;
  screenshot: File | null;
}

const PaymentPage: React.FC = () => {
  // ─── 1) Grab cartItems in addition to cartTotal & clearCart ───
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shippingCost      = cartTotal >= 200 ? 0 : 50;
  const totalWithShipping = cartTotal + shippingCost;

  const [formData, setFormData] = useState<PaymentFormData>({
    name:       '',
    phone:      '',
    email:      '',
    screenshot: null,
  });

  const [errors, setErrors]           = useState<Partial<Record<keyof PaymentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null);

  // ─── Helper: Convert a File into a Base64‐encoded string ─────────────────
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reader.abort();
      reader.onload  = () => {
        const base64data = reader.result as string; // e.g. "data:image/png;base64,iVBORw0KG…"
        resolve(base64data);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PaymentFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    console.log("Picked file:", file);
    setFormData(prev => ({ ...prev, screenshot: file }));
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    if (errors.screenshot) {
      setErrors(prev => ({ ...prev, screenshot: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.screenshot) {
      newErrors.screenshot = 'Payment screenshot is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    // ─── A) Convert the File into a Base64 string ────────────────────────────
    let base64Screenshot = '';
    if (formData.screenshot) {
      try {
        base64Screenshot = await fileToBase64(formData.screenshot);
        console.log("📸 Base64 length:", base64Screenshot.length);
      } catch (err) {
        console.error("Failed to convert file to Base64:", err);
        setIsSubmitting(false);
        return;
      }
    }

    // ─── B) Build the cart‐items string just as before ───────────────────────
    const itemsString = cartItems
      .map(item => `${item.name} (${item.selectedWeight}) x ${item.quantity}`)
      .join(', ');

    // ─── C) POST to your Apps Script URL (no Cloudinary needed) ─────────────
    //     Make sure this matches the “Deployment → Latest code” URL from Apps Script
    const sheetsUrl = 'https://script.google.com/macros/s/AKfycbz5h0HITOKmP5weB8THgzlz3m5AdFDYOnensxeKeJfa7Jphero16sn0dyH-aoWs4FZb/exec';

    // We are URL‐encoding the payload as x-www-form-urlencoded, just like a normal HTML form
    const bodyParams = new URLSearchParams();
    bodyParams.append('Name',        formData.name);
    bodyParams.append('Phone',       formData.phone);
    bodyParams.append('Email',       formData.email);
    bodyParams.append('Amount',      totalWithShipping.toString());
    bodyParams.append('Items',       itemsString);
    bodyParams.append('ScreenshotBase64', base64Screenshot);

    try {
      const res = await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyParams.toString(),
      });
      const text = await res.text();
      console.log("📝 Apps Script response:", text);
    } catch (err) {
      console.error("Error sending to Apps Script:", err);
    }

    // ─── D) Now do your usual “order placed” UI flow ─────────────────────────
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  if (isOrderPlaced) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center text-green-700 hover:text-green-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Payment Details</h1>

          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>      <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>      <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-green-600 pt-2 border-t">
              <span>Total</span>         <span>₹{totalWithShipping}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="1234567890"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
                <p className="text-gray-600 mb-4">
                  Scan the QR code to pay ₹{totalWithShipping}
                </p>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img src={QR} alt="Payment QR Code" className="w-48 h-48" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Upload Payment Screenshot</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 ${
                    errors.screenshot ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot"
                    />
                    <label
                      htmlFor="screenshot"
                      className="bg-green-50 text-green-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-100 transition-colors duration-300"
                    >
                      Select File
                    </label>
                  </div>
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
                {errors.screenshot && (
                  <p className="text-red-500 text-sm mt-1">{errors.screenshot}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
