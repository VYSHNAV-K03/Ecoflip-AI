import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '../axios';

const RegisterDriverPage = () => {
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [licensenumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [licenseError, setLicenseError] = useState('');

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Z][A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{7,}$/.test(password);

  const validatePhone = (phone) =>
    /^[6-9][0-9]{9}$/.test(phone);

  const validateLicense = (license) =>
    /^[A-Za-z0-9]{6,15}$/.test(license); // Only letters and numbers, 6–15 chars

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setError('');
    setSuccess('');
    setEmailError('');
    setPasswordError('');
    setPhoneError('');
    setLicenseError('');

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must start with a capital letter, be at least 8 characters long, and include a special character.'
      );
      hasError = true;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Phone number must be 10 digits, cannot start with less than 6.');
      hasError = true;
    }

    if (!validateLicense(licensenumber)) {
      setLicenseError('License number must be 6–15 alphanumeric characters.');
      hasError = true;
    }

    if (hasError) return;

    try {
      await axios.post('/auth/register-driver', {
        name,
        email,
        phone,
        address,
        place,
        licensenumber,
        password,
      });

      setSuccess('Successfully registered! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">Register as Driver</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={name}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{ borderColor: 'black' }}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderColor: 'black' }}
              />
              {emailError && <div className="text-danger mt-1">{emailError}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                style={{ borderColor: 'black' }}
              />
              {phoneError && <div className="text-danger mt-1">{phoneError}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ borderColor: 'black' }}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="place" className="form-label">Place</label>
              <input
                type="text"
                className="form-control"
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
                style={{ borderColor: 'black' }}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="licenseNumber" className="form-label">License Number</label>
              <input
                type="text"
                className="form-control"
                id="licenseNumber"
                value={licensenumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
                style={{ borderColor: 'black' }}
              />
              {licenseError && <div className="text-danger mt-1">{licenseError}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderColor: 'black' }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>

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

export default RegisterDriverPage;
