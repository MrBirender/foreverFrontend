import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchData = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductData(product);
        setImage(product.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [productId, products]);
  return productData ? (
    <div className=" border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product image and description */}
      <div className=" flex flex-col sm:flex-row gap-12">
        {/* product Images */}
        <div className=" w-full sm:w-1/2 flex flex-col-reverse sm:flex-row  gap-3">
          <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll  justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                src={img}
                alt={`img${index}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="image" />
          </div>
        </div>

        {/* product description */}
        <div className=" flex-1 flex flex-col gap-5 mt-3">
          <h1 className="text-lg font-medium sm:text-2xl">
            Men Round Neck Pure Cotton T-shirt
          </h1>
          <div className="flex items-center gap-1">
            <img className="w-3" src={assets.star_icon} alt="star" />
            <img className="w-3" src={assets.star_icon} alt="star" />
            <img className="w-3" src={assets.star_icon} alt="star" />
            <img className="w-3" src={assets.star_icon} alt="star" />
            <img className="w-3" src={assets.star_dull_icon} alt="star" />
            <p className="pl-2 text-gray-500">(122)</p>
          </div>
          <p className="text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-500 w-full max-w-[500px]">
            {productData.description}
          </p>
          <p className="mt-3">Select Size</p>
          <div className="flex gap-2 ">
            {productData.sizes.map((item, index) => (
              <button
                onClick={() => setSize(item)}
                key={index}
                className={`h-10 w-10 flex justify-center items-center bg-gray-100 border ${
                  size === item ? "border-orange-500" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button onClick={()=> addToCart(productData._id, size)} className="bg-black active:bg-gray-700 hover:scale-105 transition-all duration-300 text-white px-4 py-2 w-fit mt-4">
            ADD TO CART
          </button>
          <hr className="mt-5" />
          <p className="text-gray-500 text-sm w-full max-w-[300px]">
            100% Original product. <br /> Cash on delivery is available on this
            product. Easy return and exchange policy within 7 days
          </p>
        </div>
      </div>

      {/* description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border py-2 px-4 outline-none border-gray-300">
            Description
          </b>
          <p className="border py-2 px-4 outline-none border-gray-300">
            Reviews (122)
          </p>
        </div>
        <div className="border border-gray-300 py-6 text-sm sm:text-base px-3 leading-relaxed sm:px-6 w-full text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <br />
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-10 sm:mt-20 ">
        <div className="text-center mb-4">
          <Title text1={"related"} text2={"products"} />
        </div>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
