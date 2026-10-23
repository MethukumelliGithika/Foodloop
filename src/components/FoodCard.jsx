import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { useFood } from '../context/FoodContext';

export const formatDeadline = (isoString) => {
  if (!isoString) return 'Flexible';
  const target = new Date(isoString);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (diffMs <= 0) {
    return { text: 'Expired', isUrgent: true, isExpired: true };
  } else if (diffHours < 1) {
    const mins = Math.max(1, Math.round(diffMs / (1000 * 60)));
    return { text: `Urgent: ${mins}m left`, isUrgent: true, isExpired: false };
  } else if (diffHours <= 4) {
    return {
      text: `${diffHours}h left (${target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      isUrgent: true,
      isExpired: false
    };
  } else if (diffHours < 24) {
    return {
      text: `Today, ${target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      isUrgent: false,
      isExpired: false
    };
  } else {
    return {
      text: target.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      isUrgent: false,
      isExpired: false
    };
  }
};

const categoryBadgeStyles = {
  'Vegetarian': { bg: 'bg-success-subtle text-success border border-success-subtle', icon: 'bi-flower1' },
  'Non-Vegetarian': { bg: 'bg-danger-subtle text-danger border border-danger-subtle', icon: 'bi-egg-fried' },
  'Bakery': { bg: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle', icon: 'bi-cake2' },
  'Fruits & Vegetables': { bg: 'bg-emerald-subtle text-emerald border border-emerald-subtle', icon: 'bi-basket' }
};

const FoodCard = ({ donation, onClaimClick }) => {
  const { isDonationExpired } = useFood();
  const deadlineInfo = formatDeadline(donation.pickupDeadline);
  const isExpired = donation.status === 'available' && isDonationExpired(donation);
  const effectiveStatus = isExpired ? 'expired' : donation.status;

  const catStyle = categoryBadgeStyles[donation.category] || {
    bg: 'bg-secondary-subtle text-secondary',
    icon: 'bi-tag'
  };

  const getStatusBadge = () => {
    switch (effectiveStatus) {
      case 'available':
        return <span className="badge rounded-pill bg-success px-2.5 py-1.5"><i className="bi bi-check-circle me-1"></i>Available</span>;
      case 'claimed':
        return <span className="badge rounded-pill bg-warning text-dark px-2.5 py-1.5"><i className="bi bi-clock-history me-1"></i>Claimed</span>;
      case 'rescued':
        return <span className="badge rounded-pill bg-info text-dark px-2.5 py-1.5"><i className="bi bi-check2-all me-1"></i>Rescued</span>;
      case 'expired':
        return <span className="badge rounded-pill bg-secondary px-2.5 py-1.5"><i className="bi bi-x-circle me-1"></i>Expired</span>;
      default:
        return null;
    }
  };

  return (
    <div className="card h-100 food-card border-0 shadow-sm rounded-4 overflow-hidden position-relative">
      {/* Food Image & Floating Badges */}
      <div className="position-relative food-card-image-wrapper">
        <ImageWithFallback
          src={donation.imageUrl}
          alt={donation.name}
          category={donation.category}
          className="card-img-top food-card-img"
        />
        <div className="position-absolute top-0 start-0 m-3 d-flex flex-wrap gap-2">
          {getStatusBadge()}
        </div>
        <div className="position-absolute top-0 end-0 m-3">
          <span className={`badge rounded-pill px-2.5 py-1.5 fw-semibold ${catStyle.bg}`}>
            <i className={`bi ${catStyle.icon} me-1`}></i>
            {donation.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body d-flex flex-column p-3 p-md-4">
        {/* Quantity & Provider */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-light text-dark border px-2.5 py-1.5 fw-bold text-nowrap">
            <i className="bi bi-box2-heart text-success me-1"></i>
            {donation.quantity} {donation.unit}
          </span>
          <span className="text-muted small text-truncate ms-2" title={donation.provider}>
            <i className="bi bi-building me-1"></i>
            {donation.provider}
          </span>
        </div>

        {/* Title */}
        <h5 className="card-title fw-bold text-dark mb-2 text-line-clamp-2" title={donation.name}>
          <Link to={`/food/${donation.id}`} className="text-decoration-none text-dark hover-forest">
            {donation.name}
          </Link>
        </h5>

        {/* Pickup Location */}
        <p className="card-text text-secondary small mb-2 text-truncate" title={donation.pickupLocation}>
          <i className="bi bi-geo-alt-fill text-danger me-1"></i>
          {donation.pickupLocation}
        </p>

        {/* Pickup Deadline */}
        <div className={`p-2 rounded-3 small mb-3 ${deadlineInfo.isUrgent ? 'bg-danger-subtle text-danger fw-semibold' : 'bg-light text-secondary'}`}>
          <i className={`bi ${deadlineInfo.isUrgent ? 'bi-alarm-fill' : 'bi-clock'} me-1.5`}></i>
          <span>Deadline: {deadlineInfo.text}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-2 border-top d-flex gap-2">
          <Link
            to={`/food/${donation.id}`}
            className="btn btn-outline-forest flex-grow-1 rounded-pill fw-medium btn-sm py-2"
          >
            View Details
          </Link>
          {effectiveStatus === 'available' && onClaimClick && (
            <button
              onClick={() => onClaimClick(donation)}
              className="btn btn-forest rounded-pill fw-medium btn-sm py-2 px-3 text-nowrap"
            >
              <i className="bi bi-hand-index-thumb me-1"></i>
              Claim
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
