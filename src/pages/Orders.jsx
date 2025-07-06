import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
const Orders = () => {
  const { currency, token, backendUrl } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  /* GETTING ORDERS FROM DATABASE */
  const fetchOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      /* if not passing the empty object or null because request has a vaild structure in the post 
       request then it will give error. */
      if (response.data.success) {
        let orderItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["data"] = order.date;
            orderItems.push(item);
            orderItems.reverse();
            
          });
          
        });
        setOrders(orderItems);
        console.log(orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"My"} text2={"orders"} />
      </div>

      <div>
        {orders.map((product, index) => (
          <div
            key={index}
            className="border-t gap-6 mb-3 sm:mb-6 border-b py-4 text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center  "
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={product.image && product.image[0]}
                alt="product"
                key={index}
              />
              <div>
                <p className="text-xs sm:text-[16px] font-semibold">{product.name}</p>
                <div className="flex flex-col mt-1  gap-2">
                  <div className="flex items-center gap-3 mt-1 text-base  ">
                    <p>
                      {currency}
                      <span className="font-medium">{` ${product.price}`}.00</span>
                    </p>
                    <p ><span className="font-medium">Quantity:</span> {product.quantity}</p>
                    <p><span className="font-medium">Size:</span> {product.size}</p>
                  </div>
                  <p>
                    Date:{" "}
                    <span className="ml-2 text-gray-500">{new Date(product.date).toDateString()}</span>
                  </p>
                  <p>Payment: <span className="ml-2 text-gray-500"> {product.paymentMethod}</span> </p>
                </div>
              </div>
            </div>

            {/* center input */}

            <div className="flex flex-col sm:flex-row gap-5 w-1/2 justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2.5 h-2.5 border rounded-full bg-green-500"></p>
                <p className="text-base font-medium">{product.status}</p>
              </div>
              <button onClick={fetchOrders} className="border text-sm py-2 px-4 font-medium hover:scale-105 hover:bg-black hover:text-white">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
