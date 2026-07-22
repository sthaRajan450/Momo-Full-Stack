import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { getFood } from "../api/food.service";
import { useDispatch } from "react-redux";
import { decrement } from "../redux/features/cartSlice";

const MenuDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["food", id],
    queryFn: () => getFood(id),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex items-center space-x-3 text-slate-600">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-lg mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <h2 className="text-xl font-bold text-red-700 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-red-600 mb-6">
          {error?.message || "Could not fetch item details."}
        </p>
        <Link
          to="/menu"
          className="inline-block bg-red-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  const food = data?.food;

  if (!food) {
    return (
      <div className="max-w-lg mx-auto my-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center">
        <p className="text-slate-600 font-medium">Item not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Back Link */}
      <Link
        to="/menu"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        ← Back to Menu
      </Link>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        {/* Food Image */}
        <div className="relative h-72 md:h-full min-h-[300px] w-full bg-slate-100 rounded-2xl overflow-hidden">
          <img
            src={food.photo}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Food Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-3xl font-extrabold text-slate-900">
                {food.name}
              </h1>
              <span className="shrink-0 bg-amber-50 text-amber-700 text-xl font-bold px-3 py-1.5 rounded-xl border border-amber-200">
                RS. {food.price}
              </span>
            </div>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {food.description}
            </p>
          </div>

          {/* Interactive Actions */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Quantity
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(decrement(food._id));
                  }}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-slate-800 font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button className="w-full bg-slate-900 hover:bg-amber-500 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-sm transition-colors duration-200">
              Add {quantity} to Order • RS. {food.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
