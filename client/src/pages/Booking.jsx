import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Booking.css";
import stripe from "../assets/stripe.png"; // Ensure you have this asset in your project

const Booking = () => {
  const { itemid, price, supplier } = useParams();
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

  const available = user?.points;
  const maxUsablePoints = Math.min(available, price * 10);
  const [errors, setErrors] = useState({});

  const newprice = Math.max(0, price - points / 10);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  console.log(localStorage.getItem("token"));

  const handlePaymentZero = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/payments/verify-payment",
        {
          itemId: itemid,
          amount: newprice,
          supplier: supplier,
          pointsUsed: points,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        setMessage("Payment successful and booking confirmed!");

        closeModal();
        // setTimeout(() => {
        //   window.location.href = "/bookings";
        // }, 1000);
      } else {
        setMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "/payments/verify-payment",
        {
          itemId: itemid,
          amount: newprice,
          supplier: supplier,
          pointsUsed: points,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        setMessage("Payment successful and booking confirmed!");

        closeModal();
        setTimeout(() => {
          window.location.href = "/bookings";
        }, 1000);
      } else {
        setMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("An error occurred during payment.");
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
        <p className="card-text">
          <strong>Item ID:</strong> {itemid}
        </p>
        <p className="card-text">
          <strong>Price:</strong> ₹{price}
        </p>
        <p className="card-text">
          <strong>available points:</strong>
          {available - points}
        </p>
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
                      `You can use up to ${maxUsablePoints} points for this item.`
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
          <strong>Price:</strong> ₹{newprice}
        </p>
      </div>

      {/* Payment Section */}
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
            {/* Modal Header */}
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

            {/* Modal Body */}
            <div className="modal-body">
              <p className="text-muted mb-3">
                We use Stripe for secure payment processing
              </p>
              <div className="payment-form">
                {/* Card Name */}
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    className={`form-control`}
                    id="cardName"
                    name="cardName"
                    placeholder="Enter name"
                    maxLength="20"
                    value={formData.cardName}
                    onChange={handleInputChange}
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                </div>
                {/* Card Number */}
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.cardNumber ? "is-invalid" : ""
                    }`}
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 1234 1234 1234"
                    maxLength="16"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                </div>

                {/* Expiry Date and CVC */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiry" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.expiry ? "is-invalid" : ""
                      }`}
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                    />
                    {errors.expiry && (
                      <div className="invalid-feedback">{errors.expiry}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvc" className="form-label">
                      CVC
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.cvc ? "is-invalid" : ""
                      }`}
                      id="cvc"
                      name="cvc"
                      placeholder="CVC"
                      maxLength="3"
                      value={formData.cvc}
                      onChange={handleInputChange}
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

            {/* Modal Footer */}
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

export default Booking;
