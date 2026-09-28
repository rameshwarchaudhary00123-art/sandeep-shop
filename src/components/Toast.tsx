import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-2xl text-xs font-semibold animate-in slide-in-from-top-2 duration-200 ${
            toast.type === 'success'
              ? 'bg-neutral-900/95 border-amber-400/40 text-neutral-100'
              : toast.type === 'error'
              ? 'bg-neutral-900/95 border-red-500/40 text-red-200'
              : 'bg-neutral-900/95 border-neutral-700 text-neutral-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 size={16} className="text-amber-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={16} className="text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info size={16} className="text-neutral-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
