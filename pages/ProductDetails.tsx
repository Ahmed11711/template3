
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../api/services/productService';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleFavorite, favorites } = useShop();

  useEffect(() => {
    if (id) {
      productService.getOne(id).then(setProduct);
      productService.getRelated(id).then(setRelated);
      setQuantity(1);
    }
  }, [id]);

  if (!product) return <div className="p-20 text-center flex flex-col items-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>Loading...</div>;

  const isFav = favorites.includes(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-lg bg-gray-100 cursor-pointer border-2 border-transparent hover:border-primary overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                   <img src={product.image} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
           <div>
             <h1 className="text-4xl font-bold text-dark mb-2">{product.name}</h1>
             <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex text-yellow-400"><span className="material-symbols-outlined fill text-lg">star</span></div>
                <span className="font-medium text-dark">{product.rating}</span>
                <span>({product.reviews} reviews)</span>
             </div>
           </div>
           
           <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
           
           <p className="text-gray-600 leading-relaxed">{product.description || "Indulge in the luxurious feel of this premium product. Crafted from the finest materials, this piece is designed to make a statement."}</p>
           
           <div className="flex items-center gap-4">
              <span className="font-medium text-dark">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                 <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                 >-</button>
                 <input type="text" value={quantity} className="w-12 text-center border-none focus:ring-0 p-0 bg-transparent" readOnly />
                 <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                 >+</button>
              </div>
           </div>

           <div className="flex gap-4 pt-4">
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:bg-secondary transition-all hover:scale-105 flex justify-center items-center gap-2 active:scale-95"
              >
                 <span className="material-symbols-outlined">add_shopping_cart</span>
                 Add to Cart
              </button>
              <button 
                onClick={() => toggleFavorite(product.id)}
                className={`px-6 py-4 border-2 rounded-lg font-bold transition-colors flex items-center justify-center ${isFav ? 'border-red-500 text-red-500 bg-red-50' : 'border-primary text-primary hover:bg-accent'}`}
              >
                 <span className={`material-symbols-outlined ${isFav ? 'fill' : ''}`}>favorite</span>
              </button>
           </div>

           <div className="space-y-2 pt-6">
              <details className="group p-4 bg-surface-dim rounded-lg cursor-pointer" open>
                 <summary className="font-bold flex justify-between items-center list-none">
                    Description <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                 </summary>
                 <p className="mt-2 text-sm text-gray-600">This exquisite item is tailored to perfection. Features a flattering silhouette and premium finish.</p>
              </details>
              <details className="group p-4 bg-surface-dim rounded-lg cursor-pointer">
                 <summary className="font-bold flex justify-between items-center list-none">
                    Specifications <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                 </summary>
                 <p className="mt-2 text-sm text-gray-600">Material: 100% Premium Quality<br/>Care: Handle with love</p>
              </details>
           </div>
        </div>
      </div>

      {/* Related */}
      <section>
         <h2 className="text-3xl font-bold text-center mb-8">You Might Also Like</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
         </div>
      </section>
    </div>
  );
};
