import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import coinImage from "../assets/Coin.jpg";
import { Modal, Button } from "react-bootstrap";

const UserProfile = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null; // or a default object
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/auth/getuser", {
        userId: user._id,
      });
      console.log(response.data);

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/auth/user/profile", {
        userId: user._id,
        name,
        email,
        phone,
        address,
      });

      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">User Profile</h2>
        <div className="row">
          <div className="col-md-6">
            <h5>Name:</h5>
            <p>{user.name}</p>
            <h5>Email:</h5>
            <p>{user.email}</p>
            <h5>Phone:</h5>
            <p>{user.phone}</p>
            <h5>Place:</h5>
            <p>{user.place}</p>
            <h5>Address:</h5>
            <p>{user.address}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
          </div>

          <div className="col-md-6 text-center">
            <h5>Wallet Points:</h5>
            <div
              className="d-inline-flex align-items-center p-2 rounded-pill border"
              style={{ background: "#6a5acd", color: "white" }}
            >
              <img
                src={coinImage}
                alt="Coin"
                width="30"
                height="30"
                className="me-2"
              />
              <span>{user.points}</span>
            </div>
            <p className="mt-3">Use your wallet points to shop for products!</p>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Phone:</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
