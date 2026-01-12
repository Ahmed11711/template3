import React, { useEffect, useState } from 'react';
import { orderService } from '../api/services/orderService';
import { Order } from '../types';
import { Link } from 'react-router-dom';

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    orderService.getOrders().then(setOrders);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
       <div className="mb-8">
          <Link to="/account" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-2">
             <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Account
          </Link>
          <h1 className="text-3xl font-black text-dark">Order History</h1>
       </div>

       <div className="space-y-6">
          {orders.map(order => (
             <div key={order.id} className="bg-white border border-secondary/10 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-surface-dim px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
                   <div className="flex gap-8">
                      <div>
                         <div className="text-xs text-gray-500 uppercase tracking-wide">Order Placed</div>
                         <div className="font-medium text-dark">{order.date}</div>
                      </div>
                      <div>
                         <div className="text-xs text-gray-500 uppercase tracking-wide">Total</div>
                         <div className="font-medium text-dark">${order.total.toFixed(2)}</div>
                      </div>
                      <div>
                         <div className="text-xs text-gray-500 uppercase tracking-wide">Ship To</div>
                         <div className="font-medium text-primary hover:underline cursor-pointer">Me</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Order # {order.id}</div>
                      <div className="text-sm font-bold text-secondary hover:underline cursor-pointer">View Details</div>
                   </div>
                </div>
                <div className="p-6">
                   <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      {order.status === 'Delivered' ? <span className="material-symbols-outlined text-green-600">check_circle</span> : <span className="material-symbols-outlined text-blue-600">local_shipping</span>}
                      {order.status}
                   </h3>
                   <div className="space-y-4">
                      {order.items.map((item, idx) => (
                         <div key={idx} className="flex gap-4 items-start">
                            <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                               <Link to={`/product/${item.id}`} className="font-bold text-dark hover:text-primary transition-colors line-clamp-1">{item.name}</Link>
                               <p className="text-sm text-gray-600 mb-2">Qty: {item.quantity}</p>
                               <button className="text-sm text-primary font-bold hover:underline">Buy it again</button>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};