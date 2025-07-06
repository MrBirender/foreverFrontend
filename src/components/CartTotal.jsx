import React, { useContext } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, deliveryFee, getCartTotal } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"cart"} text2={"totals"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p className="text-base">Subtotal</p>
          <p>
            {currency} {" "}
            {getCartTotal()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="text-base">Shipping Fee</p>
          <p>
            {currency} {" "}
            {deliveryFee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-base">
          <p>Total</p>
          <p>
            {currency} {" "}
            {getCartTotal() === 0 ? 0 : getCartTotal() + deliveryFee}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
