import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const BookingsPageSupplier = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/suppliers/bookings');
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  console.log("bookingssss",bookings);
  

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Bookings</h2>
      <div className="row">
        {bookings.map((booking) => (
          <div className="col-md-6 mb-4" key={booking._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{booking.itemId?.name}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ₹{booking.itemId?.price}
                </p>
                <p className="card-text">
                  <strong>Booked By:</strong> {booking.userId.name} ({booking.userId.email})
                </p>
                <p className="card-text">
                  <strong>Amount Paid:</strong> ₹{booking.amountPaid}
                </p>
                <p className="card-text">
                  <strong>Status:</strong> {booking.status}
                </p>
                <p className="card-text">
                  <strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPageSupplier;
