import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import ProductItems from "./ProductItems";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (product) => product.category === category
      );
      productsCopy = productsCopy.filter(
        (product) => product.subCategory === subCategory
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {related?.map(({ _id, image, name, price }, index) => (
        <ProductItems
          key={index}
          id={_id}
          name={name}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
