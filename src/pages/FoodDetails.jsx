import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatDeadline } from '../components/FoodCard';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { donations, claimDonation, cancelClaim, completeRescue, isDonationExpired } = useFood();

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescueModal, setShowRescueModal] = useState(false);

  // Find donation by ID
  const donation = donations.find((d) => d.id === id);

  if (!donation) {
    return (
      <div className="container py-5 text-center">
        <div className="empty-state-box p-5 max-w-600 mx-auto">
          <i className="bi bi-exclamation-circle text-danger display-3 mb-3 d-block"></i>
          <h3 className="fw-bold text-dark">Donation Listing Not Found</h3>
          <p className="text-muted mb-4">
            The listing with ID <code>{id}</code> may have been removed or does not exist.
          </p>
          <Link to="/explore" className="btn btn-forest rounded-pill px-4 py-2">
            <i className="bi bi-arrow-left me-2"></i> Back to Explore Food
          </Link>
        </div>
      </div>
    );
  }

  const isExpired = donation.status === 'available' && isDonationExpired(donation);
  const effectiveStatus = isExpired ? 'expired' : donation.status;
  const deadlineInfo = formatDeadline(donation.pickupDeadline);
  const isClaimedByMe = donation.claimedBy === 'Demo Volunteer (You)';

  const handleClaim = () => {
    const res = claimDonation(donation.id);
    setShowClaimModal(false);
    if (res.success) {
      navigate('/my-rescues');
    }
  };

  const handleCancel = () => {
    cancelClaim(donation.id);
    setShowCancelModal(false);
  };

  const handleRescue = () => {
    completeRescue(donation.id);
    setShowRescueModal(false);
  };

  return (
    <div className="food-details-page py-4 py-md-5">
      <div className="container">
        {/* Breadcrumb navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-forest">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/explore" className="text-decoration-none text-forest">Explore Food</Link>
            </li>
            <li className="breadcrumb-item active text-truncate" style={{ maxWidth: '280px' }} aria-current="page">
              {donation.name}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Left Column: Image & Highlights */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
              <div className="position-relative" style={{ height: '360px' }}>
                <ImageWithFallback
                  src={donation.imageUrl}
                  alt={donation.name}
                  category={donation.category}
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute top-0 start-0 m-3 d-flex gap-2">
                  {effectiveStatus === 'available' && (
                    <span className="badge bg-success rounded-pill px-3 py-2 fs-6 shadow-sm">
                      <i className="bi bi-check-circle me-1"></i> Available for Rescue
                    </span>
                  )}
                  {effectiveStatus === 'claimed' && (
                    <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fs-6 shadow-sm">
                      <i className="bi bi-clock-history me-1"></i> Claimed (In Transit)
                    </span>
                  )}
                  {effectiveStatus === 'rescued' && (
                    <span className="badge bg-info text-dark rounded-pill px-3 py-2 fs-6 shadow-sm">
                      <i className="bi bi-check2-all me-1"></i> Rescued & Delivered
                    </span>
                  )}
                  {effectiveStatus === 'expired' && (
                    <span className="badge bg-secondary rounded-pill px-3 py-2 fs-6 shadow-sm">
                      <i className="bi bi-x-circle me-1"></i> Pickup Window Expired
                    </span>
                  )}
                </div>
              </div>

              <div className="card-body p-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <span className="badge bg-forest-light text-forest px-3 py-1.5 rounded-pill fw-semibold">
                    <i className="bi bi-tag me-1"></i> {donation.category}
                  </span>
                  <span className="text-muted small">
                    <i className="bi bi-hash"></i> ID: {donation.id}
                  </span>
                </div>

                <h2 className="fw-bold text-dark mb-3">{donation.name}</h2>

                <h5 className="fw-bold text-forest mb-2">Description</h5>
                <p className="text-secondary leading-relaxed mb-4">
                  {donation.description}
                </p>

                {donation.handlingNotes && (
                  <div className="alert alert-warning border-warning-subtle rounded-3 p-3 mb-0">
                    <h6 className="fw-bold mb-1 text-warning-emphasis">
                      <i className="bi bi-info-circle me-1"></i> Handling & Food Safety Instructions
                    </h6>
                    <p className="small mb-0 text-secondary">{donation.handlingNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Actions Card */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '85px', zIndex: 10 }}>
              <h4 className="fw-bold text-dark mb-3 pb-2 border-bottom">Donation Details</h4>

              <div className="d-flex flex-column gap-3 mb-4">
                {/* Quantity */}
                <div className="d-flex align-items-start gap-3">
                  <div className="rounded-3 bg-forest-light text-forest d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                    <i className="bi bi-box2-heart fs-5"></i>
                  </div>
                  <div>
                    <span className="text-muted small d-block">Quantity Available</span>
                    <strong className="text-dark fs-5">{donation.quantity} {donation.unit}</strong>
                  </div>
                </div>

                {/* Provider */}
                <div className="d-flex align-items-start gap-3">
                  <div className="rounded-3 bg-emerald-light text-emerald d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                    <i className="bi bi-building fs-5"></i>
                  </div>
                  <div>
                    <span className="text-muted small d-block">Listed By</span>
                    <strong className="text-dark d-block">{donation.provider}</strong>
                    <span className="badge bg-light text-secondary border small">{donation.providerType}</span>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="d-flex align-items-start gap-3">
                  <div className="rounded-3 bg-terracotta-light text-terracotta d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                    <i className="bi bi-geo-alt-fill fs-5"></i>
                  </div>
                  <div>
                    <span className="text-muted small d-block">Pickup Location</span>
                    <strong className="text-dark d-block">{donation.pickupLocation}</strong>
                    <span className="small text-muted">Hyderabad, Telangana</span>
                  </div>
                </div>

                {/* Pickup Deadline */}
                <div className="d-flex align-items-start gap-3">
                  <div className="rounded-3 bg-amber-light text-amber d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', flexShrink: 0 }}>
                    <i className="bi bi-clock-history fs-5"></i>
                  </div>
                  <div>
                    <span className="text-muted small d-block">Pickup Deadline</span>
                    <strong className={`d-block ${deadlineInfo.isUrgent ? 'text-danger' : 'text-dark'}`}>
                      {new Date(donation.pickupDeadline).toLocaleString([], {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </strong>
                    <span className={`small ${deadlineInfo.isUrgent ? 'text-danger fw-semibold' : 'text-muted'}`}>
                      {deadlineInfo.text}
                    </span>
                  </div>
                </div>

                {/* Contact phone if claimed */}
                {effectiveStatus === 'claimed' && donation.contactPhone && (
                  <div className="d-flex align-items-start gap-3 bg-light p-2.5 rounded-3">
                    <div className="rounded-3 bg-white text-forest d-flex align-items-center justify-content-center border" style={{ width: '38px', height: '38px', flexShrink: 0 }}>
                      <i className="bi bi-telephone fs-5"></i>
                    </div>
                    <div>
                      <span className="text-muted small d-block">Pickup Desk Contact</span>
                      <strong className="text-forest">{donation.contactPhone}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Notice & Call to Actions */}
              <div className="pt-3 border-top">
                {effectiveStatus === 'available' && (
                  <div>
                    <button
                      onClick={() => setShowClaimModal(true)}
                      className="btn btn-forest btn-lg w-100 rounded-pill fw-bold py-2.5 shadow-sm mb-2"
                    >
                      <i className="bi bi-hand-index-thumb me-2"></i> Claim Food for Rescue
                    </button>
                    <p className="text-muted small text-center mb-0">
                      Claiming reserves this batch for you to pick up before the deadline.
                    </p>
                  </div>
                )}

                {effectiveStatus === 'claimed' && isClaimedByMe && (
                  <div>
                    <div className="alert alert-success py-2.5 px-3 rounded-3 small mb-3">
                      <i className="bi bi-check-circle-fill me-1.5"></i>
                      <strong>Claimed by You!</strong> Please proceed to the location to pick up.
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <button
                        onClick={() => setShowRescueModal(true)}
                        className="btn btn-forest rounded-pill fw-bold py-2 w-100"
                      >
                        <i className="bi bi-check2-circle me-1.5"></i> Mark as Rescued & Delivered
                      </button>
                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="btn btn-outline-danger rounded-pill fw-semibold py-2 w-100"
                      >
                        <i className="bi bi-x-circle me-1.5"></i> Cancel My Claim
                      </button>
                    </div>
                  </div>
                )}

                {effectiveStatus === 'claimed' && !isClaimedByMe && (
                  <div className="alert alert-warning py-3 rounded-3 mb-0">
                    <h6 className="fw-bold mb-1">
                      <i className="bi bi-hourglass-split me-1"></i> Currently Claimed
                    </h6>
                    <p className="small mb-0 text-secondary">
                      This donation was claimed by another volunteer and is currently in transit for distribution.
                    </p>
                  </div>
                )}

                {effectiveStatus === 'rescued' && (
                  <div className="alert alert-info py-3 rounded-3 mb-0">
                    <h6 className="fw-bold text-info-emphasis mb-1">
                      <i className="bi bi-trophy-fill me-1"></i> Successfully Rescued!
                    </h6>
                    <p className="small mb-0 text-secondary">
                      This food was rescued and distributed to the community. Thank you to everyone involved!
                    </p>
                  </div>
                )}

                {effectiveStatus === 'expired' && (
                  <div className="alert alert-secondary py-3 rounded-3 mb-0">
                    <h6 className="fw-bold text-dark mb-1">
                      <i className="bi bi-x-octagon-fill me-1"></i> Listing Expired
                    </h6>
                    <p className="small mb-0 text-muted">
                      The safe pickup window for this surplus food has passed.
                    </p>
                  </div>
                )}
              </div>

              {/* Back to Explore link */}
              <div className="text-center mt-3 pt-2">
                <Link to="/explore" className="text-decoration-none text-muted small hover-forest">
                  <i className="bi bi-arrow-left me-1"></i> Back to all available donations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Confirmation Modal */}
      {showClaimModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-forest">
                  <i className="bi bi-bag-check me-2"></i> Confirm Rescue Claim
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowClaimModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-3">
                  Are you ready to claim <strong>"{donation.name}"</strong>?
                </p>
                <div className="bg-light p-3 rounded-3 small mb-3">
                  <div><strong>Quantity:</strong> {donation.quantity} {donation.unit}</div>
                  <div><strong>Pickup from:</strong> {donation.provider}</div>
                  <div><strong>Address:</strong> {donation.pickupLocation}</div>
                  <div><strong>Deadline:</strong> {new Date(donation.pickupDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div className="alert alert-info py-2 small mb-0">
                  <i className="bi bi-info-circle-fill me-1"></i>
                  Please ensure you or your organization can complete pickup before the scheduled deadline.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setShowClaimModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-forest rounded-pill px-4"
                  onClick={handleClaim}
                >
                  Yes, Claim Food
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Claim Modal */}
      {showCancelModal && (
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
                  onClick={() => setShowCancelModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
                  Are you sure you want to cancel your claim for <strong>"{donation.name}"</strong>?
                </p>
                <p className="text-muted small mb-0">
                  The listing will immediately be made available again for other volunteers in Hyderabad to claim.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Claim
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-pill px-4"
                  onClick={handleCancel}
                >
                  Yes, Cancel Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark Rescued Modal */}
      {showRescueModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-forest">
                  <i className="bi bi-check2-circle me-2"></i> Mark Food as Rescued
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRescueModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
                  Have you successfully collected and distributed <strong>"{donation.name}"</strong>?
                </p>
                <p className="text-muted small mb-0">
                  This will record the rescue, prevent food waste, and update the community impact statistics immediately!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-3"
                  onClick={() => setShowRescueModal(false)}
                >
                  Not Yet
                </button>
                <button
                  type="button"
                  className="btn btn-forest rounded-pill px-4"
                  onClick={handleRescue}
                >
                  Yes, Mark Rescued!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
