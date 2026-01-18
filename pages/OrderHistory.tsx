// src/pages/OrderHistory.tsx
import React, { useEffect, useState } from "react";
import { orderService } from "../api/services/orderService";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

interface Product {
  id: number;
  name_en: string;
  name_ar?: string;
  mainImage?: string;
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  product?: Product;
}

interface Order {
  id: number;
  paymentMethod: string;
  transactionNumber: string;
  walletPhone: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  subtotal: string;
  shipping: string;
  total: string;
  status: "Pending" | "Delivered" | "Processing" | "Cancelled";
  paymentProof?: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { showNotification } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    orderService
      .getOrders()
      .then(setOrders)
      .catch((err) => {
        console.error(err);
        showNotification("Failed to fetch orders", "error");
      });
  }, [navigate, showNotification]);

  if (!orders.length) {
    return (
      <div className="p-20 text-center text-gray-500">No orders found.</div>
    );
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "Pending":
        return "text-yellow-500";
      case "Processing":
        return "text-blue-600";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="mb-8">
        <Link
          to="/account"
          className="text-sm text-gray-500 hover:text-primary flex items-center gap-1 mb-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Account
        </Link>
        <h1 className="text-3xl font-black text-dark">Order History</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-secondary/10 rounded-xl shadow-sm overflow-hidden"
          >
            {/* معلومات الطلب */}
            <div className="bg-surface-dim px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-8 flex-wrap">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Order Placed
                  </div>
                  <div className="font-medium text-dark">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Total
                  </div>
                  <div className="font-medium text-dark">${order.total}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Ship To
                  </div>
                  <div className="font-medium text-primary hover:underline cursor-pointer">
                    {order.customerFirstName} {order.customerLastName}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Order # {order.id}
                </div>
                <div className="text-sm font-bold text-secondary hover:underline cursor-pointer">
                  View Details
                </div>
              </div>
            </div>

            {/* حالة الطلب */}
            <div className="p-6">
              <h3
                className={`font-bold text-lg mb-4 flex items-center gap-2 ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status === "Delivered" ? (
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    local_shipping
                  </span>
                )}
                {order.status}
              </h3>

              {/* العناصر */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-white font-bold text-lg">
                      {item.product?.mainImage ? (
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name_en}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        item.product?.name_en?.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product_id}`}
                        className="font-bold text-dark hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.product?.name_en || `Product #${item.product_id}`}
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price}
                      </p>
                      <button className="text-sm text-primary font-bold hover:underline mt-1">
                        Buy it again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* المجموع */}
              <div className="mt-6 text-right font-bold text-dark">
                Subtotal: ${order.subtotal} <br />
                Shipping: ${order.shipping} <br />
                Total: ${order.total}
              </div>

              {/* إثبات الدفع
              {order.paymentProof && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    Payment Proof
                  </div>
                  <img
                    src={`http://127.0.0.1:8000/storage/${order.paymentProof}`}
                    alt="Payment Proof"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
