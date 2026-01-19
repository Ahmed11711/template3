// src/pages/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../api/services/productService";
import { Product } from "../types";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedText } from "../utils/i18n";

const FALLBACK_IMAGE = "/fallback-image.png";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { addToCart, toggleFavorite, favorites } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    // Fetch main product
    productService
      .getOne(id)
      .then((prod) => {
        // تحويل sizes من string JSON إلى array
        let sizesArray: string[] | null = null;
        if (prod.sizes) {
          try {
            sizesArray = JSON.parse(prod.sizes);
          } catch (err) {
            console.error("Failed to parse sizes:", err);
            sizesArray = null;
          }
        }

        setProduct({ ...prod, sizes: sizesArray });
        setMainImage(prod.mainImage || FALLBACK_IMAGE);
        setQuantity(1);
        setSelectedSize(sizesArray?.[0] || null); // أول حجم افتراضي لو موجود
      })
      .catch(() => setError(t("common.error")))
      .finally(() => setLoading(false));

    // Fetch related products
    productService
      .getAll()
      .then((all) => {
        const filtered = all.filter((p) => p.id !== String(id));
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelated(shuffled.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        {t("common.loading")}
      </div>
    );

  if (error)
    return <div className="p-20 text-center text-red-500">{error}</div>;

  if (!product) return null;

  const isFav = favorites.includes(product.id);
  const productName = getLocalizedText(product, language, product.name || "");
  const productDescription = getLocalizedText(
    product,
    language,
    product.description || "",
  );

  // Handle additional images
  let images: string[] = [];
  if (product.additionalImages) {
    try {
      images = JSON.parse(product.additionalImages);
    } catch (err) {
      console.error("Failed to parse additionalImages:", err);
      images = [product.mainImage || FALLBACK_IMAGE];
    }
  } else {
    images = [product.mainImage || FALLBACK_IMAGE];
  }

  const mainImg = mainImage || product.mainImage || images[0] || FALLBACK_IMAGE;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="w-full max-w-[700px] h-[600px] bg-gray-100 rounded-xl overflow-hidden shadow-lg mx-auto">
            <img
              src={mainImg}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gray-100 cursor-pointer border-2 border-transparent hover:border-primary overflow-hidden"
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`thumbnail ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-dark">{productName}</h1>
          <p className="font-bold">
            <span className="text-primary">{product.price.toFixed(2)}</span>
            <span className="text-gray-500 ml-1">SDG</span>
          </p>

          <p className="text-gray-600 leading-relaxed">{productDescription}</p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <span className="font-medium text-dark">
                {t("product.size")}:
              </span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-bold transition-all ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary shadow"
                        : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-4">
            <span className="font-medium text-dark">
              {t("product.quantity")}:
            </span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-none focus:ring-0 bg-transparent"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart & Favorite */}
          <div className="flex gap-4 pt-4 flex-wrap">
            <button
              onClick={() => addToCart(product, quantity, selectedSize || "M")}
              className="flex-1 bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:bg-secondary transition-all hover:scale-105 flex justify-center items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
              {t("product.addToCart")}
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`px-6 py-4 border-2 rounded-lg font-bold transition-colors flex items-center justify-center ${
                isFav
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "border-primary text-primary hover:bg-accent"
              }`}
            >
              <span
                className={`material-symbols-outlined ${isFav ? "fill" : ""}`}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("product.relatedProducts")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.length > 0 ? (
            related.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              {t("product.noRelatedProducts")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
