import React from 'react';
import { getOverviewStats, formatPercent, PRAGYA_DATA, ACTIVITY_COLORS, getActivityColor } from '../../data/pragyaData';
import MetricCard from '../MetricCard';
import ActivityLegend from '../ActivityLegend';
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  Percent, 
  Sparkles, 
  Brain, 
  Info, 
  Layers, 
  TrendingUp, 
  FileCheck2 
} from 'lucide-react';
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

export default function OverviewTab() {
  const stats = getOverviewStats();

  // Chart data for Overview Summary Metrics using theme palette
  const chartData = {
    labels: ['Attendance Rate', 'Engagement Rate', 'Comprehension Rate'],
    datasets: [
      {
        label: 'Pilot Average Rate (%)',
        data: [
          +(stats.overallAttendancePercent * 100).toFixed(1),
          +(stats.overallEngagementRate * 100).toFixed(1),
          +(stats.overallComprehensionRate * 100).toFixed(1)
        ],
        backgroundColor: [ACTIVITY_COLORS[1].bg, ACTIVITY_COLORS[2].bg, ACTIVITY_COLORS[3].bg],
        hoverBackgroundColor: [ACTIVITY_COLORS[1].hoverBg, ACTIVITY_COLORS[2].hoverBg, ACTIVITY_COLORS[3].hoverBg],
        borderColor: [ACTIVITY_COLORS[1].border, ACTIVITY_COLORS[2].border, ACTIVITY_COLORS[3].border],
        borderWidth: 1.5,
        borderRadius: 8
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
          label: (context) => ` Rate: ${context.parsed.y}%`
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
          text: 'Percentage (%)',
          font: { family: 'Inter', weight: 'bold', size: 12 },
          color: '#3A3350'
        }
      },
      x: {
        ticks: { font: { family: 'Inter', weight: '600', size: 13 }, color: '#3A3350' },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="tab-content">
      {/* Top Executive Headline Cards */}
      <div className="kpi-grid">
        <MetricCard
          title="Total Sessions Delivered"
          value={stats.totalSessions}
          subtitle="Interactive activity workshops completed"
          icon={BookOpen}
          accent="butter"
        />
        <MetricCard
          title="Total Workshop Headcount"
          value={stats.totalWorkshopHeadcount}
          subtitle={`Cumulative student attendances (${stats.uniqueAttendanceTotal} students in sessions)`}
          icon={UserCheck}
          accent="plum"
        />
        <MetricCard
          title="Overall Engagement Rate"
          value={formatPercent(stats.overallEngagementRate)}
          subtitle="Students actively participating in activities"
          icon={Sparkles}
          accent="plum"
        />
        <MetricCard
          title="Overall Comprehension Rate"
          value={formatPercent(stats.overallComprehensionRate)}
          subtitle="Students demonstrating conceptual understanding"
          icon={Brain}
          accent="butter"
        />
      </div>

      {/* Activities Delivered Strip */}
      <div className="activity-strip">
        <h2 className="activity-strip-title">Activities Delivered So Far (3 of Planned Curriculum)</h2>
        <div className="activity-cards-grid">
          {PRAGYA_DATA.meta.activities.map(act => (
            <div key={act.id} className="activity-card" style={{ borderTop: `4px solid ${getActivityColor(act.id, 'bg')}` }}>
              <div>
                <span 
                  className="activity-number" 
                  style={{ 
                    backgroundColor: getActivityColor(act.id, 'bg'), 
                    color: act.id === 3 ? '#2A2438' : '#FFFFFF' 
                  }}
                >
                  Activity 0{act.id}
                </span>
                <h3 className="activity-name">{act.name}</h3>
                <div className="activity-subtitle">{act.subtitle}</div>
                <p className="activity-desc">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="section-card">
        <div className="section-title-group">
          <h3 className="section-title">Pilot Key Performance Overview</h3>
          <p className="section-caption">Aggregated performance indicators comparing attendance, active engagement, and comprehension across all 15 delivered sessions.</p>
        </div>

        <div style={{ height: '320px', position: 'relative' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="chart-caption-box">
          <Info size={18} />
          <span>
            <strong>Summary:</strong> While baseline attendance averages 72.9%, participating students show exceptional engagement (95.7%) and strong conceptual understanding (90.8%) across hands-on AI activities.
          </span>
        </div>
      </div>
    </div>
  );
}
