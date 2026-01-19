import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useLanguage } from "../context/LanguageContext";
import logoUrl from "../assets/Al+Wafer+Mall+Logo+-+Variation+2.png";
import {
  FaTiktok,
  FaGoogle,
  FaTelegramPlane,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cart } = useShop();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ================= Header ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-surface/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Left (Menu + Logo) */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoUrl}
                alt="Logo"
                className="w-14 h-14 md:w-16 md:h-16 object-contain transition-transform group-hover:scale-110"
              />

              <span className="text-xl font-bold tracking-tight text-primary">
                AL Wafer Mall
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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
            {/* Desktop Language */}
            <div className="hidden md:flex border rounded overflow-hidden text-sm">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 transition-colors ${
                  language === "en"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 transition-colors ${
                  language === "ar"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                AR
              </button>
            </div>

            {/* Login / Account (Always visible) */}
            <Link
              to="/account"
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">person</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 hover:bg-accent rounded-full transition-colors relative"
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
          </div>
        </div>

        {/* ================= Mobile Menu ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-t border-secondary/10">
            <nav className="flex flex-col px-4 py-4 gap-4">
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-dark hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded ${
                    language === "en" ? "bg-primary text-white" : "bg-gray-100"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ar")}
                  className={`px-3 py-1 rounded ${
                    language === "ar" ? "bg-primary text-white" : "bg-gray-100"
                  }`}
                >
                  AR
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ================= Main ================= */}
      <main className="flex-grow">{children}</main>

      {/* ================= Footer (ORIGINAL) ================= */}
      <footer className="bg-surface border-t border-secondary/10 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">
                AL Wafer Mall
              </h3>
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
              <div>
                <h3 className="font-bold text-md mb-4">
                  {t("footer.followUs")}
                </h3>

                <div className="flex items-center gap-4">
                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@alwafer.mall?_r=1&_t=ZS-93BDzPI3Pnd"
                    aria-label="TikTok"
                    className="text-[#000000] hover:scale-110 transition-transform text-xl p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaTiktok />
                  </a>

                  {/* Google */}
                  <a
                    href="https://template3-sepia-three.vercel.app/"
                    aria-label="Google"
                    className="text-[#DB4437] hover:scale-110 transition-transform text-xl p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaGoogle />
                  </a>

                  {/* Telegram */}
                  <a
                    href="#"
                    aria-label="Telegram"
                    className="text-[#229ED9] hover:scale-110 transition-transform text-xl p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaTelegramPlane />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/187AtQ9uNy/"
                    aria-label="Facebook"
                    className="text-[#1877F2] hover:scale-110 transition-transform text-xl p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaFacebookF />
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/alwafer_mall?igsh=MXVkdGI4NXVqcTZwdA=="
                    aria-label="Instagram"
                    className="text-[#E1306C] hover:scale-110 transition-transform text-xl p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaInstagram />
                  </a>
                  {/* ================= WhatsApp Floating Button ================= */}
                  <a
                    href="https://wa.me/+249925048038" // ضع رقمك هنا
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={28} />
                  </a>
                </div>
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
