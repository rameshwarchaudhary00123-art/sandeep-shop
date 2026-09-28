import React from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/Toast';
import { WhatsAppButton } from './components/WhatsAppButton';
import { StoreProvider, useStore } from './context/StoreContext';
import { AboutPage } from './pages/AboutPage';
import { AccountPage } from './pages/AccountPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AuthPage } from './pages/AuthPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShopPage } from './pages/ShopPage';

const AppContent: React.FC = () => {
  const { currentView } = useStore();

  const isAdminView = currentView === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Main Top Navigation (Hidden in pure admin panel view for dedicated workspace) */}
      {!isAdminView && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'account' && <AccountPage />}
        {currentView === 'auth' && <AuthPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'admin' && <AdminLayout />}
      </main>

      {/* Modals & Floating Widgets */}
      <QuickViewModal />
      {!isAdminView && <WhatsAppButton />}

      {/* Footer */}
      {!isAdminView && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
