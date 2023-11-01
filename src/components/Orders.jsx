import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import OrderService from "../api/OrderService";
import ProductCard from "./ProductCard";
import LoadingPage from "./Loading";

const OrdersPage = () => {
  const { theme } = useContext(ThemeContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllOrders } = OrderService();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log(response[0].id);
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!orders.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        No orders found
      </div>
    );
  }

  return (
    <div className={`${theme}-theme text-${theme} container mx-auto mt-10`}>
      <h1 className="text-4xl font-bold mb-6 content-center"> Your Orders</h1>
      <ul>
        {orders.length &&
          orders.map((order) => (
            <li key={order.id} className=" shadow-lg rounded-md p-4 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Order ID: {order.id}
              </h2>
              <p className="mb-2">Order Time: {order.orderTime}</p>
              <p className="mb-2">Completion Time: {order.completionTime}</p>
              <p className="mb-2">Status: {order.status}</p>
              <p className="mb-4">Total Price: {order.totalPrice}</p>
              <h3 className="text-xl font-semibold mb-2">Ordered Items:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ul>
                  {order.orderedItems.map((item) => (
                    <li key={item.id}>
                      <ProductCard product={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
