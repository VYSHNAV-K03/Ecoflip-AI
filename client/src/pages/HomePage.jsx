import React from 'react'; 
import ShopPage from './ShopPage';
import OfferCarousel from '../components/OfferCarousel';
import logo from '../assets/logooo.jpg'

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-section vh-100 d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-photo/recycling-concept-flat-lay_23-2148834524.jpg?t=st=1741595670~exp=1741599270~hmac=5a301653f0f63d3ee2c34149eee7b4574c544d206b1a17b5294293dc8230f6f3&w=1800")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div
          className="container text-center p-5"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '15px',
          }}
        >
          {/* Logo Section */}
          <div className="mb-3">
            <img
              src={logo} // Replace with your logo URL
              alt="Eidos Logo"
              className="img-fluid"
              style={{ maxWidth: '120px' }}
            />
          </div>

          <h1 className="display-4 fw-bold">Welcome to EcoFlip</h1>
          <p className="lead mt-3">
            Turn your recyclables into rewards with our easy-to-use app.
          </p>
          <a href={token ? "/scroll" : "/login"} className="btn btn-light btn-lg mt-4 px-5">
            Start Now
          </a>
        </div>
      </div>

      {/* About Eidos Section */}
      <div className="about-section py-5 bg-light" id="about">
        <div className="container text-center">
          <h2 className="text-success fw-bold mb-3">About EcoFlip</h2>
          <p className="lead">
          Turn Waste into Rewards! ♻️
          EcoFlip lets you scan waste, earn points, and shop for amazing recycled products. Transform trash into treasure while making a positive impact on the planet. Scan, earn, shop—it's that simple! 
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <div className="container text-center">
          <h2 className="text-success fw-bold mb-4">Why Choose EcoFlip</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <i className="fas fa-recycle fa-3x text-success"></i>
                <h4 className="mt-3">Eco-Friendly</h4>
                <p>Reduce waste by giving used items a second life.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <i className="fas fa-gift fa-3x text-warning"></i>
                <h4 className="mt-3">Earn Rewards</h4>
                <p>Turn recyclables into points and shop for exclusive deals.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <i className="fas fa-handshake fa-3x text-primary"></i>
                <h4 className="mt-3">Community Support</h4>
                <p>Join a network of eco-conscious buyers and sellers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Carousel Section */}
      {/* <OfferCarousel /> */}

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-2">&copy; {new Date().getFullYear()} EcoFlip. All Rights Reserved.</p>
          
          {/* Contact Information */}
          <div className="mb-3">
            <p className="mb-1"><i className="fas fa-phone"></i> Contact: +91 6282385110</p>
            <p className="mb-1"><i className="fas fa-envelope"></i> Email: <a href="mailto:support@EcoFlip.com" className="text-white">support@EcoFlip.com</a></p>
          </div>

          {/* Social Media Links */}
          <div>
            <a href="#" className="text-white me-3">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
