import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Message sent! Sandeep or Chetan will reply shortly via WhatsApp/Email.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const cleanPhone = settings.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20Sandeep%20%26%20Chetan,%20I'm%20inquiring%20about%20DND%20Boys%20Fashion.`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          CONTACT DND BOYS FASHION
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Have sizing questions, bulk order inquiries, or want to check local store availability?
          Founders Sandeep Jat & Chetan Sharma are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white font-display">Store Contact Info</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-neutral-950 text-amber-400 rounded-xl border border-neutral-800 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-neutral-500 font-bold block">Phone Call</span>
                  <a href={`tel:${settings.phone}`} className="text-white hover:text-amber-400 font-mono text-sm font-semibold">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-neutral-950 text-emerald-400 rounded-xl border border-neutral-800 shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-neutral-500 font-bold block">WhatsApp Support</span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-mono text-sm font-semibold"
                  >
                    {settings.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-neutral-950 text-amber-400 rounded-xl border border-neutral-800 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-neutral-500 font-bold block">Email Support</span>
                  <a href={`mailto:${settings.email}`} className="text-white hover:text-amber-400 text-sm font-semibold">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-neutral-950 text-amber-400 rounded-xl border border-neutral-800 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-neutral-500 font-bold block">Flagship Studio Location</span>
                  <p className="text-neutral-300 leading-relaxed mt-0.5">
                    {settings.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-white font-display">Send Us a Direct Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Your Message or Sizing Question *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="I'm interested in the Black Baggy Jeans and Blue Bell Bottoms, can you confirm waist sizing?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send size={14} />
                <span>SEND MESSAGE TO FOUNDERS</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
