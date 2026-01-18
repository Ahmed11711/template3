import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import axios from "axios";

export const SignIn = () => {
  const navigate = useNavigate();
  const { showNotification } = useShop();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // استدعاء API تسجيل الدخول
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // مثال: تخزين الـ token في localStorage
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      showNotification("Successfully signed in!");
      navigate("/account");
    } catch (err: any) {
      // عرض رسالة الخطأ من الباك اند إذا متوفرة
      const message =
        err.response?.data?.message || "Failed to sign in. Please try again.";
      showNotification(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-surface-dim">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-dark mb-2">Welcome Back</h1>
          <p className="text-gray-500">
            Sign in to continue your shopping journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-dark mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-bold text-dark">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary font-bold hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white h-12 rounded-lg font-bold text-lg hover:bg-secondary transition-colors shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
