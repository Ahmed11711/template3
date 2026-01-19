import React from "react";
import { Product } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useShop();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const isFav = favorites.includes(product.id);

  const productName =
    language === "ar"
      ? product.name_ar || product.name_en || ""
      : product.name_en || product.name_ar || "";

  // Parse sizes
  let sizesArray: string[] = [];
  if (product.sizes) {
    try {
      const parsed = JSON.parse(product.sizes);
      if (Array.isArray(parsed)) sizesArray = parsed;
    } catch (e) {
      sizesArray = [];
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (sizesArray.length > 0) {
      // فيه خيارات → روح صفحة المنتج
      navigate(`/product/${product.id}`);
    } else {
      // مفيش خيارات → اضيف مباشر للكارت
      addToCart(product, 1, null);
    }
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
        className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-transform hover:scale-110 ${isFav ? "text-red-500" : "text-gray-400"}`}
        style={{
          ...(language === "ar" ? { right: "auto", left: "0.75rem" } : {}),
        }}
      >
        <span
          className={`material-symbols-outlined text-xl ${isFav ? "fill" : ""}`}
        >
          favorite
        </span>
      </button>

      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.mainImage}
          alt={productName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white opacity-0 translate-y-4 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 hover:bg-secondary"
          style={{
            ...(language === "ar" ? { right: "auto", left: "1rem" } : {}),
          }}
        >
          <span className="material-symbols-outlined text-sm">
            add_shopping_cart
          </span>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-dark truncate hover:text-primary transition-colors">
            {productName}
          </h3>
        </Link>
        {product.stock !== undefined && (
          <p className="text-xs text-gray-400 mt-1">
            {t("shop.stock")}: {product.stock}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold">
            <span className="text-primary">{product.price.toFixed(2)}</span>
            <span className="text-gray-500 ml-1">SDG</span>
          </p>

          <div className="flex items-center text-xs text-gray-500">
            <span
              className={`material-symbols-outlined text-yellow-400 text-sm fill ${language === "ar" ? "ml-1" : "mr-1"}`}
            >
              star
            </span>
            (0)
          </div>
        </div>
      </div>
    </div>
  );
};
