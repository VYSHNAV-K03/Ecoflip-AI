import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../axios";

const Driverprofile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle modal visibility
  const handleModal = () => setShowModal(!showModal);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes
  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.put(
        "/auth/user/profileedit/driver",
        {
          userId: user._id,
          ...formData,
        }
      );

      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      handleModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate profile image based on name initials
  const getProfileImage = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return (
      <div
        className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
        style={{ width: "80px", height: "80px", fontSize: "24px" }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center">
          {getProfileImage(user.name)}
          <div className="ms-4">
            <h4 className="mb-1">{user.name}</h4>
            <p className="text-muted">{user.email}</p>
          </div>
          <Button variant="primary" className="ms-auto" onClick={handleModal}>
            Edit Profile
          </Button>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-6">
            <h6>Phone:</h6>
            <p>{user.phone || "N/A"}</p>
          </div>
          <div className="col-md-6">
            <h6>License Number:</h6>
            <p>{user.licensenumber || "N/A"}</p>
          </div>
          <div className="col-md-6">
            <h6>Address:</h6>
            <p>{user.address || "N/A"}</p>
          </div>
          <div className="col-md-6">
            <h6>Place:</h6>
            <p>{user.place || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={handleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="licensenumber"
                value={formData.licensenumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Driverprofile;
