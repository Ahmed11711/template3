import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const SignIn = () => {
  const navigate = useNavigate();
  const { showNotification } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Auth
    showNotification("Successfully signed in!");
    navigate('/account');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-surface-dim">
       <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/10 w-full max-w-md">
          <div className="text-center mb-8">
             <h1 className="text-3xl font-black text-dark mb-2">Welcome Back</h1>
             <p className="text-gray-500">Sign in to continue your shopping journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-dark mb-2">Email Address</label>
                <input type="email" required className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4" placeholder="you@example.com" />
             </div>
             <div>
                <div className="flex justify-between mb-2">
                   <label className="block text-sm font-bold text-dark">Password</label>
                   <a href="#" className="text-sm text-primary font-bold hover:underline">Forgot?</a>
                </div>
                <input type="password" required className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary h-12 px-4" placeholder="••••••••" />
             </div>
             
             <button type="submit" className="w-full bg-primary text-white h-12 rounded-lg font-bold text-lg hover:bg-secondary transition-colors shadow-md">
                Sign In
             </button>
          </form>

          <div className="mt-8 text-center">
             <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link></p>
          </div>
       </div>
    </div>
  );
};