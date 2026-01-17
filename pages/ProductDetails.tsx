// src/pages/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../api/services/productService";
import { Product } from "../types";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, toggleFavorite, favorites } = useShop();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    // Fetch main product
    productService
      .getOne(id)
      .then((prod) => {
        setProduct(prod);
        setMainImage(prod.mainImage || "/fallback-image.png");
        setQuantity(1);
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));

    // Fetch any products to show as "related"
    productService
      .getAll()
      .then((all) => {
        // Remove current product from the list
        const filtered = all.filter((p) => p.id !== String(id));
        // Pick 4 random products
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelated(shuffled.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center flex flex-col items-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        Loading...
      </div>
    );

  if (error)
    return <div className="p-20 text-center text-red-500">{error}</div>;

  if (!product) return null;

  const isFav = favorites.includes(product.id);

  // Handle images
  const images = product.additionalImages
    ? product.additionalImages.split(",").map((img) => img.trim())
    : [product.mainImage || "/fallback-image.png"];
  const mainImg =
    mainImage || product.mainImage || images[0] || "/fallback-image.png";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <img
              src={mainImg}
              alt={product.name_en}
              className="w-full h-full object-cover"
            />
          </div>
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
          <h1 className="text-4xl font-bold text-dark">{product.name_en}</h1>
          <p className="text-3xl font-bold text-primary">
            ${product.price?.toFixed(2) ?? "0.00"}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {product.description_en}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <span className="font-medium text-dark">Quantity:</span>
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

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:bg-secondary transition-all hover:scale-105 flex justify-center items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
              Add to Cart
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
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.length > 0 ? (
            related.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No related products found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
export default ProductDetails;
