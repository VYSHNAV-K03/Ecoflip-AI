import React from 'react';

const OfferCarousel = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4"></h2>
      <div
        id="offerCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <video className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} autoPlay loop muted>
              <source src="https://videos.pexels.com/video-files/8580921/8580921-hd_1920_1080_30fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="carousel-caption d-none d-md-block">
             
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/6069544/pexels-photo-6069544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100"
              style={{ height: '500px', objectFit: 'contain' }}
              alt="make a wise decision"
            />
            <div className="carousel-caption d-none d-md-block">

            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/old-computers-digital-tablets-mobile-phones-many-used-electronic-gadgets-devices-broken-household-appliances-white-background-planned-obsolescence-electronic-waste-recycling-concept_250469-29522.jpg?ga=GA1.1.161698178.1738824108&semt=ais_hybridhoto-1612965110667-4175024b0dcc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              style={{ height: '500px', objectFit: 'cover' }}
              alt="Special Offer"
            />
            <div className="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/premium-photo/photo-electronic-waste-recycling-process_778780-31021.jpg?ga=GA1.1.161698178.1738824108&semt=ais_hybrid"
              className="d-block w-100"
              style={{ height: '400px', objectFit: 'cover' }}
              alt="Exclusive Deals"
            />
            <div className="carousel-caption d-none d-md-block">
             
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default OfferCarousel;
