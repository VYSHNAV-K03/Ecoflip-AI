import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageOrders = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("/admin/orders", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  // Group materials by userId
  const groupedByUser = materials.reduce((acc, material) => {
    if (material.userId && material.userId.name) {
      const userName = material.userId.name;
      if (!acc[userName]) {
        acc[userName] = [];
      }
      acc[userName].push(material);
    }
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Booked Materials</h2>

      {materials.length === 0 ? (
        <p className="text-center">No booked materials available.</p>
      ) : (
        Object.keys(groupedByUser).map((userName, index) => (
          <div key={index} className="mb-5">
            <h4 className="text-primary">{userName}</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Material ID</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Points</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedByUser[userName].map((material, idx) => (
                    <tr key={material._id}>
                      <td>{idx + 1}</td>
                      <td>{material._id}</td>
                      <td>{material.type}</td>
                      <td>{material.quantity}</td>
                      <td>{material.points}</td>
                      <td>
                        <span
                          className={`badge ${
                            material.status === "Verified"
                              ? "bg-success"
                              : material.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {material.status}
                        </span>
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

export default ManageOrders;
