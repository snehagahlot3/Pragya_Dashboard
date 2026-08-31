import React from 'react';
import { getFilteredMatrix, formatPercent, PRAGYA_DATA, getActivityColor } from '../../data/pragyaData';
import ActivityLegend from '../ActivityLegend';
import { Users, UserCheck, Info, BarChart2, CalendarCheck } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AttendanceTab({ classFilter, activityFilter }) {
  const matrix = getFilteredMatrix(classFilter, activityFilter);

  // Compute aggregate stats for current filter view
  const heldItems = matrix.filter(item => item.hasHeld);
  
  const filterEnrolledTotal = matrix.reduce((acc, item) => acc + (item.strength || 0), 0);
  const filterAttendanceTotal = heldItems.reduce((acc, item) => acc + (item.attendanceCount || 0), 0);
  const filterWorkshopTotal = heldItems.reduce((acc, item) => acc + (item.workshopHeadcount || 0), 0);
  const filterAttendanceAvg = heldItems.length > 0
    ? (heldItems.reduce((acc, item) => acc + (item.attendancePercent || 0), 0) / heldItems.length)
    : 0;

  // Chart data setup with activity-specific colors
  const chartLabels = heldItems.map(item => `Class ${item.class}: ${item.activityName}`);
  const attendancePercentages = heldItems.map(item => +(item.attendancePercent * 100).toFixed(1));

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Attendance Rate (%)',
        data: attendancePercentages,
        backgroundColor: heldItems.map(item => getActivityColor(item.activityId, 'bg')),
        hoverBackgroundColor: heldItems.map(item => getActivityColor(item.activityId, 'hoverBg')),
        borderColor: heldItems.map(item => getActivityColor(item.activityId, 'border')),
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => {
            const idx = items[0].dataIndex;
            const item = heldItems[idx];
            return item ? `Class ${item.class}: ${item.activityName}` : items[0].label;
          },
          label: (context) => ` Attendance Rate: ${context.parsed.y}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (val) => `${val}%`,
          font: { family: 'Inter', size: 12 }
        },
        title: {
          display: true,
          text: 'Attendance Percentage (%)',
          font: { family: 'Inter', weight: 'bold', size: 12 },
          color: '#3A3350'
        }
      },
      x: {
        ticks: { font: { family: 'Inter', size: 11 }, color: '#3A3350' },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="tab-content">
      {/* Distinction Header Callout Card */}
      <div className="summary-banner" style={{ borderLeftColor: 'var(--butter)', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Info size={18} style={{ color: 'var(--plum)' }} />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Understanding Attendance Metrics</h3>
        </div>
        <p style={{ fontSize: '0.875rem' }}>
          This tab tracks two distinct headcount metrics: 
          <strong> Number of Students in Sessions</strong> (the headcount of distinct students present on session day, total 605 across first sessions) and 
          <strong> Cumulative Workshop Headcount</strong> (total student attendances across all sessions including repeated cohort workshops, total 705).
        </p>
      </div>

      {/* Summary Chips for Filtered View */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="kpi-card accent-butter">
          <div className="kpi-title">Number of Students in Sessions</div>
          <div className="kpi-value">{filterAttendanceTotal}</div>
          <div className="kpi-subtitle">Students present for primary session</div>
        </div>
        <div className="kpi-card accent-plum">
          <div className="kpi-title">Workshop Headcount</div>
          <div className="kpi-value">{filterWorkshopTotal}</div>
          <div className="kpi-subtitle">Cumulative attendances across all sessions</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Student Attendance Rate by Class & Activity</h3>
          <p className="section-caption">Percentage of registered students attending each activity session.</p>
        </div>

        {heldItems.length > 0 ? (
          <>
            <div style={{ height: '320px', position: 'relative' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
            <ActivityLegend />
          </>
        ) : (
          <div className="in-progress-card">
            <h4>No Sessions Recorded</h4>
            <p>No activity sessions match the selected class and activity filters.</p>
          </div>
        )}

        <div className="chart-caption-box">
          <Info size={18} />
          <span>
            <strong>Summary:</strong> Attendance ranged from 62.8% to 85.3% across cohorts, with Class 1 (Activity 3) recording the highest single-session turnout.
          </span>
        </div>
      </div>

      {/* Detailed Attendance Table */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Attendance & Headcount Breakdown Table</h3>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Activity Name</th>
                <th>Enrolled Strength</th>
                <th>Number of Students in Sessions</th>
                <th>Attendance Rate (%)</th>
                <th>Workshop Headcount (Cumulative)</th>
              </tr>
            </thead>
            <tbody>
              {matrix.filter(row => row.hasHeld).map((row, idx) => (
                <tr key={idx}>
                  <td><strong>Class {row.class}</strong></td>
                  <td>{row.activityName}</td>
                  <td>{row.strength}</td>
                  <td>{row.attendanceCount}</td>
                  <td>{formatPercent(row.attendancePercent)}</td>
                  <td>{row.workshopHeadcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
