import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
