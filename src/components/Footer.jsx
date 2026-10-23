import React from 'react';
import { Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';

const Footer = () => {
  const { resetDemoData } = useFood();

  const handleReset = (e) => {
    e.preventDefault();
    if (window.confirm('Reset all demo data and sample donations back to their original state?')) {
      resetDemoData();
    }
  };

  return (
    <footer className="footer-section bg-forest-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand & Mission */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="brand-logo-icon rounded-circle d-flex align-items-center justify-content-center text-forest bg-cream">
                <i className="bi bi-arrow-repeat fs-4"></i>
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-white">FoodLoop</h4>
                <span className="small text-white-50">Save Food, Share Hope</span>
              </div>
            </div>
            <p className="text-white-70 small pe-lg-3">
              FoodLoop is a food rescue platform that connects restaurants, hostels, bakeries, households, NGOs, and volunteers. Food providers list surplus food, and rescue champions claim it before it goes to waste.
            </p>
            <div className="d-flex gap-2 mt-3">
              <span className="badge bg-forest text-light border border-forest-light px-2.5 py-1.5 small">
                🌱 UN SDG 12: Zero Waste
              </span>
              <span className="badge bg-forest text-light border border-forest-light px-2.5 py-1.5 small">
                🍲 UN SDG 2: Zero Hunger
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase text-cream fw-bold mb-3 small tracking-wider">Quick Navigation</h6>
            <ul className="list-unstyled footer-links small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/" className="text-white-70 text-decoration-none hover-white">
                  <i className="bi bi-chevron-right small me-1 text-cream"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-white-70 text-decoration-none hover-white">
                  <i className="bi bi-chevron-right small me-1 text-cream"></i> Explore Food
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-white-70 text-decoration-none hover-white">
                  <i className="bi bi-chevron-right small me-1 text-cream"></i> Donate Food
                </Link>
              </li>
              <li>
                <Link to="/my-rescues" className="text-white-70 text-decoration-none hover-white">
                  <i className="bi bi-chevron-right small me-1 text-cream"></i> My Rescues
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-white-70 text-decoration-none hover-white">
                  <i className="bi bi-chevron-right small me-1 text-cream"></i> Impact Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Hyderabad Demo Coverage Zones */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-uppercase text-cream fw-bold mb-3 small tracking-wider">Demo Coverage Zones</h6>
            <ul className="list-unstyled text-white-70 small d-flex flex-column gap-1.5 mb-0">
              <li><i className="bi bi-geo-alt text-cream me-1.5"></i> Jubilee Hills & Road 36</li>
              <li><i className="bi bi-geo-alt text-cream me-1.5"></i> Banjara Hills & Panjagutta</li>
              <li><i className="bi bi-geo-alt text-cream me-1.5"></i> Madhapur & Ayyappa Society</li>
              <li><i className="bi bi-geo-alt text-cream me-1.5"></i> Gachibowli & Financial Dist.</li>
              <li><i className="bi bi-geo-alt text-cream me-1.5"></i> Kondapur & Silpa Park</li>
              <li><i className="bi bi-geo-alt text-cream me-1.5"></i> Secunderabad & Marredpally</li>
            </ul>
          </div>

          {/* Project Demo Disclaimer & Reset */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase text-cream fw-bold mb-3 small tracking-wider">Academic Demo Project</h6>
            <div className="bg-white-10 p-3 rounded-3 text-white-70 small border border-white-10 mb-3">
              <i className="bi bi-info-circle-fill text-warning me-1"></i>
              <strong>Frontend College Showcase:</strong> Built with React, Vite, and Bootstrap 5. All data persists via browser <code>localStorage</code>. No backend or real pickup logistics are engaged.
            </div>
            <button
              onClick={handleReset}
              className="btn btn-sm btn-outline-light rounded-pill px-3 py-1.5 w-100 text-nowrap d-flex align-items-center justify-content-center gap-2"
              title="Reset all sample listings and claims to default state"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        <hr className="border-white-15 my-4" />

        <div className="row align-items-center small text-white-50">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            © {new Date().getFullYear()} <strong>FoodLoop</strong> – Save Food, Share Hope. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span>Designed for Sustainability & Zero Food Waste</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
