import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(
          "https://fakestoreapi.in/api/products"
        );
        console.log("product api data", productRes);

        setProducts(
          Array.isArray(productRes.data.products)
            ? productRes.data.products
            : []
        );
        const token = localStorage.getItem("token");
        const cartRes = await axios.get(
          "https://shopping-cart-backend-7r84.onrender.com/api/home/products-cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartCount(cartRes.data.products?.length || 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setProducts([]);
        setCartCount(0);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://shopping-cart-backend-7r84.onrender.com/api/home/products-cart",
        { product },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartCount(cartCount + 1);
      alert("Product added to cart!");
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => navigate("/products-cart")}
      />
      <h1 className="text-center text-3xl font-bold my-6">Products Page</h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 shadow-md">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-bold mb-2">
                  Price: ₹{item.price}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded
                  w-full cursor-pointer justify-end
                  hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
