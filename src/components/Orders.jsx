import React, { useEffect, useState } from "react";
import OrderService from "../api/OrderService";

const OrdersPage = ({ username }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllOrders } = OrderService();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log(response);
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orders.length) {
    return <div>No orders found for {username}</div>;
  }

  return (
    <div>
      <h1>Orders for {username}</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Order Time: {order.orderTime}</p>
            <p>Completion Time: {order.completionTime}</p>
            <p>Status: {order.status}</p>
            <p>Total Price: {order.totalPrice}</p>
            <h3>Ordered Items:</h3>
            <ul>
              {order.orderedItems.map((item) => (
                <li key={item.id}>
                  <img
                    src={`data:image/jpeg;base64,${item?.image}`}
                    alt="Product pic"
                  />
                  <p>Product ID: {item.id}</p>
                  <p>Product Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
