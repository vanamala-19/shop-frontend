import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const OrderService = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem("user");

  const getAllOrders = async (page, size) => {
    const res = await axiosPrivate.get(
      "/orders/getUserOrders/" + JSON.parse(username),
      // {
      //   params: {
      //     username: JSON.parse(username),
      //     pageNo: page,
      //     pageSize: size,
      //   },
      // },
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
  const addFromProduct = async (productId) => {
    const res = await axiosPrivate.get(
      "/orders/addFromProduct/",
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

  const addFromCart = async () => {
    const res = await axiosPrivate.get(
      "/orders/addFromCart/",
      {
        params: {
          username: JSON.parse(username),
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
    addFromProduct,
    addFromCart,
  };
};

export default OrderService;
