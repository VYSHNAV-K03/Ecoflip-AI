import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import axios from "../axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));


  console.log(orders);
  

  const userId = user?._id;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/materials/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Waste Collection Orders</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : orders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Points</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                {/* <td>{index + 1}</td> */}
                <td>{order.points}</td>
                <td>{order.quantity}</td>
                <td>{order.type}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="alert alert-info">No orders found.</div>
      )}
    </div>
  );
};

export default Orders;
