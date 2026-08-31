import React from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Sparkles, 
  Brain, 
  Bookmark, 
  Table 
} from 'lucide-react';

export const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'attendance', label: 'Attendance', icon: Users },
  { id: 'sessions', label: 'Sessions & Activities', icon: BookOpen },
  { id: 'engagement', label: 'Engagement', icon: Sparkles },
  { id: 'comprehension', label: 'Comprehension', icon: Brain },
  { id: 'retention', label: 'Retention & Vocabulary', icon: Bookmark, badge: 'In Progress' },
  { id: 'rawdata', label: 'Raw Data', icon: Table }
];

export default function NavigationTabs({ activeTab, onTabChange }) {
  return (
    <nav className="nav-tabs-wrapper">
      <div className="nav-tabs-inner">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && <span className="badge-pill">{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
