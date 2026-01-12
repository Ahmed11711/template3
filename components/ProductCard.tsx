
import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const isFav = favorites.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div className="group overflow-hidden rounded-xl bg-surface shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary/10 relative">
      <button 
        onClick={handleToggleFavorite}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-transform hover:scale-110 ${isFav ? 'text-red-500' : 'text-gray-400'}`}
      >
        <span className={`material-symbols-outlined text-xl ${isFav ? 'fill' : ''}`}>favorite</span>
      </button>

      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white opacity-0 translate-y-4 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:bg-secondary"
        >
          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
        </button>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-dark truncate hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
           <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
           <div className="flex items-center text-xs text-gray-500">
             <span className="material-symbols-outlined text-yellow-400 text-sm mr-1 fill">star</span>
             ({product.reviews})
           </div>
        </div>
      </div>
    </div>
  );
};
