import React from 'react';
import { ACTIVITY_COLORS } from '../data/pragyaData';

export default function ActivityLegend() {
  return (
    <div 
      className="activity-legend" 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        flexWrap: 'wrap',
        marginTop: '1rem',
        marginBottom: '0.25rem',
        padding: '0.6rem 1rem',
        background: 'var(--pale-lavender)',
        border: '1px solid var(--lavender)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.825rem',
        fontWeight: 600,
        color: 'var(--plum)'
      }}
    >
      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.75 }}>
        Activity Colors:
      </span>
      {Object.values(ACTIVITY_COLORS).map(act => (
        <div key={act.name} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span 
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              backgroundColor: act.bg,
              display: 'inline-block',
              boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
            }} 
          />
          <span>{act.label}</span>
        </div>
      ))}
    </div>
  );
}
