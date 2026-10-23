import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';

const Navbar = () => {
  const { myRescues } = useFood();
  const [navExpanded, setNavExpanded] = useState(false);

  // Active pickups claimed by demo user
  const activePickupsCount = myRescues.filter((r) => r.status === 'claimed').length;

  const closeNav = () => setNavExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-2.5 shadow-xs">
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" onClick={closeNav}>
          <div className="brand-logo-icon rounded-circle d-flex align-items-center justify-content-center text-white bg-forest">
            <i className="bi bi-arrow-repeat fs-4"></i>
          </div>
          <div className="d-flex flex-column">
            <span className="brand-title fw-bold text-forest lh-1">FoodLoop</span>
            <span className="brand-tagline text-muted small" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>
              Save Food, Share Hope
            </span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          onClick={() => setNavExpanded(!navExpanded)}
          aria-controls="foodloopNav"
          aria-expanded={navExpanded}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${navExpanded ? 'bi-x-lg' : 'bi-list'} fs-3 text-forest`}></i>
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`} id="foodloopNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2 py-2 py-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link px-3 py-2 fw-medium rounded-pill ${isActive ? 'active-nav-link text-forest fw-semibold' : 'text-dark'}`}
                onClick={closeNav}
              >
                <i className="bi bi-house-door me-1.5"></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/explore"
                className={({ isActive }) => `nav-link px-3 py-2 fw-medium rounded-pill ${isActive ? 'active-nav-link text-forest fw-semibold' : 'text-dark'}`}
                onClick={closeNav}
              >
                <i className="bi bi-compass me-1.5"></i>
                Explore Food
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/donate"
                className={({ isActive }) => `nav-link px-3 py-2 fw-medium rounded-pill ${isActive ? 'active-nav-link text-forest fw-semibold' : 'text-dark'}`}
                onClick={closeNav}
              >
                <i className="bi bi-plus-circle me-1.5"></i>
                Donate Food
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/my-rescues"
                className={({ isActive }) => `nav-link px-3 py-2 fw-medium rounded-pill position-relative ${isActive ? 'active-nav-link text-forest fw-semibold' : 'text-dark'}`}
                onClick={closeNav}
              >
                <i className="bi bi-bag-heart me-1.5"></i>
                My Rescues
                {activePickupsCount > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1.5 px-2 py-0.5 text-white small" title={`${activePickupsCount} pending pickup(s)`}>
                    {activePickupsCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/impact"
                className={({ isActive }) => `nav-link px-3 py-2 fw-medium rounded-pill ${isActive ? 'active-nav-link text-forest fw-semibold' : 'text-dark'}`}
                onClick={closeNav}
              >
                <i className="bi bi-graph-up-arrow me-1.5"></i>
                Impact Dashboard
              </NavLink>
            </li>
          </ul>

          {/* Header Action Button */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            <Link
              to="/donate"
              className="btn btn-forest rounded-pill px-3.5 py-2 fw-semibold d-flex align-items-center gap-1.5 shadow-sm"
              onClick={closeNav}
            >
              <i className="bi bi-heart-fill small text-cream"></i>
              <span>Donate Food</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
