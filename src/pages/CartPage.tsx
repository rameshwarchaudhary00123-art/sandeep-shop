import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Percent,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    settings,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{
    text: string;
    type: 'success' | 'error' | '';
  }>({ text: '', type: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMessage({ text: res.message, type: 'success' });
      setCouponInput('');
    } else {
      setCouponMessage({ text: res.message, type: 'error' });
    }
  };

  const amountForFreeShipping = Math.max(0, settings.free_shipping_threshold - cartTotals.subtotal);
  const freeShippingProgress = Math.min(
    100,
    (cartTotals.subtotal / settings.free_shipping_threshold) * 100
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 mb-6">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md mx-auto">
          Explore our trending baggy jeans, bell bottoms, and oversized shirts engineered by Sandeep Jat & Chetan Sharma.
        </p>
        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold px-6 py-3.5 rounded-xl text-xs tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>EXPLORE STREETWEAR DROPS</span>
          <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Shopping Bag
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            REVIEW YOUR ITEMS ({cartTotals.count})
          </h1>
        </div>

        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft size={14} />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <Truck size={15} className="text-amber-400" />
            {amountForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-amber-400">₹{amountForFreeShipping}</strong> more for{' '}
                <strong>FREE DELIVERY</strong>!
              </span>
            ) : (
              <span className="text-emerald-400 font-bold">
                🎉 You have qualified for FREE Express Shipping!
              </span>
            )}
          </span>
          <span className="text-neutral-400 font-mono text-[11px]">
            Threshold: ₹{settings.free_shipping_threshold}
          </span>
        </div>
        <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl overflow-hidden divide-y divide-neutral-800">
            {cart.map((item) => (
              <div
                key={item.cart_id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-neutral-950 border border-neutral-800 shrink-0"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-neutral-500 uppercase">
                      {item.product.category_name}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                      <span>
                        Size: <strong className="text-white font-mono">{item.size}</strong>
                      </span>
                      <span>·</span>
                      <span>
                        Color: <strong className="text-white">{item.color}</strong>
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-amber-400 tabular-nums sm:hidden">
                      ₹{(item.product.sale_price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Stepper & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t border-neutral-800 sm:border-0">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-800 rounded-xl bg-neutral-950">
                    <button
                      onClick={() => updateCartQuantity(item.cart_id, item.quantity - 1)}
                      className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cart_id, item.quantity + 1)}
                      className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Desktop Item Total */}
                  <div className="hidden sm:block text-right min-w-[90px]">
                    <div className="text-sm font-extrabold text-amber-400 tabular-nums">
                      ₹{(item.product.sale_price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-neutral-500 tabular-nums">
                      ₹{item.product.sale_price} each
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cart_id)}
                    className="p-2 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-neutral-800"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-neutral-500 pt-2">
            <span>Prices are fixed & all-inclusive of taxes.</span>
            <button
              onClick={clearCart}
              className="hover:text-red-400 transition-colors cursor-pointer underline"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white font-display">Order Summary</h3>

            {/* Coupon Application Box */}
            <div>
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. DND10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-4 py-2 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponMessage.text && (
                <p
                  className={`text-[11px] mt-2 ${
                    couponMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}

              {/* Active Applied Coupon Banner */}
              {appliedCoupon && (
                <div className="mt-3 p-2.5 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold text-amber-400 font-mono">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-neutral-400 text-[11px] ml-1.5">
                        ({appliedCoupon.discount_value}
                        {appliedCoupon.discount_type === 'percentage' ? '%' : '₹'} off)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-400 hover:text-white p-1"
                    title="Remove coupon"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs pt-4 border-t border-neutral-800">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({cartTotals.count} items)</span>
                <span className="text-white font-mono tabular-nums">
                  ₹{cartTotals.subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono tabular-nums">
                    -₹{cartTotals.discount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Shipping Charge</span>
                <span className="font-mono tabular-nums">
                  {cartTotals.shipping === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `₹${cartTotals.shipping}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Grand Total</span>
                <span className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                  ₹{cartTotals.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setCurrentView('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold py-3.5 px-4 rounded-xl text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-amber-400/20"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={15} />
            </button>

            <div className="text-[11px] text-center text-neutral-500">
              Cash on Delivery & Instant UPI Accepted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
