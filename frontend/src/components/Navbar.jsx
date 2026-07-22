import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { logout } from "../redux/features/authSlice";
import { logoutUser } from "../api/auth.services";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const linkStyles = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Logo/Brand Section */}
      <h2 className="text-xl font-bold tracking-tight text-gray-900">logo</h2>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-2">
        <NavLink to="/" className={linkStyles}>
          Home
        </NavLink>
        <NavLink to="/menu" className={linkStyles}>
          Menu
        </NavLink>
        <NavLink to="cart" className={linkStyles}>
          Cart
        </NavLink>

        {user && isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-xl active:scale-90 text-white"
          >
            Logout
          </button>
        ) : (
          <>
            {" "}
            <NavLink to="/login" className={linkStyles}>
              Login
            </NavLink>
            {/* Styled SignUp slightly differently to make it look like a primary button */}
            <NavLink
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
