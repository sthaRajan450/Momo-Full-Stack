import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  decrement,
  increment,
  removeFromCart,
} from "../redux/features/cartSlice";
import { createOrder } from "../api/order.services";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();

  const foods = cart.map((food) => ({
    foodId: food._id,
    quantity: food.quantity,
  }));

  const dispatch = useDispatch();
  // Calculate total price
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleOrder = async () => {
    const res = await createOrder({ foods });
    if (res.success) {
      navigate("/payment", {
        state: { total_amount: subtotal, orderId: res.order._id },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Your Cart</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id || item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm gap-4"
              >
                {/* Image & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800 text-lg">
                      {item.name}
                    </h2>
                    <p className="text-amber-600 font-semibold text-sm">
                      RS. {item.price}
                    </p>
                  </div>
                </div>

                {/* Controls & Delete */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => {
                        dispatch(decrement(item._id));
                      }}
                      type="button"
                      className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-slate-800 font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        dispatch(increment(item._id));
                      }}
                      type="button"
                      className="px-3 py-1 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal & Action */}
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-800 text-sm hidden sm:inline">
                      RS. {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(item._id));
                      }}
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>

            <div className="space-y-2 border-b border-slate-100 pb-4 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">
                  RS. {subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-slate-900 pt-1">
              <span>Total</span>
              <span>RS. {subtotal}</span>
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-slate-900 hover:bg-amber-500 text-white font-semibold py-3.5 rounded-xl shadow-sm transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
          <p className="text-lg font-medium text-slate-600 mb-1">
            Your cart is empty
          </p>
          <p className="text-slate-400 text-sm mb-6">
            Looks like you haven't added any foods yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-slate-900 hover:bg-amber-500 text-white font-medium px-6 py-2.5 rounded-xl transition-colors duration-200 text-sm"
          >
            Explore Menu
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
