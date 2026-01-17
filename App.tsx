import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Account } from "./pages/Account";
import { Blog } from "./pages/Blog";
import { BlogDetails } from "./pages/BlogDetails";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import Checkout from "./pages/Checkout";
import { OrderHistory } from "./pages/OrderHistory";
import { Settings } from "./pages/Settings";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <LanguageProvider>
      <ShopProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ShopProvider>
    </LanguageProvider>
  );
}

export default App;
