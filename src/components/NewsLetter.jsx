import React from "react";

const NewsLetter = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className="text-center mt-12">
      <p className="font-medium text-xl sm:text-2xl ">Subscribe now & get 20% off</p>
      <p className="mt-3 text-gray-400 text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form className="w-full sm:w-1/2 mx-auto flex items-center  mt-6  pl-3 ">
        <input required type="email" placeholder="Enter your email" className="w-full sm:flex-1  border outline-none border-gray-400 py-3 px-4"/>
        <button onClick={onSubmitHandler} type="submit " className="bg-black border border-black text-white py-3 px-8">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetter;
