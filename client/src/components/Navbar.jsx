import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {" "}
      {/* Changed to bg-dark */}
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          EcoFlip
        </Link>{" "}
        {/* Ensured white text */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user && !user.isSupplier && !user.isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/orders">
                    orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/bookings">
                    Bookings
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/points">
                    Points
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/camera">
                    Scan
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}

            {user && user.isSupplier && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Dprofile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/driver">
                    Driver Panel
                  </Link>
                </li>
              </>
            )}

            {user && user.isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin">
                    Admin Panel
                  </Link>
                </li>
              </>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register-user">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-white"
                  style={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
