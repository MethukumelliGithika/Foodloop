import React, { useState } from 'react';

const categoryPlaceholders = {
  'Vegetarian': {
    bg: '#E8F5E9',
    color: '#2E7D32',
    icon: 'bi-flower1',
    label: 'Fresh Veg Meal'
  },
  'Non-Vegetarian': {
    bg: '#FFF3E0',
    color: '#D84315',
    icon: 'bi-egg-fried',
    label: 'Non-Veg Meal'
  },
  'Bakery': {
    bg: '#FFF8E1',
    color: '#F57F17',
    icon: 'bi-cake2',
    label: 'Fresh Bakery'
  },
  'Fruits & Vegetables': {
    bg: '#F1F8E9',
    color: '#33691E',
    icon: 'bi-basket',
    label: 'Fresh Produce'
  }
};

const ImageWithFallback = ({ src, alt, category, className, style }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fallback = categoryPlaceholders[category] || {
    bg: '#E8F5E9',
    color: '#2D6A4F',
    icon: 'bi-box-seam',
    label: 'Food Donation'
  };

  if (!src || hasError) {
    return (
      <div
        className={`d-flex flex-column align-items-center justify-content-center text-center p-3 ${className || ''}`}
        style={{
          backgroundColor: fallback.bg,
          color: fallback.color,
          minHeight: '180px',
          ...style
        }}
        aria-label={alt}
      >
        <i className={`bi ${fallback.icon} display-4 mb-2`}></i>
        <span className="small fw-semibold">{fallback.label}</span>
      </div>
    );
  }

  return (
    <div className="position-relative overflow-hidden w-100 h-100" style={{ minHeight: '180px' }}>
      {isLoading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light"
          style={{ zIndex: 1 }}
        >
          <div className="spinner-border spinner-border-sm text-success" role="status">
            <span className="visually-hidden">Loading food image...</span>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.25s ease-in-out'
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default ImageWithFallback;
