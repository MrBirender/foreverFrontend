import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Home,
  About,
  Contact,
  Cart,
  Product,
  Collection,
  Login,
  Orders,
  Placeorder,
} from "./pages/index.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import Verify from './pages/Verify.jsx';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <Search/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/verify" element={<Verify />}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
