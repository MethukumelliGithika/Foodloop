import React from 'react';

const StatCard = ({ icon, value, label, subtitle, colorScheme = 'forest', badgeText }) => {
  const schemeStyles = {
    forest: {
      bg: 'bg-forest-light',
      iconBg: 'bg-forest text-white',
      border: 'border-forest-subtle',
      textColor: 'text-forest'
    },
    emerald: {
      bg: 'bg-emerald-light',
      iconBg: 'bg-emerald text-white',
      border: 'border-emerald-subtle',
      textColor: 'text-emerald'
    },
    amber: {
      bg: 'bg-amber-light',
      iconBg: 'bg-amber text-white',
      border: 'border-amber-subtle',
      textColor: 'text-amber'
    },
    blue: {
      bg: 'bg-blue-light',
      iconBg: 'bg-primary text-white',
      border: 'border-primary-subtle',
      textColor: 'text-primary'
    },
    terracotta: {
      bg: 'bg-terracotta-light',
      iconBg: 'bg-terracotta text-white',
      border: 'border-terracotta-subtle',
      textColor: 'text-terracotta'
    }
  };

  const currentScheme = schemeStyles[colorScheme] || schemeStyles.forest;

  return (
    <div className={`card h-100 border rounded-4 shadow-sm stat-card p-3 p-md-4 ${currentScheme.border}`}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div
          className={`stat-icon-wrapper rounded-3 d-flex align-items-center justify-content-center ${currentScheme.iconBg}`}
          style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        {badgeText && (
          <span className="badge rounded-pill bg-white text-secondary border px-2.5 py-1 small fw-semibold">
            {badgeText}
          </span>
        )}
      </div>

      <div className="stat-content">
        <h2 className="display-6 fw-bold mb-1 tracking-tight text-dark">{value}</h2>
        <h6 className="text-secondary fw-semibold mb-1">{label}</h6>
        {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;
