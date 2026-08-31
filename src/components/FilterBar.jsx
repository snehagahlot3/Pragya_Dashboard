import React from 'react';
import { PRAGYA_DATA } from '../data/pragyaData';
import { Filter, Layers, Info } from 'lucide-react';

export default function FilterBar({ classFilter, onClassChange, activityFilter, onActivityChange, isOverview = false }) {
  if (isOverview) {
    return (
      <div className="filter-bar" style={{ opacity: 0.9 }}>
        <div className="filter-info">
          <Info size={16} style={{ color: 'var(--plum)' }} />
          <span>Overview presents aggregate pilot totals across all classes and activities. Use the tabs above to filter by class or activity.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">
          <Filter size={15} /> Class:
        </span>
        <div className="filter-chips">
          <button
            className={`chip-btn ${classFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => onClassChange('ALL')}
          >
            All Classes
          </button>
          {PRAGYA_DATA.meta.classes.map(c => (
            <button
              key={c}
              className={`chip-btn ${String(classFilter) === String(c) ? 'active' : ''}`}
              onClick={() => onClassChange(String(c))}
            >
              Class {c}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">
          <Layers size={15} /> Activity:
        </span>
        <div className="filter-chips">
          <button
            className={`chip-btn ${activityFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => onActivityChange('ALL')}
          >
            All Activities
          </button>
          {PRAGYA_DATA.meta.activities.map(a => (
            <button
              key={a.id}
              className={`chip-btn ${String(activityFilter) === String(a.id) ? 'active' : ''}`}
              onClick={() => onActivityChange(String(a.id))}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
