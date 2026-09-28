import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useStore();

  const cleanPhone = settings.whatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    `Hello Sandeep Jat & Chetan Sharma! I'm interested in DND Premium Boys Fashion. Please share available sizes and fast delivery details.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-200 group"
      title="Direct WhatsApp Chat with Sandeep Jat & Chetan Sharma"
    >
      <div className="relative">
        <MessageCircle size={22} className="fill-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">WhatsApp Chat</span>
        <span className="text-xs font-extrabold leading-none">DND Founders</span>
      </div>
    </a>
  );
};
