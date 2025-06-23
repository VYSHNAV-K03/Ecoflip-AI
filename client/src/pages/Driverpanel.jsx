import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../axios";

const DriverPanel = () => {
  const [Materials, setMaterials] = useState([]);
  const [view, setView] = useState("orders");
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null; // or a default object
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  const [token, settoken] = useState(() => localStorage.getItem("token"));
  console.log("pendingMaterials", Materials);

  // Fetch Pending Materials from Backend
  const fetchMaterials = async () => {
    try {
      const response = await axiosInstance.get("/materials/all-materials");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching pending materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleAcceptUserMaterials = async (userMaterials) => {
    console.log(user && user._id);
    console.log(userMaterials);

    try {
      for (let material of userMaterials) {
        await axiosInstance.post("/materials/verify-material", {
          materialId: material._id,
          driverId: user._id,
          status: "Accepted",
          verifiedBy: user._id,
          token: token,
        });
      }
      alert("Materials Accepted!");
      fetchMaterials(); // refresh list
    } catch (error) {
      console.error("Error accepting materials:", error);
    }
  };

  const handleVerifyUserMaterials = async (userMaterials) => {
    try {
      for (let material of userMaterials) {
        if (material.verifiedBy === user._id) {
          await axiosInstance.post("/materials/verify-material", {
            materialId: material._id,
            driverId: user._id,
            status: "Verified",
            verifiedBy: user._id,
            token: token,
          });
        }
      }
      alert("Materials Verified!");
      fetchMaterials(); // refresh list
    } catch (error) {
      console.error("Error verifying materials:", error);
    }
  };

  const handleRejectUserMaterials = async (userMaterials) => {
    try {
      for (let material of userMaterials) {
        if (material.verifiedBy === user._id) {
          await axiosInstance.post("/materials/verify-material", {
            materialId: material._id,
            driverId: user._id,
            status: "Rejected",
            verifiedBy: user._id,
            token: token,
          });
        }
      }
      alert("Materials Rejected!");
      fetchMaterials(); // refresh list
    } catch (error) {
      console.error("Error rejecting materials:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Driver Panel</h2>
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setView("orders")}
        >
          Pending Bookings
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => setView("verify")}
        >
          Verify Bookings
        </button>
      </div>

      {view === "orders" && (
        <div>
          <h4>Pending Orders</h4>
          {Materials.length === 0 ? (
            <p>No pending materials available.</p>
          ) : (
            Object.entries(
              Materials.filter(
                (m) =>
                  (m.status === "Pending" || m.status === "Rejected") &&
                  m.userId?.place === user.place
              ).reduce((acc, material) => {
                const userId = material.userId?._id;
                if (!acc[userId]) acc[userId] = [];
                acc[userId].push(material);
                return acc;
              }, {})
            ).map(([userId, userMaterials]) => (
              <div key={userId} className="mb-4">
                <h5 className="text-primary">
                  User: {userMaterials[0].userId?.name}
                </h5>
                <small>
                  Phone: {userMaterials[0].userId?.phone} | Address:{" "}
                  {userMaterials[0].userId?.address}
                </small>
                <ul className="list-group">
                  {userMaterials.map(
                    ({ _id, type, quantity, points, userId }) => (
                      <li
                        key={_id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{type}</strong> - {quantity} (Points: {points}
                          )
                          <br />
                        </div>
                        {/* <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAccept(_id)}
                        >
                          Accept
                        </button> */}
                      </li>
                    )
                  )}
                </ul>
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleAcceptUserMaterials(userMaterials)}
                >
                  Accept All
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {view === "verify" && (
        <div>
          <h4>Orders to Verify</h4>
          {Materials.length === 0 ? (
            <p>No Orders for verification.</p>
          ) : (
            Object.entries(
              Materials.filter((m) => m.status === "Accepted").reduce(
                (acc, material) => {
                  const userId = material.userId?._id;
                  if (!acc[userId]) acc[userId] = [];
                  acc[userId].push(material);
                  return acc;
                },
                {}
              )
            ).map(([userId, userMaterials]) => (
              <div key={userId} className="mb-4">
                {userMaterials.some(
                  (material) => material.verifiedBy === user._id
                ) ? (
                  <>
                    <h5 className="text-primary">
                      User: {userMaterials[0].userId?.name}{" "}
                      {userMaterials.verifiedBy}
                    </h5>
                    <small>
                      Phone: {userMaterials[0].userId?.phone} | Address:{" "}
                      {userMaterials[0].userId?.address}
                    </small>
                    <ul className="list-group">
                      {userMaterials.map(
                        ({ _id, type, quantity, points, verifiedBy }) =>
                          verifiedBy === user._id && (
                            <li key={_id} className="list-group-item">
                              <strong>{type}</strong> - {quantity} (Points:{" "}
                              {points})
                            </li>
                          )
                      )}
                    </ul>

                    <button
                      className="btn btn-success mt-2"
                      onClick={() => handleVerifyUserMaterials(userMaterials)}
                    >
                      Verify All
                    </button>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleRejectUserMaterials(userMaterials)}
                    >
                      Reject All
                    </button>

                    {/* <button
                    className="btn btn-success mx-2"
                    onClick={() => handleVerifyUserMaterials(userMaterials)}
                  >
                    Verify All
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleRejectUserMaterials(userMaterials)}
                  >
                    Reject All
                  </button> */}
                  </>
                ) : (
                  <div className="no">No Items to Verify</div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DriverPanel;
