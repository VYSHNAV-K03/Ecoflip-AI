// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import RegisterBuyerPage from "./pages/RegisterBuyerPage";
import SupplierPage from "./pages/SupplierPage";
import AdminPanel from "./pages/AdminPanel/AdminDashboard";
import AdminDashboard from "./pages/AdminPanel/AdminDashboard";
import ManageProducts from "./pages/AdminPanel/ManageProducts";
import ManageUsers from "./pages/AdminPanel/ManageUsers";
import ManageSuppliers from "./pages/AdminPanel/ManageSuppliers";
import ManageOrders from "./pages/AdminPanel/ManageOrders";
import FeedbackReports from "./pages/AdminPanel/FeedbackReports";
import ManageProductsSupplier from "./pages/SupplierDashboard/ManageProducts";
import SupplierDashboard from "./pages/SupplierDashboard/SupplierDashboard";
import AddProduct from "./pages/SupplierDashboard/AddProduct";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Booking from "./pages/Booking";
import BookingsPageSupplier from "./pages/SupplierDashboard/BookingsPageSupplier";
import CartPage from "./pages/Cart";
import BookingPage from "./pages/BookingCustomer";
import ManageStock from "./pages/SupplierDashboard/ManageStock";
import SellProduct from "./pages/SellProduct";
import AddProductCustomer from "./pages/AddProductCustomer";
import ScrollPage from "./pages/ScrollPage";
import ManageSellProduct from "./pages/AdminPanel/ManageSell";
import BookingPageAdmin from "./pages/BookingAdmin";
import Camera from "./pages/Camera";
import DriverPanel from "./pages/Driverpanel";
import UserProfile from "./pages/Userprofile";
import DriverProfile from "./components/Driverprofile";
import Points from "./pages/Points";
import Orders from "./pages/Orders";
import ResetPassword from "./pages/ResetPassword";
import BookingCart from "./pages/BookingCart";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/me");
        setUser(response.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin");
      } else if (user.isSupplier) {
        if (!user.isVerified) {
          alert("Your buyer account is not verified.");
        } else {
          navigate("/supplier");
        }
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Navbar />
      <main className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/add_cus" element={<AddProductCustomer />} />
          <Route path="/scroll" element={<ScrollPage />} />

          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/item/:itemId" element={<ItemDetailsPage />} />
          <Route
            path="/payment/:itemid/:price/:supplier"
            element={<Booking />}
          />
          <Route path="/payment" element={<BookingCart />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-user" element={<RegisterUserPage />} />
          <Route path="/register-buyer" element={<RegisterBuyerPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/admin/products" element={<ManageProducts />} /> */}
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/suppliers" element={<ManageSuppliers />} />
          <Route path="/admin/sell" element={<ManageSellProduct />} />
          <Route path="/admin/feedback" element={<FeedbackReports />} />
          <Route path="/admin/bookings" element={<BookingPageAdmin />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/products" element={<ManageProductsSupplier />} />

          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/supplier/add-product" element={<AddProduct />} />
          <Route path="/supplier/bookings" element={<BookingsPageSupplier />} />
          <Route path="/supplier/stock" element={<ManageStock />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/driver" element={<DriverPanel />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/Dprofile" element={<DriverProfile />} />
          <Route path="/points" element={<Points />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
