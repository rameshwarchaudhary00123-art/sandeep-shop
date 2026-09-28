import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthPage: React.FC = () => {
  const { loginCustomer, registerCustomer, setCurrentView, showToast } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: 'bg-neutral-800', width: '0%' };
    if (pass.length < 6) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
    if (pass.length < 8) return { label: 'Fair', color: 'bg-amber-500', width: '50%' };
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
    }
    return { label: 'Good', color: 'bg-blue-500', width: '75%' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const ok = loginCustomer(email, password);
      if (ok) setCurrentView('account');
    } else {
      const ok = registerCustomer({ name, email, phone, password });
      if (ok) setCurrentView('account');
    }
  };

  const handleDemoLogin = () => {
    loginCustomer('aman.verma@example.com', 'demo123');
    setCurrentView('account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            DND Member Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h1>
          <p className="text-xs text-neutral-400">
            {mode === 'login'
              ? 'Sign in to access your orders, fits wishlist, and fast checkout.'
              : 'Join DND for member-only drops and exclusive fit releases.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-amber-400 text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-amber-400 text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-neutral-500" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-neutral-300">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to your email.')}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-3 text-neutral-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-neutral-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Password strength meter for register mode */}
            {mode === 'register' && password && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>Strength:</span>
                  <span className="font-semibold text-white">{strength.label}</span>
                </div>
                <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-amber-400"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold py-3 px-4 rounded-xl text-xs tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-400/20"
          >
            {mode === 'login' ? 'SIGN IN' : 'CREATE FREE ACCOUNT'}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="pt-2 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold py-2.5 rounded-xl border border-neutral-800 transition-colors cursor-pointer"
          >
            Instant Demo Member Login (Aman Verma)
          </button>
        </div>
      </div>
    </div>
  );
};
