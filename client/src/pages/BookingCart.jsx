import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Booking.css";
import stripe from "../assets/stripe.png";

const BookingCart = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [points, setpoints] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [pointsError, setPointsError] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });
  const available = user?.points || 0;
  const maxUsablePoints = Math.min(available, totalPrice * 10);
  const [errors, setErrors] = useState({});

  const newprice = Math.max(0, totalPrice - points / 10);

  console.log("cartItems", cartItems);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getUser = async () => {
    try {
      const response = await axios.post("/auth/getuser", {
        userId: user._id,
      });
      console.log(response.data);

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber || formData.cardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!formData.expiry || !/\d{2}\/\d{2}/.test(formData.expiry)) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY).";
    }
    if (!formData.cvc || formData.cvc.length !== 3) {
      newErrors.cvc = "CVC must be 3 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const bookItems = async () => {
    for (const item of cartItems) {
      const res = await axios.post(
        "/payments/verify-payment",
        {
          itemId: item.productId,
          amount: item.price,
          supplier: item.supplier,
          pointsUsed: points / cartItems.length,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!res.data.success) {
        throw new Error(`Booking failed for item: ${item.name}`);
      }
    }
  };

  const handlePaymentZero = async () => {
    setLoading(true);
    try {
      await bookItems();
      setMessage("Payment successful and booking confirmed!");
      closeModal();
      setTimeout(() => {
        window.location.href = "/bookings";
      }, 1000);
    } catch (err) {
      console.error("Zero-payment error:", err);
      setMessage(err.message || "An error occurred during booking.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await bookItems();
      setMessage("Payment successful and booking confirmed!");
      closeModal();
      setTimeout(() => {
        window.location.href = "/bookings";
      }, 1000);
    } catch (err) {
      console.error("Payment error:", err);
      setMessage(err.message || "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mt-5">
      {/* Booking Details */}
      <div className="card p-3 mb-4">
        <h5 className="card-title">Booking Details</h5>

        {/* List all items in cart */}
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div key={item._id || index} className="mb-2">
                <strong>{item.name}</strong> — ₹{item.price}
              </div>
            ))}
            <hr />
            <p>
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>
            {/* available points */}
            <p>
              <strong>Available Points:</strong> {available}
            </p>
          </>
        ) : (
          <p>No items in cart.</p>
        )}

        {/* Points input */}
        <div className="mb-3">
          <label className="form-label">Apply Wallet Points</label>
          {available > 0 ? (
            <>
              <input
                type="number"
                className={`form-control ${pointsError ? "is-invalid" : ""}`}
                min="0"
                max={maxUsablePoints}
                placeholder={`Enter points (Max: ${maxUsablePoints})`}
                value={points}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < 0) {
                    setPointsError("Points cannot be negative.");
                  } else if (value > maxUsablePoints) {
                    setPointsError(
                      `You can use up to ${maxUsablePoints} points.`
                    );
                  } else {
                    setPointsError("");
                    setpoints(value);
                  }
                }}
              />
              {pointsError && (
                <div className="invalid-feedback">{pointsError}</div>
              )}
            </>
          ) : (
            <h6 className="text-danger">No points to apply</h6>
          )}
        </div>

        <p className="card-text">
          <strong>Payable Price after Points:</strong> ₹{newprice}
        </p>
      </div>

      {/* Proceed to Payment */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          newprice > 0 ? openModal() : handlePaymentZero();
        }}
      >
        Proceed to Payment
      </button>

      {/* Response Message */}
      {message && (
        <div
          className={`alert mt-3 ${
            message.includes("successful") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      {/* Payment Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-payment-modal">
            <div className="modal-header">
              <img
                src={stripe}
                alt="Stripe Logo"
                className="stripe-logo"
                style={{ width: "100px", height: "auto" }}
              />
              <h5 className="modal-title">Secure Payment</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <p className="text-muted mb-3">
                We use Stripe for secure payment processing
              </p>

              <div className="payment-form">
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Card Holder Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    maxLength="20"
                    placeholder="Enter name"
                  />
                </div>

                {/* Number */}
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.cardNumber ? "is-invalid" : ""
                    }`}
                    name="cardNumber"
                    maxLength="16"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 1234 1234 1234"
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                </div>

                <div className="row">
                  {/* Expiry */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.expiry ? "is-invalid" : ""
                      }`}
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                    />
                    {errors.expiry && (
                      <div className="invalid-feedback">{errors.expiry}</div>
                    )}
                  </div>

                  {/* CVC */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVC</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.cvc ? "is-invalid" : ""
                      }`}
                      name="cvc"
                      maxLength="3"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      placeholder="CVC"
                    />
                    {errors.cvc && (
                      <div className="invalid-feedback">{errors.cvc}</div>
                    )}
                  </div>
                </div>
              </div>
              <small className="text-muted">
                By clicking Pay Now, you agree to Stripe's terms of service.
              </small>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ₹${newprice}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCart;
