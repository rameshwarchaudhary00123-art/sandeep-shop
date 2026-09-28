import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Camera,
  Check,
  CheckCircle2,
  DollarSign,
  Edit2,
  Eye,
  EyeOff,
  FolderTree,
  ImageIcon,
  KeyRound,
  Lock,
  LogOut,
  Package,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  Sparkles,
  Tag,
  Trash2,
  TrendingUp,
  Truck,
  Upload,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminUser, Category, Order, OrderStatus, Product } from '../../types';

export const AdminLayout: React.FC = () => {
  const {
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
    setCurrentView,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductFeatured,
    toggleProductStatus,
    categories,
    addCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    customers,
    toggleCustomerStatus,
    banners,
    toggleBannerStatus,
    addBanner,
    coupons,
    toggleCouponStatus,
    addCoupon,
    settings,
    updateSettings,
    showToast,
  } = useStore();

  // Admin Login form state - Default to requested credentials
  const [emailInput, setEmailInput] = useState('8305817958');
  const [passInput, setPassInput] = useState('dnd123');

  // Admin Credentials Management Modal states
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [adminForm, setAdminForm] = useState({
    name: '',
    contact_no: '',
    email: '',
    password: '',
    role: 'admin' as 'super_admin' | 'admin' | 'manager',
    status: 'active' as 'active' | 'inactive',
  });
  const [showPasswordMap, setShowPasswordMap] = useState<Record<number, boolean>>({});
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);

  // Quick Photo Changer state
  const [quickPhotoModalOpen, setQuickPhotoModalOpen] = useState(false);
  const [quickPhotoProduct, setQuickPhotoProduct] = useState<Product | null>(null);
  const [quickPhotoUrl, setQuickPhotoUrl] = useState('');

  // Streetwear photo presets for 1-click photo update
  const STREETWEAR_PHOTO_PRESETS = [
    {
      title: 'Distressed Baggy Black Jeans',
      url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
    },
    {
      title: 'Vintage Bell Bottom Blue Jeans',
      url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80',
    },
    {
      title: 'Oversized Boxy White Shirt',
      url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    },
    {
      title: 'Combat Multi-Pocket Cargo',
      url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    },
    {
      title: 'Acid Wash Heavy Graphic Tee',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    },
    {
      title: 'Puddle Cut Dark Indigo Denim',
      url: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80',
    },
  ];

  // Product Add / Edit Modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category_id: 1,
    description: '',
    price: 1499,
    sale_price: 999,
    stock: 20,
    sizes: '28, 30, 32, 34, 36',
    colors: 'Black, Charcoal',
    featured: true,
    status: 'active' as 'active' | 'inactive',
    images: [] as string[],
    newImageUrl: '',
  });

  // Category Add Form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  // Coupon Add Form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponVal, setNewCouponVal] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(999);

  // Banner Add Form state
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerSub, setNewBannerSub] = useState('');
  const [newBannerPos, setNewBannerPos] = useState<'home_top' | 'home_middle'>('home_top');

  // Settings local state
  const [settingsForm, setSettingsForm] = useState(settings);

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  // Search queries
  const [productSearch, setProductSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // If not logged in, show secure login box
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
              <KeyRound size={26} />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-display">DND ADMIN CONSOLE</h1>
            <p className="text-xs text-neutral-400">
              Access portal for Sandeep Jat & Chetan Sharma (DND Boys Fashion)
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(emailInput, passInput);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Phone size={13} className="text-amber-400" />
                <span>Contact Number / Email *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 8305817958"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Lock size={13} className="text-amber-400" />
                <span>Admin Password *</span>
              </label>
              <input
                type="password"
                required
                placeholder="e.g. dnd123"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold py-3 rounded-xl text-xs tracking-wider transition-colors cursor-pointer shadow-lg shadow-amber-400/20"
            >
              SECURE ADMIN SIGN IN
            </button>
          </form>

          {/* Quick preset credentials helper */}
          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 text-center">
            <div className="text-[11px] text-neutral-300">
              <span className="text-neutral-500">Default Login: </span>
              <span className="text-amber-400 font-mono font-bold">8305817958</span>
              <span className="text-neutral-500"> / </span>
              <span className="text-amber-400 font-mono font-bold">dnd123</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmailInput('8305817958');
                setPassInput('dnd123');
                adminLogin('8305817958', 'dnd123');
              }}
              className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer"
            >
              One-Click Login with 8305817958 / dnd123
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs text-neutral-500 hover:text-white flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Public Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // KPI Calculations
  const totalSales = orders.reduce((acc, o) => acc + o.total_amount, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const totalCustomersCount = customers.length;
  const lowStockProducts = products.filter((p) => p.stock <= 15);

  // Handlers for Products
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category_id: categories[0]?.id || 1,
      description: '',
      price: 1599,
      sale_price: 1199,
      stock: 25,
      sizes: '28, 30, 32, 34, 36',
      colors: 'Black, Indigo',
      featured: true,
      status: 'active',
      images: [products[0]?.images[0] || STREETWEAR_PHOTO_PRESETS[0].url],
      newImageUrl: '',
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category_id: prod.category_id,
      description: prod.description,
      price: prod.price,
      sale_price: prod.sale_price,
      stock: prod.stock,
      sizes: prod.sizes.join(', '),
      colors: prod.colors.join(', '),
      featured: prod.featured,
      status: prod.status,
      images: prod.images && prod.images.length > 0 ? [...prod.images] : [products[0]?.images[0]],
      newImageUrl: '',
    });
    setProductModalOpen(true);
  };

  // Upload photo handler from device file (computer/mobile)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isQuick: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (JPG, PNG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (isQuick) {
        setQuickPhotoUrl(base64);
        showToast('Photo uploaded from device! Click "Save New Photo" to apply.', 'info');
      } else {
        setProductForm((prev) => ({
          ...prev,
          images: [base64, ...prev.images],
        }));
        showToast('Photo uploaded from device and added to product!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick Photo Changer handlers
  const handleOpenQuickPhoto = (prod: Product) => {
    setQuickPhotoProduct(prod);
    setQuickPhotoUrl(prod.images[0] || '');
    setQuickPhotoModalOpen(true);
  };

  const handleSaveQuickPhoto = () => {
    if (!quickPhotoProduct || !quickPhotoUrl) return;
    const remaining = quickPhotoProduct.images.filter((img) => img !== quickPhotoUrl);
    const updatedImages = [quickPhotoUrl, ...remaining];
    updateProduct(quickPhotoProduct.id, {
      images: updatedImages,
    });
    showToast(`Photo updated for "${quickPhotoProduct.name}"!`, 'success');
    setQuickPhotoModalOpen(false);
  };

  // Handlers for Admin Credentials Management
  const handleOpenAddAdmin = () => {
    setEditingAdmin(null);
    setAdminForm({
      name: '',
      contact_no: '',
      email: '',
      password: '',
      role: 'admin',
      status: 'active',
    });
    setAdminModalOpen(true);
  };

  const handleOpenEditAdmin = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setAdminForm({
      name: admin.name,
      contact_no: admin.contact_no,
      email: admin.email || '',
      password: admin.password,
      role: admin.role,
      status: admin.status,
    });
    setAdminModalOpen(true);
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.contact_no.trim()) {
      showToast('Contact number is required for login', 'error');
      return;
    }
    if (!adminForm.password.trim()) {
      showToast('Password is required', 'error');
      return;
    }

    if (editingAdmin) {
      updateAdminUser(editingAdmin.id, {
        name: adminForm.name,
        contact_no: adminForm.contact_no.trim(),
        email: adminForm.email.trim(),
        password: adminForm.password.trim(),
        role: adminForm.role,
        status: adminForm.status,
      });
    } else {
      addAdminUser({
        name: adminForm.name,
        contact_no: adminForm.contact_no.trim(),
        email: adminForm.email.trim(),
        password: adminForm.password.trim(),
        role: adminForm.role,
        status: adminForm.status,
      });
    }
    setAdminModalOpen(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === Number(productForm.category_id)) || categories[0];
    const sizeArr = productForm.sizes.split(',').map((s) => s.trim()).filter(Boolean);
    const colorArr = productForm.colors.split(',').map((c) => c.trim()).filter(Boolean);
    
    // Ensure images are properly retrieved
    const finalImages = productForm.images.length > 0
      ? productForm.images
      : (productForm.newImageUrl ? [productForm.newImageUrl] : [products[0]?.images[0] || STREETWEAR_PHOTO_PRESETS[0].url]);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        category_id: cat.id,
        category_slug: cat.slug,
        category_name: cat.name,
        description: productForm.description,
        price: Number(productForm.price),
        sale_price: Number(productForm.sale_price),
        stock: Number(productForm.stock),
        sizes: sizeArr,
        colors: colorArr,
        featured: productForm.featured,
        status: productForm.status,
        images: finalImages, // Fixed: now properly updates images!
      });
      showToast(`Updated product "${productForm.name}" with ${finalImages.length} photo(s)!`, 'success');
    } else {
      addProduct({
        category_id: cat.id,
        category_slug: cat.slug,
        category_name: cat.name,
        name: productForm.name,
        slug: productForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        description: productForm.description,
        price: Number(productForm.price),
        sale_price: Number(productForm.sale_price),
        images: finalImages,
        sizes: sizeArr,
        colors: colorArr,
        stock: Number(productForm.stock),
        featured: productForm.featured,
        status: productForm.status,
      });
      showToast(`Added new product "${productForm.name}"!`, 'success');
    }
    setProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col lg:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="pb-4 border-b border-neutral-800">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              DND Admin Console
            </span>
            <h2 className="text-xl font-extrabold text-white font-display mt-0.5">
              MANAGEMENT
            </h2>
            <span className="text-[11px] text-neutral-400 block mt-1">
              Curated by Sandeep & Chetan
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'products', label: 'Products Catalog', icon: Package, badge: products.length },
              { id: 'admins', label: 'Admin Access & Passwords', icon: ShieldCheck, badge: adminUsers.length },
              { id: 'categories', label: 'Categories', icon: FolderTree },
              { id: 'orders', label: 'Orders & Dispatch', icon: ShoppingBag, badge: orders.length },
              { id: 'customers', label: 'Customers', icon: Users, badge: customers.length },
              { id: 'banners', label: 'Home Banners', icon: ImageIcon },
              { id: 'coupons', label: 'Promo Coupons', icon: Tag },
              { id: 'settings', label: 'Store Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                    adminTab === tab.id
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        adminTab === tab.id
                          ? 'bg-neutral-950/20 text-neutral-950'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-800 space-y-2.5">
          {/* Active Admin Profile Card */}
          <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-xs shrink-0 font-display">
              {currentAdminUser?.name.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <span className="text-[11px] font-bold text-white block truncate leading-tight">
                {currentAdminUser?.name || 'Sandeep Jat'}
              </span>
              <span className="text-[10px] text-amber-400 font-mono block">
                {currentAdminUser?.contact_no || '8305817958'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-amber-400 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Go to Public Store</span>
          </button>
          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl overflow-y-auto">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {adminTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Live Analytics
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                  STORE DASHBOARD
                </h1>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleOpenAddProduct}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400 font-medium">Total Sales</span>
                <h3 className="text-2xl font-extrabold text-amber-400 font-mono mt-1 tabular-nums">
                  ₹{totalSales.toLocaleString('en-IN')}
                </h3>
                <span className="text-[11px] text-emerald-400 mt-1 block font-semibold">
                  +18.4% this month
                </span>
              </div>

              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400 font-medium">Total Orders</span>
                <h3 className="text-2xl font-extrabold text-white font-mono mt-1 tabular-nums">
                  {totalOrdersCount}
                </h3>
                <span className="text-[11px] text-neutral-400 mt-1 block">Live across India</span>
              </div>

              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400 font-medium">Total Products</span>
                <h3 className="text-2xl font-extrabold text-white font-mono mt-1 tabular-nums">
                  {totalProductsCount}
                </h3>
                <span className="text-[11px] text-amber-400 mt-1 block">Active fits in store</span>
              </div>

              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                <span className="text-xs text-neutral-400 font-medium">Registered Buyers</span>
                <h3 className="text-2xl font-extrabold text-white font-mono mt-1 tabular-nums">
                  {totalCustomersCount}
                </h3>
                <span className="text-[11px] text-emerald-400 mt-1 block">Verified community</span>
              </div>
            </div>

            {/* Monthly Sales Breakdown & Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sales Chart Simulation */}
              <div className="lg:col-span-8 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <TrendingUp size={16} className="text-amber-400" />
                    <span>Monthly Revenue Trends (2026)</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">100% Fixed Rates</span>
                </div>

                <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
                  {[
                    { m: 'Jan', val: 32000 },
                    { m: 'Feb', val: 41000 },
                    { m: 'Mar', val: 56000 },
                    { m: 'Apr', val: 49000 },
                    { m: 'May', val: 68000 },
                    { m: 'Jun', val: 82000 },
                    { m: 'Jul', val: 75000 },
                    { m: 'Aug', val: 94000 },
                    { m: 'Sep', val: 112000 },
                  ].map((bar, i) => {
                    const heightPercent = Math.min(100, Math.round((bar.val / 120000) * 100));
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                          className="w-full bg-neutral-800 group-hover:bg-amber-400 rounded-t-lg transition-all duration-300 relative"
                          style={{ height: `${heightPercent}%` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950 px-1 py-0.5 rounded whitespace-nowrap">
                            ₹{(bar.val / 1000).toFixed(0)}k
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">{bar.m}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="lg:col-span-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <span>Stock Alerts</span>
                </h3>

                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {lowStockProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white leading-tight">{p.name}</div>
                        <span className="text-[11px] text-neutral-500">{p.category_name}</span>
                      </div>
                      <span className="font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                        {p.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-display">Recent Orders</h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-semibold">
                      <th className="pb-3">Order #</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-850">
                        <td className="py-3 font-bold text-amber-400 font-mono">
                          {ord.order_number}
                        </td>
                        <td className="py-3 text-white font-medium">{ord.customer_name}</td>
                        <td className="py-3 text-white font-mono font-bold">
                          ₹{ord.total_amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 uppercase text-neutral-400">{ord.payment_method}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              ord.order_status === 'delivered'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : ord.order_status === 'shipped'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-amber-400/10 text-amber-400'
                            }`}
                          >
                            {ord.order_status}
                          </span>
                        </td>
                        <td className="py-3">
                          <select
                            value={ord.order_status}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as OrderStatus)
                            }
                            className="bg-neutral-950 border border-neutral-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Inventory Management
                </span>
                <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
                  PRODUCTS LIST ({products.length})
                </h1>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Filter search */}
            <div className="relative max-w-sm">
              <Search size={15} className="absolute left-3 top-2.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search products by name or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Products Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-semibold bg-neutral-950/40">
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Regular / Sale</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Featured</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {products
                      .filter(
                        (p) =>
                          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.category_name.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-850">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <div
                                onClick={() => handleOpenQuickPhoto(p)}
                                className="relative group/photo cursor-pointer shrink-0"
                                title="Click to Change Product Photo"
                              >
                                <img
                                  src={p.images[0]}
                                  alt={p.name}
                                  className="w-12 h-12 rounded-xl object-cover bg-neutral-950 border border-neutral-800 group-hover/photo:border-amber-400 transition-all"
                                />
                                <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity text-amber-400">
                                  <Camera size={18} />
                                </div>
                              </div>
                              <div>
                                <span className="font-bold text-white block leading-tight">
                                  {p.name}
                                </span>
                                <span className="text-[10px] text-neutral-500 font-mono">
                                  {p.sizes.join(', ')}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleOpenQuickPhoto(p)}
                                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-0.5 font-semibold cursor-pointer"
                                >
                                  <Camera size={10} />
                                  <span>Change Photo</span>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-neutral-300">{p.category_name}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-amber-400 font-mono">
                              ₹{p.sale_price}
                            </div>
                            <div className="text-[10px] text-neutral-500 line-through font-mono">
                              ₹{p.price}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`font-mono font-bold ${
                                p.stock <= 10 ? 'text-amber-400' : 'text-white'
                              }`}
                            >
                              {p.stock}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => toggleProductFeatured(p.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                p.featured
                                  ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                                  : 'bg-neutral-800 text-neutral-500'
                              }`}
                            >
                              {p.featured ? 'Featured' : 'Standard'}
                            </button>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => toggleProductStatus(p.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                p.status === 'active'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-neutral-800 text-neutral-500'
                              }`}
                            >
                              {p.status}
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenQuickPhoto(p)}
                                className="px-2 py-1 text-[11px] font-semibold text-amber-400 hover:text-neutral-950 bg-amber-400/10 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer flex items-center gap-1 border border-amber-400/20"
                                title="Change Product Photo"
                              >
                                <Camera size={12} />
                                <span className="hidden md:inline">Photo</span>
                              </button>
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                                title="Edit Product"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-neutral-400 hover:text-red-400 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {adminTab === 'categories' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-white font-display">
              CATEGORIES MANAGEMENT
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add category form */}
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">Add New Category</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCatName.trim()) return;
                    addCategory({
                      name: newCatName.trim(),
                      slug: (newCatSlug.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-')) as any,
                      image: products[0]?.images[0] || '',
                      status: 'active',
                    });
                    setNewCatName('');
                    setNewCatSlug('');
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block text-neutral-400 mb-1">Category Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leather Jackets"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Slug</label>
                    <input
                      type="text"
                      placeholder="e.g. leather-jackets"
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Create Category
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Active Categories</h3>
                <div className="divide-y divide-neutral-800 text-xs">
                  {categories.map((c) => (
                    <div key={c.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-950 border border-neutral-800"
                        />
                        <div>
                          <div className="font-bold text-white">{c.name}</div>
                          <span className="text-neutral-500 font-mono text-[11px]">
                            slug: {c.slug}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-neutral-400 font-mono">
                          {products.filter((p) => p.category_slug === c.slug).length} items
                        </span>
                        <button
                          onClick={() => deleteCategory(c.id)}
                          className="text-neutral-500 hover:text-red-400 p-1.5 cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Fulfillment & Tracking
                </span>
                <h1 className="text-2xl font-extrabold text-white font-display mt-0.5">
                  ORDERS DISPATCH CONSOLE ({orders.length})
                </h1>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Filter Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-semibold bg-neutral-950/40">
                      <th className="p-3.5">Order #</th>
                      <th className="p-3.5">Customer & Phone</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Status Update</th>
                      <th className="p-3.5 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {orders
                      .filter(
                        (o) =>
                          orderStatusFilter === 'all' ||
                          o.order_status.toLowerCase() === orderStatusFilter.toLowerCase()
                      )
                      .map((o) => (
                        <tr key={o.id} className="hover:bg-neutral-850">
                          <td className="p-3.5 font-bold text-amber-400 font-mono">
                            {o.order_number}
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-white">{o.customer_name}</div>
                            <div className="text-[11px] text-neutral-400 font-mono">
                              {o.customer_phone}
                            </div>
                          </td>
                          <td className="p-3.5 text-neutral-300">
                            {o.items.length} fits ({o.items.map((it) => it.product_name).join(', ')})
                          </td>
                          <td className="p-3.5 font-bold text-white font-mono">
                            ₹{o.total_amount.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3.5">
                            {o.payment_method === 'razorpay' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span>PAID (Razorpay)</span>
                              </span>
                            ) : o.payment_method === 'cod' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                <span>COD Pending</span>
                              </span>
                            ) : (
                              <span className="uppercase text-neutral-400 font-mono text-[11px]">{o.payment_method}</span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={o.order_status}
                              onChange={(e) =>
                                updateOrderStatus(o.id, e.target.value as OrderStatus)
                              }
                              className="bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedInvoice(o)}
                              className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"
                              title="View Invoice"
                            >
                              <Eye size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS */}
        {adminTab === 'customers' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-white font-display">
              CUSTOMER DIRECTORY ({customers.length})
            </h1>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-semibold bg-neutral-950/40">
                      <th className="p-3.5">Customer Name</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Phone</th>
                      <th className="p-3.5">City / State</th>
                      <th className="p-3.5">Orders</th>
                      <th className="p-3.5">Total Spent</th>
                      <th className="p-3.5 text-right">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-850">
                        <td className="p-3.5 font-bold text-white">{c.name}</td>
                        <td className="p-3.5 text-neutral-400">{c.email}</td>
                        <td className="p-3.5 text-neutral-300 font-mono">{c.phone}</td>
                        <td className="p-3.5 text-neutral-400">
                          {c.city}, {c.state}
                        </td>
                        <td className="p-3.5 font-mono">{c.orders_count}</td>
                        <td className="p-3.5 font-bold text-amber-400 font-mono">
                          ₹{c.total_spent.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => toggleCustomerStatus(c.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              c.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                          >
                            {c.status === 'active' ? 'Active' : 'Blocked'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BANNERS */}
        {adminTab === 'banners' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-white font-display">
              STOREFRONT BANNERS
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form */}
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">Add New Banner</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newBannerTitle.trim()) return;
                    addBanner({
                      title: newBannerTitle.trim(),
                      subtitle: newBannerSub.trim(),
                      image: products[0]?.images[0] || '',
                      link: '/shop',
                      position: newBannerPos,
                      status: 'active',
                      cta_text: 'EXPLORE FITS',
                    });
                    setNewBannerTitle('');
                    setNewBannerSub('');
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block text-neutral-400 mb-1">Banner Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MONSOON DROP"
                      value={newBannerTitle}
                      onChange={(e) => setNewBannerTitle(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. Best Fixed Rates on Baggy Fit"
                      value={newBannerSub}
                      onChange={(e) => setNewBannerSub(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Position</label>
                    <select
                      value={newBannerPos}
                      onChange={(e: any) => setNewBannerPos(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="home_top">Home Top Slider</option>
                      <option value="home_middle">Home Middle Banner</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 rounded-xl cursor-pointer"
                  >
                    Add Banner
                  </button>
                </form>
              </div>

              {/* Banners List */}
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Configured Banners</h3>
                <div className="divide-y divide-neutral-800 text-xs">
                  {banners.map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-16 h-10 rounded-lg object-cover bg-neutral-950 border border-neutral-800"
                        />
                        <div>
                          <div className="font-bold text-white">{b.title}</div>
                          <span className="text-[11px] text-neutral-400">{b.subtitle}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleBannerStatus(b.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                          b.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {b.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: COUPONS */}
        {adminTab === 'coupons' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-white font-display">
              DISCOUNT COUPONS
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form */}
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">Create New Coupon</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCouponCode.trim()) return;
                    addCoupon({
                      code: newCouponCode.trim().toUpperCase(),
                      discount_type: newCouponType,
                      discount_value: Number(newCouponVal),
                      min_amount: Number(newCouponMin),
                      max_uses: 500,
                      valid_until: '2026-12-31',
                      status: 'active',
                    });
                    setNewCouponCode('');
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block text-neutral-400 mb-1">Coupon Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FESTIVE20"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 mb-1">Type</label>
                      <select
                        value={newCouponType}
                        onChange={(e: any) => setNewCouponType(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-2 text-white"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed (₹)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Value</label>
                      <input
                        type="number"
                        required
                        value={newCouponVal}
                        onChange={(e) => setNewCouponVal(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Min Order Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 rounded-xl cursor-pointer"
                  >
                    Save Coupon
                  </button>
                </form>
              </div>

              {/* Coupons List */}
              <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Active Promo Codes</h3>
                <div className="divide-y divide-neutral-800 text-xs">
                  {coupons.map((coup) => (
                    <div key={coup.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-amber-400 font-mono text-sm">
                          {coup.code}
                        </span>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          Discount: {coup.discount_value}
                          {coup.discount_type === 'percentage' ? '%' : '₹'} · Min Order: ₹
                          {coup.min_amount}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleCouponStatus(coup.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                          coup.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {coup.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {adminTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-2xl font-extrabold text-white font-display">STORE SETTINGS</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSettings(settingsForm);
              }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-xs"
            >
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Store Name</label>
                <input
                  type="text"
                  value={settingsForm.site_name}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, site_name: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Store Owners (Curators)
                </label>
                <input
                  type="text"
                  value={settingsForm.owners}
                  onChange={(e) => setSettingsForm({ ...settingsForm, owners: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsapp: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Support Email</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Studio Address</label>
                <textarea
                  rows={2}
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Standard Shipping (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.shipping_charge}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, shipping_charge: Number(e.target.value) })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.free_shipping_threshold}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        free_shipping_threshold: Number(e.target.value),
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Save Store Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 9: ADMIN ACCESS & TEAM CREDENTIALS */}
        {adminTab === 'admins' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  <span>Security & Multi-Admin Access</span>
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                  ADMIN CREDENTIALS & TEAM
                </h1>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
                  Add, edit, or remove contact numbers and passwords. Any registered active contact number with their password can log into the DND Admin Console.
                </p>
              </div>

              <button
                onClick={handleOpenAddAdmin}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-lg shadow-amber-400/20"
              >
                <UserPlus size={16} />
                <span>+ Add New Admin Credential</span>
              </button>
            </div>

            {/* Quick Info & Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                  <Users size={20} />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block font-medium">Total Authorized Admins</span>
                  <span className="text-lg font-bold text-white font-mono">{adminUsers.length} Users</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block font-medium">Primary Login Contact</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">8305817958</span>
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <KeyRound size={20} />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block font-medium">Multi-User Console</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">Active & Synced</span>
                </div>
              </div>
            </div>

            {/* Admin Credentials Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <KeyRound size={16} className="text-amber-400" />
                  <span>Authorized Login Credentials</span>
                </h3>
                <span className="text-[11px] text-neutral-400">
                  Use Contact No. and Password to sign in
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-semibold bg-neutral-950/40">
                      <th className="p-3.5">Admin Name & Role</th>
                      <th className="p-3.5">Login Contact Number</th>
                      <th className="p-3.5">Email (Optional)</th>
                      <th className="p-3.5">Admin Password</th>
                      <th className="p-3.5">Account Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {adminUsers.map((adm) => {
                      const isRevealed = !!showPasswordMap[adm.id];
                      const isCurrent = currentAdminUser?.id === adm.id;
                      return (
                        <tr key={adm.id} className="hover:bg-neutral-850">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-bold flex items-center justify-center font-display text-xs shrink-0">
                                {adm.name.charAt(0) || 'A'}
                              </div>
                              <div>
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <span>{adm.name}</span>
                                  {isCurrent && (
                                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-400 border border-amber-400/30">
                                      YOU
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider">
                                  {adm.role.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              <Phone size={13} className="text-amber-400" />
                              <span className="font-mono font-bold text-white text-sm">
                                {adm.contact_no}
                              </span>
                            </div>
                          </td>

                          <td className="p-3.5 text-neutral-400 font-mono">
                            {adm.email || '-'}
                          </td>

                          <td className="p-3.5">
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800">
                              <span className="font-mono text-amber-400 font-bold text-xs select-all">
                                {isRevealed ? adm.password : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setShowPasswordMap((prev) => ({
                                    ...prev,
                                    [adm.id]: !prev[adm.id],
                                  }))
                                }
                                className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                                title={isRevealed ? 'Hide Password' : 'Show Password'}
                              >
                                {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                              </button>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <button
                              onClick={() => toggleAdminUserStatus(adm.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                adm.status === 'active'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                              }`}
                              title="Click to toggle Active/Inactive"
                            >
                              {adm.status === 'active' ? 'Active' : 'Inactive'}
                            </button>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditAdmin(adm)}
                                className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                                title="Edit Admin Credentials"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setAdminToDelete(adm)}
                                className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 bg-neutral-800 hover:border-red-500/30 rounded-lg transition-colors cursor-pointer"
                                title="Remove Admin"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white font-display">
                {editingProduct ? 'Edit Streetwear Fit' : 'Add New Streetwear Product'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Photos Section */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-200 font-bold flex items-center gap-1.5 text-xs">
                    <Camera size={15} className="text-amber-400" />
                    <span>Product Photos (Primary Cover & Gallery)</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">
                    {productForm.images.length} Photo(s) Attached
                  </span>
                </div>

                {/* Primary Cover Live Preview */}
                <div className="flex items-start gap-4 p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                  <div className="relative shrink-0">
                    <img
                      src={
                        productForm.images[0] ||
                        productForm.newImageUrl ||
                        STREETWEAR_PHOTO_PRESETS[0].url
                      }
                      alt="Primary Cover Preview"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-neutral-950 border border-amber-400/50 shadow-md"
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-amber-400 text-neutral-950 rounded-full shadow whitespace-nowrap">
                      ★ Cover Photo
                    </span>
                  </div>

                  <div className="flex-1 space-y-2.5">
                    {/* Device Upload Button */}
                    <div>
                      <input
                        type="file"
                        id="product-file-upload-modal"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, false)}
                        className="hidden"
                      />
                      <label
                        htmlFor="product-file-upload-modal"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs cursor-pointer transition-colors shadow-sm"
                      >
                        <Upload size={14} />
                        <span>Upload Photo from Phone / PC</span>
                      </label>
                    </div>

                    {/* Image URL Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        placeholder="Or paste image web link (https://...)"
                        value={productForm.newImageUrl}
                        onChange={(e) =>
                          setProductForm({ ...productForm, newImageUrl: e.target.value })
                        }
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (productForm.newImageUrl.trim()) {
                            setProductForm((prev) => ({
                              ...prev,
                              images: [prev.newImageUrl.trim(), ...prev.images],
                              newImageUrl: '',
                            }));
                            showToast('Photo URL added and set as cover!', 'success');
                          }
                        }}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-semibold transition-colors cursor-pointer text-xs shrink-0"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Streetwear Presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-neutral-400 block font-semibold">
                    Quick Preset Streetwear Fits (1-Click Apply):
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {STREETWEAR_PHOTO_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProductForm((prev) => ({
                            ...prev,
                            images: [preset.url, ...prev.images.filter((img) => img !== preset.url)],
                          }));
                          showToast(`Applied preset: ${preset.title}!`, 'info');
                        }}
                        className="group p-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-400 rounded-xl text-left transition-all cursor-pointer"
                        title={preset.title}
                      >
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full aspect-square rounded-lg object-cover bg-neutral-950"
                        />
                        <span className="text-[9px] text-neutral-400 group-hover:text-amber-400 block truncate mt-1">
                          {preset.title.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attached Gallery Thumbnails List */}
                {productForm.images.length > 1 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] text-neutral-400 block font-semibold">
                      Gallery Thumbnails (drag/reorder by setting cover):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {productForm.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative group p-1 bg-neutral-900 border border-neutral-800 rounded-xl"
                        >
                          <img
                            src={img}
                            alt={`Product preview ${idx}`}
                            className="w-12 h-12 rounded-lg object-cover bg-neutral-950"
                          />
                          {idx === 0 ? (
                            <span className="absolute top-0.5 left-0.5 text-[8px] bg-amber-400 text-neutral-950 font-bold px-1 rounded">
                              Main
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                const newImgs = [
                                  img,
                                  ...productForm.images.filter((_, i) => i !== idx),
                                ];
                                setProductForm({ ...productForm, images: newImgs });
                              }}
                              className="absolute inset-0 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-amber-400 font-bold transition-opacity"
                              title="Set as Main Cover"
                            >
                              Make Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const newImgs = productForm.images.filter((_, i) => i !== idx);
                              setProductForm({ ...productForm, images: newImgs });
                            }}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove photo"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distressed Baggy Cargo Jeans"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 mb-1">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category_id: Number(e.target.value) })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: Number(e.target.value) })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Fixed Sale Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.sale_price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, sale_price: Number(e.target.value) })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono text-amber-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Fabric specs, drape details, fit guidelines..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 mb-1">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    placeholder="28, 30, 32, 34, 36"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Colors (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                    placeholder="Washed Black, Deep Indigo"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) =>
                      setProductForm({ ...productForm, featured: e.target.checked })
                    }
                    className="accent-amber-400 rounded"
                  />
                  <span className="text-white">Featured on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-neutral-950 font-bold rounded-xl"
                >
                  {editingProduct ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-sm font-bold text-white font-mono">
                Order #{selectedInvoice.order_number}
              </h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="text-xs space-y-2">
              <div>
                <strong>Customer:</strong> {selectedInvoice.customer_name} (
                {selectedInvoice.customer_phone})
              </div>
              <div>
                <strong>Shipping Address:</strong> {selectedInvoice.shipping_address.address},{' '}
                {selectedInvoice.shipping_address.city} - {selectedInvoice.shipping_address.pincode}
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Payment Mode:</span>
                  <span className="font-semibold text-white uppercase">
                    {selectedInvoice.payment_method === 'razorpay'
                      ? 'Razorpay Online (UPI/Cards)'
                      : 'Cash on Delivery'}
                  </span>
                </div>
                {selectedInvoice.razorpay_payment_id && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-400">Razorpay Payment ID:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {selectedInvoice.razorpay_payment_id}
                    </span>
                  </div>
                )}
                {selectedInvoice.razorpay_order_id && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-400">Razorpay Order ID:</span>
                    <span className="font-mono text-neutral-400">
                      {selectedInvoice.razorpay_order_id}
                    </span>
                  </div>
                )}
              </div>
              <div className="py-2 border-t border-b border-neutral-800 space-y-1">
                {selectedInvoice.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {it.product_name} ({it.size}) x {it.quantity}
                    </span>
                    <span className="font-mono">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-white text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-400 font-mono">₹{selectedInvoice.total_amount}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full bg-neutral-800 text-white font-bold py-2 rounded-xl text-xs"
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}

      {/* Quick Photo Changer Modal */}
      {quickPhotoModalOpen && quickPhotoProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                  <Camera size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    Change Product Photo
                  </h3>
                  <span className="text-[11px] text-neutral-400 block truncate max-w-[240px]">
                    {quickPhotoProduct.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setQuickPhotoModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Photo Preview & Upload Controls */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative group">
                <img
                  src={quickPhotoUrl || quickPhotoProduct.images[0]}
                  alt="New Preview"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover bg-neutral-950 border-2 border-amber-400 shadow-xl"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase px-2 py-0.5 bg-amber-400 text-neutral-950 rounded-full shadow">
                  Live Preview
                </span>
              </div>

              {/* Upload from Device / Phone */}
              <div className="w-full space-y-2 pt-2">
                <input
                  type="file"
                  id="quick-photo-file-input"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  className="hidden"
                />
                <label
                  htmlFor="quick-photo-file-input"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs rounded-xl cursor-pointer transition-colors shadow-md shadow-amber-400/10"
                >
                  <Upload size={15} />
                  <span>Upload from Phone / Computer</span>
                </label>

                {/* Paste URL */}
                <div className="space-y-1 text-left">
                  <label className="text-[11px] text-neutral-400 font-semibold block">
                    Or paste image web link:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={quickPhotoUrl}
                      onChange={(e) => setQuickPhotoUrl(e.target.value)}
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (quickPhotoUrl.trim()) {
                          showToast('Photo URL ready to save!', 'info');
                        }
                      }}
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Streetwear Presets */}
                <div className="space-y-1.5 text-left pt-2">
                  <span className="text-[11px] text-neutral-400 font-semibold block">
                    Or select streetwear fit preset:
                  </span>
                  <div className="grid grid-cols-6 gap-1.5">
                    {STREETWEAR_PHOTO_PRESETS.map((pst, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setQuickPhotoUrl(pst.url);
                          showToast(`Selected: ${pst.title}`, 'info');
                        }}
                        className={`aspect-square rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          quickPhotoUrl === pst.url
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-neutral-800 hover:border-neutral-600'
                        }`}
                        title={pst.title}
                      >
                        <img
                          src={pst.url}
                          alt={pst.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setQuickPhotoModalOpen(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuickPhoto}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-amber-400/20"
              >
                Save New Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Credentials Add / Edit Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {editingAdmin ? 'Edit Admin Credentials' : 'Add New Admin Credential'}
                  </h3>
                  <span className="text-[11px] text-neutral-400">
                    Control who can sign into the DND Management Console
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAdmin} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Admin Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chetan Sharma (Owner) or Rahul (Staff)"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 flex items-center gap-1">
                    <Phone size={12} className="text-amber-400" />
                    <span>Login Contact Number *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8305817958"
                    value={adminForm.contact_no}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, contact_no: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono text-amber-400 font-bold"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    Used as the username to login
                  </span>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1 flex items-center gap-1">
                    <Lock size={12} className="text-amber-400" />
                    <span>Admin Password *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dnd123"
                    value={adminForm.password}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, password: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    Password for this contact number
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. chetan@dnd.com"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Role & Permissions
                  </label>
                  <select
                    value={adminForm.role}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, role: e.target.value as any })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="super_admin">Super Admin (Full Access)</option>
                    <option value="admin">Store Admin (Catalog & Orders)</option>
                    <option value="manager">Manager (Dispatch & Inventory)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Account Status
                  </label>
                  <select
                    value={adminForm.status}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, status: e.target.value as any })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="active">Active (Can Login)</option>
                    <option value="inactive">Inactive (Access Blocked)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                {editingAdmin ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAdminToDelete(editingAdmin);
                    }}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Delete This Admin</span>
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAdminModalOpen(false)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold rounded-xl transition-colors cursor-pointer shadow-lg shadow-amber-400/20"
                  >
                    {editingAdmin ? 'Update Credentials' : 'Create Admin Login'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Delete In-App Confirmation Modal (100% iframe safe, zero window.confirm) */}
      {adminToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Trash2 size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white font-display">
                  Delete Admin Credential?
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Are you sure you want to remove this admin account? This user will no longer be able to log in to the admin panel.
                </p>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium">Admin Name:</span>
                <span className="text-white font-bold">{adminToDelete.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium">Contact Number:</span>
                <span className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <Phone size={11} />
                  {adminToDelete.contact_no}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 font-medium">Role:</span>
                <span className="font-mono text-neutral-300 uppercase text-[10px] bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                  {adminToDelete.role.replace('_', ' ')}
                </span>
              </div>
            </div>

            {adminUsers.length <= 1 ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2.5">
                <AlertTriangle size={18} className="shrink-0 text-amber-400" />
                <span>Cannot delete the only remaining admin account! At least one admin is required to manage the store.</span>
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAdminToDelete(null)}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              {adminUsers.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    deleteAdminUser(adminToDelete.id);
                    setAdminToDelete(null);
                    if (editingAdmin?.id === adminToDelete.id) {
                      setAdminModalOpen(false);
                      setEditingAdmin(null);
                    }
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-red-600/20 flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  <span>Yes, Remove Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
