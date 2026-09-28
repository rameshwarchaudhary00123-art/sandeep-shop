import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_ADMINS,
  INITIAL_BANNERS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_SETTINGS,
} from '../data/initialData';
import {
  AdminUser,
  Banner,
  CartItem,
  Category,
  Coupon,
  Customer,
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  StoreSettings,
} from '../types';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type AppView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'auth'
  | 'about'
  | 'contact'
  | 'admin';

interface StoreContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductId: number | null;
  viewProductDetail: (productId: number) => void;
  categoryFilter: string | null;
  setCategoryFilter: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'rating' | 'review_count'>) => void;
  updateProduct: (id: number, fields: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleProductFeatured: (id: number) => void;
  toggleProductStatus: (id: number) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'product_count'>) => void;
  updateCategory: (id: number, fields: Partial<Category>) => void;
  deleteCategory: (id: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotals: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    count: number;
  };

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    payment_method: PaymentMethod;
    payment_status?: PaymentStatus;
    notes?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  }) => Order;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;

  // Customers
  customers: Customer[];
  currentCustomer: Customer | null;
  loginCustomer: (email: string, pass: string) => boolean;
  registerCustomer: (data: { name: string; email: string; phone: string; password: string }) => boolean;
  logoutCustomer: () => void;
  toggleCustomerStatus: (customerId: number) => void;

  // Admin
  isAdminLoggedIn: boolean;
  adminLogin: (identifier: string, pass: string) => boolean;
  adminLogout: () => void;
  adminTab: 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'banners' | 'coupons' | 'settings' | 'admins';
  setAdminTab: (tab: 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'banners' | 'coupons' | 'settings' | 'admins') => void;
  adminUsers: AdminUser[];
  currentAdminUser: AdminUser | null;
  addAdminUser: (admin: Omit<AdminUser, 'id' | 'created_at'>) => void;
  updateAdminUser: (id: number, fields: Partial<AdminUser>) => void;
  deleteAdminUser: (id: number) => { success: boolean; message: string };
  toggleAdminUserStatus: (id: number) => void;

  // Banners & Coupons & Settings
  banners: Banner[];
  toggleBannerStatus: (id: number) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  coupons: Coupon[];
  toggleCouponStatus: (id: number) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'used_count'>) => void;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dnd_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_products', JSON.stringify(products));
  }, [products]);

  // Persistent Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('dnd_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('dnd_categories', JSON.stringify(categories));
  }, [categories]);

  // Persistent Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dnd_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dnd_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('dnd_wishlist');
    return saved ? JSON.parse(saved) : [1, 2];
  });

  useEffect(() => {
    localStorage.setItem('dnd_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dnd_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_orders', JSON.stringify(orders));
  }, [orders]);

  // Customers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('dnd_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_customers', JSON.stringify(customers));
  }, [customers]);

  // Current Customer User
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem('dnd_active_customer');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS[0];
  });

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem('dnd_active_customer', JSON.stringify(currentCustomer));
    } else {
      localStorage.removeItem('dnd_active_customer');
    }
  }, [currentCustomer]);

  // Admin State
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('dnd_admin_users');
    if (saved) {
      try {
        const parsed: AdminUser[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        return INITIAL_ADMINS;
      }
    }
    return INITIAL_ADMINS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('dnd_current_admin');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentAdminUser) {
      localStorage.setItem('dnd_current_admin', JSON.stringify(currentAdminUser));
    } else {
      localStorage.removeItem('dnd_current_admin');
    }
  }, [currentAdminUser]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dnd_admin_logged') === 'true';
  });
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'banners' | 'coupons' | 'settings' | 'admins'>('dashboard');

  useEffect(() => {
    localStorage.setItem('dnd_admin_logged', String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Banners
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('dnd_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_banners', JSON.stringify(banners));
  }, [banners]);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('dnd_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('dnd_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('dnd_settings', JSON.stringify(settings));
  }, [settings]);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const viewProductDetail = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Actions
  const addProduct = (prodData: Omit<Product, 'id' | 'created_at' | 'rating' | 'review_count'>) => {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct: Product = {
      ...prodData,
      id: newId,
      rating: 5.0,
      review_count: 1,
      created_at: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to catalog!`);
  };

  const updateProduct = (id: number, fields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...fields } : p)));
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: number) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product "${prod?.name || ''}" deleted`, 'info');
  };

  const toggleProductFeatured = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const toggleProductStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
      )
    );
  };

  // Category Actions
  const addCategory = (catData: Omit<Category, 'id' | 'product_count'>) => {
    const newId = categories.length ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
    const newCat: Category = {
      ...catData,
      id: newId,
      product_count: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" created!`);
  };

  const updateCategory = (id: number, fields: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...fields } : c)));
    showToast('Category updated!');
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category removed', 'info');
  };

  // Cart Actions
  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    const cartId = `${product.id}_${size}_${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cart_id === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cart_id === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cart_id: cartId,
            product,
            quantity,
            size,
            color,
          },
        ];
      }
    });
    showToast(`Added ${quantity}x ${product.name} (${size}) to bag!`);
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cart_id === cartId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cart_id !== cartId));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === clean && c.status === 'active');
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    const subtotal = cart.reduce((acc, it) => acc + it.product.sale_price * it.quantity, 0);
    if (subtotal < found.min_amount) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${found.min_amount}.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied!`);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Calculate Totals
  const subtotal = cart.reduce((acc, it) => acc + it.product.sale_price * it.quantity, 0);
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.min_amount) {
    if (appliedCoupon.discount_type === 'percentage') {
      discount = (subtotal * appliedCoupon.discount_value) / 100;
    } else {
      discount = Math.min(subtotal, appliedCoupon.discount_value);
    }
  }
  const shipping =
    subtotal === 0 || subtotal >= settings.free_shipping_threshold ? 0 : settings.shipping_charge;
  const total = Math.max(0, subtotal - discount + shipping);
  const itemCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  const cartTotals = {
    subtotal,
    discount,
    shipping,
    total,
    count: itemCount,
  };

  // Wishlist Actions
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from wishlist' : 'Added to wishlist!');
      return next;
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  // Orders Actions
  const placeOrder = (orderData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    payment_method: PaymentMethod;
    payment_status?: PaymentStatus;
    notes?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  }) => {
    const orderNumber = `DND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1,
      order_number: orderNumber,
      customer_id: currentCustomer?.id || 1,
      customer_name: orderData.name,
      customer_email: orderData.email,
      customer_phone: orderData.phone,
      total_amount: cartTotals.total,
      subtotal: cartTotals.subtotal,
      discount_amount: cartTotals.discount,
      coupon_code: appliedCoupon?.code,
      shipping_fee: cartTotals.shipping,
      payment_method: orderData.payment_method,
      payment_status:
        orderData.payment_status ||
        (orderData.payment_method === 'cod' ? 'cod_pending' : 'paid'),
      order_status: 'pending',
      shipping_address: {
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        pincode: orderData.pincode,
      },
      items: cart.map((item, idx) => ({
        id: idx + 1,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.images[0],
        price: item.product.sale_price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
      created_at: new Date().toISOString().split('T')[0],
      notes: orderData.notes,
      razorpay_order_id: orderData.razorpay_order_id,
      razorpay_payment_id: orderData.razorpay_payment_id,
      razorpay_signature: orderData.razorpay_signature,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update customer stats
    if (currentCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === currentCustomer.id
            ? {
                ...c,
                orders_count: c.orders_count + 1,
                total_spent: c.total_spent + newOrder.total_amount,
              }
            : c
        )
      );
    }

    clearCart();
    showToast(`Order ${orderNumber} placed successfully! 🎉`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, order_status: status } : o))
    );
    showToast(`Order status updated to ${status}`);
  };

  // Customer Management
  const loginCustomer = (email: string) => {
    const found = customers.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (found.status === 'blocked') {
        showToast('Your account has been temporarily restricted. Contact support.', 'error');
        return false;
      }
      setCurrentCustomer(found);
      showToast(`Welcome back, ${found.name}!`);
      return true;
    }
    // Create new customer on fly if not found
    const newCustomer: Customer = {
      id: customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
      name: email.split('@')[0],
      email: email,
      phone: '+91 98000 00000',
      address: 'Main Street',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      orders_count: 0,
      total_spent: 0,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [...prev, newCustomer]);
    setCurrentCustomer(newCustomer);
    showToast(`Account created! Welcome to DND, ${newCustomer.name}.`);
    return true;
  };

  const registerCustomer = (data: { name: string; email: string; phone: string }) => {
    const existing = customers.find((c) => c.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      showToast('Account with this email already exists.', 'error');
      return false;
    }
    const newCustomer: Customer = {
      id: customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: '',
      city: '',
      state: '',
      pincode: '',
      orders_count: 0,
      total_spent: 0,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [...prev, newCustomer]);
    setCurrentCustomer(newCustomer);
    showToast(`Welcome to DND, ${newCustomer.name}!`);
    return true;
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    showToast('Logged out of account.', 'info');
  };

  const toggleCustomerStatus = (customerId: number) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c
      )
    );
  };

  // Admin Actions
  const adminLogin = (identifier: string, pass: string) => {
    const cleanId = identifier.trim().replace(/^(\+91|0)/, '');
    const cleanPass = pass.trim();

    const user = adminUsers.find((u) => {
      const userContact = u.contact_no.replace(/^(\+91|0)/, '').trim();
      const matchesPhone = userContact === cleanId || u.contact_no === identifier.trim();
      const matchesEmail = u.email && u.email.toLowerCase() === identifier.trim().toLowerCase();
      // Legacy fallback support for admin@dnd.com / Admin@123 as well
      const isLegacyDefault = identifier.trim() === 'admin@dnd.com' && pass === 'Admin@123';
      return (matchesPhone || matchesEmail || isLegacyDefault) && (u.password === cleanPass || isLegacyDefault);
    });

    if (user) {
      if (user.status === 'inactive') {
        showToast('This admin account is inactive. Please contact store owner.', 'error');
        return false;
      }
      setIsAdminLoggedIn(true);
      setCurrentAdminUser(user);
      showToast(`Welcome, ${user.name}! Admin session active.`, 'success');
      return true;
    }

    showToast('Invalid credentials! Check your Contact No. or Password.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentAdminUser(null);
    showToast('Signed out of Admin Panel', 'info');
  };

  const addAdminUser = (adminData: Omit<AdminUser, 'id' | 'created_at'>) => {
    const exists = adminUsers.some(
      (u) => u.contact_no.replace(/^(\+91|0)/, '').trim() === adminData.contact_no.replace(/^(\+91|0)/, '').trim()
    );
    if (exists) {
      showToast(`Admin with Contact No. ${adminData.contact_no} already exists!`, 'error');
      return;
    }
    const newId = adminUsers.length ? Math.max(...adminUsers.map((u) => u.id)) + 1 : 1;
    const newAdmin: AdminUser = {
      ...adminData,
      id: newId,
      created_at: new Date().toISOString().split('T')[0],
    };
    setAdminUsers((prev) => [...prev, newAdmin]);
    showToast(`New Admin "${newAdmin.name}" added successfully!`, 'success');
  };

  const updateAdminUser = (id: number, fields: Partial<AdminUser>) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...fields } : u))
    );
    if (currentAdminUser?.id === id) {
      setCurrentAdminUser((prev) => (prev ? { ...prev, ...fields } : null));
    }
    showToast('Admin credentials updated successfully!', 'success');
  };

  const deleteAdminUser = (id: number) => {
    if (adminUsers.length <= 1) {
      showToast('Cannot delete the last remaining admin account! At least one admin is required.', 'error');
      return { success: false, message: 'Cannot delete last admin' };
    }
    const target = adminUsers.find((u) => u.id === id);
    if (!target) {
      showToast('Admin user not found', 'error');
      return { success: false, message: 'Admin not found' };
    }
    const updated = adminUsers.filter((u) => u.id !== id);
    setAdminUsers(updated);
    try {
      localStorage.setItem('dnd_admin_users', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to sync adminUsers to localStorage:', e);
    }
    if (currentAdminUser?.id === id) {
      setIsAdminLoggedIn(false);
      setCurrentAdminUser(null);
      localStorage.removeItem('dnd_current_admin');
    }
    showToast(`Admin "${target.name}" removed successfully!`, 'info');
    return { success: true, message: 'Admin deleted' };
  };

  const toggleAdminUserStatus = (id: number) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'active' ? 'inactive' : 'active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    showToast('Admin status toggled.');
  };

  // Banners & Coupons
  const toggleBannerStatus = (id: number) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b
      )
    );
  };

  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newId = banners.length ? Math.max(...banners.map((b) => b.id)) + 1 : 1;
    setBanners((prev) => [...prev, { ...bannerData, id: newId }]);
    showToast('Banner created!');
  };

  const toggleCouponStatus = (id: number) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
      )
    );
  };

  const addCoupon = (coupData: Omit<Coupon, 'id' | 'used_count'>) => {
    const newId = coupons.length ? Math.max(...coupons.map((c) => c.id)) + 1 : 1;
    setCoupons((prev) => [...prev, { ...coupData, id: newId, used_count: 0 }]);
    showToast(`Coupon ${coupData.code} created!`);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings saved successfully!');
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        viewProductDetail,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductFeatured,
        toggleProductStatus,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartTotals,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        customers,
        currentCustomer,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        toggleCustomerStatus,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        adminTab,
        setAdminTab,
        adminUsers,
        currentAdminUser,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        toggleAdminUserStatus,
        banners,
        toggleBannerStatus,
        addBanner,
        coupons,
        toggleCouponStatus,
        addCoupon,
        settings,
        updateSettings,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
