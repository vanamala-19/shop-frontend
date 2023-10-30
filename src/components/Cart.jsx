// Cart.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CartService from "../api/CartService";
import LoadingPage from "./Loading";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { theme } = useContext(ThemeContext);

  const { getAllProductsFromCart, changeProductQuantity } = CartService();

  const fetchCart = async () => {
    setLoading(true);
    console.log("Loading...");
    try {
      const response = await getAllProductsFromCart(0, 8);
      console.log(response);
      setCart(response.products);
    } catch (err) {
      if (err.response.status === 404) {
        setError("not products to show on cart");
      } else {
        setError("Internal error 500");
      }
    } finally {
      console.log("ended...");
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch the products in the cart from the server

    fetchCart();
  }, []);

  const updateProductQuantity = async (productId, increase) => {
    // Make a request to the server to update the product quantity
    setLoading(true);
    try {
      const response = await changeProductQuantity(productId, increase);
      console.log(response);
      if (response === "Product quantity updated") {
        // Fetch the updated products in the cart from the server
        fetchCart();
      }
    } catch (err) {
      if (err.response.status === 404) {
        setError("not products to show on cart");
      } else {
        setError("Internal error 500");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (cart.length === 0) {
    return <p>no products to show on cart</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={`${theme}-theme text-${theme} container mx-auto px-4`}>
      <h1 className="text-2xl font-bold my-4">Cart</h1>
      {cart.map((product) => (
        <div key={product.id} className="mb-6 max-w-lg  flex items-center">
          <ProductCard product={product} />
          <div className="ml-4">
            <div className="flex flex-wrap  space-x-2 mt-2">
              <p>Quantity: </p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <button
                  onClick={() => updateProductQuantity(product.id, false)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md">
                  -
                </button>
                <p className="flex items-center justify-center mt-2">
                  {product.quantity}
                </p>
                <button
                  onClick={() => updateProductQuantity(product.id, true)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
