// src/pages/Account.tsx
import React, { useEffect, useState } from "react";
import { authService } from "../api/services/authService";
import { User } from "../types";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

export const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const { showNotification } = useShop();
  const navigate = useNavigate();

  // فحص التوكن عند الدخول للصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    authService
      .getProfile()
      .then((data) => {
        setUser(data);
        setFormData({
          ...data,
          address: data.address || {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
          },
        });
      })
      .catch((err) => {
        console.error(err);
        showNotification("Failed to fetch profile", "error");
      });
  }, [navigate, showNotification]);

  // تغيير أي input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section?: "address",
  ) => {
    const { name, value } = e.target;
    if (section === "address") {
      setFormData({
        ...formData,
        address: { ...formData?.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // حفظ التعديلات
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const updatedUser = await authService.updateProfile(formData);
      setUser(updatedUser);
      setFormData(updatedUser);
      showNotification("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      showNotification("Failed to update profile", "error");
    }
  };

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  // Loading state
  if (!user || !formData.address)
    return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-4xl font-black mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-accent/30 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 p-2 mb-6">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0D8ABC&color=fff&size=128`
                }
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white font-medium">
                <span className="material-symbols-outlined">person</span> My
                Profile
              </button>
              <Link
                to="/orders"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors font-medium text-dark"
              >
                <span className="material-symbols-outlined">receipt_long</span>{" "}
                Order History
              </Link>
              <Link
                to="/settings"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors font-medium text-dark"
              >
                <span className="material-symbols-outlined">settings</span>{" "}
                Settings
              </Link>
              <Link
                to="/favorites"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors font-medium text-dark"
              >
                <span className="material-symbols-outlined">favorite</span>{" "}
                Favorites
              </Link>
            </nav>
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white transition-colors text-red-500 font-medium"
              >
                <span className="material-symbols-outlined">logout</span> Log
                Out
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-secondary/10">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-100">
            Profile Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-sm font-medium mb-1 block">
                  First Name
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium mb-1 block">
                  Last Name
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium mb-1 block">
                Email Address
              </span>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
              />
            </label>

            {/* <h2 className="text-2xl font-bold mt-8 mb-6 pb-2 border-b border-gray-100">
              Shipping Address
            </h2> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium mb-1 block">Address</span>
                <input
                  type="text"
                  name="street"
                  value={formData.address?.street || ""}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium mb-1 block">City</span>
                <input
                  type="text"
                  name="city"
                  value={formData.address?.city || ""}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium mb-1 block">State</span>
                <input
                  type="text"
                  name="state"
                  value={formData.address?.state || ""}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium mb-1 block">Zip Code</span>
                <input
                  type="text"
                  name="zip"
                  value={formData.address?.zip || ""}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium mb-1 block">Country</span>
                <input
                  type="text"
                  name="country"
                  value={formData.address?.country || ""}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full rounded-lg bg-surface-dim border-gray-200 focus:border-primary focus:ring-primary"
                />
              </label>
            </div> */}

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => setFormData(user || {})}
                className="px-6 py-3 rounded-lg bg-gray-100 font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-secondary transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
