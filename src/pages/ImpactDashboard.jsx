import React from 'react';
import { Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import StatCard from '../components/StatCard';

const ImpactDashboard = () => {
  const { donations, stats, resetDemoData } = useFood();

  // Completed rescues records
  const rescuedListings = donations.filter((d) => d.status === 'rescued');

  // Category total items
  const totalCategoryItems = Object.values(stats.categoryCounts).reduce((a, b) => a + b, 0) || 1;

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to the original initial state?')) {
      resetDemoData();
    }
  };

  return (
    <div className="impact-page py-4 py-md-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold">
                Live Transparency Metrics
              </span>
            </div>
            <h1 className="fw-bold text-dark display-6 mb-1">Community Impact Dashboard</h1>
            <p className="text-secondary mb-0">
              Real-time measurement of food rescued, landfill waste averted, and CO₂ emissions mitigated.
            </p>
          </div>

          <div className="d-flex gap-2">
            <Link to="/explore" className="btn btn-outline-forest rounded-pill px-3 py-2 fw-semibold">
              <i className="bi bi-compass me-1"></i> Explore Food
            </Link>
            <button
              onClick={handleReset}
              className="btn btn-light border rounded-pill px-3 py-2 small text-secondary"
              title="Reset sample data"
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Data
            </button>
          </div>
        </div>

        {/* Top Key Dynamic Metrics Grid */}
        <div className="row g-3 g-md-4 mb-4">
          <div className="col-lg-3 col-sm-6">
            <StatCard
              icon="bi-box-seam"
              value={stats.totalListings}
              label="Total Food Listings"
              subtitle="Registered surplus food batches"
              colorScheme="forest"
              badgeText="All Time"
            />
          </div>

          <div className="col-lg-3 col-sm-6">
            <StatCard
              icon="bi-check-circle"
              value={stats.availableCount}
              label="Available Donations"
              subtitle="Ready for pickup right now"
              colorScheme="emerald"
              badgeText="Active"
            />
          </div>

          <div className="col-lg-3 col-sm-6">
            <StatCard
              icon="bi-hourglass-split"
              value={stats.claimedCount}
              label="In-Transit Pickups"
              subtitle="Claimed by active volunteers"
              colorScheme="amber"
              badgeText="Claimed"
            />
          </div>

          <div className="col-lg-3 col-sm-6">
            <StatCard
              icon="bi-trophy"
              value={stats.rescuedCount}
              label="Completed Rescues"
              subtitle="Delivered to people in need"
              colorScheme="blue"
              badgeText="Verified"
            />
          </div>
        </div>

        {/* Environmental & Human Impact Cards */}
        <div className="row g-4 mb-4">
          {/* Total Food Saved */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="rounded-3 bg-forest-light text-forest d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-basket3-fill fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{stats.totalWeightRescuedKg} kg</h3>
                  <span className="small text-muted">Surplus Food Rescued</span>
                </div>
              </div>
              <p className="text-secondary small mb-3">
                Calculated directly from completed rescue entries. Diverted from decaying in municipal waste sites.
              </p>
              {/* Progress toward 50 kg community milestone */}
              <div className="pt-2 border-top">
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>Milestone Progress (50 kg target)</span>
                  <span className="fw-semibold text-forest">
                    {Math.min(100, Math.round((stats.totalWeightRescuedKg / 50) * 100))}%
                  </span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-forest"
                    role="progressbar"
                    style={{ width: `${Math.min(100, (stats.totalWeightRescuedKg / 50) * 100)}%` }}
                    aria-valuenow={stats.totalWeightRescuedKg}
                    aria-valuemin="0"
                    aria-valuemax="50"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Meals Distributed */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="rounded-3 bg-amber-light text-amber d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-heart-pulse-fill fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{stats.totalMealsRescued}+</h3>
                  <span className="small text-muted">Nourishing Meals Delivered</span>
                </div>
              </div>
              <p className="text-secondary small mb-3">
                Warm meals and bakery portions delivered to orphanages, elderly shelters, and day laborers.
              </p>
              <div className="pt-2 border-top">
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>Rescue Completion Rate</span>
                  <span className="fw-semibold text-success">{stats.rescueCompletionRate}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${stats.rescueCompletionRate}%` }}
                    aria-valuenow={stats.rescueCompletionRate}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Carbon & Water Saved */}
          <div className="col-lg-4 col-md-12">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="rounded-3 bg-blue-light text-primary d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-cloud-slash-fill fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{stats.co2SavedKg} kg</h3>
                  <span className="small text-muted">Estimated CO₂e Mitigated</span>
                </div>
              </div>
              <p className="text-secondary small mb-3">
                Based on global FAO metrics (1 kg food waste ≈ 2.5 kg CO₂ equivalent emissions from decomposition).
              </p>
              <div className="pt-2 border-top d-flex justify-content-between align-items-center small">
                <span className="text-muted">Estimated Water Footprint Saved:</span>
                <strong className="text-primary">{stats.waterSavedLiters.toLocaleString()} Liters</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown & Distribution */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">Donations by Food Category</h5>
              <div className="d-flex flex-column gap-3">
                {Object.entries(stats.categoryCounts).map(([cat, count]) => {
                  const percent = Math.round((count / totalCategoryItems) * 100);
                  const colorClass =
                    cat === 'Vegetarian'
                      ? 'bg-success'
                      : cat === 'Non-Vegetarian'
                        ? 'bg-danger'
                        : cat === 'Bakery'
                          ? 'bg-warning'
                          : 'bg-info';

                  return (
                    <div key={cat}>
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-semibold text-dark">{cat}</span>
                        <span className="text-muted">{count} listings ({percent}%)</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className={`progress-bar ${colorClass}`}
                          role="progressbar"
                          style={{ width: `${percent}%` }}
                          aria-valuenow={percent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">UN Sustainable Development Goals (SDGs)</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3 p-2 rounded-3 bg-light">
                  <div className="rounded-3 bg-success text-white d-flex align-items-center justify-content-center p-2" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                    <i className="bi bi-recycle fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">SDG 12: Responsible Consumption & Production</h6>
                    <p className="small text-muted mb-0">
                      Target 12.3: Halving per capita global food waste and reducing food losses along production and supply chains.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 p-2 rounded-3 bg-light">
                  <div className="rounded-3 bg-warning text-dark d-flex align-items-center justify-content-center p-2" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                    <i className="bi bi-heart-fill fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">SDG 2: Zero Hunger</h6>
                    <p className="small text-muted mb-0">
                      Connecting unserved nutritious meals directly to vulnerable shelters and families experiencing food insecurity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Rescue Log Table */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
            <div>
              <h5 className="fw-bold text-dark mb-0">Completed Rescue Audit Log</h5>
              <span className="small text-muted">All surplus food batches verified and safely distributed</span>
            </div>
            <span className="badge bg-forest-light text-forest px-3 py-1.5 rounded-pill small fw-semibold">
              {rescuedListings.length} Completed Records
            </span>
          </div>

          {rescuedListings.length === 0 ? (
            <div className="empty-state-box text-center p-4">
              <i className="bi bi-clock-history text-muted fs-2 mb-2 d-block"></i>
              <p className="text-muted small mb-0">No completed rescues yet. Claim and mark a donation as rescued to see it logged here.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-secondary">
                  <tr>
                    <th scope="col">Donation Item</th>
                    <th scope="col">Category</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donor Organization</th>
                    <th scope="col">Pickup Location</th>
                    <th scope="col">Rescued By</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {rescuedListings.map((rescue) => (
                    <tr key={rescue.id}>
                      <td>
                        <Link to={`/food/${rescue.id}`} className="text-decoration-none fw-semibold text-dark hover-forest">
                          {rescue.name}
                        </Link>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>ID: {rescue.id}</div>
                      </td>
                      <td>
                        <span className="badge bg-light text-secondary border">
                          {rescue.category}
                        </span>
                      </td>
                      <td>
                        <strong>{rescue.quantity} {rescue.unit}</strong>
                      </td>
                      <td>{rescue.provider}</td>
                      <td>{rescue.pickupLocation}</td>
                      <td>
                        <span className="text-forest fw-medium">
                          <i className="bi bi-person-check me-1"></i> {rescue.claimedBy || 'Volunteer'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill">
                          <i className="bi bi-check2-all me-1"></i> Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
