import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { productService } from '../api/services/productService';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const { favorites } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then(all => {
      setProducts(all.filter(p => favorites.includes(p.id)));
      setLoading(false);
    });
  }, [favorites]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <span className="material-symbols-outlined text-6xl text-gray-300">favorite_border</span>
        </div>
        <h1 className="text-3xl font-bold text-dark mb-4">No Favorites Yet</h1>
        <p className="text-gray-500 mb-8">Save items you love to your wishlist.</p>
        <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
       <h1 className="text-3xl font-black text-dark mb-8">My Favorites ({products.length})</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
       </div>
    </div>
  );
};