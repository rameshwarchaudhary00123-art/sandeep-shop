export type ProductCategory = 'jeans' | 'shirts' | 'cargo-pants' | 't-shirts' | 'jackets' | 'accessories';

export interface Product {
  id: number;
  category_id: number;
  category_slug: ProductCategory;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  status: 'active' | 'inactive';
  rating: number;
  review_count: number;
  created_at: string;
  details?: {
    fabric: string;
    fit: string;
    closure: string;
    care: string;
    origin: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: ProductCategory;
  image: string;
  status: 'active' | 'inactive';
  product_count: number;
}

export interface CartItem {
  cart_id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orders_count: number;
  total_spent: number;
  status: 'active' | 'blocked';
  created_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cod_pending';
export type PaymentMethod = 'cod' | 'razorpay' | 'upi' | 'card';

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  subtotal: number;
  discount_amount: number;
  coupon_code?: string;
  shipping_fee: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  shipping_address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  created_at: string;
  notes?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_amount: number;
  max_uses: number;
  used_count: number;
  valid_until: string;
  status: 'active' | 'inactive';
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  position: 'home_top' | 'home_middle';
  status: 'active' | 'inactive';
  cta_text: string;
}

export interface StoreSettings {
  site_name: string;
  tagline: string;
  owners: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  shipping_charge: number;
  free_shipping_threshold: number;
  instagram: string;
  facebook: string;
  fixed_rates_badge: string;
}

export interface AdminUser {
  id: number;
  name: string;
  contact_no: string;
  email?: string;
  password: string;
  role: 'super_admin' | 'admin' | 'manager';
  status: 'active' | 'inactive';
  created_at: string;
}
