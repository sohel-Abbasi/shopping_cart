import React from "react";
import { useNavigate } from "react-router";
const Navbar = ({ cartCount = 0, onCartClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    alert("Logout successfully");
    setTimeout(() => {
      navigate("/login"); // Redirect to login page after logout
      console.log("User logged out and redirected to login page");
      // Optionally, you can also clear any other user-related state here
      // Redirect to login page after logout
    }, 1000);
  };

  return (
    <nav className=" bg-black text-white p-3 flex justify-between items-center w-full">
      <div
        onClick={() => navigate("/products")}
        className=" text-2xl font-bold ml-3 cursor-pointer"
      >
        Electronic Store
      </div>
      <div>
        <button className=" cursor-pointer" onClick={onCartClick}>
          Cart({cartCount})
        </button>
      </div>
      <div className="mr-3">
        <button
          onClick={handleLogout}
          className="p-2 bg-white text-black rounded-xl mr-8 w-full hover:bg-gray-300 cursor-pointer transition-all duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
