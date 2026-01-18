import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";
import logoUrl from "../assets/Al+Wafer+Mall+Logo+-+Variation+2.png";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cart } = useShop();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-surface/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoUrl}
              alt="Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-110"
            />

            <span className="text-xl font-bold tracking-tight text-primary">
              AL Wafer Mall
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: "/", label: t("navigation.home") },
              { to: "/shop", label: t("navigation.shop") },
              { to: "/blog", label: t("navigation.insights") },
              { to: "/about", label: t("navigation.about") },
              { to: "/contact", label: t("navigation.contact") },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-primary font-bold"
                    : "text-dark hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="inline-flex border rounded overflow-hidden text-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 cursor-pointer transition-colors ${
                  language === "en"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-dark hover:bg-gray-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 cursor-pointer transition-colors ${
                  language === "ar"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-dark hover:bg-gray-200"
                }`}
              >
                AR
              </button>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 hover:bg-accent rounded-full text-dark transition-colors relative"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cart.length > 0 && (
                <span
                  className="absolute top-0 h-4 w-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{
                    [language === "ar" ? "left" : "right"]: "0",
                  }}
                >
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="p-2 hover:bg-accent rounded-full text-dark transition-colors"
            >
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-surface border-t border-secondary/10 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">Elegance</h3>
              <p className="text-sm text-gray-500">
                {t("footer.timelessFashion")}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-md mb-4">{t("navigation.shop")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/shop" className="hover:text-primary">
                    {t("footer.newArrivals")}
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-primary">
                    {t("footer.bestSellers")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-md mb-4">{t("footer.support")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/faq" className="hover:text-primary">
                    {t("navigation.faq")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary">
                    {t("navigation.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-md mb-4">{t("footer.followUs")}</h3>
              <div className="flex space-x-4 text-gray-400">
                <span>FB</span>
                <span>IG</span>
                <span>TW</span>
              </div>
            </div>
          </div>
          <div className="border-t border-secondary/10 mt-8 pt-6 text-center text-xs text-gray-400">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
};
