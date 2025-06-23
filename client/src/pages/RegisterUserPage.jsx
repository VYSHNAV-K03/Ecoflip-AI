import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '../axios';

const RegisterUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    place: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

 const validateFields = () => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9][0-9]{9}$/; // Starts with 1-9, exactly 10 digits
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Z][A-Za-z\d!@#$%^&*]{7,}$/;
  // Explanation:
  // - Must start with capital letter [A-Z]
  // - At least one special character
  // - At least 8 characters total

  if (!formData.name.trim()) errors.name = 'Name is required';

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = 'Phone number must be 10 digits and cannot start with less than 6';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      'Password must start with a capital letter, be at least 8 characters, and include a special character';
  }

  if (!formData.address.trim()) errors.address = 'Address is required';
  if (!formData.place.trim()) errors.place = 'Place is required';

  return errors;
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await axios.post('/auth/register-user', formData);
      setSuccess('Successfully registered! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/people-sorting-garbage-recycling_53876-43124.jpg?semt=ais_hybrid")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '10px',
        minHeight: '100vh',
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">Create Your Account</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                style={{
                  outline:"1px solid black"
                }}
                value={formData.name}
                onChange={handleChange}
              />
              {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control ${fieldErrors.email ? 'is-invalid' : ''} `}
                style={{
                  outline:"1px solid black"
                }}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
            </div>

            {/* Phone */}
            <div className="form-group mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="text"
                className={`form-control ${fieldErrors.phone ? 'is-invalid' : ''}`}
                id="phone" 
                style={{
                  outline:"1px solid black"
                }}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {fieldErrors.phone && <div className="invalid-feedback">{fieldErrors.phone}</div>}
            </div>

            {/* Password */}
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                   style={{
                  outline:"1px solid black"
                }}
                  value={formData.password}
                  onChange={handleChange}
                />
                {/* <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button> */}
                {fieldErrors.password && (
                  <div className="invalid-feedback d-block">{fieldErrors.password}</div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="form-group mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className={`form-control ${fieldErrors.address ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                style={{
                  outline:"1px solid black"
                }}
                value={formData.address}
                onChange={handleChange}
              />
              {fieldErrors.address && <div className="invalid-feedback">{fieldErrors.address}</div>}
            </div>

            {/* Place */}
            <div className="form-group mb-3">
              <label htmlFor="place" className="form-label">Place</label>
              <input
                type="text"
                className={`form-control ${fieldErrors.place ? 'is-invalid' : ''}`}
                id="place"
                name="place"
                style={{
                  outline:"1px solid black"
                }}
                value={formData.place}
                onChange={handleChange}
              />
              {fieldErrors.place && <div className="invalid-feedback">{fieldErrors.place}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>

          <button
            className="btn btn-secondary w-100 mt-3"
            onClick={() => navigate('/register-buyer')}
          >
            Register as Driver
          </button>

          <p className="text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-primary text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
