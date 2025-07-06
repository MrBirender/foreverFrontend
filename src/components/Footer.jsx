import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-10 sm:mt-28 ">
        <div>
          <img className="w-32 mb-5" src={assets.logo} alt="logo" />
          <p className="text-sm text-gray-500 w-full md:w-2/3 leading">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="font-medium text-xl uppercase mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-xl uppercase mb-5">get in touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9991239813</li>
            <li>dev.birender@gmail.com</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div className="">
        <hr />
        <p className="text-center  py-5 text-sm">
          Copyright 2024@ birender.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
