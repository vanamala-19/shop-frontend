import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const CartService = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem("user");

  const getAllProductsFromCart = async (page, size) => {
    const res = await axiosPrivate.get(
      "/cart/",
      {
        params: {
          username: JSON.parse(username),
          pageNo: page,
          pageSize: size,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };
  const changeProductQuantity = async (productId, increase) => {
    const res = await axiosPrivate.get(
      "/cart/changeQuantity/",
      {
        params: {
          username: JSON.parse(username),
          productId: productId,
          increase: increase,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };
  const addProductToCart = async (productId) => {
    const res = await axiosPrivate.get(
      "/cart/add/",
      {
        params: {
          username: JSON.parse(username),
          productId: productId,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };
  const removeProductToCart = async (productId) => {
    const res = await axiosPrivate.get(
      "/cart/remove/",
      {
        params: {
          username: JSON.parse(username),
          productId: productId,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  return {
    getAllProductsFromCart,
    changeProductQuantity,
    addProductToCart,
    removeProductToCart,
  };
};

export default CartService;
