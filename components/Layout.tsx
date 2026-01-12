
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart } = useShop();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-surface/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="material-symbols-outlined text-3xl text-primary transition-transform group-hover:scale-110">diamond</span>
            <span className="text-xl font-bold tracking-tight text-primary">Elegance</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/blog">Insights</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            
            <Link to="/cart" className="p-2 hover:bg-accent rounded-full text-dark transition-colors relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link to="/account" className="p-2 hover:bg-accent rounded-full text-dark transition-colors">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-surface border-t border-secondary/10 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">Elegance</h3>
              <p className="text-sm text-gray-500">Timeless fashion for the modern individual.</p>
            </div>
            <div>
              <h3 className="font-bold text-md mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/shop" className="hover:text-primary">New Arrivals</Link></li>
                <li><Link to="/shop" className="hover:text-primary">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-md mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                 <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
                 <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-md mb-4">Follow Us</h3>
              <div className="flex space-x-4 text-gray-400">
                <span>FB</span><span>IG</span><span>TW</span>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary/10 mt-8 pt-6 text-center text-xs text-gray-400">
            © 2024 Elegance Store. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`text-sm font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'text-dark hover:text-primary'}`}
    >
      {children}
    </Link>
  );
};
