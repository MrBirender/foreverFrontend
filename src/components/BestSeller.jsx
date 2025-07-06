import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/Shop/ShopContext";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const filteredArray = products.filter(
      (product) => product.bestseller == true
    );
    setBestSellers(filteredArray.slice(0,5));
  }, [products]);
  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 text-gray-600 m-auto text-sm md:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* best seller products */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSellers.map(({_id, name, image, price}, index)=> (
            <ProductItems key={index} id={_id} name={name} image={image} price={price}/>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
