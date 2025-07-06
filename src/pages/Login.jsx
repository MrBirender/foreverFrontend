import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shop/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success('Account Created Successfully');
          setToken(response.data.token);
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          setCurrentState("Login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        if (currentState === "Login") {
          const response = await axios.post(backendUrl + "/api/user/login", {
            email,
            password,
          });
          if (response.data.success) {
            toast.success("Logged in Successfully");
            setToken(response.data.token);
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
           
          } else {
            toast.error(response.data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(()=> {
    if(token){
      navigate('/');
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-[90%] sm:w-96 m-auto items-center flex flex-col gap-4 mt-14 text-slate-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="w-8 h-[1.5px] border-none bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="border border-gray-800 px-4 py-2 w-full flex-1"
          required
        />
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="border border-gray-800 px-4 py-2 w-full flex-1"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="border border-gray-800 px-4 py-2 w-full flex-1"
        required
      />
      <div className="flex justify-between w-full text-sm mt-[-8px] ">
        <p className="cursor-pointer">
          {currentState === "Login" && " Forgot your password ?"}
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button type="submit" className="bg-black text-white px-8 py-2 mt-4 text-light">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
