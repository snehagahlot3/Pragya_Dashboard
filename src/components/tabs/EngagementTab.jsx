import React from 'react';
import { getFilteredMatrix, formatPercent, PRAGYA_DATA, SUCCESS_THRESHOLD } from '../../data/pragyaData';
import ThresholdBadge from '../ThresholdBadge';
import { Sparkles, Info, CheckCircle2, TrendingUp } from 'lucide-react';
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

export default function EngagementTab({ classFilter, activityFilter }) {
  const matrix = getFilteredMatrix(classFilter, activityFilter);
  const heldItems = matrix.filter(item => item.hasHeld);

  const totalEngaged = heldItems.reduce((acc, item) => acc + (item.engagedCount || 0), 0);
  const totalWorkshop = heldItems.reduce((acc, item) => acc + (item.workshopHeadcount || 0), 0);
  const avgEngagementRate = heldItems.length > 0
    ? (heldItems.reduce((acc, item) => acc + (item.engagementRate || 0), 0) / heldItems.length)
    : 0;

  // Chart setup
  const chartLabels = heldItems.map(item => `C${item.class} - ${item.activityName}`);
  const engagementRates = heldItems.map(item => +(item.engagementRate * 100).toFixed(1));

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Engagement Rate (%)',
        data: engagementRates,
        backgroundColor: '#3A3350',
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
          label: (context) => ` Engagement Rate: ${context.parsed.y}%`
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
          text: 'Engagement Rate (%)',
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
      {/* Summary KPI Banner */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="kpi-card accent-plum">
          <div className="kpi-title">Total Engaged Headcount</div>
          <div className="kpi-value">{totalEngaged}</div>
          <div className="kpi-subtitle">Out of {totalWorkshop} total workshop attendances</div>
        </div>
        <div className="kpi-card accent-butter">
          <div className="kpi-title">Average Engagement Rate</div>
          <div className="kpi-value">{formatPercent(avgEngagementRate)}</div>
          <div className="kpi-subtitle">Across filtered activity sessions</div>
        </div>
        <div className="kpi-card accent-plum">
          <div className="kpi-title">Target Success Threshold</div>
          <div className="kpi-value">{(SUCCESS_THRESHOLD.postAssessment * 100).toFixed(0)}%</div>
          <div className="kpi-subtitle">Configurable baseline benchmark</div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Student Engagement Rates by Cohort</h3>
          <p className="section-caption">Percentage of participating students actively involved in activity mechanics.</p>
        </div>

        {heldItems.length > 0 ? (
          <div style={{ height: '320px', position: 'relative' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="in-progress-card">
            <h4>No Sessions Recorded</h4>
            <p>No activity sessions match the selected class and activity filters.</p>
          </div>
        )}

        <div className="chart-caption-box">
          <Info size={18} />
          <span>
            <strong>Plain English Summary:</strong> Engagement is consistently high across all classes (86.2% – 98.2%), significantly exceeding the 70% success benchmark.
          </span>
        </div>
      </div>

      {/* Engagement Data Table */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Engagement Audit & Benchmark Status Table</h3>
          <p className="section-caption">Individual class and activity engagement metrics with threshold evaluation.</p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Activity Name</th>
                <th>Workshop Headcount</th>
                <th>Engaged Students</th>
                <th>Engagement Rate (%)</th>
                <th>Benchmark Status (Target: {(SUCCESS_THRESHOLD.postAssessment * 100).toFixed(0)}%)</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>Class {row.class}</strong></td>
                  <td>{row.activityName}</td>
                  <td>{row.hasHeld ? row.workshopHeadcount : <span className="empty-cell">—</span>}</td>
                  <td>{row.hasHeld ? row.engagedCount : <span className="empty-cell">—</span>}</td>
                  <td>{row.hasHeld ? formatPercent(row.engagementRate) : <span className="empty-cell">—</span>}</td>
                  <td>
                    {row.hasHeld ? (
                      <ThresholdBadge rate={row.engagementRate} />
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
