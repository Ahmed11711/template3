// src/pages/Shop.tsx
import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { ProductCard } from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { categoryService } from "../api/services/categoryService";

interface Category {
  id: number;
  name: string;
  products: Product[];
}

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  // Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    initialCategory ? [parseInt(initialCategory)] : [],
  );
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [sortOption, setSortOption] = useState<string>("Newest");

  // Fetch categories + products from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data: Category[] = await categoryService.getAll(); // API بترجع كل الكاتيجوري + المنتجات
        setCategories(data);

        // جمع كل المنتجات
        const allProds = data.flatMap((c) => c.products);
        setAllProducts(allProds);

        // لو فيه كاتيجوري محددة من query params
        if (initialCategory) {
          setProducts(
            allProds.filter((p) =>
              data
                .find((c) => c.id === parseInt(initialCategory))
                ?.products.some((cp) => cp.id === p.id),
            ),
          );
        } else {
          setProducts(allProds);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [initialCategory]);

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...allProducts];

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.some((catId) =>
          categories
            .find((c) => c.id === catId)
            ?.products.some((cp) => cp.id === p.id),
        ),
      );
    }

    // Filter by price
    filtered = filtered.filter((p) => p.price <= priceRange);

    // Sort
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.id - a.id); // Newest first
    }

    setProducts(filtered);
  }, [selectedCategories, priceRange, sortOption, allProducts, categories]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header + Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-2">Home / Shop</div>
          <h1 className="text-4xl font-extrabold text-dark tracking-tight">
            Shop All Products
          </h1>
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
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-primary focus:ring-primary border-gray-300"
                        checked={selectedCategories.includes(c.id)}
                        onChange={() => toggleCategory(c.id)}
                      />
                      <span className="text-sm text-gray-600">{c.name_en}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold mb-2">Max Price: ${priceRange}</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full text-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategories([]);
                setPriceRange(1000);
              }}
              className="w-full mt-6 bg-gray-100 text-dark hover:bg-gray-200 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <span className="material-symbols-outlined text-4xl mb-2">
                filter_alt_off
              </span>
              <p>No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
