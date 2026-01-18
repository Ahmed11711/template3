import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const { showNotification } = useShop();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // استدعاء API إنشاء الحساب
      const response = await axios.post(
        "https://ecommerc.zayamrock.com/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
      );

      const { token, user } = response.data;

      // حفظ التوكن وبيانات المستخدم
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // showNotification("تم إنشاء الحساب بنجاح!");
      navigate("/account");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "فشل إنشاء الحساب. حاول مرة أخرى.";
      showNotification(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-surface-dim">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-dark mb-2">إنشاء حساب</h1>
          <p className="text-gray-500">انضم الآن للاستفادة من عروضنا الحصرية</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                الاسم الأول
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                اسم العائلة
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-dark mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
              className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-dark mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white h-12 rounded-lg font-bold text-lg hover:bg-secondary transition-colors shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link
              to="/signin"
              className="text-primary font-bold hover:underline"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
