import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const OrderService = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem("user");

  const getAllOrders = async (page, size) => {
    const res = await axiosPrivate.get(
      "/orders/getUserOrders/" + JSON.parse(username),
      //   {
      //     params: {
      //       username: JSON.parse(username),
      //       pageNo: page,
      //       pageSize: size,
      //     },
      //   },
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

  return {
    getAllOrders,
    changeProductQuantity,
    addProductToCart,
  };
};

export default OrderService;
