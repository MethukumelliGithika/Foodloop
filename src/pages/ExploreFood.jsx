import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';

const ExploreFood = () => {
  const { donations, claimDonation, isDonationExpired } = useFood();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search, Category, Status, and Sort State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [sortBy, setSortBy] = useState('deadline-asc'); // 'deadline-asc', 'newest', 'quantity-desc'
  const [statusFilter, setStatusFilter] = useState('available'); // 'available', 'all', 'claimed', 'rescued'

  // Modal claim state
  const [selectedForClaim, setSelectedForClaim] = useState(null);

  const categories = ['All', 'Vegetarian', 'Non-Vegetarian', 'Bakery', 'Fruits & Vegetables'];

  // Filter and sort logic
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      // Expiration check
      const isExpired = item.status === 'available' && isDonationExpired(item);
      const effectiveStatus = isExpired ? 'expired' : item.status;

      // Status filter
      if (statusFilter === 'available' && effectiveStatus !== 'available') {
        return false;
      }
      if (statusFilter === 'claimed' && effectiveStatus !== 'claimed') {
        return false;
      }
      if (statusFilter === 'rescued' && effectiveStatus !== 'rescued') {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query (search food name or location or provider)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLocation = item.pickupLocation.toLowerCase().includes(query);
        const matchesProvider = item.provider.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesProvider) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline-asc') {
        const timeA = new Date(a.pickupDeadline).getTime();
        const timeB = new Date(b.pickupDeadline).getTime();
        return timeA - timeB;
      }
      if (sortBy === 'newest') {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      }
      if (sortBy === 'quantity-desc') {
        return Number(b.quantity) - Number(a.quantity);
      }
      return 0;
    });
  }, [donations, searchQuery, selectedCategory, statusFilter, sortBy, isDonationExpired]);

  const handleClaimConfirm = () => {
    if (selectedForClaim) {
      const res = claimDonation(selectedForClaim.id);
      setSelectedForClaim(null);
      if (res.success) {
        navigate('/my-rescues');
      }
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setStatusFilter('available');
    setSortBy('deadline-asc');
  };

  return (
    <div className="explore-page py-4 py-md-5">
      <div className="container">
        {/* Header Title */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold">
              Live Surplus Inventory
            </span>
          </div>
          <h1 className="fw-bold text-dark display-6 mb-2">Explore Available Food</h1>
          <p className="text-secondary mb-0">
            Browse and claim surplus fresh food batches from Hyderabad restaurants, hostels, bakeries, and homes.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 mb-4 bg-white">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-lg-5 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search food name, provider, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search food or location"
                />
                {searchQuery && (
                  <button
                    className="btn btn-light border border-start-0 text-muted"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div className="col-lg-3 col-md-3 col-6">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by listing status"
              >
                <option value="available">🟢 Available for Pickup</option>
                <option value="all">📦 All Listings (incl. past)</option>
                <option value="claimed">⏳ In-Transit / Claimed</option>
                <option value="rescued">✅ Completed Rescues</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="col-lg-4 col-md-3 col-6">
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted text-nowrap d-none d-lg-inline">Sort:</span>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort listings"
                >
                  <option value="deadline-asc">⏰ Earliest Deadline First</option>
                  <option value="newest">✨ Newest First</option>
                  <option value="quantity-desc">📦 Largest Quantity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills Strip */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top">
            <span className="small text-muted fw-semibold me-1">Category:</span>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-1.5 filter-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' && <i className="bi bi-grid-fill me-1"></i>}
                {category === 'Vegetarian' && <i className="bi bi-flower1 me-1"></i>}
                {category === 'Non-Vegetarian' && <i className="bi bi-egg-fried me-1"></i>}
                {category === 'Bakery' && <i className="bi bi-cake2 me-1"></i>}
                {category === 'Fruits & Vegetables' && <i className="bi bi-basket me-1"></i>}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Active Filter Indicators */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="small text-muted">
            Showing <strong className="text-dark">{filteredDonations.length}</strong> {filteredDonations.length === 1 ? 'donation listing' : 'donation listings'}
          </span>
          {(searchQuery || selectedCategory !== 'All' || statusFilter !== 'available') && (
            <button
              onClick={handleResetFilters}
              className="btn btn-sm btn-link text-forest text-decoration-none p-0 fw-semibold"
            >
              <i className="bi bi-x-circle me-1"></i> Reset all filters
            </button>
          )}
        </div>

        {/* Listings Grid */}
        {filteredDonations.length === 0 ? (
          <div className="empty-state-box text-center my-4 p-5">
            <div className="rounded-circle bg-light d-inline-flex p-3 text-muted mb-3">
              <i className="bi bi-search display-5"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">No Matching Donations Found</h4>
            <p className="text-muted small max-w-500 mx-auto mb-3">
              We couldn't find any listings matching your search "{searchQuery}" with the selected filters.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button onClick={handleResetFilters} className="btn btn-forest rounded-pill px-4 py-2">
                Clear Filters
              </button>
              <button onClick={() => navigate('/donate')} className="btn btn-outline-forest rounded-pill px-4 py-2">
                Donate Food
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredDonations.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 col-xl-3">
                <FoodCard
                  donation={item}
                  onClaimClick={(donation) => setSelectedForClaim(donation)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Claim Confirmation Modal */}
      {selectedForClaim && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold text-forest">
                  <i className="bi bi-bag-check me-2"></i> Confirm Food Claim
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedForClaim(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
                  You are claiming <strong>"{selectedForClaim.name}"</strong>:
                </p>
                <div className="bg-light p-3 rounded-3 small mb-3">
                  <div><strong>Quantity:</strong> {selectedForClaim.quantity} {selectedForClaim.unit}</div>
                  <div><strong>Provider:</strong> {selectedForClaim.provider} ({selectedForClaim.providerType})</div>
                  <div><strong>Pickup Location:</strong> {selectedForClaim.pickupLocation}</div>
                </div>
                <div className="alert alert-info py-2 small mb-0">
                  <i className="bi bi-info-circle-fill me-1"></i>
                  By claiming, you commit to picking up this food before the deadline. It will be added to your <strong>My Rescues</strong> dashboard.
                </div>
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setSelectedForClaim(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-forest rounded-pill px-4"
                  onClick={handleClaimConfirm}
                >
                  Yes, Claim for Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreFood;
