import React, { useState } from 'react';
import './Dashboard.css';

// Import dashboard-specific icons from Drawer folder
import dashboardIcon from '../assets/icons/Drawer/dashboard.svg';
import arrowDropDownIcon from '../assets/icons/Drawer/arrow-down.svg';

const DashboardItem = ({ 
  title, 
  isActive = false, 
  isExpanded = false, 
  onToggle,
  children 
}) => {
  return (
    <div className="dashboard-item">
      <button
        onClick={onToggle}
        className={`dashboard-item-button ${isExpanded ? 'expanded' : ''}`}
      >
        <div className="dashboard-item-content">
          <div className="dashboard-item-icon">
            <img src={dashboardIcon} alt="Reports" />
          </div>
          <div className="dashboard-item-text">
            <span className="dashboard-item-title">
              {title}
            </span>
          </div>
        </div>
        <div className={`dashboard-item-toggle ${isExpanded ? 'expanded' : ''}`}>
          <img 
            src={arrowDropDownIcon} 
            alt="Toggle"
          />
        </div>
      </button>

      {isExpanded && children}
    </div>
  );
};

const DashboardSubItem = ({ title, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`dashboard-sub-item ${isActive ? 'active' : ''}`}
    >
      <div className="dashboard-sub-item-content">
        <div className="dashboard-sub-item-icon">
          <div className={`dashboard-sub-item-circle ${isActive ? 'active' : ''}`}></div>
        </div>
        <span className="dashboard-sub-item-title">
          {title}
        </span>
      </div>
    </button>
  );
};

const Dashboard = ({ activeSection = 'total-users' }) => {
  const [expandedSections, setExpandedSections] = useState({
    reports: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="dashboard">
      <DashboardSubItem
        title="Total users"
        isActive={activeSection === 'total-users'}
      />
      <DashboardSubItem
        title="Total licences"
        isActive={activeSection === 'total-licences'}
      />
      <DashboardSubItem
        title="Failed attempts"
        isActive={activeSection === 'failed-attempts'}
      />
    </div>
  );
};

export default Dashboard;
