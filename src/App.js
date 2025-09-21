import React, { useState } from 'react';
import Drawer from './components/Drawer';
import './App.css';
import './index.css';

function App() {
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleDrawer = () => {
    setIsDrawerCollapsed(!isDrawerCollapsed);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="section-content">
            <div className="section-card">
              <h1 className="section-title">Dashboard</h1>
              <p className="section-description">Welcome to your customer portal dashboard.</p>
            </div>
          </div>
        );
      case 'organization':
        return (
          <div className="section-content">
            <div className="section-card">
              <h1 className="section-title">Organization</h1>
              <p className="section-description">Manage your organization settings and members.</p>
            </div>
          </div>
        );
      case 'personal':
        return (
          <div className="section-content">
            <div className="section-card">
              <h1 className="section-title">Personal</h1>
              <p className="section-description">Manage your personal settings and preferences.</p>
            </div>
          </div>
        );
      case 'store':
        return (
          <div className="section-content">
            <div className="section-card">
              <h1 className="section-title">Store</h1>
              <p className="section-description">Browse and purchase licenses and add-ons.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="section-content">
            <div className="section-card">
              <h1 className="section-title">Welcome</h1>
              <p className="section-description">Select a section from the navigation menu.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <Drawer 
        isCollapsed={isDrawerCollapsed} 
        onToggleCollapse={toggleDrawer}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {renderMainContent()}
    </div>
  );
}

export default App;
