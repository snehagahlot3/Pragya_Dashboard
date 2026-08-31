import React, { useState } from 'react';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';

// Tabs
import OverviewTab from './components/tabs/OverviewTab';
import AttendanceTab from './components/tabs/AttendanceTab';
import SessionsTab from './components/tabs/SessionsTab';
import EngagementTab from './components/tabs/EngagementTab';
import ComprehensionTab from './components/tabs/ComprehensionTab';
import RetentionTab from './components/tabs/RetentionTab';

import './styles/dashboard.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [classFilter, setClassFilter] = useState('ALL');
  const [activityFilter, setActivityFilter] = useState('ALL');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'attendance':
        return <AttendanceTab classFilter={classFilter} activityFilter={activityFilter} />;
      case 'sessions':
        return <SessionsTab classFilter={classFilter} activityFilter={activityFilter} />;
      case 'engagement':
        return <EngagementTab classFilter={classFilter} activityFilter={activityFilter} />;
      case 'comprehension':
        return <ComprehensionTab classFilter={classFilter} activityFilter={activityFilter} />;
      case 'retention':
        return <RetentionTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="main-content">
        <FilterBar
          classFilter={classFilter}
          onClassChange={setClassFilter}
          activityFilter={activityFilter}
          onActivityChange={setActivityFilter}
          isOverview={activeTab === 'overview'}
        />

        {renderTabContent()}
      </main>

      <Footer />
    </div>
  );
}
