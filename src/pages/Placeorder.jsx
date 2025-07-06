import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/Shop/ShopContext";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const {
    backendUrl,
    navigate,
    token,
    cartItems,
    setCartItems,
    products,
    deliveryFee,
    getCartTotal,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const initPay = (order) => {
    const options = {
      key: "pk_test_51QfhfARrAfXfEhJPxK0s5qdb46l1fCkcnrdLZbzA3DS719hW6ebfrOxtaI5hf7RH3dRFlDYB3IubqxagD8zVXAzW00YrDIs91o",
      amount: order.amount,
      currency: order.currency,
      name: "order payment",
      description: "order payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyrazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
            console.log('payment success');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const orderItems = [];

      /* filterd products from mainstock of products and added to orderitems */
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }

      /* createing orderdata */
      let orderdata = {
        items: orderItems,
        amount: getCartTotal() + deliveryFee,
        address: formData,
      };

      /* adding switch cases to check the mode of payment */
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderdata,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderdata,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderdata,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            // console.log(responseRazorpay.data.order);
            initPay(responseRazorpay.data.order);
          }

          break;
        default:
          break;
      }

      console.log(orderItems);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col pt-20 border-t sm:flex-row justify-between gap-5 sm:gap-14 min-h-[80vh]"
    >
      {/* left side container */}
      <div className="flex flex-col gap-4 w-full max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"delivery"} text2={"information"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            value={formData.firstName}
            name="firstName"
            className="border border-gray-300 px-3.5 py-2 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={handleChange}
            value={formData.lastName}
            name="lastName"
            className="border border-gray-300 px-3.5 py-2 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={handleChange}
          value={formData.email}
          name="email"
          className="border border-gray-300 px-3.5 py-2 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={handleChange}
          value={formData.street}
          name="street"
          className="border border-gray-300 px-3.5 py-2 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            value={formData.city}
            name="city"
            className="border border-gray-300 px-3.5 py-2 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={handleChange}
            value={formData.state}
            name="state"
            className="border border-gray-300 px-3.5 py-2 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={handleChange}
            value={formData.zipcode}
            name="zipcode"
            className="border border-gray-300 px-3.5 py-2 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={handleChange}
            value={formData.country}
            name="country"
            className="border border-gray-300 px-3.5 py-2 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={handleChange}
          value={formData.phone}
          name="phone"
          className="border border-gray-300 px-3.5 py-2 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* right side container */}
      <div className="mt-8">
        <div className="mt-8 min-w-96">
          <CartTotal />
        </div>

        <div className="text-lg my-6">
          <Title text1={"payment"} text2={"method"} />
          <div className="flex gap-4 flex-col sm:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border px-3 py-2 "
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="stripe" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border px-3 py-2 "
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="razarpay"
                className="h-5 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border px-3 py-2 "
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="mx-4">Cash on Delivery</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black border border-black text-white py-3 px-8 "
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
