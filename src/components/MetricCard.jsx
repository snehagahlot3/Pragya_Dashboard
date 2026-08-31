import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, accent = 'plum' }) {
  return (
    <div className={`kpi-card accent-${accent}`}>
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
    </div>
  );
}
