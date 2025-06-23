import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingPageAdmin = () => {
  const [groupedBookings, setGroupedBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleVerify = async (bookingId) => {
    try {
      const response = await axiosInstance.put(
        `/cart/bookings/verify/${bookingId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("Verification Response:", response.data);
      // Reload to reflect updates
      window.location.reload();
    } catch (err) {
      console.error("Error verifying booking:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsRes = await axiosInstance.get("/cart/bookings/admin", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const bookings = bookingsRes.data.bookings;

        // Group bookings by userId
        const grouped = {};
        bookings.forEach((booking) => {
          if (booking.userId && booking.itemId) {
            const userId = booking.userId._id;
            if (!grouped[userId]) {
              grouped[userId] = {
                user: booking.userId,
                bookings: [],
              };
            }
            grouped[userId].bookings.push(booking);
          }
        });

        setGroupedBookings(grouped);
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
      <h2 className="mb-4">All Bookings Grouped by User</h2>

      {Object.keys(groupedBookings).length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        Object.values(groupedBookings).map((group, idx) => (
          <div key={group.user._id} className="mb-5">
            <h4 className="text-primary">
              {idx + 1}. {group.user.name}
            </h4>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking._id}</td>
                      <td>{booking.itemId?.name}</td>
                      <td>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
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
                        <span className="badge bg-info text-dark">
                          {booking.verification || "Not Verified"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleVerify(booking._id)}
                        >
                          Change Verification
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingPageAdmin;
