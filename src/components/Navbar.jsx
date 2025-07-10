import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/Shop/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, setToken, token, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-28 sm:w-36 bg-pink-100" alt="logo" />
      </Link>

      <ul className="hidden sm:flex items-center  gap-5">
        <NavLink to={"/"} className="flex flex-col items-center  gap-1">
          <p>HOME</p>
          <hr className="bg-red-700 w-1/2 h-[1.5px] border-none opacity-0 " />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="bg-red-700 w-2/4 h-[1.5px] border-none opacity-0  " />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="bg-red-700 w-2/4 h-[1.5px] border-none opacity-0 " />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="bg-red-700 w-2/4 h-[1.5px] border-none opacity-0  " />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <Link to="/collection">
          <img
            onClick={() => setShowSearch(true)}
            className="w-5 cursor-pointer"
            src={assets.search_icon}
            alt="search"
          />
        </Link>

        <div className="group realtive">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
          />

          {/* logout icon on hover */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu pt-4 right-32">
              <div className="w-36 flex flex-col gap-2 py-3 px-5  bg-slate-100 text-slate-600 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />
          <p className="absolute bottom-[-5px] right-[-5px] w-4 text-center rounded-full bg-black text-[9px] aspect-square leading-4 text-white">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-6 sm:hidden "
          alt="menu"
        />
      </div>

      {/* sidebar for mobile menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex cursor-pointer items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown-icon "
              className="   text-black h-4 rotate-180"
            />
            <p className=" text-black text-lg">Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
