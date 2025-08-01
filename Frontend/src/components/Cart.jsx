import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://shopping-cart-backend-7r84.onrender.com/api/home/products-cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCartItems(res.data.products))
      .catch(() => setCartItems([]));
  }, []);

  return (
    <div>
      <Navbar cartCount={cartItems.length} />
      <h1 className="text-center text-3xl font-bold my-6">Cart Page</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-bold mb-2">₹{item.price}</p>
                <div className=" flex justify-between items-center gap-3 p-2">
                  <button className="p-2.5 rounded-xl bg-red-500 text-white cursor-pointer ">
                    remove cart
                  </button>
                  <button className="p-2.5 rounded-xl bg-blue-500 text-white cursor-pointer ">
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No items in cart.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
