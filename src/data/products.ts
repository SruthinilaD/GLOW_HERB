import { Product } from '../types';
import casham from '../assets/white_casham_powder.png';
import casham2 from '../assets/white_casham_powder_2.png';
import casham3 from '../assets/white_casham_powder_3.png';
import casham4 from '../assets/white_casham_powder_back.png';


import casham_green from '../assets/green_casham_powder.png'
import casham_green_2 from '../assets/green_casham_powder_2.png'
import casham_green_3 from '../assets/green_casham_powder_3.png'
import casham_green_back from '../assets/green_casham_powder_back.png'


export const products: Product[] = [
  {
    id: 1,
    name: "Casham Face Pack with Turmeric",
    price: 40,
    description: "A gentle cleanser infused with green tea extracts to purify and refresh your skin.",
    category: "Face Care",
    image: casham,
    images: [casham,casham2, casham3, casham4 ],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    weights: {
      "30g": 40,
      "60g": 70
    }
  },
  {
    id: 2,
    name: "Casham Face Pack",
    price: 40,
    description: "Pure aloe vera gel for soothing and hydrating skin, perfect for post-sun exposure.",
    category: "Body Care",
    image: casham_green,
    images: [casham_green,casham_green_2,casham_green_3,casham_green_back],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    weights: {
      "30g": 40,
      "60g": 70
    }
  },
  // ... rest of the products with weights added
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};