import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-green-400">PasteShare</h1>
          <div className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg hover:text-green-400 transition duration-300 ${
                  isActive ? "text-green-500 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/paste"
              className={({ isActive }) =>
                `text-lg hover:text-green-400 transition duration-300 ${
                  isActive ? "text-green-500 font-semibold" : ""
                }`
              }
            >
              My Paste
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
