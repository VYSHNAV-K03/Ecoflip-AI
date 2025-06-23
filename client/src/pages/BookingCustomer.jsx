import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("bookings", bookings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, productsRes] = await Promise.all([
          axiosInstance.get("/cart/bookings", {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }),
        ]);
        setBookings(bookingsRes.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mt-5 mb-4">My Orders</h2>
      {bookings.length === 0 ? (
        <p>You have no Orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>Item</th>
                <th>Date</th>
                <th>Status</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking._id}</td>
                  <td>{booking.itemId?.name}</td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : booking.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        booking.verification === "Verified"
                          ? "bg-success"
                          : booking.status === "Not Verified"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {booking.verification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
