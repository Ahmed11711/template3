
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { MOCK_CART } from '../api/fakeData';

interface ShopContextType {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  clearCart: () => void;
  notifications: { id: number; message: string; type: 'success' | 'error' }[];
  showNotification: (message: string, type?: 'success' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with Mock Data for demonstration
  const [cart, setCart] = useState<CartItem[]>(MOCK_CART);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'success' | 'error' }[]>([]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1, color = 'Default', size = 'M') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showNotification(`Updated quantity for ${product.name}`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      showNotification(`Added ${product.name} to cart`);
      return [...prev, { ...product, quantity, color, size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showNotification('Item removed from cart', 'error');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        showNotification('Removed from favorites', 'error');
        return prev.filter((id) => id !== productId);
      }
      showNotification('Added to favorites');
      return [...prev, productId];
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleFavorite,
        clearCart,
        notifications,
        showNotification,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white text-sm font-medium animate-bounce ${
              n.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
