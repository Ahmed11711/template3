export interface Product {
  id: string;
  name?: string; // Legacy field for backward compatibility
  name_en?: string;
  name_ar?: string;
  price: number;
  image?: string; // Legacy field
  category: string;
  category_en?: string;
  category_ar?: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  description?: string; // Legacy field
  description_en?: string;
  description_ar?: string;
  mainImage?: string;
  additionalImages?: string;
  stock?: number;
}

export interface Category {
  id: number;
  name?: string; // Legacy field
  name_en?: string;
  name_ar?: string;
  products: Product[];
  image?: string;
}
export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: CartItem[];
}

export interface BlogPost {
  id: string;
  title?: string; // Legacy field
  title_en?: string;
  title_ar?: string;
  excerpt?: string; // Legacy field
  excerpt_en?: string;
  excerpt_ar?: string;
  category?: string; // Legacy field
  category_en?: string;
  category_ar?: string;
  date: string;
  image: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}