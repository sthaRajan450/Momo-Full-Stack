import React from "react";
import { useSearchParams, Link } from "react-router";
import { getOrder } from "../api/order.services";
import { useQuery } from "@tanstack/react-query";

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !data?.order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
            ✕
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">
            We couldn't retrieve the order details. Please check your order link.
          </p>
          <Link
            to="/"
            className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const order = data.order;

  // Calculate order total from items
  const subtotal = order.foods.reduce(
    (sum, item) => sum + Number(item.foodId.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Banner Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-sm">
            Thank you for your order. We're getting it ready for you.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wide border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Payment Status: {order.paymentStatus}
          </div>
        </div>

        {/* Details & Items Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Order Meta Header */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Order ID
              </p>
              <p className="text-sm font-mono font-semibold text-gray-700">
                #{order._id}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Customer
              </p>
              <p className="text-sm font-medium text-gray-700">
                {order.userId?.fullName || "Guest"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Date
              </p>
              <p className="text-sm font-medium text-gray-700">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="p-6 divide-y divide-gray-100">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Items Ordered
            </h2>
            {order.foods.map((item) => (
              <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                <img
                  src={item.foodId.photo}
                  alt={item.foodId.name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {item.foodId.name}
                  </h3>
                  <p className="text-xs text-gray-400 capitalize">
                    {item.foodId.category}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Rs. {item.foodId.price} × {item.quantity}
                  </p>
                </div>
                <div className="text-right font-semibold text-gray-900 text-sm">
                  Rs. {(Number(item.foodId.price) * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary / Total Section */}
          <div className="bg-gray-50/50 p-6 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-emerald-600 font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total Amount</span>
              <span className="text-emerald-600">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Back Actions */}
        <div className="flex justify-center pt-2">
          <Link
            to="/"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Success;