import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Heart,
  LogOut,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const AccountPage: React.FC = () => {
  const {
    currentCustomer,
    logoutCustomer,
    orders,
    wishlist,
    products,
    setCurrentView,
    addToCart,
    toggleWishlist,
    settings,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!currentCustomer) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400">
          <User size={30} />
        </div>
        <h2 className="text-2xl font-bold text-white font-display">Sign In to Your Account</h2>
        <p className="text-xs text-neutral-400">
          View your active streetwear orders, order timeline tracking, and saved wishlist items.
        </p>
        <button
          onClick={() => setCurrentView('auth')}
          className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  // Filter orders for this customer (or show all sample orders if demo customer)
  const customerOrders = orders.filter(
    (o) => o.customer_email.toLowerCase() === currentCustomer.email.toLowerCase() || o.customer_id === currentCustomer.id
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Customer Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xl font-extrabold font-display">
            {currentCustomer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              DND Member
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              {currentCustomer.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
              <span>{currentCustomer.email}</span>
              <span>·</span>
              <span>{currentCustomer.phone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logoutCustomer}
          className="bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-800 pb-2 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-amber-400 text-neutral-950 font-extrabold'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Package size={15} />
          <span>My Orders ({customerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'bg-amber-400 text-neutral-950 font-extrabold'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Heart size={15} />
          <span>Wishlist ({wishlistProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-amber-400 text-neutral-950 font-extrabold'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <MapPin size={15} />
          <span>Saved Address</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {customerOrders.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-3">
              <Package size={32} className="mx-auto text-neutral-500" />
              <h3 className="text-base font-bold text-white">No Orders Placed Yet</h3>
              <p className="text-xs text-neutral-400">
                You haven't ordered any fits yet. Browse our streetwear drops today!
              </p>
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {customerOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-neutral-400">Order ID</span>
                      <div className="text-sm font-bold text-amber-400 font-mono">
                        {ord.order_number}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          ord.order_status === 'delivered'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : ord.order_status === 'shipped'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : ord.order_status === 'processing'
                            ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        {ord.order_status}
                      </span>

                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="divide-y divide-neutral-800/60">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.product_image}
                            alt={it.product_name}
                            className="w-12 h-12 rounded-lg object-cover bg-neutral-950 border border-neutral-800"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-white">{it.product_name}</h4>
                            <span className="text-[11px] text-neutral-400">
                              Size: {it.size} · Color: {it.color} · Qty: {it.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-white tabular-nums">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
                    <span className="text-neutral-400">
                      Placed on <strong className="text-white">{ord.created_at}</strong>
                    </span>
                    <div>
                      <span className="text-neutral-400 mr-2">Total Paid / Due:</span>
                      <span className="text-sm font-bold text-amber-400 tabular-nums">
                        ₹{ord.total_amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-3">
              <Heart size={32} className="mx-auto text-neutral-500" />
              <h3 className="text-base font-bold text-white">Your Wishlist is Empty</h3>
              <p className="text-xs text-neutral-400">
                Tap the heart on any baggy jeans or oversized shirts to save them here.
              </p>
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile & Address */}
      {activeTab === 'profile' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-display">Delivery Address Details</h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-neutral-500 block mb-1">Contact Name:</span>
              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-semibold">
                {currentCustomer.name}
              </div>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Phone Number:</span>
              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono">
                {currentCustomer.phone}
              </div>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Street Address:</span>
              <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white">
                {currentCustomer.address || 'Not specified yet'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-neutral-500 block mb-1">City:</span>
                <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white">
                  {currentCustomer.city}
                </div>
              </div>
              <div>
                <span className="text-neutral-500 block mb-1">Pincode:</span>
                <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono">
                  {currentCustomer.pincode}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[11px] font-bold text-neutral-400">Order Invoice</span>
                <h3 className="text-base font-bold text-white font-mono">
                  {selectedOrder.order_number}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Timeline Tracking */}
            <div className="space-y-2 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Live Dispatch Timeline
              </span>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                <span className="text-emerald-400 font-bold">1. Order Placed ✓</span>
                <span className="text-emerald-400 font-bold">2. Verified ✓</span>
                <span
                  className={
                    selectedOrder.order_status === 'shipped' ||
                    selectedOrder.order_status === 'delivered'
                      ? 'text-emerald-400 font-bold'
                      : 'text-neutral-500'
                  }
                >
                  3. In Transit
                </span>
                <span
                  className={
                    selectedOrder.order_status === 'delivered'
                      ? 'text-emerald-400 font-bold'
                      : 'text-neutral-500'
                  }
                >
                  4. Delivered
                </span>
              </div>
            </div>

            <div className="text-xs space-y-2">
              <div className="font-semibold text-white">Shipping Address:</div>
              <p className="text-neutral-400">
                {selectedOrder.shipping_address.name} ({selectedOrder.shipping_address.phone})
                <br />
                {selectedOrder.shipping_address.address}, {selectedOrder.shipping_address.city} -{' '}
                {selectedOrder.shipping_address.pincode}
              </p>
            </div>

            <div className="divide-y divide-neutral-800 text-xs">
              {selectedOrder.items.map((it, i) => (
                <div key={i} className="py-2 flex justify-between">
                  <span>
                    {it.product_name} ({it.size}, {it.color}) x {it.quantity}
                  </span>
                  <span className="text-white font-bold">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
              <span>Total Amount:</span>
              <span className="text-amber-400">₹{selectedOrder.total_amount}</span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Close Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
