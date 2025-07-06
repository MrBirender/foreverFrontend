import React, { useContext, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/Shop/ShopContext";
import { useEffect } from "react";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const slicedArray = products.slice(0, 10);
    setLatestProducts(slicedArray);
  }, [products]);

  return (
    <div className="flex flex-col items-center gap-3 my-10">
      <div className="text-center py-8 text-3xl ">
        <Title text1={"Latest"} text2={"Collections"} />
        <p className="w-3/4 text-gray-600 m-auto text-sm  md:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* latest products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {latestProducts.map(({_id, image,name, price}, index)=> (
            <ProductItems key={index} id={_id} image={image} name={name} price={price}/>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
