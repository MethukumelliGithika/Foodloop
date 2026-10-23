import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatDeadline } from '../components/FoodCard';

const MyRescues = () => {
  const { myRescues, cancelClaim, completeRescue } = useFood();
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'completed', 'all'

  // Modals state
  const [cancellingItem, setCancellingItem] = useState(null);
  const [rescuingItem, setRescuingItem] = useState(null);

  const pendingPickups = myRescues.filter((r) => r.status === 'claimed');
  const completedRescues = myRescues.filter((r) => r.status === 'rescued');

  // Display items according to activeTab
  const displayedItems = activeTab === 'active'
    ? pendingPickups
    : activeTab === 'completed'
      ? completedRescues
      : myRescues;

  const handleCancelConfirm = () => {
    if (cancellingItem) {
      cancelClaim(cancellingItem.id);
      setCancellingItem(null);
    }
  };

  const handleRescueConfirm = () => {
    if (rescuingItem) {
      completeRescue(rescuingItem.id);
      setRescuingItem(null);
    }
  };

  return (
    <div className="my-rescues-page py-4 py-md-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-forest-light text-forest px-3 py-1 rounded-pill small fw-semibold">
                Volunteer Activity Center
              </span>
            </div>
            <h1 className="fw-bold text-dark display-6 mb-1">My Rescues</h1>
            <p className="text-secondary mb-0">
              Track your claimed surplus food pickups, mark completed deliveries, and view your rescue history.
            </p>
          </div>

          <Link to="/explore" className="btn btn-forest rounded-pill px-4 py-2.5 fw-semibold shadow-sm text-nowrap">
            <i className="bi bi-search me-1.5"></i> Find More Food to Rescue
          </Link>
        </div>

        {/* Volunteer Personal Stats Bar */}
        <div className="row g-3 mb-4">
          <div className="col-md-4 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-amber-light text-amber d-flex align-items-center justify-content-center" style={{ width: '46px', height: '46px' }}>
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{pendingPickups.length}</h3>
                  <span className="small text-muted">Active Pending Pickups</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-forest-light text-forest d-flex align-items-center justify-content-center" style={{ width: '46px', height: '46px' }}>
                  <i className="bi bi-check2-all fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{completedRescues.length}</h3>
                  <span className="small text-muted">Completed Rescues</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-emerald-light text-emerald d-flex align-items-center justify-content-center" style={{ width: '46px', height: '46px' }}>
                  <i className="bi bi-heart-pulse fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">
                    {completedRescues.reduce((acc, curr) => acc + Number(curr.quantity || 0), 0)}
                  </h3>
                  <span className="small text-muted">Items Rescued by You</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="d-flex gap-2 border-bottom pb-3 mb-4">
          <button
            className={`btn rounded-pill px-3.5 py-2 fw-semibold ${activeTab === 'active' ? 'btn-forest' : 'btn-light'}`}
            onClick={() => setActiveTab('active')}
          >
            <i className="bi bi-truck me-1.5"></i>
            Active Pickups ({pendingPickups.length})
          </button>
          <button
            className={`btn rounded-pill px-3.5 py-2 fw-semibold ${activeTab === 'completed' ? 'btn-forest' : 'btn-light'}`}
            onClick={() => setActiveTab('completed')}
          >
            <i className="bi bi-trophy me-1.5"></i>
            Completed Rescues ({completedRescues.length})
          </button>
          <button
            className={`btn rounded-pill px-3.5 py-2 fw-semibold ${activeTab === 'all' ? 'btn-forest' : 'btn-light'}`}
            onClick={() => setActiveTab('all')}
          >
            All Claims ({myRescues.length})
          </button>
        </div>

        {/* Content List */}
        {displayedItems.length === 0 ? (
          <div className="empty-state-box text-center p-5 my-4">
            <div className="rounded-circle bg-light d-inline-flex p-3 text-muted mb-3">
              <i className={`bi ${activeTab === 'completed' ? 'bi-trophy' : 'bi-bag-x'} display-4`}></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">
              {activeTab === 'active'
                ? 'No Pending Pickups'
                : activeTab === 'completed'
                  ? 'No Completed Rescues Yet'
                  : 'You Haven’t Claimed Any Food Yet'}
            </h4>
            <p className="text-muted small max-w-500 mx-auto mb-4">
              {activeTab === 'active'
                ? 'You have collected all claimed items or haven’t claimed any active batches yet.'
                : 'Complete pickups to build your rescue track record and help eradicate food waste in Hyderabad.'}
            </p>
            <Link to="/explore" className="btn btn-forest rounded-pill px-4 py-2.5 fw-semibold">
              <i className="bi bi-compass me-1.5"></i> Browse Food to Rescue
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {displayedItems.map((item) => {
              const deadline = formatDeadline(item.pickupDeadline);
              const isClaimed = item.status === 'claimed';
              const isRescued = item.status === 'rescued';

              return (
                <div
                  key={item.id}
                  className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-3 p-md-4"
                >
                  <div className="row g-3 align-items-center">
                    {/* Thumbnail Image */}
                    <div className="col-md-3 col-sm-4">
                      <div className="rounded-3 overflow-hidden position-relative" style={{ height: '140px' }}>
                        <ImageWithFallback
                          src={item.imageUrl}
                          alt={item.name}
                          category={item.category}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="position-absolute top-0 start-0 m-2">
                          {isClaimed && (
                            <span className="badge bg-warning text-dark px-2.5 py-1 rounded-pill small">
                              Pending Pickup
                            </span>
                          )}
                          {isRescued && (
                            <span className="badge bg-success px-2.5 py-1 rounded-pill small">
                              Delivered
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="col-md-6 col-sm-8">
                      <div className="d-flex align-items-center gap-2 mb-1.5">
                        <span className="badge bg-light text-dark border px-2 py-0.5 small fw-semibold">
                          {item.quantity} {item.unit}
                        </span>
                        <span className="badge bg-forest-light text-forest px-2 py-0.5 small">
                          {item.category}
                        </span>
                        <span className="text-muted small">ID: {item.id}</span>
                      </div>

                      <h5 className="fw-bold text-dark mb-1">
                        <Link to={`/food/${item.id}`} className="text-decoration-none text-dark hover-forest">
                          {item.name}
                        </Link>
                      </h5>

                      <div className="text-secondary small mb-1">
                        <i className="bi bi-building me-1"></i>
                        <strong>{item.provider}</strong>
                      </div>

                      <div className="text-secondary small mb-2 text-truncate">
                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                        {item.pickupLocation}
                      </div>

                      {/* Deadline or Delivery Info */}
                      {isClaimed ? (
                        <div className="d-flex align-items-center gap-2 text-muted small">
                          <span className={deadline.isUrgent ? 'text-danger fw-semibold' : 'text-secondary'}>
                            <i className="bi bi-alarm me-1"></i> Deadline: {deadline.text}
                          </span>
                          {item.contactPhone && (
                            <span className="ms-2">
                              <i className="bi bi-telephone me-1"></i> {item.contactPhone}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-success small fw-medium">
                          <i className="bi bi-check2-circle me-1"></i>
                          Rescued on {new Date(item.rescuedAt || item.pickupDeadline).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="col-md-3 text-md-end pt-2 pt-md-0 border-top border-md-top-0">
                      <div className="d-flex flex-md-column gap-2 justify-content-end">
                        <Link
                          to={`/food/${item.id}`}
                          className="btn btn-outline-forest btn-sm rounded-pill px-3 py-1.5"
                        >
                          View Details
                        </Link>

                        {isClaimed && (
                          <>
                            <button
                              onClick={() => setRescuingItem(item)}
                              className="btn btn-forest btn-sm rounded-pill px-3 py-1.5 fw-semibold"
                            >
                              <i className="bi bi-check-lg me-1"></i> Mark as Rescued
                            </button>
                            <button
                              onClick={() => setCancellingItem(item)}
                              className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1.5"
                            >
                              <i className="bi bi-x-circle me-1"></i> Cancel Claim
                            </button>
                          </>
                        )}

                        {isRescued && (
                          <span className="badge bg-light text-forest border py-2 px-3 rounded-pill text-center small fw-semibold">
                            <i className="bi bi-shield-check me-1"></i> Rescue Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Claim Confirmation Modal */}
      {cancellingItem && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i> Cancel Claim?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCancellingItem(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
                  Are you sure you want to cancel your claim for <strong>"{cancellingItem.name}"</strong>?
                </p>
                <div className="bg-light p-3 rounded-3 small mb-2">
                  <div><strong>Provider:</strong> {cancellingItem.provider}</div>
                  <div><strong>Location:</strong> {cancellingItem.pickupLocation}</div>
                </div>
                <p className="text-muted small mb-0">
                  This listing will immediately become available again on the Explore Food page for other volunteers.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setCancellingItem(null)}
                >
                  Keep Claim
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-pill px-4"
                  onClick={handleCancelConfirm}
                >
                  Yes, Cancel Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark Rescued Confirmation Modal */}
      {rescuingItem && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-forest">
                  <i className="bi bi-check2-circle me-2"></i> Confirm Food Rescue
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRescuingItem(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
                  Confirm completion of rescue for <strong>"{rescuingItem.name}"</strong>?
                </p>
                <div className="bg-light p-3 rounded-3 small mb-3">
                  <div><strong>Quantity Rescued:</strong> {rescuingItem.quantity} {rescuingItem.unit}</div>
                  <div><strong>From:</strong> {rescuingItem.provider}</div>
                </div>
                <div className="alert alert-success py-2 small mb-0">
                  <i className="bi bi-trophy me-1"></i>
                  This will mark the rescue as complete and immediately increment community impact statistics!
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setRescuingItem(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-forest rounded-pill px-4"
                  onClick={handleRescueConfirm}
                >
                  Yes, Mark as Rescued!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRescues;
