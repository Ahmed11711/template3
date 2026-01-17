import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useShop();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <span className="material-symbols-outlined text-6xl text-gray-300">
            shopping_cart_off
          </span>
        </div>
        <h1 className="text-3xl font-bold text-dark mb-4">
          {t("cart.emptyTitle")}
        </h1>
        <p className="text-gray-500 mb-8">{t("cart.emptyMessage")}</p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors"
        >
          {t("cart.startShopping")}
        </Link>
      </div>
    );
  }

  const getLocalizedText = (item: any, type: "name" | "description") => {
    if (language === "ar") {
      return type === "name"
        ? item.name_ar || item.name_en || "بدون اسم"
        : item.description_ar || item.description_en || "بدون وصف";
    } else {
      return type === "name"
        ? item.name_en || item.name_ar || "No Name"
        : item.description_en || item.description_ar || "No Description";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-black text-dark mb-8">
        {t("cart.title")} ({cart.length} {t("cart.items")})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {/* Header Row */}
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-6">{t("cart.product")}</div>
            <div className="col-span-3 text-center">{t("cart.quantity")}</div>
            <div className="col-span-3 text-right">{t("cart.total")}</div>
          </div>

          {cart.map((item) => {
            const itemName = getLocalizedText(item, "name");
            const itemDescription = getLocalizedText(item, "description");

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="sm:col-span-6 flex items-center gap-4">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.mainImage}
                      alt={itemName}
                      className="w-20 h-20 rounded-lg object-cover bg-gray-100 hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-dark line-clamp-1 hover:text-primary transition-colors">
                        {itemName}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{itemDescription}</p>
                  </div>
                </div>
                <div className="sm:col-span-3 flex justify-center">
                  <div className="flex items-center border border-gray-300 rounded-full px-2 py-1">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 text-primary hover:bg-gray-100 rounded-full disabled:opacity-50"
                      disabled={item.stock !== undefined && item.stock <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 text-primary hover:bg-gray-100 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="sm:col-span-3 flex justify-end items-center gap-4">
                  <span className="font-bold text-dark">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title={t("cart.removeItem")}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border border-secondary/10">
            <h2 className="text-xl font-bold mb-6">{t("cart.orderSummary")}</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>{t("cart.subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("cart.shipping")}</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between font-bold text-xl text-dark mb-6">
              <span>{t("cart.grandTotal")}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors shadow-md active:scale-95 transform duration-100"
            >
              {t("cart.proceedToCheckout")}
            </button>
            <Link
              to="/shop"
              className="block text-center mt-4 text-sm font-bold text-secondary hover:underline"
            >
              {t("cart.continueShopping")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
