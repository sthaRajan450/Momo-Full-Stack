import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import { getCurrentUser } from "../api/auth.services";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/features/authSlice";
import Payment from "../pages/Payment";
import Success from "../pages/Success";

const MenuDetails = lazy(() => import("../pages/MenuDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Menu = lazy(() => import("../pages/Menu"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  const dispatch = useDispatch();

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await getCurrentUser();
        if (res?.user) {
          dispatch(setAuth(res.user));
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    checkUserAuth();
  }, [dispatch]);

  if (isInitializing) {
    return <p>Initializing App...</p>;
  }

  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
