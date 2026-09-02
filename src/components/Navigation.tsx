// src/components/Navigation.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logoNokia from '../../public/logo-nokia.png';

const Navigation: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    if (!user) return null;

    return (
        <nav className="nokia-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <img src={logoNokia} alt="Nokia" className="nav-logo" />
                    <span className="brand-text">Rollout Management</span>
                </div>
                <ul className="nav-menu">
                    <li><Link to="/" className={isActive('/') ? 'active' : ''}>Dashboard</Link></li>
                    <li><Link to="/sites" className={isActive('/sites') ? 'active' : ''}>Sites</Link></li>
                    <li><Link to="/raawa" className={isActive('/raawa') ? 'active' : ''}>RAAWA</Link></li>
                    <li><Link to="/towerco" className={isActive('/towerco') ? 'active' : ''}>TOWERCO</Link></li>
                    <li><Link to="/deployment/plan" className={isActive('/deployment/plan') ? 'active' : ''}>Plan Deployment</Link></li>
                    <li><Link to="/deployment/actual" className={isActive('/deployment/actual') ? 'active' : ''}>Actual Deployment</Link></li>
                    <li><Link to="/engineer" className={isActive('/engineer') ? 'active' : ''}>Engineer</Link></li>
                    <li><Link to="/personnel" className={isActive('/personnel') ? 'active' : ''}>Personnel</Link></li>
                    <li><Link to="/reports" className={isActive('/reports') ? 'active' : ''}>Reports</Link></li>
                    <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
                    <li><button onClick={logout} className="logout-btn">Logout</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
