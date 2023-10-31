// Cart.jsx
import React, { useState, useEffect } from "react";
import CartService from "../api/CartService";
import LoadingPage from "./Loading";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const Cart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 0);
  const [isLast, setIsLast] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const { theme } = useContext(ThemeContext);

  const { getAllProductsFromCart, changeProductQuantity, removeProductToCart } =
    CartService();

  const fetchCart = async () => {
    setLoading(true);
    console.log("Loading...");
    try {
      const response = await getAllProductsFromCart(0, 8);
      console.log(response);
      setTotal(0);
      response.products?.map((product) => {
        setTotal((prev) => prev + product?.price * product?.quantity);
      });
      setCart(response.products);
      setIsLast(response.lastPage);
      setTotalPages(totalPages);
    } catch (err) {
      if (err?.response?.status === 404) {
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
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);

    // Fetch the products in the cart from the server
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    // handle after backend created
    try {
      const response = await removeProductToCart(productId);
      console.log(response);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
    console.log("cancel");
  };

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
    <div className={`${theme}-theme text-${theme} container px-4 mx-auto`}>
      <div className="mb-8 pb-8 border-b  border-opacity-40">
        <h1 className="text-center text-2xl md:text-3xl lg:text-7xl xl:text-7xl font-heading font-medium">
          Your cart
        </h1>
      </div>
      <div className="flex flex-wrap -mx-4 mb-14 xl:mb-24">
        <div className="w-full md:w-8/12 xl:w-9/12 px-4 mb-14 md:mb-0">
          <div className="py-12 px-8 md:px-12  rounded-3xl">
            <span
              className="inline-block mb-16 text-darkBlueGray-300 font-medium"
              data-config-id="auto-txt-5-1">
              {cart?.totalProducts} products
            </span>
            <div className="xl:px-10">
              {cart?.map((product) => (
                <div className="relative ">
                  <button
                    className="absolute top-0 right-0 p-2 cursor-pointer -mt-6 -mr-10"
                    onClick={() => handleRemove(product?.id)}>
                    <MdClear />
                  </button>
                  <div className="relative flex flex-wrap items-center xl:justify-between -mx-4 mb-8 pb-8 border-b border-gray-200 border-opacity-40">
                    <div className="relative w-full md:w-auto px-4 mb-6 xl:mb-0">
                      <a
                        className="block mx-auto max-w-max"
                        href={`/product/${product?.id}`}>
                        <img
                          className="h-28 object-cover"
                          src={`data:image/jpeg;base64,${product?.image}`}
                          alt="Product pic"
                          data-config-id="auto-img-1-1"
                        />
                      </a>
                    </div>
                    <div
                      className={`w-full md:w-auto px-4 mb-6 xl:mb-0 text-${theme}`}>
                      {product?.name}
                    </div>
                    <div className="w-full xl:w-auto mb-6 xl:mb-0 mt-6 xl:mt-0 flex flex-row items-center justify-center">
                      <div className="flex px-4 items-center justify-center">
                        <h4
                          className="mr-2 font-heading font-medium"
                          data-config-id="auto-txt-13-1">
                          Qty:
                        </h4>
                        <button
                          onClick={() =>
                            updateProductQuantity(product?.id, false)
                          }
                          className={`btn-${theme} py-2 px-4 mx-1 rounded-md`}>
                          -
                        </button>
                        <p className="w-10 mt-3 px-2 h-10 flex items-center justify-center text-center placeholder-gray-400 text-gray-400 bg-blue-50 border-2 border-blue-400 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl mx-1">
                          {product?.quantity}
                        </p>
                        <button
                          onClick={() =>
                            updateProductQuantity(product?.id, true)
                          }
                          className={`btn-${theme} py-2 px-4 mx-1 rounded-md`}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="w-full xl:w-auto px-4">
                      <h4
                        className="mr-2 font-heading font-medium"
                        data-config-id="auto-txt-13-1">
                        Price:
                      </h4>
                      <span className="text-xl font-heading font-medium text-blue-500">
                        <span
                          className="text-sm"
                          data-config-id="auto-txt-15-1">
                          $
                        </span>
                        <span data-config-id="auto-txt-14-1">
                          {product?.price}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12 xl:w-3/12 px-4">
          <div className="mb-14">
            <h2
              className="mb-7 md:mt-6 text-3xl font-heading font-medium"
              data-config-id="auto-txt-37-1">
              Cart totals
            </h2>
            <div className="flex items-center justify-between py-4 px-10 mb-6 leading-8 bg-white font-heading font-medium rounded-3xl">
              <span data-config-id="auto-txt-42-1">Total</span>
              <span className="flex items-center text-xl text-blue-500">
                <span className="mr-2 text-base" data-config-id="auto-txt-43-1">
                  $
                </span>
                <span data-config-id="auto-txt-16-1">{total}</span>
              </span>
            </div>
            <a
              className="inline-block w-full lg:w-auto py-5 px-10 text-xl leading-6 text-white font-medium tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
              href="/go"
              data-config-id="auto-txt-44-1">
              Order Now
            </a>
          </div>
        </div>
      </div>
      <div className="md:w-96">
        <button
          className={`btn-${theme} block py-5 px-2 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl -mt-24`}
          data-config-id="auto-txt-47-1">
          Back to shop
        </button>
      </div>
      <Pagination
        setPage={setPage}
        page={page}
        isLast={isLast}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Cart;
