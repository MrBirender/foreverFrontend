import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";


const About = () => {
  
  return (
    <div className="border-t pt-8">
      <div className="text-xl sm:text-2xl my-3 text-center">
        <Title text1={"about"} text2={"us"} />
      </div>

      <div className="flex flex-col sm:flex-row gap-16 my-10">
        <img
          src={assets.about_img}
          alt="about img"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
            inventore beatae quo impedit dolor minus vel tempora veniam soluta
            assumenda pariatur accusamus officia expedita autem natus, nam iusto
            eius? Eos? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Placeat quisquam maiores rem voluptatibus error velit quis ipsum
            est. Incidunt, tenetur. Rem eius quos nihil in. Facilis quo non
            tempore minus.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit est
            nostrum porro sed vel tempore. Iste earum, fugiat quasi suscipit
            laboriosam, ea aliquid, cum assumenda illo asperiores ullam
            quibusdam quidem.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
            aliquam sed nobis eius labore reiciendis illum minima ut nostrum
            eum. Soluta repellat animi id eos nemo quod odio est autem.
          </p>
        </div>
      </div>

      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"why"} text2={"choose us"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="flex flex-col px-10 md:px-16 py-8 md:py-20 border">
          <b>Quality Assurance</b>
          <p>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className="flex flex-col px-10 md:px-16 py-8 md:py-20 border">
          <b>Convenience:</b>
          <p>
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className="flex flex-col px-10 md:px-16 py-8 md:py-20 border">
          <b>Exceptional Customer Service:</b>
          <p>
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <NewsLetter/>
      </div>
    </div>
  );
};

export default About;
