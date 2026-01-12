import React, { useEffect, useState } from 'react';
import { productService } from '../api/services/productService';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [priceRange, setPriceRange] = useState<number>(500);
  const [sortOption, setSortOption] = useState<string>('Newest');

  const categories = ['Skincare', 'Makeup', 'Haircare', 'Fashion', 'Accessories', 'Electronics', 'Home Decor'];

  useEffect(() => {
    productService.getAll().then((data) => {
      setAllProducts(data);
      // Initial filtering logic handled in the dependency effect below
    });
  }, []);

  useEffect(() => {
    if (initialCategory && !selectedCategories.includes(initialCategory)) {
        setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  useEffect(() => {
    let result = [...allProducts];

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Sort
    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default sorting (e.g. by ID or mock date)
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    setFilteredProducts(result);
  }, [selectedCategories, priceRange, sortOption, allProducts]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
         <div>
            <div className="text-sm text-gray-500 mb-2">Home / Shop</div>
            <h1 className="text-4xl font-extrabold text-dark tracking-tight">Shop All Products</h1>
         </div>
         <select 
            className="form-select rounded-lg border-gray-200 text-sm focus:border-primary focus:ring-primary"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
         >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
         </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
           <div className="bg-surface p-6 rounded-xl shadow-sm border border-secondary/10 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <div className="space-y-6">
                 <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <div className="space-y-2">
                       {categories.map(c => (
                          <label key={c} className="flex items-center space-x-2 cursor-pointer">
                             <input 
                                type="checkbox" 
                                className="rounded text-primary focus:ring-primary border-gray-300"
                                checked={selectedCategories.includes(c)}
                                onChange={() => toggleCategory(c)}
                             />
                             <span className="text-sm text-gray-600">{c}</span>
                          </label>
                       ))}
                    </div>
                 </div>
                 <div>
                    <h3 className="font-semibold mb-2">Max Price: ${priceRange}</h3>
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      step="10"
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full text-primary" 
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                       <span>$0</span><span>$500+</span>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => { setSelectedCategories([]); setPriceRange(500); }}
                className="w-full mt-6 bg-gray-100 text-dark hover:bg-gray-200 py-2 rounded-lg font-bold text-sm transition-colors"
              >
                Reset Filters
              </button>
           </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
           {filteredProducts.length === 0 ? (
             <div className="text-center py-20 text-gray-500">
               <span className="material-symbols-outlined text-4xl mb-2">filter_alt_off</span>
               <p>No products match your filters.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
               {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
             </div>
           )}
           
           {/* Pagination (Visual Only for now) */}
           {filteredProducts.length > 0 && (
             <div className="flex justify-center mt-12 gap-2">
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">2</button>
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"><span className="material-symbols-outlined">chevron_right</span></button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};