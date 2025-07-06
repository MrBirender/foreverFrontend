import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartTotal } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const handleCheckout = ()=> {
    if(getCartTotal() === 0){
      toast.error('Your cart is empty.')
    }
    else{
      navigate('/place-order')
    }
  }

  useEffect(() => {
    const tempData = [];
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"your"} text2={"cart"} />
      </div>

      {/* cart items */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => item._id === product._id
          );
          return (
            <div
              key={index}
              className="border-t border-b py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]  items-center gap-4"
            >
              <div className="flex  items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt="product"
                  key={index}
                />
                <div>
                  <p className="text-xs sm:text-sm font-medium">
                    {productData.name}
                  </p>
                  <div className="flex mt-2 items-center gap-4">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border-2 border-slate-200">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* center input */}

              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 py-0.5 sm:py-1 leading-none sm:px-2  "
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => {
                  updateQuantity(item._id, item.size, 0);
                }}
                className="w-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="bin-icon"
              />
            </div>
          );
        })}
      </div>

      {/* {cart total} */}
      <div className="flex  justify-end my-20">
        <div className=" w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end  mt-8">
            <button onClick={handleCheckout} className="bg-black text-white py-2 px-3 sm:px-4">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
