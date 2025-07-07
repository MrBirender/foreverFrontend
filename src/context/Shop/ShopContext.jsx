import { createContext, useEffect, useState } from "react";
// import { products } from "../../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/apiConfig";

export const  ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  1;
  const currency = "₹";
  const deliveryFee = 10;
  const [token, setToken] = useState("");
  // const backendUrl = API_BASE_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  /* getting data from beckend: */
  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);

        // console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCartData(localStorage.getItem("token"));
    }
  });

  /* handling all cart functions */
  const addToCart = async (itemId, size) => {
    if (!size) {
      return toast.error("Please select a size");
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    /* calling api and cart to the database */
    if (token) {
      try {
        const response = await api.post(
          "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    /* cheking if the quantity  is zero: then removing the item from the cart */
    if (quantity === 0) {
      delete cartData[itemId][size];

      /* the one product id is storing the data of more than one sizes, so if one size is removed compeltely and there
    is no more size left then delete the whole product */

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await api.put(
          "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // updating cart from the server:
  const getCartData = async (token) => {
    try {
      const response = await api.get(
        "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartTotal = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartTotal,
    navigate,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
