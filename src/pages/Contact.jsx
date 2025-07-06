import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div className="border-t py-16">
      <div className="text-xl text-center sm:text-2xl mt-3">
        <Title text1={"contact"} text2={"us"} />
      </div>
      <div className="flex flex-col md:justify-center md:flex-row gap-10 mt-8">
        <img
          src={assets.contact_img}
          alt="contact_img"
          className="w-full md:max-w-[450px]"
        />
        <div className="text-gray-600 flex flex-col gap-6">
          <b className="text-gray-900 text-xl">Our Store</b>
          <p>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p>
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>

          <b className="capitalize text-gray-900">Carrers options with us</b>
          <p>Learn more about our teams and job opening</p>

          <button className=" border border-black text-black py-3 px-8 w-fit">
            Explore Jobs
          </button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Contact;
