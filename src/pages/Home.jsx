import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';

const Home = () => {
  const { donations, stats, claimDonation } = useFood();
  const navigate = useNavigate();
  const [selectedForClaim, setSelectedForClaim] = useState(null);

  // Filter available items for featured section (up to 4 items)
  const featuredDonations = donations
    .filter((d) => d.status === 'available')
    .slice(0, 4);

  const handleClaimConfirm = () => {
    if (selectedForClaim) {
      const res = claimDonation(selectedForClaim.id);
      setSelectedForClaim(null);
      if (res.success) {
        navigate('/my-rescues');
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 py-lg-6 border-bottom">
        <div className="container py-3">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 text-center text-lg-start">
              <div className="d-inline-flex align-items-center gap-2 hero-badge px-3 py-1.5 rounded-pill mb-3 small fw-semibold">
                <i className="bi bi-patch-check-fill text-success"></i>
                <span>Community Surplus Food Rescue Platform</span>
              </div>
              <h1 className="display-4 fw-extrabold text-forest-dark mb-3 lh-sm">
                Save Food. <br />
                <span className="text-forest">Share Hope.</span>
              </h1>
              <p className="lead text-secondary mb-4 pe-lg-4 fs-5">
                FoodLoop bridges the gap between surplus food from restaurants, bakeries, hostels, and households and local NGOs and volunteers. Together, we divert fresh meals from landfills to nourish people in need.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
                <Link to="/explore" className="btn btn-forest btn-lg px-4 py-2.5 rounded-pill shadow-sm fw-semibold">
                  <i className="bi bi-compass me-2"></i>
                  Explore Available Food
                </Link>
                <Link to="/donate" className="btn btn-outline-forest btn-lg px-4 py-2.5 rounded-pill fw-semibold bg-white">
                  <i className="bi bi-plus-circle me-2"></i>
                  Donate Surplus Food
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-4 pt-2 text-muted small">
                <span className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-geo-alt-fill text-forest"></i>
                  <span>Active across Hyderabad</span>
                </span>
                <span className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-lightning-charge-fill text-amber"></i>
                  <span>Fast volunteer claiming</span>
                </span>
                <span className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-shield-check text-success"></i>
                  <span>100% Free community service</span>
                </span>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white p-3 p-md-4">
                <div className="position-relative rounded-3 overflow-hidden mb-3" style={{ height: '240px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                    alt="Wholesome fresh surplus food"
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge bg-forest px-3 py-1.5 rounded-pill small shadow">
                      <i className="bi bi-bell-fill me-1"></i> Live Rescue Network
                    </span>
                  </div>
                </div>

                {/* Quick Snapshot Metrics */}
                <div className="row g-2 text-center">
                  <div className="col-4">
                    <div className="bg-light p-2.5 rounded-3">
                      <h4 className="fw-bold text-forest mb-0">{stats.availableCount}</h4>
                      <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Available Now</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-light p-2.5 rounded-3">
                      <h4 className="fw-bold text-primary mb-0">{stats.rescuedCount}</h4>
                      <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Rescues Done</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-light p-2.5 rounded-3">
                      <h4 className="fw-bold text-success mb-0">{stats.totalWeightRescuedKg} kg</h4>
                      <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Food Saved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Food Donations Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold mb-2">
                Fresh Listings
              </span>
              <h2 className="fw-bold text-dark mb-1">Featured Food Donations</h2>
              <p className="text-secondary mb-0">
                Fresh surplus food ready for immediate pickup and rescue by volunteers.
              </p>
            </div>
            <Link to="/explore" className="btn btn-outline-forest rounded-pill px-3 py-2 mt-3 mt-md-0 fw-semibold text-nowrap">
              View All Donations <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          {featuredDonations.length === 0 ? (
            <div className="empty-state-box text-center my-4">
              <i className="bi bi-box2-heart text-muted display-4 mb-3 d-block"></i>
              <h5 className="fw-bold text-dark">No Available Donations At This Moment</h5>
              <p className="text-muted small mb-3">All listed surplus items have been claimed or completed.</p>
              <Link to="/donate" className="btn btn-forest rounded-pill px-4 py-2">
                Be the first to list surplus food
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {featuredDonations.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-3">
                  <FoodCard donation={item} onClaimClick={(donation) => setSelectedForClaim(donation)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-cream">
        <div className="container py-2">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="fw-bold text-dark mb-2">How FoodLoop Works</h2>
            <p className="text-secondary">
              A seamless, hyperlocal workflow designed to rescue surplus food within the safe consumption window.
            </p>
          </div>

          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number-badge">1</div>
                <h4 className="fw-bold text-dark mb-2">Providers List Surplus</h4>
                <p className="text-secondary small mb-0">
                  Restaurants, bakeries, student hostels, caterers, and households post unserved excess food with quantity, category, pickup location, and time deadline.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number-badge">2</div>
                <h4 className="fw-bold text-dark mb-2">Volunteers & NGOs Claim</h4>
                <p className="text-secondary small mb-0">
                  Rescue champions and NGO partners view real-time listings, claim available batches in their locality, and receive immediate pickup instructions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number-badge">3</div>
                <h4 className="fw-bold text-dark mb-2">Prompt Pickup & Nourish</h4>
                <p className="text-secondary small mb-0">
                  Volunteers collect the food safely before the deadline and deliver it to nearby shelters, orphanages, day-laborers, and families in need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Statistics Preview */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold mb-2">
                Measurable Impact
              </span>
              <h2 className="fw-bold text-dark mb-3">Turning Food Waste into Community Hope</h2>
              <p className="text-secondary mb-4">
                Globally, over one-third of all food produced is wasted while millions go hungry. FoodLoop empowers local communities to make a tangible difference every day.
              </p>
              <Link to="/impact" className="btn btn-outline-forest rounded-pill px-4 py-2.5 fw-semibold">
                View Full Impact Dashboard <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="card border rounded-4 p-3.5 bg-forest-light border-forest-subtle">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-forest text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <i className="bi bi-box2-heart fs-4"></i>
                      </div>
                      <div>
                        <h3 className="fw-bold mb-0 text-forest-dark">{stats.totalListings}</h3>
                        <span className="small text-secondary">Total Donations Listed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card border rounded-4 p-3.5 bg-emerald-light border-emerald-subtle">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-emerald text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <i className="bi bi-check2-circle fs-4"></i>
                      </div>
                      <div>
                        <h3 className="fw-bold mb-0 text-emerald">{stats.rescuedCount}</h3>
                        <span className="small text-secondary">Completed Food Rescues</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card border rounded-4 p-3.5 bg-amber-light border-amber-subtle">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-amber text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <i className="bi bi-egg-fried fs-4"></i>
                      </div>
                      <div>
                        <h3 className="fw-bold mb-0 text-amber">{stats.totalMealsRescued}+</h3>
                        <span className="small text-secondary">Meals Served to Shelters</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card border rounded-4 p-3.5 bg-blue-light border-primary-subtle">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        <i className="bi bi-cloud-slash fs-4"></i>
                      </div>
                      <div>
                        <h3 className="fw-bold mb-0 text-primary">{stats.co2SavedKg} kg</h3>
                        <span className="small text-secondary">CO₂ Emissions Prevented</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories / Testimonial Strip */}
      <section className="py-5 bg-cream">
        <div className="container">
          <div className="text-center max-w-700 mx-auto mb-5">
            <h3 className="fw-bold text-dark mb-2">Voices from our Hyderabad Network</h3>
            <p className="text-secondary small">How FoodLoop connects donors and volunteers on the ground.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-xs bg-white">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-forest" style={{ width: '42px', height: '42px' }}>
                    <i className="bi bi-shop fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Ramesh Reddy</h6>
                    <span className="small text-muted">Annapurna Kitchen, Jubilee Hills</span>
                  </div>
                </div>
                <p className="text-secondary small fst-italic mb-0">
                  "Whenever we have surplus unserved wedding or corporate meal boxes, listing them on FoodLoop takes under 2 minutes. Seeing the food claimed and picked up gives us immense peace of mind."
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-xs bg-white">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-forest" style={{ width: '42px', height: '42px' }}>
                    <i className="bi bi-person-heart fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Sneha Kulkarni</h6>
                    <span className="small text-muted">Volunteer, Gachibowli</span>
                  </div>
                </div>
                <p className="text-secondary small fst-italic mb-0">
                  "I check FoodLoop every evening on my way back from office. Claiming fresh bakery loaves or hostel meals and delivering them to night shelters in Kondapur has become a fulfilling daily habit."
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-xs bg-white">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-forest" style={{ width: '42px', height: '42px' }}>
                    <i className="bi bi-heart-pulse fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Sister Teresa</h6>
                    <span className="small text-muted">Asha Shelter Home, Secunderabad</span>
                  </div>
                </div>
                <p className="text-secondary small fst-italic mb-0">
                  "The nutrition and quality of meals shared through FoodLoop has helped our 40 children receive balanced dinners. Every single meal box is a blessing for us."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-5 bg-forest text-white text-center">
        <div className="container py-2">
          <h2 className="fw-bold text-white mb-3">Ready to Be Part of the Food Rescue Loop?</h2>
          <p className="text-white-70 max-w-700 mx-auto mb-4 lead fs-6">
            Whether you are a food business with surplus batches or a passionate volunteer wanting to save meals, your participation counts.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/donate" className="btn btn-light text-forest fw-bold rounded-pill px-4 py-2.5 shadow-sm">
              <i className="bi bi-plus-circle me-1.5"></i> List Surplus Food Now
            </Link>
            <Link to="/explore" className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-semibold">
              <i className="bi bi-search me-1.5"></i> Browse Available Food
            </Link>
          </div>
        </div>
      </section>

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
                  <div><strong>Provider:</strong> {selectedForClaim.provider}</div>
                  <div><strong>Pickup Location:</strong> {selectedForClaim.pickupLocation}</div>
                </div>
                <div className="alert alert-info py-2 small mb-0">
                  <i className="bi bi-info-circle-fill me-1"></i>
                  By claiming, you commit to picking up this food before the deadline. It will be added to <strong>My Rescues</strong>.
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

export default Home;
