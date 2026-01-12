import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const Settings = () => {
  const { showNotification } = useShop();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const handleSave = () => {
    showNotification('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
       <div className="mb-8">
          <Link to="/account" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-2">
             <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Account
          </Link>
          <h1 className="text-3xl font-black text-dark">Account Settings</h1>
       </div>

       <div className="space-y-8">
          {/* Notifications */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-secondary/10">
             <h2 className="text-xl font-bold mb-4">Notifications</h2>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-500">Receive updates about your order status and promotions.</div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                   </label>
                </div>
                <div className="flex items-center justify-between">
                   <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-gray-500">Receive shipping updates via text message.</div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                   </label>
                </div>
             </div>
          </section>

          {/* Security */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-secondary/10">
             <h2 className="text-xl font-bold mb-4">Security</h2>
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium mb-1">Current Password</label>
                   <input type="password" className="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input type="password" className="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input type="password" className="w-full rounded-lg border-gray-200 focus:border-primary focus:ring-primary" />
                   </div>
                </div>
                <button className="text-primary font-bold text-sm hover:underline">Change Password</button>
             </div>
          </section>

          <div className="flex justify-end">
             <button onClick={handleSave} className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-colors shadow-md">Save Changes</button>
          </div>
       </div>
    </div>
  );
};