import React, { useState } from 'react';
import { getClassActivityMatrix, formatPercent, formatValue, PRAGYA_DATA } from '../../data/pragyaData';
import { Table, Download, Search, FileSpreadsheet } from 'lucide-react';

export default function RawDataTab() {
  const matrix = getClassActivityMatrix();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatrix = matrix.filter(row => {
    const term = searchTerm.toLowerCase();
    return (
      `class ${row.class}`.toLowerCase().includes(term) ||
      row.activityName.toLowerCase().includes(term) ||
      (row.vocabulary && row.vocabulary.join(' ').toLowerCase().includes(term))
    );
  });

  const exportToCSV = () => {
    const headers = [
      'Class',
      'Enrolled Strength',
      'Activity ID',
      'Activity Name',
      'Unique Attendance Count',
      'Attendance Percent',
      'Sessions Count',
      'Workshop Headcount',
      'Engaged Count',
      'Engagement Rate',
      'Good Comprehension Count',
      'Comprehension Rate',
      'Vocabulary Introduced'
    ];

    const rows = matrix.map(r => [
      `Class ${r.class}`,
      r.strength,
      r.activityId,
      `"${r.activityName}"`,
      r.hasHeld ? r.attendanceCount : '—',
      r.hasHeld ? formatPercent(r.attendancePercent) : '—',
      r.hasHeld ? (typeof r.sessionCount === 'string' ? r.sessionCount.replace('*', '') : r.sessionCount) : '—',
      r.hasHeld ? r.workshopHeadcount : '—',
      r.hasHeld ? r.engagedCount : '—',
      r.hasHeld ? formatPercent(r.engagementRate) : '—',
      r.hasHeld ? r.goodComprehensionCount : '—',
      r.hasHeld ? formatPercent(r.comprehensionRate) : '—',
      r.vocabulary && r.vocabulary.length > 0 ? `"${r.vocabulary.join(', ')}"` : '—'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pragya_ai_pilot_raw_data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tab-content">
      {/* Controls: Search & CSV Export */}
      <div className="search-input-wrapper">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--plum)', opacity: 0.6 }} />
          <input
            type="text"
            className="search-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search class, activity, or terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="btn-secondary" onClick={exportToCSV}>
          <Download size={14} /> Export Raw Data (CSV)
        </button>
      </div>

      {/* Table Section */}
      <div className="section-card" style={{ padding: '1rem' }}>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Strength</th>
                <th>Activity</th>
                <th>Unique Att.</th>
                <th>Att. %</th>
                <th>Sessions</th>
                <th>Workshop Headcount</th>
                <th>Engaged</th>
                <th>Eng. %</th>
                <th>Good Comp.</th>
                <th>Comp. %</th>
                <th>Vocabulary</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatrix.map((r, idx) => (
                <tr key={idx}>
                  <td><strong>Class {r.class}</strong></td>
                  <td>{r.strength}</td>
                  <td>{r.activityName}</td>
                  <td>{r.hasHeld ? r.attendanceCount : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? formatPercent(r.attendancePercent) : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? (typeof r.sessionCount === 'string' ? r.sessionCount.replace('*', '') : r.sessionCount) : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? r.workshopHeadcount : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? r.engagedCount : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? formatPercent(r.engagementRate) : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? r.goodComprehensionCount : <span className="empty-cell">—</span>}</td>
                  <td>{r.hasHeld ? formatPercent(r.comprehensionRate) : <span className="empty-cell">—</span>}</td>
                  <td>
                    {r.vocabulary && r.vocabulary.length > 0 ? (
                      r.vocabulary.join(', ')
                    ) : (
                      <span className="empty-cell">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
