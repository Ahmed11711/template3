import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { orderService } from "../api/services/orderService";

export const Checkout = () => {
  const { cart, clearCart } = useShop();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [walletPhone, setWalletPhone] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);

    try {
      const form = e.currentTarget;
      const shippingInfo = {
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        firstName: (form.elements.namedItem("firstName") as HTMLInputElement)
          .value,
        lastName: (form.elements.namedItem("lastName") as HTMLInputElement)
          .value,
        address: (form.elements.namedItem("address") as HTMLInputElement).value,
        city: (form.elements.namedItem("city") as HTMLInputElement).value,
        state: (form.elements.namedItem("state") as HTMLInputElement).value,
        zip: (form.elements.namedItem("zip") as HTMLInputElement).value,
      };

      const payload = {
        paymentMethod,
        transactionNumber,
        walletPhone,
        shippingInfo,
        subtotal,
        shipping,
        total,
        cart,
      };

      // ابعت البيانات + صورة واحدة حقيقية
      const result = await orderService.createOrder(
        payload,
        paymentProof || undefined,
      );

      console.log("Order created:", result);
      setIsSuccess(true);
      clearCart();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-green-600">
            check_circle
          </span>
        </div>
        <h1 className="text-4xl font-black text-dark mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you for your purchase. Your order has been received.
        </p>
        <Link
          to="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        Your cart is empty.{" "}
        <Link to="/shop" className="text-primary underline">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-dark mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Shipping */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-secondary/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">
                  1
                </span>
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Zip
                    </label>
                    <input
                      type="text"
                      name="zip"
                      required
                      className="w-full rounded-lg border-gray-200 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-secondary/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">
                  2
                </span>
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                  />
                  Bank Transfer
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "wallet"}
                    onChange={() => setPaymentMethod("wallet")}
                  />
                  Electronic Wallets
                </label>
              </div>

              {(paymentMethod === "bank" || paymentMethod === "wallet") && (
                <div className="mt-6 space-y-4">
                  {/* عرض التفاصيل حسب طريقة الدفع */}
                  {paymentMethod === "bank" && (
                    <div className="bg-gray-50 p-4 rounded text-sm">
                      <p>
                        <b>Bank Name:</b> National Bank
                      </p>
                      <p>
                        <b>Account Number:</b> 123456789
                      </p>
                      <p>
                        <b>Account Name:</b> Elegance Store
                      </p>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="bg-gray-50 p-4 rounded text-sm">
                      <p>
                        <b>Wallet Number:</b> 01000000000
                      </p>
                      <p>Supports: Fawry – Zain Cash – Bankak</p>
                    </div>
                  )}

                  {/* رفع الصورة */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setPaymentProof(e.target.files?.[0] || null)
                    }
                    className="w-full"
                  />
                </div>
              )}
            </section>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg sticky top-24 border border-secondary/10">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="max-h-60 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.mainImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-bold line-clamp-1">{item.name_en}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-dark mt-4 pt-4 border-t border-gray-100">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isProcessing}
            className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors flex justify-center items-center"
          >
            {isProcessing ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
