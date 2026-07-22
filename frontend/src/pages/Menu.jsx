import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../api/food.services";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

const Menu = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);
  const navigate = useNavigate();
  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="flex items-center space-x-3 text-slate-600">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto my-8 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
        <p className="text-red-600 font-medium">
          Failed to load menu: {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  const foods = data?.foods || [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Our Menu
      </h1>

      {foods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  onClick={() => {
                    navigate(`/menu/${food._id}`);
                  }}
                  src={food.photo}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h2 className="text-lg font-bold text-slate-800 line-clamp-1">
                    {food.name}
                  </h2>
                  <span className="shrink-0 bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg text-sm border border-amber-200">
                    RS. {food.price}
                  </span>
                </div>

                <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">
                  {food.description}
                </p>

                <button
                  onClick={() => {
                    dispatch(addToCart(food));
                  }}
                  className="w-full mt-auto bg-slate-900 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">
            No items available in the menu right now.
          </p>
        </div>
      )}
    </section>
  );
};

export default Menu;
