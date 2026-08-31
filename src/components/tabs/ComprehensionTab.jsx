import React from 'react';
import { getFilteredMatrix, formatPercent, PRAGYA_DATA, SUCCESS_THRESHOLD, getActivityColor } from '../../data/pragyaData';
import ThresholdBadge from '../ThresholdBadge';
import ActivityLegend from '../ActivityLegend';
import { Brain, Info, CheckCircle2, Award } from 'lucide-react';
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

export default function ComprehensionTab({ classFilter, activityFilter }) {
  const matrix = getFilteredMatrix(classFilter, activityFilter);
  const heldItems = matrix.filter(item => item.hasHeld);

  const totalGoodComp = heldItems.reduce((acc, item) => acc + (item.goodComprehensionCount || 0), 0);
  const totalWorkshop = heldItems.reduce((acc, item) => acc + (item.workshopHeadcount || 0), 0);
  const avgCompRate = heldItems.length > 0
    ? (heldItems.reduce((acc, item) => acc + (item.comprehensionRate || 0), 0) / heldItems.length)
    : 0;

  // Chart setup with activity-specific colors
  const chartLabels = heldItems.map(item => `Class ${item.class}: ${item.activityName}`);
  const comprehensionRates = heldItems.map(item => +(item.comprehensionRate * 100).toFixed(1));

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Comprehension Rate (%)',
        data: comprehensionRates,
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
          label: (context) => ` Comprehension Rate: ${context.parsed.y}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 50,
        max: 100,
        ticks: {
          callback: (val) => `${val}%`,
          font: { family: 'Inter', size: 12 }
        },
        title: {
          display: true,
          text: 'Comprehension Rate (%)',
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
      {/* Summary KPI Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="kpi-card accent-plum">
          <div className="kpi-title">Good Comprehension Count</div>
          <div className="kpi-value">{totalGoodComp}</div>
          <div className="kpi-subtitle">Students mastering key concepts ({totalWorkshop} workshop total)</div>
        </div>
        <div className="kpi-card accent-butter">
          <div className="kpi-title">Average Comprehension Rate</div>
          <div className="kpi-value">{formatPercent(avgCompRate)}</div>
          <div className="kpi-subtitle">Across filtered activity sessions</div>
        </div>
        <div className="kpi-card accent-plum">
          <div className="kpi-title">Target Success Threshold</div>
          <div className="kpi-value">{(SUCCESS_THRESHOLD.postAssessment * 100).toFixed(0)}%</div>
          <div className="kpi-subtitle">Configurable baseline benchmark</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Student Comprehension Rates by Cohort</h3>
          <p className="section-caption">Percentage of participating students demonstrating accurate understanding of AI concepts.</p>
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
            <strong>Summary:</strong> Over 90% of participating students successfully comprehend foundational AI concepts without technical jargon. All active cohorts comfortably satisfy the 70% threshold requirement.
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Comprehension Audit & Benchmark Table</h3>
          <p className="section-caption">Detailed breakdown of good comprehension headcounts and threshold benchmark indicators.</p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Activity Name</th>
                <th>Workshop Headcount</th>
                <th>Good Comprehension Count</th>
                <th>Comprehension Rate (%)</th>
                <th>Benchmark Status (Target: {(SUCCESS_THRESHOLD.postAssessment * 100).toFixed(0)}%)</th>
              </tr>
            </thead>
            <tbody>
              {matrix.filter(row => row.hasHeld).map((row, idx) => (
                <tr key={idx}>
                  <td><strong>Class {row.class}</strong></td>
                  <td>{row.activityName}</td>
                  <td>{row.workshopHeadcount}</td>
                  <td>{row.goodComprehensionCount}</td>
                  <td>{formatPercent(row.comprehensionRate)}</td>
                  <td>
                    <ThresholdBadge rate={row.comprehensionRate} />
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
