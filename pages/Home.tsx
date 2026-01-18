// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { productService } from "../api/services/productService";
import { categoryService } from "../api/services/categoryService";
import { contentService } from "../api/services/contentService";
import { Product, BlogPost, Category } from "../types";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedText } from "../utils/i18n";

export const Home = () => {
  const { language, t } = useLanguage();

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
    return (
      <div className="text-center py-20 text-gray-500">
        {t("common.loading")}
      </div>
    );
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
            {t("home.heroTitle")}
          </h1>
          <p className="text-lg text-dark/80 mb-8">{t("home.heroSubtitle")}</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-primary rounded-lg shadow-lg hover:bg-secondary transition-all hover:scale-105"
          >
            {t("home.shopNow")}
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dark mb-10">
          {t("home.featuredCategories")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const categoryName =
              language === "ar"
                ? cat.name_ar || cat.name_en || ""
                : cat.name_en || cat.name_ar || "";
            return (
              <Link
                to={`/shop?category=${cat.id}`}
                key={cat.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer block"
              >
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src={cat.image}
                  alt={categoryName}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <span
                  className="absolute bottom-4 text-white font-bold text-lg z-20"
                  style={{
                    [language === "ar" ? "right" : "left"]: "1rem",
                  }}
                >
                  {categoryName}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-dark mb-10">
          {t("home.latestProducts")}
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
            {t("home.viewAllProducts")}
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-surface-dim py-16">
        <div className="container mx-auto px-4">
          {/* عنوان القسم واللينك */}
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold text-dark">
              {t("home.fromTheBlog")}
            </h2>
            <Link
              to="/blog"
              className="text-primary font-bold hover:underline hidden sm:block"
            >
              {t("home.readAllArticles")}
            </Link>
          </div>

          {/* المقالات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              // اختيار النصوص حسب اللغة
              const postTitle =
                language === "ar"
                  ? post.title_ar || post.title
                  : post.title || post.title_ar;
              const postExcerpt =
                language === "ar"
                  ? post.excerpt_ar || post.excerpt
                  : post.excerpt || post.excerpt_ar;
              const postCategory =
                language === "ar"
                  ? post.category_ar || post.category
                  : post.category || post.category_ar;

              return (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-secondary/10 flex flex-col"
                >
                  {/* صورة المقال */}
                  <div
                    className="overflow-hidden rounded-xl mb-4"
                    style={{ height: "200px" }}
                  >
                    <img
                      src={post.image}
                      alt={postTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* محتوى المقال */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                      {postCategory}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {postTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {postExcerpt}
                    </p>
                    <span className="mt-auto text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("home.readArticle")}{" "}
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* لينك للمقالات للجوال */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/blog" className="text-primary font-bold hover:underline">
              {t("home.readAllArticles")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
