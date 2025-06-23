import React, { useState, useEffect } from "react";
import axios from "../../axios";
import BackButton from "../../components/BackButton";

const ManageSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  console.log(suppliers);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("/admin/suppliers/users", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/admin/suppliers/users/${supplierId}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier._id !== supplierId)
        );
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="container mt-4">
      <BackButton />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">Manage Users</h2>
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.reverse().map(
                (supplier) =>
                  !supplier.isAdmin &&
                  !supplier.isSupplier && (
                    <tr key={supplier._id} className="align-middle">
                      <td>{supplier.name}</td>
                      <td>{supplier.email}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(supplier._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSuppliers;
