import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { search, setSearch, showSearch, setShowSearch } =useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(()=> {
    if(location.pathname.includes('collection')){
        setVisible(true)
    }else{
        setVisible(false)
    }
  },[location])


  return  showSearch  &&  visible? (
    <div className="bg-gray-50 text-center border-t border-b">
      <div className="rounded-full inline-flex items-center justify-center border border-gray-400 py-2 px-5 mx-3 my-5 w-2/3 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit  text-sm "
        />
        <img className="h-4" src={assets.search_icon} alt="serach_icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="w-3 inline cursor-pointer"
        src={assets.cross_icon}
        alt="cross_icon"
      />
    </div>
  ) : null;
};

export default Search;
