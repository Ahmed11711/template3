// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { productService } from "../api/services/productService";
import { categoryService } from "../api/services/categoryService";
import { contentService } from "../api/services/contentService";
import { Product, BlogPost, Category } from "../types";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export const Home = () => {
  const { language, setLanguage } = useLanguage();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1️⃣ Fetch categories with their products
        const cats = await categoryService.getAll();
        setCategories(cats);

        // 2️⃣ Fetch latest products and pick 5 random
        const allProducts = await productService.getAll();
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffledProducts.slice(0, 5));

        // 3️⃣ Fetch blogs and pick 3 random
        const allPosts = await contentService.getBlogs();
        const shuffledPosts = allPosts.sort(() => 0.5 - Math.random());
        setPosts(shuffledPosts.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-start p-8 md:p-16">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(75deg, rgba(243, 232, 255, 0.95) 0%, rgba(155, 77, 255, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_L8HZ17-J9oir-0zhVy7gt8pNpLDQ4Ri4frHNFeVg64sOW3dyejOPdLX6um0Snf9Zh9fD8vOZajAM3nkeUbcwVdg5J3jAGzUf5WXOWIL844I1mKw0pqp5qV4nA4ivWJeRfZcBqYAJ3Bcj2kIHT23YdSdS_d9zt3hq6vfBrJf_LpaORnMpukfAI5R6zGD0zcERj4XgeKgkOjklxkXrb55S2G9NeIMhh1caXyrbV3PW0aPfgN5BgytiI13VW-gdXEDnBjLyTQkbles')`,
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tighter mb-4">
            Elevate Your Style
          </h1>
          <p className="text-lg text-dark/80 mb-8">
            Discover our new collection of modern and elegant products. Up to
            30% off this week.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-primary rounded-lg shadow-lg hover:bg-secondary transition-all hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dark mb-10">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              to={`/shop?category=${cat.id}`}
              key={cat.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer block"
            >
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img
                src={cat.image}
                alt={cat.name_en}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg z-20">
                {cat.name_en}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dark mb-10">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-surface-dim py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold text-dark">From the Blog</h2>
            <Link
              to="/blog"
              className="text-primary font-bold hover:underline hidden sm:block"
            >
              Read All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-secondary/10 flex flex-col"
              >
                <div
                  className="overflow-hidden rounded-xl mb-4"
                  style={{ height: "200px" }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/blog" className="text-primary font-bold hover:underline">
              Read All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
