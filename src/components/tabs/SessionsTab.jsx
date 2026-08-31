import React from 'react';
import { getFilteredMatrix, PRAGYA_DATA, formatValue, getActivityColor } from '../../data/pragyaData';
import { BookOpen, Calendar, AlertCircle, Info, Hash } from 'lucide-react';

export default function SessionsTab({ classFilter, activityFilter }) {
  const matrix = getFilteredMatrix(classFilter, activityFilter);

  // Derive session code breakdown for each class and activity
  const sessionBreakdown = matrix.map(item => {
    const classStr = String(item.class);
    const actIdStr = String(item.activityId);

    // Find session codes from PRAGYA_DATA.studentsByActivityBySession.byClass
    const classSessionObj = PRAGYA_DATA.studentsByActivityBySession.byClass[classStr] || {};
    
    // Match session codes that correspond to activityId
    // Activity 1 -> 1.1, 1.2
    // Activity 2 -> 2.1
    // Activity 3 -> 3.1
    const matchingSessionCodes = [];
    const sessionHeadcounts = [];

    Object.entries(classSessionObj).forEach(([code, count]) => {
      if (actIdStr === '1' && code.startsWith('1.')) {
        matchingSessionCodes.push(code);
        sessionHeadcounts.push(`${code}: ${count}`);
      } else if (actIdStr === '2' && code.startsWith('2.')) {
        matchingSessionCodes.push(code);
        sessionHeadcounts.push(`${code}: ${count}`);
      } else if (actIdStr === '3' && code.startsWith('3.')) {
        matchingSessionCodes.push(code);
        sessionHeadcounts.push(`${code}: ${count}`);
      }
    });

    return {
      ...item,
      sessionCodes: matchingSessionCodes.length > 0 ? matchingSessionCodes.join(', ') : '—',
      sessionHeadcounts: sessionHeadcounts.length > 0 ? sessionHeadcounts.join(' | ') : '—'
    };
  });

  return (
    <div className="tab-content">
      {/* Overview Card */}
      <div className="summary-banner" style={{ borderLeftColor: 'var(--plum)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <BookOpen size={18} style={{ color: 'var(--plum)' }} />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Pilot Workshop & Session Distribution</h3>
        </div>
        <p style={{ fontSize: '0.875rem' }}>
          A total of <strong>15 workshop sessions</strong> have been delivered across Classes 1–5. Some cohorts received split sessions or make-up workshops to ensure full coverage despite school calendar constraints.
        </p>
      </div>

      {/* Sessions Table */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Session Distribution Matrix</h3>
          <p className="section-caption">Breakdown of delivered sessions, session codes, and student headcount per session.</p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Activity Name</th>
                <th>Sessions Count</th>
                <th>Session Code(s)</th>
                <th>Headcount per Session Breakdown</th>
                <th>Total Workshop Headcount</th>
              </tr>
            </thead>
            <tbody>
              {sessionBreakdown.filter(row => row.hasHeld).map((row, idx) => (
                <tr key={idx}>
                  <td><strong>Class {row.class}</strong></td>
                  <td>{row.activityName}</td>
                  <td>
                    <span style={{ fontWeight: 700 }}>
                      {typeof row.sessionCount === 'string' ? row.sessionCount.replace('*', '') : row.sessionCount}
                    </span>
                  </td>
                  <td>{row.sessionCodes}</td>
                  <td>{row.sessionHeadcounts}</td>
                  <td>{row.workshopHeadcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Breakdown List */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Activity Curriculum Summary</h3>
          <p className="section-caption">Pedagogical objectives and role-play mechanics for each activity.</p>
        </div>

        <div className="activity-cards-grid">
          {PRAGYA_DATA.meta.activities.map(act => (
            <div key={act.id} className="activity-card" style={{ borderTop: `4px solid ${getActivityColor(act.id, 'bg')}` }}>
              <span 
                className="activity-number"
                style={{ 
                  backgroundColor: getActivityColor(act.id, 'bg'), 
                  color: act.id === 3 ? '#2A2438' : '#FFFFFF' 
                }}
              >
                Activity {act.id}
              </span>
              <h4 className="activity-name">{act.name}</h4>
              <p className="activity-subtitle">{act.subtitle}</p>
              <p className="activity-desc">{act.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
