import React, { useState } from 'react';
import './Drawer.css';

// Import SVG assets from Drawer folder
import homeIcon from '../assets/icons/Drawer/home.svg';
import dashboardIcon from '../assets/icons/Drawer/dashboard.svg';
import arrowDropDownIcon from '../assets/icons/Drawer/arrow-down.svg';
import arrowDropUpIcon from '../assets/icons/Drawer/arrow-up.svg';
import logoHeaderIcon from '../assets/icons/Drawer/logo-header.svg';
import arrowLeftIcon from '../assets/icons/Drawer/arrow-left.svg';
import arrowRightIcon from '../assets/icons/Drawer/arrow-right.svg';
import intercomChatIcon from '../assets/icons/Drawer/intercom-chatbutton.svg';
import storeIcon from '../assets/icons/Drawer/store.svg';
import organizationIcon from '../assets/icons/Drawer/organization.svg';
import usersIcon from '../assets/icons/Drawer/users.svg';
import devicesIcon from '../assets/icons/Drawer/devices.svg';
import permissionsIcon from '../assets/icons/Drawer/permissions.svg';
import profileIcon from '../assets/icons/Drawer/profile.svg';
import personalIcon from '../assets/icons/Drawer/personal.svg';

// Icon components using imported SVG assets
const HomeIcon = () => (
  <img src={homeIcon} alt="Home" className="icon-home" />
);

const DashboardIcon = () => (
  <img src={dashboardIcon} alt="Dashboard" className="icon-dashboard" />
);

const ArrowDropDownIcon = () => (
  <img src={arrowDropDownIcon} alt="Arrow Down" className="icon-arrow-down" />
);

const ArrowBackIcon = () => (
  <img src={arrowDropDownIcon} alt="Arrow Back" className="icon-arrow-back" style={{ transform: 'rotate(90deg)' }} />
);

const ShoppingCartIcon = () => (
  <img src={storeIcon} alt="Store" className="icon-store" />
);

const OpenInNewIcon = () => (
  <svg className="icon-arrow-down" viewBox="0 0 24 24" fill="none">
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor" />
  </svg>
);

const LogoIcon = () => (
  <div className="drawer-logo">
    <div className="drawer-logo-text">Graebert</div>
  </div>
);

const IntercomChatIcon = () => (
  <img src={intercomChatIcon} alt="Chat" className="intercom-icon" />
);

const ArrowDropUpIcon = () => (
  <img src={arrowDropUpIcon} alt="Arrow Up" className="icon-arrow-up" />
);

const WorkIcon = () => (
  <img src={organizationIcon} alt="Organization" className="icon-organization" />
);

const GroupIcon = () => (
  <img src={usersIcon} alt="Users" className="icon-users" />
);

const DevicesIcon = () => (
  <img src={devicesIcon} alt="Devices" className="icon-devices" />
);

const KeyIcon = () => (
  <img src={permissionsIcon} alt="Permissions" className="icon-permissions" />
);

const AccountBoxIcon = () => (
  <img src={profileIcon} alt="Profile" className="icon-profile" />
);

const AccountCircleIcon = () => (
  <img src={personalIcon} alt="Personal" className="icon-personal" />
);

const CircleSmallIcon = () => (
  <div className="circle-small"></div>
);

const CircleSmallActiveIcon = () => (
  <div className="circle-small-active"></div>
);

const ExpandableItem = ({
  icon,
  title,
  isExpanded,
  onToggle,
  children,
  isActive = false
}) => {
  return (
    <div className="expandable-item">
      <button
        onClick={onToggle}
        className={`expandable-item-button ${isActive ? 'active' : ''}`}
      >
        <div className="expandable-item-content">
          <div className="menu-item-icon">
            {icon}
          </div>
          <span className="menu-item-title">
            {title}
          </span>
        </div>
        <div className="expandable-item-toggle">
          {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </button>
      {isExpanded && children && (
        <div className="expandable-item-children">
          {children}
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, title, isActive = false, hasExternalLink = false, onClick, sectionKey }) => {
  return (
    <button
      onClick={() => onClick && onClick(sectionKey)}
      className={`menu-item ${isActive ? 'active' : ''}`}
    >
      <div className="menu-item-icon">
        {icon}
      </div>
      <span className="menu-item-title">
        {title}
      </span>
      {hasExternalLink && (
        <div className="menu-item-external">
          <OpenInNewIcon />
        </div>
      )}
    </button>
  );
};

const Drawer = ({ isCollapsed = false, onToggleCollapse, activeSection = 'home', onSectionChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    organization: false,
    personal: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSectionClick = (sectionKey) => {
    if (onSectionChange) {
      onSectionChange(sectionKey);
    }
  };

  if (isCollapsed) {
    return (
      <div className="drawer-collapsed">
        <div className="drawer-header">
          <button
            onClick={onToggleCollapse}
            className="drawer-toggle"
          >
            <img src={arrowRightIcon} alt="Expand" className="arrow-icon" />
          </button>
        </div>
        <div className="collapsed-menu">
          <div className="collapsed-menu-item active">
            <HomeIcon />
          </div>
          <div className="collapsed-menu-item">
            <WorkIcon />
          </div>
          <div className="collapsed-menu-item">
            <AccountCircleIcon />
          </div>
          <div className="collapsed-menu-item">
            <ShoppingCartIcon />
          </div>
        </div>
        
        <div className="collapsed-footer">
          <IntercomChatIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="drawer">
      {/* Header */}
      <div className="drawer-header">
        <button
          onClick={onToggleCollapse}
          className="drawer-toggle"
        >
          <img src={arrowLeftIcon} alt="Collapse" className="arrow-icon" />
        </button>
        <div className="header-logo">
          <img src={logoHeaderIcon} alt="Logo" className="logo-header" />
        </div>
      </div>

        {/* Navigation Items */}
        <div className="drawer-navigation">
          <MenuItem
            icon={<HomeIcon />}
            title="Home"
            isActive={activeSection === 'home'}
            onClick={handleSectionClick}
            sectionKey="home"
          />

          <ExpandableItem
            icon={<WorkIcon />}
            title="Organization"
            isExpanded={expandedSections.organization}
            onToggle={() => toggleSection('organization')}
          >
            <div className="expandable-item-children">
              <MenuItem
                icon={<DashboardIcon />}
                title="Dashboard"
                isActive={activeSection === 'organization-dashboard'}
                onClick={handleSectionClick}
                sectionKey="organization-dashboard"
              />
              <MenuItem
                icon={<GroupIcon />}
                title="Users"
                isActive={activeSection === 'organization-users'}
                onClick={handleSectionClick}
                sectionKey="organization-users"
              />
              <MenuItem
                icon={<DevicesIcon />}
                title="Devices"
                isActive={activeSection === 'organization-devices'}
                onClick={handleSectionClick}
                sectionKey="organization-devices"
              />
              <MenuItem
                icon={<KeyIcon />}
                title="Permissions"
                isActive={activeSection === 'organization-permissions'}
                onClick={handleSectionClick}
                sectionKey="organization-permissions"
              />
              <MenuItem
                icon={<AccountBoxIcon />}
                title="Profile"
                isActive={activeSection === 'organization-profile'}
                onClick={handleSectionClick}
                sectionKey="organization-profile"
              />
            </div>
          </ExpandableItem>

          <ExpandableItem
            icon={<AccountCircleIcon />}
            title="Personal"
            isExpanded={expandedSections.personal}
            onToggle={() => toggleSection('personal')}
          >
            <div className="expandable-item-children">
              <MenuItem
                icon={<DevicesIcon />}
                title="Devices"
                isActive={activeSection === 'personal-devices'}
                onClick={handleSectionClick}
                sectionKey="personal-devices"
              />
              <MenuItem
                icon={<KeyIcon />}
                title="Permissions"
                isActive={activeSection === 'personal-permissions'}
                onClick={handleSectionClick}
                sectionKey="personal-permissions"
              />
              <MenuItem
                icon={<AccountBoxIcon />}
                title="Profile"
                isActive={activeSection === 'personal-profile'}
                onClick={handleSectionClick}
                sectionKey="personal-profile"
              />
            </div>
          </ExpandableItem>

          <MenuItem
            icon={<ShoppingCartIcon />}
            title="Store"
            hasExternalLink={true}
            onClick={handleSectionClick}
            sectionKey="store"
            isActive={activeSection === 'store'}
          />
        </div>

        {/* Footer */}
      <div className="drawer-footer">
        <div className="drawer-footer-text">
          <p>Copyright 2024 Graebert GmbH.</p>
          <p>All rights reserved.</p>
          <p className="privacy-link">Privacy Policy  Terms of Use</p>
          <p>v1.2.3782</p>
        </div>
        <div className="drawer-footer-chat">
          <IntercomChatIcon />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
