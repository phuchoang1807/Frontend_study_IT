import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyMenus } from '../../api/menuApi';
import '../../styles/admin/adminLayout.css';

/** Icon mặc định cho mục menu từ API (giữ nguyên shape JSX sidebar). */
const DEFAULT_MENU_ICON = (
  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

function flattenMenusFromApi(nodes) {
  if (!Array.isArray(nodes)) return [];
  const out = [];
  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue;
    const route = node.route ?? node.path;
    const name = node.name ?? node.label;
    if (route && name) {
      out.push({ name, route });
    }
    if (Array.isArray(node.children) && node.children.length > 0) {
      out.push(...flattenMenusFromApi(node.children));
    }
  }
  return out;
}

function mapApiMenusToMenuItems(flat) {
  return flat.map((m) => ({
    label: m.name,
    path: m.route,
    icon: DEFAULT_MENU_ICON,
  }));
}

function pickDisplayRole(roles) {
  if (!roles?.length) return 'Moderator';
  if (roles.includes('ADMIN')) return 'Admin';
  if (roles.includes('USER_MODERATOR')) return 'Moderator';
  if (roles.includes('CONTENT_MODERATOR')) return 'Content Moderator';
  return roles[0];
}

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getMyMenus();
        if (!cancelled) setMenus(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('getMyMenus failed:', e);
        if (!cancelled) setMenus([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const menuItems = useMemo(() => {
    const flat = flattenMenusFromApi(menus);
    return mapApiMenusToMenuItems(flat);
  }, [menus]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="logo-text">
            <h2>ADMIN PANEL</h2>
            <p>Hệ thống quản trị</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <Link 
              key={`${item.path}-${index}`} 
              to={item.path} 
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="user-info">
              <span className="user-name">{user?.fullName || 'Admin'}</span>
              <span className="user-role">{pickDisplayRole(user?.roles)}</span>
            </div>
            <button className="logout-button" onClick={handleLogout} title="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <div className="admin-content-wrapper">
        <header className="admin-top-nav">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Tìm kiếm yêu cầu..." />
          </div>
          <div className="top-nav-actions">
            <button className="nav-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="nav-action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
