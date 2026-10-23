import React, { useEffect } from 'react';
import { useFood } from '../context/FoodContext';

const ToastAlert = () => {
  const { toast, hideToast } = useFood();

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  if (!toast.show) return null;

  const iconMap = {
    success: 'bi-check-circle-fill text-success',
    danger: 'bi-exclamation-triangle-fill text-danger',
    warning: 'bi-exclamation-circle-fill text-warning',
    info: 'bi-info-circle-fill text-info'
  };

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999, maxWidth: '420px', width: '92%' }}
      role="region"
      aria-live="polite"
    >
      <div
        className={`toast show border-0 shadow-lg alert-${toast.type} bg-white rounded-3 overflow-hidden animate-slide-in`}
        style={{ borderLeft: `6px solid var(--bs-${toast.type || 'success'}) !important` }}
      >
        <div className="d-flex align-items-start p-3">
          <i className={`bi ${iconMap[toast.type] || iconMap.success} fs-4 me-3 mt-1`}></i>
          <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold text-dark">{toast.title}</h6>
            <p className="mb-0 text-secondary small">{toast.message}</p>
          </div>
          <button
            type="button"
            className="btn-close ms-2"
            aria-label="Close notification"
            onClick={hideToast}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ToastAlert;
