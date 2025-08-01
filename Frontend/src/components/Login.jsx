import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);

    setloginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", loginData);

    try {
      const { email, password } = loginData;

      if (!email || !password) {
        return alert("Please fill all the fields");
      }

      const url = "http://localhost:3000/api/user/login"; // Replace with your API endpoint
      const response = await axios.post(url, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      console.log("Login successful:", data);

      const { success, message, accessToken, error, username } = data;
      if (success) {
        alert(message);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("loggedInUser", username);
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        console.log("Error details:", details);
        alert(details);
      } else if (!success && !error) {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
    // Here you would typically handle the form submission, e.g., send data to an API
  };
  return (
    <div className="container flex flex-col  w-[450px] p-5 border-1 rounded-2xl mx-auto my-15">
      <h2 className=" text-center text-3xl m-3  font-bold">LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xl flex-start mt-1">
            Email
          </label>
          <input
            className="border-1 rounded-xl p-1.5 w-full h-12"
            type="text"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-xl flex-start mt-1">
            Password
          </label>
          <input
            className="border-1 rounded-xl p-1.5 w-full h-12"
            type="text"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="w-full p-2 bg-black text-white mt-4 mb-3 rounded-xl hover:bg-gray-800 cursor-pointer h-12 hover:scale-105 transition-all duration-300">
            Submit
          </button>
        </div>
        <p className="text-center text-lg">
          Not have an accound?{" "}
          <span
            className=" text-gray-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
