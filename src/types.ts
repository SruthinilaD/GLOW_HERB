export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[]; 
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  weights: {
    [key: string]: number;
  };
  quantity?: number; 
}
export interface CartItem extends Product {
  selectedWeight: string;
  quantity: number;
}


export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  avatar: string;
}

export interface NavLink {
  name: string;
  href: string;
}