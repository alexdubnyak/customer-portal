import React, { useState } from 'react';
import './Drawer.css';

// Import SVG assets from Drawer folder
import homeIcon from '../assets/icons/Drawer/home.svg';
import dashboardIcon from '../assets/icons/Drawer/dashboard.svg';
import arrowDropDownIcon from '../assets/icons/Drawer/arrow-down.svg';
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

const ArrowDropUpIcon = () => (
  <img
    src={arrowDropDownIcon}
    alt="Arrow Up"
    className="icon-arrow-up rotated"
  />
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

const ShoppingCartIcon = () => (
  <img src={storeIcon} alt="Store" className="icon-store" />
);

const OpenInNewIcon = () => (
  <svg className="icon-arrow-down" viewBox="0 0 24 24" fill="none">
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor" />
  </svg>
);

const IntercomChatIcon = () => (
  <img src={intercomChatIcon} alt="Chat" className="intercom-icon" />
);

const AccountBoxIcon = () => (
  <img src={profileIcon} alt="Profile" className="icon-profile" />
);

const AccountCircleIcon = () => (
  <img src={personalIcon} alt="Personal" className="icon-personal" />
);

// 8x8 filled black bullet for submenu items per Figma
const BulletIcon = () => (
  <div className="bullet-8"></div>
);

const ExpandableItem = ({
  icon,
  title,
  isExpanded,
  onToggle,
  children,
  isActive = false,
  level = 0,
  hasActiveChild = false
}) => {
  return (
    <div className="expandable-item">
      <button
        onClick={onToggle}
        className={`expandable-item-button drawer-level-${level} ${isActive ? 'active' : ''} ${hasActiveChild && !isExpanded ? 'has-active-child' : ''}`}
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

const MenuItem = ({ icon, title, isActive = false, hasExternalLink = false, onClick, sectionKey, level = 0 }) => {
  return (
    <button
      onClick={() => onClick && onClick(sectionKey)}
      className={`menu-item drawer-level-${level} ${isActive ? 'active' : ''}`}
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
    personal: false,
    users: false,
    permissions: false,
  });

  const [hoveredSection, setHoveredSection] = useState(null);

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
      <div 
        className="drawer-collapsed"
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="drawer-header">
          <button
            onClick={onToggleCollapse}
            className="drawer-toggle"
          >
            <img src={arrowRightIcon} alt="Expand" className="arrow-icon" />
          </button>
        </div>
        <div className="collapsed-menu">
          <div 
            className={`collapsed-menu-item ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleSectionClick('home')}
          >
            <HomeIcon />
          </div>
          <div 
            className={`collapsed-menu-item ${activeSection?.startsWith('organization') ? 'active' : ''}`}
            onClick={() => handleSectionClick('organization-dashboard')}
            onMouseEnter={() => setHoveredSection('organization')}
          >
            <WorkIcon />
          </div>
          <div 
            className={`collapsed-menu-item ${activeSection?.startsWith('personal') ? 'active' : ''}`}
            onClick={() => handleSectionClick('personal-devices')}
            onMouseEnter={() => setHoveredSection('personal')}
          >
            <AccountCircleIcon />
          </div>
          <div 
            className={`collapsed-menu-item ${activeSection === 'store' ? 'active' : ''}`}
            onClick={() => handleSectionClick('store')}
          >
            <ShoppingCartIcon />
          </div>
        </div>

        {/* Hover panels for collapsed menu */}
        {hoveredSection === 'organization' && (
          <div className="collapsed-hover-panel">
            <div className="hover-panel-content">
              <div className="hover-panel-header">
                <WorkIcon />
                <span>Organization</span>
              </div>
              <MenuItem
                icon={<DashboardIcon />}
                title="Dashboard"
                isActive={activeSection === 'organization-dashboard'}
                onClick={handleSectionClick}
                sectionKey="organization-dashboard"
                level={1}
              />
              <ExpandableItem
                icon={<GroupIcon />}
                title="Users"
                isExpanded={expandedSections.users}
                onToggle={() => toggleSection('users')}
                isActive={activeSection?.startsWith('organization-users')}
                level={1}
                hasActiveChild={activeSection?.startsWith('organization-users')}
              >
                <div className="expandable-item-children">
                  <MenuItem
                    icon={<BulletIcon />}
                    title="All users"
                    isActive={activeSection === 'organization-users-all'}
                    onClick={handleSectionClick}
                    sectionKey="organization-users-all"
                    level={2}
                  />
                  <MenuItem
                    icon={<BulletIcon />}
                    title="Requests"
                    isActive={activeSection === 'organization-users-requests'}
                    onClick={handleSectionClick}
                    sectionKey="organization-users-requests"
                    level={2}
                  />
                </div>
              </ExpandableItem>
              <MenuItem
                icon={<DevicesIcon />}
                title="Devices"
                isActive={activeSection === 'organization-devices'}
                onClick={handleSectionClick}
                sectionKey="organization-devices"
                level={1}
              />
              <ExpandableItem
                icon={<KeyIcon />}
                title="Permissions"
                isExpanded={expandedSections.permissions}
                onToggle={() => toggleSection('permissions')}
                isActive={activeSection?.startsWith('organization-permissions')}
                level={1}
                hasActiveChild={activeSection?.startsWith('organization-permissions')}
              >
                <div className="expandable-item-children">
                  <MenuItem
                    icon={<BulletIcon />}
                    title="Roles"
                    isActive={activeSection === 'organization-permissions-roles'}
                    onClick={handleSectionClick}
                    sectionKey="organization-permissions-roles"
                    level={2}
                  />
                  <MenuItem
                    icon={<BulletIcon />}
                    title="Policies"
                    isActive={activeSection === 'organization-permissions-policies'}
                    onClick={handleSectionClick}
                    sectionKey="organization-permissions-policies"
                    level={2}
                  />
                </div>
              </ExpandableItem>
              <MenuItem
                icon={<AccountBoxIcon />}
                title="Profile"
                isActive={activeSection === 'organization-profile'}
                onClick={handleSectionClick}
                sectionKey="organization-profile"
                level={1}
              />
            </div>
          </div>
        )}

        {hoveredSection === 'personal' && (
          <div className="collapsed-hover-panel">
            <div className="hover-panel-content">
              <div className="hover-panel-header">
                <AccountCircleIcon />
                <span>Personal</span>
              </div>
              <MenuItem
                icon={<DevicesIcon />}
                title="Devices"
                isActive={activeSection === 'personal-devices'}
                onClick={handleSectionClick}
                sectionKey="personal-devices"
                level={1}
              />
              <MenuItem
                icon={<KeyIcon />}
                title="Permissions"
                isActive={activeSection === 'personal-permissions'}
                onClick={handleSectionClick}
                sectionKey="personal-permissions"
                level={1}
              />
              <MenuItem
                icon={<AccountBoxIcon />}
                title="Profile"
                isActive={activeSection === 'personal-profile'}
                onClick={handleSectionClick}
                sectionKey="personal-profile"
                level={1}
              />
            </div>
          </div>
        )}

        
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
            level={0}
          />

          <ExpandableItem
            icon={<WorkIcon />}
            title="Organization"
            isExpanded={expandedSections.organization}
            onToggle={() => toggleSection('organization')}
            isActive={activeSection?.startsWith('organization')}
            level={0}
            hasActiveChild={activeSection?.startsWith('organization')}
          >
            <div className="expandable-item-children">
              {/* Dashboard is a simple item (no arrow) */}
              <MenuItem
                icon={<DashboardIcon />}
                title="Dashboard"
                isActive={activeSection === 'organization-dashboard'}
                onClick={handleSectionClick}
                sectionKey="organization-dashboard"
                level={1}
              />

              <ExpandableItem
                icon={<GroupIcon />}
                title="Users"
                isExpanded={expandedSections.users}
                onToggle={() => toggleSection('users')}
                isActive={activeSection?.startsWith('organization-users')}
                level={1}
                hasActiveChild={activeSection?.startsWith('organization-users')}
              >
                <div className="expandable-item-children">
                  <MenuItem
                    icon={<BulletIcon />}
                    title="All users"
                    isActive={activeSection === 'organization-users-all'}
                    onClick={handleSectionClick}
                    sectionKey="organization-users-all"
                    level={2}
                  />
                  <MenuItem
                    icon={<BulletIcon />}
                    title="Requests"
                    isActive={activeSection === 'organization-users-requests'}
                    onClick={handleSectionClick}
                    sectionKey="organization-users-requests"
                    level={2}
                  />
                </div>
              </ExpandableItem>

              <MenuItem
                icon={<DevicesIcon />}
                title="Devices"
                isActive={activeSection === 'organization-devices'}
                onClick={handleSectionClick}
                sectionKey="organization-devices"
                level={1}
              />

              <ExpandableItem
                icon={<KeyIcon />}
                title="Permissions"
                isExpanded={expandedSections.permissions}
                onToggle={() => toggleSection('permissions')}
                isActive={activeSection?.startsWith('organization-permissions')}
                level={1}
                hasActiveChild={activeSection?.startsWith('organization-permissions')}
              >
                <div className="expandable-item-children">
                  <MenuItem
                    icon={<BulletIcon />}
                    title="Roles"
                    isActive={activeSection === 'organization-permissions-roles'}
                    onClick={handleSectionClick}
                    sectionKey="organization-permissions-roles"
                    level={2}
                  />
                  <MenuItem
                    icon={<BulletIcon />}
                    title="Policies"
                    isActive={activeSection === 'organization-permissions-policies'}
                    onClick={handleSectionClick}
                    sectionKey="organization-permissions-policies"
                    level={2}
                  />
                </div>
              </ExpandableItem>

              <MenuItem
                icon={<AccountBoxIcon />}
                title="Profile"
                isActive={activeSection === 'organization-profile'}
                onClick={handleSectionClick}
                sectionKey="organization-profile"
                level={1}
              />
            </div>
          </ExpandableItem>

          <ExpandableItem
            icon={<AccountCircleIcon />}
            title="Personal"
            isExpanded={expandedSections.personal}
            onToggle={() => toggleSection('personal')}
            isActive={activeSection?.startsWith('personal')}
            level={0}
            hasActiveChild={activeSection?.startsWith('personal')}
          >
            <div className="expandable-item-children">
              <MenuItem
                icon={<DevicesIcon />}
                title="Devices"
                isActive={activeSection === 'personal-devices'}
                onClick={handleSectionClick}
                sectionKey="personal-devices"
                level={1}
              />
              <MenuItem
                icon={<KeyIcon />}
                title="Permissions"
                isActive={activeSection === 'personal-permissions'}
                onClick={handleSectionClick}
                sectionKey="personal-permissions"
                level={1}
              />
              <MenuItem
                icon={<AccountBoxIcon />}
                title="Profile"
                isActive={activeSection === 'personal-profile'}
                onClick={handleSectionClick}
                sectionKey="personal-profile"
                level={1}
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
            level={0}
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
