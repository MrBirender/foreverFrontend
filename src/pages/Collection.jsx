import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/Shop/ShopContext";
import ProductItems from "../components/ProductItems";
import Search from "../components/Search";

const Collection = () => {
  const { products, showSearch, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("Relevant");

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((pre) => pre.filter((item) => item !== val));
    } else {
      setCategory((pre) => [...pre, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((pre) => pre.filter((item) => item !== val));
    } else {
      setSubCategory((pre) => [...pre, val]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    const filProCopy = filterProducts.slice();

    switch (sortType) {
      case "Low-High":
        setFilterProducts(filProCopy.sort((a, b) => a.price - b.price));
        break;

      case "High-Low":
        setFilterProducts(filProCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  return (
    <div className="border-t flex flex-col sm:flex-row gap-2 sm:gap-10 pt-10">
      {/*Left side Ui or filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="py-2 flex items-center gap-2  text-xl cursor-pointer uppercase"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* categories filter */}
        <div
          className={`border border-gray-300 pl-5 mt-6 py-3 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="uppercase  font-medium mb-3">Categories</p>
          <div className="flex flex-col gap-2 text-gray-600 font-medium ">
            <p className="flex gap-2 items-center ">
              <input
                onChange={toggleCategory}
                type="checkbox"
                className="w-3"
                value={"Men"}
              />{" "}
              Men
            </p>

            <p className="flex gap-2 items-center ">
              <input
                onChange={toggleCategory}
                type="checkbox"
                className="w-3"
                value={"Women"}
              />{" "}
              Women
            </p>

            <p className="flex gap-2 items-center ">
              <input
                onChange={toggleCategory}
                type="checkbox"
                className="w-3"
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* subcatogry filter */}
        <div
          className={`border border-gray-300 pl-5 my-5 py-3 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="uppercase  font-medium mb-3">Type</p>
          <div className="flex flex-col gap-2 text-gray-600 font-medium ">
            <p className="flex gap-2 items-center ">
              <input
                onChange={toggleSubCategory}
                type="checkbox"
                className="w-3"
                value={"Topwear"}
              />{" "}
              Topwear
            </p>

            <p className="flex gap-2 items-center ">
              <input
                onChange={toggleSubCategory}
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>

            <p className="flex gap-2 items-center ">
              <input
                onChange={toggleSubCategory}
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side ui or products display */}
      <div className="flex-1">
        <div className="flex justify-between text-sm  mb-4">
          <Title text1={"All"} text2={"collections"} />
          {/*sort products */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300  my-4 sm:my-0 sm:px-2 text-sm"
          >
            <option value="Relevant">Sort by: Relavant</option>
            <option value="Low-High">Sort by: Low to High</option>
            <option value="High-Low">Sort by: High to Low</option>
          </select>
        </div>

        {/* mapping the collection */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map(({ _id, name, image, price }, index) => (
              <ProductItems
                key={index}
                id={_id}
                name={name}
                image={image}
                price={price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <h2 className="text-xl font-semibold">Out of Stock</h2>
            <p className="text-sm">
              We couldn't find any products matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
