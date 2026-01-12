
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <span className="material-symbols-outlined text-6xl text-gray-300">shopping_cart_off</span>
        </div>
        <h1 className="text-3xl font-bold text-dark mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-4xl font-black text-dark mb-8">Your Cart ({cart.length} items)</h1>
       
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
             {/* Header Row */}
             <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-gray-200 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
             </div>

             {cart.map(item => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                   <div className="sm:col-span-6 flex items-center gap-4">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100 hover:opacity-80 transition-opacity" />
                      </Link>
                      <div>
                         <Link to={`/product/${item.id}`}>
                            <h3 className="font-bold text-dark line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
                         </Link>
                         <p className="text-sm text-gray-500">{item.color || 'Default'}, {item.size || 'M'}</p>
                      </div>
                   </div>
                   <div className="sm:col-span-3 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-full px-2 py-1">
                         <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 text-primary hover:bg-gray-100 rounded-full disabled:opacity-50"
                            disabled={item.quantity <= 1}
                         >-</button>
                         <span className="w-8 text-center font-medium">{item.quantity}</span>
                         <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 text-primary hover:bg-gray-100 rounded-full"
                         >+</button>
                      </div>
                   </div>
                   <div className="sm:col-span-3 flex justify-end items-center gap-4">
                      <span className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border border-secondary/10">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                   <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                   <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                   <div className="flex justify-between items-center text-gray-600">
                      <span>Promo Code</span>
                      <button className="text-secondary text-sm font-bold hover:underline">Add code</button>
                   </div>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold text-xl text-dark mb-6"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors shadow-md active:scale-95 transform duration-100"
                >
                    Proceed to Checkout
                </button>
                <Link to="/shop" className="block text-center mt-4 text-sm font-bold text-secondary hover:underline">Continue Shopping</Link>
             </div>
          </div>
       </div>
    </div>
  );
};
